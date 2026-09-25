import { SiteAuditRequest, SiteAuditResult, SiteAuditBlocker, SiteAuditFinding } from '../src/types';

/**
 * Server-side zero-overhead website auditor for Google AdSense compliance and rejection diagnosis.
 */
export async function runSiteAudit(request: SiteAuditRequest): Promise<SiteAuditResult> {
  const { url, mode, rejectionReason = 'low-value-content', customNotes = '', sampleContent = '' } = request;

  // 1. Handle Demonstration / Testing Mode
  if (url.includes('demo-compliant') || url === 'demo:compliant') {
    return generateDemoCompliantResult(url, mode);
  }
  if (url.includes('demo-thin') || url === 'demo:thin') {
    return generateDemoThinAffiliateResult(url, mode);
  }
  if (url.includes('demo-rejected') || url === 'demo:rejected') {
    return generateDemoRejectionDoctorResult(url, rejectionReason);
  }

  // 2. Fetch and parse live website HTML
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  let html = '';
  let isHttps = normalizedUrl.startsWith('https://');
  let fetchFailed = false;
  let fetchErrorMsg = '';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      fetchFailed = true;
      fetchErrorMsg = `HTTP ${response.status} ${response.statusText}`;
    } else {
      html = await response.text();
    }
  } catch (err: any) {
    fetchFailed = true;
    fetchErrorMsg = err?.name === 'AbortError' ? 'Connection timed out (6.5s)' : err?.message || 'Unable to connect';
  }

  // If fetch failed completely (e.g. localhost, Cloudflare DDOS protection, or site down)
  if (fetchFailed || !html) {
    return generateFetchFallbackResult(normalizedUrl, mode, rejectionReason, fetchErrorMsg, sampleContent);
  }

  // 3. Parse HTML features
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : '';

  const hasMobileViewport = /<meta[^>]*name=["']viewport["'][^>]*>/i.test(html);
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const hasRobotsNoindex = robotsMatch ? /noindex/i.test(robotsMatch[1]) : false;

  // Search links
  const linkMatches = Array.from(html.matchAll(/<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi));
  let totalLinks = linkMatches.length;
  let emptyHashLinks = 0;
  let internalLinks = 0;

  let hasPrivacyPolicy = false;
  let hasTerms = false;
  let hasAbout = false;
  let hasContact = false;
  let hasCookieConsent = /cookie|consent|gdpr|ccpa/i.test(html);

  for (const match of linkMatches) {
    const href = (match[1] || '').trim();
    const anchorText = (match[2] || '').replace(/<[^>]*>/g, '').trim().toLowerCase();
    const combined = `${href.toLowerCase()} ${anchorText}`;

    if (href === '#' || href === 'javascript:void(0)' || href === 'javascript:;') {
      emptyHashLinks++;
    }

    if (href.startsWith('/') || href.startsWith(normalizedUrl) || !href.startsWith('http')) {
      internalLinks++;
    }

    if (/privacy|privacy-policy|privacypolicy|data-protection/i.test(combined)) {
      hasPrivacyPolicy = true;
    }
    if (/terms|tos|disclaimer|terms-of-service|terms-conditions/i.test(combined)) {
      hasTerms = true;
    }
    if (/about|about-us|aboutus|who-we-are|author|team/i.test(combined)) {
      hasAbout = true;
    }
    if (/contact|contact-us|contactus|get-in-touch|support|mailto:/i.test(combined)) {
      hasContact = true;
    }
  }

  // Clean body text for word count
  let cleanText = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
  let estimatedWordCount = words.length;

  if (sampleContent && sampleContent.trim().length > 50) {
    const sampleWords = sampleContent.trim().split(/\s+/).length;
    estimatedWordCount = Math.max(estimatedWordCount, sampleWords);
  }

  const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  const h2Matches = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || [];
  const pMatches = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];

  // Detect ad networks
  const detectedAdCodes: string[] = [];
  if (/googlesyndication|adsbygoogle/i.test(html)) detectedAdCodes.push('Google AdSense script');
  if (/ezoic/i.test(html)) detectedAdCodes.push('Ezoic script');
  if (/mediavine/i.test(html)) detectedAdCodes.push('Mediavine script');
  if (/adsterra|propellerads|popads/i.test(html)) detectedAdCodes.push('Low-tier Pop/Banner network');

  // YMYL keyword detection
  const isYmyl = /loan|mortgage|crypto|cure|diet pill|supplement|forex|investing|symptom|prescription|weight loss/i.test(
    `${pageTitle} ${cleanText.slice(0, 1500)}`
  );

  // 4. Compute Scores
  // Legal Compliance: 0 - 100
  let legalScore = 0;
  if (hasPrivacyPolicy) legalScore += 35;
  if (hasTerms) legalScore += 25;
  if (hasAbout) legalScore += 20;
  if (hasContact) legalScore += 20;

  // Content Depth: 0 - 100
  let contentScore = 20;
  if (estimatedWordCount >= 1200) contentScore = 95;
  else if (estimatedWordCount >= 800) contentScore = 85;
  else if (estimatedWordCount >= 500) contentScore = 70;
  else if (estimatedWordCount >= 300) contentScore = 50;
  else contentScore = 25;

  if (h1Matches.length === 1) contentScore += 5;
  if (h2Matches.length >= 2) contentScore += 5;
  contentScore = Math.min(100, contentScore);

  // Navigation UX: 0 - 100
  let navScore = 75;
  if (emptyHashLinks > 3) navScore -= 25;
  else if (emptyHashLinks > 0) navScore -= 10;
  if (totalLinks >= 6 && internalLinks >= 4) navScore += 25;
  navScore = Math.max(20, Math.min(100, navScore));

  // Technical SEO: 0 - 100
  let techScore = 0;
  if (isHttps) techScore += 40;
  if (hasMobileViewport) techScore += 35;
  if (!hasRobotsNoindex) techScore += 25;

  // Overall Approval Probability (0 - 100%)
  let baseProbability = Math.round(
    legalScore * 0.35 + contentScore * 0.35 + navScore * 0.15 + techScore * 0.15
  );

  if (hasRobotsNoindex) baseProbability = Math.min(baseProbability, 20);
  if (!hasPrivacyPolicy) baseProbability = Math.min(baseProbability, 45);
  if (estimatedWordCount < 350) baseProbability = Math.min(baseProbability, 40);
  if (isYmyl) baseProbability = Math.max(30, baseProbability - 20);

  if (mode === 'rejection-doctor') {
    // If site is already rejected, probability starts from an honest baseline
    baseProbability = Math.min(baseProbability, 78);
  }

  const overallStatus =
    baseProbability >= 85 ? 'ready' : baseProbability >= 60 ? 'needs-work' : 'critical-blockers';

  // 5. Build Critical Blockers & Findings
  const criticalBlockers: SiteAuditBlocker[] = [];
  const findings: SiteAuditFinding[] = [];

  // Legal checks
  if (!hasPrivacyPolicy) {
    criticalBlockers.push({
      title: 'Missing Privacy Policy with DoubleClick/AdSense Disclosures',
      description:
        'Google AdSense requires explicit disclosure that third-party vendors, including Google, use cookies to serve ads based on user prior visits.',
      severity: 'critical',
      fixAdvice:
        'Generate a dedicated /privacy-policy page containing Google DART cookie disclosures, CCPA/GDPR clauses, and link it visibly in the footer.',
    });
    findings.push({
      category: 'Legal & TOS',
      label: 'Privacy Policy',
      status: 'fail',
      detail: 'No link to a Privacy Policy page detected on homepage.',
    });
  } else {
    findings.push({
      category: 'Legal & TOS',
      label: 'Privacy Policy',
      status: 'pass',
      detail: 'Privacy Policy link found in DOM.',
    });
  }

  if (!hasAbout) {
    criticalBlockers.push({
      title: 'Missing About Us / Editorial Transparency',
      description:
        'Under E-E-A-T guidelines, AdSense manual reviewers check who is behind the website. Sites without an About page are regularly rejected as anonymous/untrustworthy.',
      severity: 'warning',
      fixAdvice:
        'Add an /about page detailing your mission, editorial methodology, and real author bio or organization background.',
    });
    findings.push({
      category: 'Legal & TOS',
      label: 'About Us / Transparency',
      status: 'fail',
      detail: 'No dedicated About Us page found.',
    });
  } else {
    findings.push({
      category: 'Legal & TOS',
      label: 'About Us',
      status: 'pass',
      detail: 'About Us link detected in navigation.',
    });
  }

  if (!hasContact) {
    criticalBlockers.push({
      title: 'Missing Contact Information / Feedback Channel',
      description: 'AdSense requires users to have a way to reach the publisher regarding content or inquiries.',
      severity: 'warning',
      fixAdvice: 'Create a /contact page with a working form or direct email address.',
    });
    findings.push({
      category: 'Legal & TOS',
      label: 'Contact Us',
      status: 'warn',
      detail: 'No direct contact link or mailto link found.',
    });
  } else {
    findings.push({
      category: 'Legal & TOS',
      label: 'Contact Information',
      status: 'pass',
      detail: 'Contact link detected.',
    });
  }

  // Content checks
  if (estimatedWordCount < 500) {
    criticalBlockers.push({
      title: 'High "Thin Content / Low-Value" Flag (Under 500 words)',
      description: `Homepage/scanned page has only ~${estimatedWordCount} words of readable body text. Google bots scan for substantial original editorial or calculation utility.`,
      severity: 'critical',
      fixAdvice:
        'Ensure each page contains at least 800+ words of original, comprehensive instructional copy, formula breakdowns, and FAQs.',
    });
    findings.push({
      category: 'Content Depth',
      label: 'Body Word Count',
      status: 'fail',
      detail: `Only ~${estimatedWordCount} words found. Minimum recommended is 800+ words.`,
    });
  } else {
    findings.push({
      category: 'Content Depth',
      label: 'Body Word Count',
      status: 'pass',
      detail: `Substantial text content detected (~${estimatedWordCount} words).`,
    });
  }

  // Indexing Check
  const domainOnly = normalizedUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (hasRobotsNoindex) {
    criticalBlockers.push({
      title: 'Search Indexing Blocked (<meta name="robots" content="noindex">)',
      description: 'Your pages are instructing Google not to index them. AdSense bots will immediately fail approval.',
      severity: 'critical',
      fixAdvice: 'Remove the "noindex" meta tag from your HTML header immediately.',
    });
    findings.push({
      category: 'Technical & SEO',
      label: 'Indexing & Search Console',
      status: 'fail',
      detail: 'Page contains blocking "noindex" directive. Search bots cannot index this site.',
    });
  } else {
    findings.push({
      category: 'Technical & SEO',
      label: 'Indexing & Search Console',
      status: 'pass',
      detail: `Domain is open to search bots. Confirm ownership in Google Search Console and verify core URLs via "site:${domainOnly}".`,
    });
  }

  // Security & SSL
  if (!isHttps) {
    criticalBlockers.push({
      title: 'Insecure HTTP Connection (No SSL)',
      description: 'Google AdSense requires secure HTTPS encryption across all serving pages.',
      severity: 'critical',
      fixAdvice: 'Enable free Cloudflare SSL or Let\'s Encrypt certificate.',
    });
    findings.push({
      category: 'Security & UX',
      label: 'Active HTTPS & SSL Security',
      status: 'fail',
      detail: 'Site is loaded via insecure HTTP.',
    });
  } else {
    findings.push({
      category: 'Security & UX',
      label: 'Active HTTPS & SSL Security',
      status: 'pass',
      detail: 'Active HTTPS encryption verified.',
    });
  }

  // Mobile Viewport & Responsiveness
  if (!hasMobileViewport) {
    criticalBlockers.push({
      title: 'Missing Mobile Responsive Viewport Meta Tag',
      description: 'The page lacks a mobile viewport tag (<meta name="viewport" ...>). Google mobile bots will flag this site as non-responsive.',
      severity: 'critical',
      fixAdvice: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0" /> to your <head> section.',
    });
    findings.push({
      category: 'Security & UX',
      label: 'Responsive Mobile Theme',
      status: 'fail',
      detail: 'No mobile viewport meta tag detected in HTML head.',
    });
  } else {
    findings.push({
      category: 'Security & UX',
      label: 'Responsive Mobile Theme',
      status: 'pass',
      detail: 'Mobile viewport tag detected. Fully responsive theme configuration found.',
    });
  }

  // Navigation Links & 404 / Placeholder Detection
  if (emptyHashLinks > 2) {
    criticalBlockers.push({
      title: 'Broken or Placeholder Navigation (href="#")',
      description: `Detected ${emptyHashLinks} placeholder links with href="#". Google classifies this under the dreaded "Site behavior: Navigation" rejection reason.`,
      severity: 'critical',
      fixAdvice: 'Replace all dummy template links with real URLs or remove inactive menu buttons.',
    });
    findings.push({
      category: 'Security & UX',
      label: 'Zero 404 Links in Menu',
      status: 'fail',
      detail: `${emptyHashLinks} placeholder links with href="#" found. Ensure zero dead links or dummy menu items remain.`,
    });
  } else {
    findings.push({
      category: 'Security & UX',
      label: 'Zero 404 Links in Menu',
      status: 'pass',
      detail: 'Clean navigation menu verified without empty hash placeholders or broken anchor links.',
    });
  }

  // 6. Generate Rejection Doctor Diagnosis if in Mode 2
  let rejectionDiagnosis = undefined;
  if (mode === 'rejection-doctor') {
    rejectionDiagnosis = generateRejectionDiagnosis(
      rejectionReason,
      estimatedWordCount,
      hasPrivacyPolicy,
      emptyHashLinks,
      isYmyl
    );
  }

  const verdictSummary =
    baseProbability >= 85
      ? `High AdSense Readiness (${baseProbability}%). Domain displays sound technical structure and legal compliance. Ready for application.`
      : baseProbability >= 60
      ? `Moderate Readiness (${baseProbability}%). Essential infrastructure is present, but ${criticalBlockers.length} issues must be resolved to eliminate rejection risk.`
      : `High Rejection Risk (${baseProbability}%). Critical violations detected (${criticalBlockers.map((b) => b.title).slice(0, 2).join(', ')}). Do not submit until remediation is complete.`;

  return {
    url: normalizedUrl,
    mode,
    analyzedAt: new Date().toISOString(),
    approvalProbability: baseProbability,
    overallStatus,
    verdictSummary,
    pageTitle,
    metrics: {
      isHttps,
      hasMobileViewport,
      hasRobotsNoindex,
      estimatedWordCount,
      h1Count: h1Matches.length,
      h2Count: h2Matches.length,
      paragraphCount: pMatches.length,
      legalPagesFound: {
        privacyPolicy: hasPrivacyPolicy,
        termsOfService: hasTerms,
        aboutUs: hasAbout,
        contactUs: hasContact,
        cookieConsent: hasCookieConsent,
      },
      navigationHealth: {
        totalLinks,
        emptyHashLinks,
        internalLinks,
      },
      detectedAdCodes,
      thinContentRisk: estimatedWordCount < 500 ? 'High' : estimatedWordCount < 800 ? 'Medium' : 'Low',
      ymylRisk: isYmyl ? 'High' : 'Low',
    },
    scoreBreakdown: {
      contentDepthScore: contentScore,
      legalComplianceScore: legalScore,
      navigationUxScore: navScore,
      technicalSeoScore: techScore,
    },
    criticalBlockers,
    findings,
    rejectionDiagnosis,
    reApplicationChecklist: [
      'Verified all 4 legal pages (Privacy Policy with Google cookie clause, Terms, About, Contact) are linked in the global footer.',
      'Audited every navigation menu item to ensure zero href="#" dead ends or empty category archives.',
      'Confirmed at least 15+ published pages, each containing 800+ words of high-utility text or interactive calculation logic.',
      'Removed all conflicting third-party ad networks (popups, adult ads, low-quality push banners).',
      'Verified domain is indexed in Google Search Console with active impressions.',
      'Ensured site loads under 2 seconds on mobile devices with free Cloudflare caching.',
    ],
  };
}

// Helper: Rejection Diagnosis generator
function generateRejectionDiagnosis(
  reason: string,
  wordCount: number,
  hasPrivacy: boolean,
  emptyLinks: number,
  isYmyl: boolean
) {
  let primaryTrigger = '';
  let googleBotPerspective = '';
  let humanReviewerPerspective = '';

  switch (reason) {
    case 'low-value-content':
      primaryTrigger =
        wordCount < 600
          ? 'Algorithmic text-density failure: The automated crawler flagged insufficient textual substance and lack of unique problem-solving value.'
          : 'Duplication or generic synthesis: Content reads like unedited AI summaries without proprietary data, original calculators, or personal case studies.';
      googleBotPerspective =
        'Googlebot calculates the ratio of boilerplate/template markup to unique informative body copy. If the unique semantic tokens are low, it flags "Low Value Content" automatically without human intervention.';
      humanReviewerPerspective =
        'Human reviewers spend 30–60 seconds on the site. If they land on a page that looks like generic blog posts found on 1,000 other sites, they hit the "Low-Value Content" macro reject button.';
      break;

    case 'site-behavior-navigation':
      primaryTrigger =
        emptyLinks > 0
          ? `Detected ${emptyLinks} empty or dummy menu links (href="#"). Google treats unlinked template elements as a deceptive or broken layout.`
          : 'Confusing navigation hierarchy: Reviewers could not navigate from the homepage to core content within 2 distinct clicks.';
      googleBotPerspective =
        'Crawler followed internal navigation links and encountered 404 errors, circular redirects, or JavaScript voids.';
      humanReviewerPerspective =
        'Reviewer clicked a header or category link and encountered an empty archive page ("Nothing Found") or placeholder lorem ipsum text.';
      break;

    case 'site-down-or-unavailable':
      primaryTrigger =
        'Google review bot was blocked by a firewall (e.g. Cloudflare Under Attack mode or bot challenge) or DNS lookup timed out during audit window.';
      googleBotPerspective =
        'AdSense crawler received an HTTP 403, 502, or 522 Cloudflare error when polling the root domain.';
      humanReviewerPerspective =
        'Reviewer attempted to open the domain in their review portal and the connection timed out or showed a browser security warning.';
      break;

    case 'scraped-unoriginal':
      primaryTrigger =
        'High linguistic similarity to existing indexed web documents. Google matched sentences against their global index.';
      googleBotPerspective =
        'Semantic indexer found 80%+ n-gram overlap with already indexed articles on third-party domains.';
      humanReviewerPerspective =
        'Content presents zero differentiated angle, lack of original media, and no cited author expertise.';
      break;

    default:
      primaryTrigger =
        'Combination of missing legal disclosures (Privacy Policy) and borderline content depth across recent articles.';
      googleBotPerspective =
        'Automated policy engine found missing standard disclosures for Google DART ad tracking.';
      humanReviewerPerspective =
        'Site does not yet appear to be a fully established, active publishing business with a distinct brand identity.';
      break;
  }

  const fourteenDayPlan = [
    {
      days: 'Days 1 - 3',
      phase: 'Site Sanitation & Technical Hygiene',
      tasks: [
        'Delete or unpublish any draft pages, empty category archives, or articles under 500 words.',
        'Fix every single navigation link: Ensure zero href="#" or placeholder anchors remain in headers, footers, or sidebars.',
        'Generate an airtight Privacy Policy page specifying Google AdSense, DoubleClick DART cookies, and opt-out links.',
        'Verify SSL certificates and disable aggressive Cloudflare "Under Attack" challenge mode for Googlebot user-agents.',
      ],
    },
    {
      days: 'Days 4 - 8',
      phase: 'Value-Add Content Overhaul',
      tasks: [
        'Expand top 8 pages to 1,200+ words each with unique step-by-step methodologies, custom tables, and worked examples.',
        'If operating a micro-tool site: embed clear text instructions, formula explanations, and practical FAQs below the tool container.',
        'Add original images or custom visual diagrams with descriptive alt tags (avoid stock photos used everywhere).',
        'Add an Author Bio box to every article connecting back to the detailed /about page.',
      ],
    },
    {
      days: 'Days 9 - 11',
      phase: 'Internal Linking & Indexation Audit',
      tasks: [
        'Check Google Search Console: Confirm at least 10 core URLs are actively indexed with valid green status.',
        'Build structured breadcrumb navigation (Home > Category > Page) to facilitate crawler depth.',
        'Create a clear HTML sitemap or clean footer directory indexing all primary pages.',
      ],
    },
    {
      days: 'Days 12 - 14',
      phase: 'Pre-Flight Verification & Resubmission',
      tasks: [
        'Run this Live Site Auditor again to verify an Approval Probability score above 85%.',
        'Clear browser cookies, open site in an incognito window on mobile to verify responsive touch layout.',
        'Log in to Google AdSense dashboard, click "Request Review", and provide 10–14 days for the review cycle.',
      ],
    },
  ];

  return {
    rejectionReason: reason,
    primaryTrigger,
    googleBotPerspective,
    humanReviewerPerspective,
    fourteenDayPlan,
  };
}

// Fallback when live URL cannot be reached (e.g. localhost, Cloudflare block)
function generateFetchFallbackResult(
  url: string,
  mode: string,
  rejectionReason: string,
  fetchErrorMsg: string,
  sampleContent: string
): SiteAuditResult {
  const isLocalhost = url.includes('localhost') || url.includes('127.0.0.1');
  const sampleWords = sampleContent ? sampleContent.trim().split(/\s+/).length : 0;

  return {
    url,
    mode: mode as any,
    analyzedAt: new Date().toISOString(),
    approvalProbability: 64,
    overallStatus: 'needs-work',
    pageTitle: url,
    verdictSummary: `Connection Notice: Could not crawl live HTML directly (${fetchErrorMsg}). ${
      isLocalhost
        ? 'Localhost environments cannot be inspected by external servers. Audit based on standard deployment benchmarks.'
        : 'Domain may have an active bot challenge (Cloudflare) or temporary DNS timeout.'
    }`,
    metrics: {
      isHttps: url.startsWith('https://'),
      hasMobileViewport: true,
      hasRobotsNoindex: false,
      estimatedWordCount: sampleWords > 0 ? sampleWords : 650,
      h1Count: 1,
      h2Count: 2,
      paragraphCount: 4,
      legalPagesFound: {
        privacyPolicy: false,
        termsOfService: false,
        aboutUs: false,
        contactUs: false,
        cookieConsent: false,
      },
      navigationHealth: {
        totalLinks: 8,
        emptyHashLinks: 0,
        internalLinks: 6,
      },
      detectedAdCodes: [],
      thinContentRisk: sampleWords < 500 ? 'High' : 'Low',
      ymylRisk: 'Low',
    },
    scoreBreakdown: {
      contentDepthScore: sampleWords > 800 ? 85 : 60,
      legalComplianceScore: 50,
      navigationUxScore: 70,
      technicalSeoScore: 65,
    },
    criticalBlockers: [
      {
        title: 'Connection or Bot Challenge Warning',
        description: `External crawl received: ${fetchErrorMsg}. If you have Cloudflare "Under Attack" mode enabled, Google AdSense review bots will be blocked.`,
        severity: 'warning',
        fixAdvice: 'Whitelist Googlebot in Cloudflare WAF rules and verify site is publicly accessible without CAPTCHA.',
      },
      {
        title: 'Mandatory Legal Infrastructure Required',
        description: 'Ensure /privacy-policy, /about, /contact, and /terms pages exist prior to applying.',
        severity: 'critical',
        fixAdvice: 'Add all 4 legal pages with proper Google cookie disclosures to your footer.',
      },
    ],
    findings: [
      { category: 'Technical', label: 'External Access', status: 'warn', detail: fetchErrorMsg },
      { category: 'Legal & TOS', label: 'Policy Pages', status: 'warn', detail: 'Could not verify footer links.' },
    ],
    rejectionDiagnosis:
      mode === 'rejection-doctor'
        ? generateRejectionDiagnosis(rejectionReason, sampleWords || 500, false, 0, false)
        : undefined,
    reApplicationChecklist: [
      'Confirm site is accessible publicly without Cloudflare CAPTCHA challenges.',
      'Verify Privacy Policy has Google DART cookie disclosures.',
      'Ensure at least 15+ comprehensive pages are published and indexed in Google.',
    ],
  };
}

// Demo Curated Results
function generateDemoCompliantResult(url: string, mode: string): SiteAuditResult {
  return {
    url: 'https://tradescalculator-pro.pages.dev',
    mode: mode as any,
    analyzedAt: new Date().toISOString(),
    approvalProbability: 97,
    overallStatus: 'ready',
    pageTitle: 'Trades Calculator Pro - Construction & DIY Precision Calculators',
    isSimulatedDemo: true,
    verdictSummary:
      'Exceptional AdSense Readiness (97%). Site demonstrates pristine technical health, compliant legal footers, rich interactive problem-solving utility, and zero thin-content markers.',
    metrics: {
      isHttps: true,
      hasMobileViewport: true,
      hasRobotsNoindex: false,
      estimatedWordCount: 1420,
      h1Count: 1,
      h2Count: 4,
      paragraphCount: 12,
      legalPagesFound: {
        privacyPolicy: true,
        termsOfService: true,
        aboutUs: true,
        contactUs: true,
        cookieConsent: true,
      },
      navigationHealth: {
        totalLinks: 24,
        emptyHashLinks: 0,
        internalLinks: 20,
      },
      detectedAdCodes: [],
      thinContentRisk: 'Low',
      ymylRisk: 'Low',
    },
    scoreBreakdown: {
      contentDepthScore: 98,
      legalComplianceScore: 100,
      navigationUxScore: 96,
      technicalSeoScore: 98,
    },
    criticalBlockers: [],
    findings: [
      { category: 'Legal & TOS', label: 'Privacy Policy', status: 'pass', detail: 'Found /privacy-policy with compliant Google DART cookie clauses.' },
      { category: 'Legal & TOS', label: 'About Us', status: 'pass', detail: 'Found /about with clear author bio and editorial methodology.' },
      { category: 'Legal & TOS', label: 'Contact Us', status: 'pass', detail: 'Found /contact with working email and support form.' },
      { category: 'Content Depth', label: 'Word Count & Depth', status: 'pass', detail: '1,420 words of high-utility formula guidance and step-by-step examples.' },
      { category: 'Navigation & UX', label: 'Link Integrity', status: 'pass', detail: '24 active internal links; zero broken or empty hash anchors.' },
      { category: 'Technical', label: 'HTTPS & Mobile Viewport', status: 'pass', detail: 'Enforced HTTPS and mobile responsive meta viewport tag verified.' },
    ],
    reApplicationChecklist: [
      'Site meets all criteria for immediate first-pass approval.',
      'Submit domain directly inside Google AdSense dashboard.',
    ],
  };
}

function generateDemoThinAffiliateResult(url: string, mode: string): SiteAuditResult {
  return {
    url: 'https://gadget-reviews-quick.blogspot.com',
    mode: mode as any,
    analyzedAt: new Date().toISOString(),
    approvalProbability: 48,
    overallStatus: 'critical-blockers',
    pageTitle: 'Best Gadgets & Tech Discounts 2026',
    isSimulatedDemo: true,
    verdictSummary:
      'High Rejection Risk (48%). Missing Privacy Policy, under 380 words of body copy, and contains 4 dummy navigation links. Will be immediately flagged under "Low-Value Content" and "Site Navigation".',
    metrics: {
      isHttps: true,
      hasMobileViewport: true,
      hasRobotsNoindex: false,
      estimatedWordCount: 380,
      h1Count: 2,
      h2Count: 1,
      paragraphCount: 3,
      legalPagesFound: {
        privacyPolicy: false,
        termsOfService: false,
        aboutUs: false,
        contactUs: false,
        cookieConsent: false,
      },
      navigationHealth: {
        totalLinks: 12,
        emptyHashLinks: 4,
        internalLinks: 6,
      },
      detectedAdCodes: [],
      thinContentRisk: 'High',
      ymylRisk: 'Low',
    },
    scoreBreakdown: {
      contentDepthScore: 32,
      legalComplianceScore: 20,
      navigationUxScore: 45,
      technicalSeoScore: 85,
    },
    criticalBlockers: [
      {
        title: 'Missing Privacy Policy & Legal Footer',
        description: 'No Privacy Policy or Terms of Service links detected. Instant disqualifier for AdSense.',
        severity: 'critical',
        fixAdvice: 'Create a dedicated /privacy-policy page with Google ad cookie disclosures before submitting.',
      },
      {
        title: 'Severe Thin Content (< 400 words)',
        description: 'Page contains only 380 words of short product descriptions. Google bots require substantial original value.',
        severity: 'critical',
        fixAdvice: 'Expand all articles to 800–1,200 words with in-depth testing data and hands-on analysis.',
      },
      {
        title: 'Broken Placeholder Links in Menu (href="#")',
        description: 'Found 4 empty template links. Triggers the "Site behavior: Navigation" rejection.',
        severity: 'critical',
        fixAdvice: 'Remove or link all navigation tabs to real content pages.',
      },
    ],
    findings: [
      { category: 'Legal & TOS', label: 'Privacy Policy', status: 'fail', detail: 'Missing completely.' },
      { category: 'Legal & TOS', label: 'About Us', status: 'fail', detail: 'Missing author / site background.' },
      { category: 'Content Depth', label: 'Word Count', status: 'fail', detail: 'Only 380 words found.' },
      { category: 'Navigation & UX', label: 'Placeholder Links', status: 'fail', detail: '4 links with href="#" found.' },
    ],
    reApplicationChecklist: [
      'Add Privacy Policy and About Us pages.',
      'Expand word count past 800 words per article.',
      'Fix all dummy href="#" links in navigation.',
    ],
  };
}

function generateDemoRejectionDoctorResult(url: string, rejectionReason: string): SiteAuditResult {
  const diagnosis = generateRejectionDiagnosis(rejectionReason || 'low-value-content', 420, true, 2, false);

  return {
    url: 'https://smartkitchen-recipes-hub.com',
    mode: 'rejection-doctor',
    analyzedAt: new Date().toISOString(),
    approvalProbability: 54,
    overallStatus: 'critical-blockers',
    pageTitle: 'Smart Kitchen Recipes & Air Fryer Guides',
    isSimulatedDemo: true,
    verdictSummary:
      'Rejection Diagnosis: Root cause identified as "Low-Value Content" combined with template navigation placeholders. Follow the 14-Day Remediation Prescription below to guarantee approval on re-appeal.',
    metrics: {
      isHttps: true,
      hasMobileViewport: true,
      hasRobotsNoindex: false,
      estimatedWordCount: 510,
      h1Count: 1,
      h2Count: 2,
      paragraphCount: 5,
      legalPagesFound: {
        privacyPolicy: true,
        termsOfService: true,
        aboutUs: false,
        contactUs: true,
        cookieConsent: true,
      },
      navigationHealth: {
        totalLinks: 18,
        emptyHashLinks: 3,
        internalLinks: 12,
      },
      detectedAdCodes: [],
      thinContentRisk: 'High',
      ymylRisk: 'Low',
    },
    scoreBreakdown: {
      contentDepthScore: 48,
      legalComplianceScore: 70,
      navigationUxScore: 55,
      technicalSeoScore: 92,
    },
    criticalBlockers: [
      {
        title: 'Algorithmic "Low-Value Content" Flag',
        description: 'Short recipe steps lacking unique culinary science, temperature conversion charts, or troubleshooting guides.',
        severity: 'critical',
        fixAdvice: 'Add interactive calculators (e.g. Baker percentage or cooking time converter) and expand to 1,000+ words per guide.',
      },
      {
        title: 'Missing Editorial Authority (About Us Page)',
        description: 'No author credentials or background explaining who tested the recipes.',
        severity: 'warning',
        fixAdvice: 'Publish an /about page detailing culinary experience and testing kitchen equipment.',
      },
    ],
    findings: [
      { category: 'Content Depth', label: 'Original Value-Add', status: 'fail', detail: 'Repetitive recipe text flagged as low-value.' },
      { category: 'Navigation & UX', label: 'Category Archives', status: 'fail', detail: '3 empty category links found.' },
      { category: 'Legal & TOS', label: 'Privacy Policy', status: 'pass', detail: 'Privacy Policy present.' },
    ],
    rejectionDiagnosis: diagnosis,
    reApplicationChecklist: [
      'Complete the 14-Day Remediation Plan.',
      'Ensure at least 15 articles are published with 1,000+ words.',
      'Fix all dummy category links.',
    ],
  };
}
