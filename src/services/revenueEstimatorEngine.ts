import { RevenueEstimation } from '../types';

/**
 * Pure 100% Client-Side & Zero-Cost Revenue Estimator Engine
 * Analyzes HTML text, metadata, scripts, and ad containers to estimate what a website earns through Google AdSense.
 * Cost: $0.00 (Runs entirely in browser with zero API calls)
 */
export function estimateWebsiteRevenue(
  html: string,
  url: string,
  pageTitle: string
): RevenueEstimation {
  const normalizedHtml = (html || '').toLowerCase();
  const lowerUrl = (url || '').toLowerCase();
  const titleAndContent = `${pageTitle} ${normalizedHtml.slice(0, 3000)}`.toLowerCase();

  // 1. Detect Ad Tech & Script Footprints
  const hasAdSense = /googlesyndication|adsbygoogle|pagead2/i.test(normalizedHtml);
  const hasGooglePublisherTag = /securepubads\.g\.doubleclick\.net|googletag\.display|gpt\.js/i.test(normalizedHtml);
  const hasHeaderBidding = /prebid|pbjs|amazon-adsystem|criteo|rubiconproject|openx/i.test(normalizedHtml);
  const hasMediavineOrRaptive = /mediavine|adthrive|raptive/i.test(normalizedHtml);
  const hasEzoic = /ezoic|ezstandalone/i.test(normalizedHtml);
  const hasAffiliateLinks = /amazon\.com\/.*tag=|amzn\.to|shareasale|impact\.com|cj\.com|clickbank/i.test(normalizedHtml);

  // 2. Count Ad Placements / Ad Units in the DOM
  let adUnitCount = 0;
  const adPlacementsDetected: string[] = [];

  // Match AdSense <ins class="adsbygoogle">
  const adsbygoogleMatches = normalizedHtml.match(/class=["'][^"']*adsbygoogle[^"']*["']/gi) || [];
  adUnitCount += adsbygoogleMatches.length;
  if (adsbygoogleMatches.length > 0) {
    adPlacementsDetected.push(`${adsbygoogleMatches.length}x Google AdSense Units`);
  }

  // Match Google Publisher Tags (div ids)
  const gptMatches = normalizedHtml.match(/div-gpt-ad/gi) || [];
  if (gptMatches.length > 0) {
    adUnitCount += gptMatches.length;
    adPlacementsDetected.push(`${gptMatches.length}x Google Ad Manager Units`);
  }

  // Match generic ad containers like <aside class="sidebar-ad">, <div class="banner-ad">
  const genericAdMatches = normalizedHtml.match(/class=["'][^"']*(?:ad-container|ad-wrapper|ad-slot|ad-unit|sponsor-banner)[^"']*["']/gi) || [];
  if (adUnitCount === 0 && genericAdMatches.length > 0) {
    adUnitCount = genericAdMatches.length;
    adPlacementsDetected.push(`${genericAdMatches.length}x Display Ad Slots`);
  }

  // If no ads placed yet (unapproved or pre-launch site), set a realistic default standard of 3 ad units
  const effectiveAdUnits = Math.max(1, Math.min(8, adUnitCount || 3));
  if (adPlacementsDetected.length === 0) {
    adPlacementsDetected.push('Projected 3x Units (Header, In-Article, Sticky Footer)');
  }

  // 3. Determine Niche Category & RPM Benchmarks
  let detectedNiche = 'General Blog & Editorial';
  let minRpm = 6;
  let maxRpm = 18;
  let avgRpm = 11.5;

  if (/loan|credit|mortgage|banking|insurance|finance|invest|stock|crypto|trading/i.test(titleAndContent)) {
    detectedNiche = 'Finance & Personal Wealth';
    minRpm = 32;
    maxRpm = 68;
    avgRpm = 45.0;
  } else if (/job|career|salary|resume|hiring|interview|software engineer|tech/i.test(titleAndContent)) {
    detectedNiche = 'Software, Jobs & Careers';
    minRpm = 20;
    maxRpm = 42;
    avgRpm = 28.5;
  } else if (/calculator|converter|generator|tool|widget|online tool/i.test(titleAndContent) || /calculator/i.test(lowerUrl)) {
    detectedNiche = 'Online Utility Tools & Calculators';
    minRpm = 14;
    maxRpm = 30;
    avgRpm = 21.0;
  } else if (/recipe|food|cooking|kitchen|bake|dinner|meal/i.test(titleAndContent)) {
    detectedNiche = 'Food, Recipes & Culinary';
    minRpm = 12;
    maxRpm = 26;
    avgRpm = 18.0;
  } else if (/health|fitness|wellness|workout|diet|medical|nutrition/i.test(titleAndContent)) {
    detectedNiche = 'Health & Wellness';
    minRpm = 18;
    maxRpm = 38;
    avgRpm = 26.0;
  } else if (/travel|flight|hotel|destination|vacation|trip/i.test(titleAndContent)) {
    detectedNiche = 'Travel & Tourism';
    minRpm = 14;
    maxRpm = 32;
    avgRpm = 22.0;
  } else if (/game|gaming|esport|rpg|playstation|xbox|nintendo/i.test(titleAndContent)) {
    detectedNiche = 'Gaming & Entertainment';
    minRpm = 4;
    maxRpm = 12;
    avgRpm = 7.5;
  }

  // Adjust RPM by Ad Density Multiplier (more ad units = higher page RPM)
  const adDensityMultiplier = 0.8 + (effectiveAdUnits * 0.12);
  const adjustedAvgRpm = +(avgRpm * adDensityMultiplier).toFixed(2);
  const adjustedMinRpm = +(minRpm * adDensityMultiplier).toFixed(2);
  const adjustedMaxRpm = +(maxRpm * adDensityMultiplier).toFixed(2);

  // Baseline Monthly Traffic Tier for estimation: 50,000 pageviews
  const baselineViews = 50000;
  const avgMonthly = Math.round((baselineViews / 1000) * adjustedAvgRpm);
  const lowMonthly = Math.round((baselineViews / 1000) * adjustedMinRpm);
  const highMonthly = Math.round((baselineViews / 1000) * adjustedMaxRpm);
  const avgAnnual = avgMonthly * 12;

  // Traffic tiers for interactive exploration
  const trafficTiers = [
    { pageviews: 10000, label: '10K views / mo (Starter)', monthlyEarnings: Math.round((10000 / 1000) * adjustedAvgRpm) },
    { pageviews: 25000, label: '25K views / mo (Growing)', monthlyEarnings: Math.round((25000 / 1000) * adjustedAvgRpm) },
    { pageviews: 50000, label: '50K views / mo (Established)', monthlyEarnings: Math.round((50000 / 1000) * adjustedAvgRpm) },
    { pageviews: 100000, label: '100K views / mo (High Traffic)', monthlyEarnings: Math.round((100000 / 1000) * adjustedAvgRpm) },
    { pageviews: 250000, label: '250K views / mo (Authority)', monthlyEarnings: Math.round((250000 / 1000) * adjustedAvgRpm) },
    { pageviews: 500000, label: '500K views / mo (Media Scale)', monthlyEarnings: Math.round((500000 / 1000) * adjustedAvgRpm) },
  ];

  return {
    detectedNiche,
    nicheRpmRange: {
      min: adjustedMinRpm,
      max: adjustedMaxRpm,
      avg: adjustedAvgRpm,
    },
    detectedAdTech: {
      hasAdSense,
      hasGooglePublisherTag,
      hasHeaderBidding,
      hasMediavineOrRaptive,
      hasEzoic,
      hasAffiliateLinks,
      adUnitCount,
      adPlacementsDetected,
    },
    monthlyPageviewsBaseline: baselineViews,
    estimatedEarnings: {
      lowMonthly,
      avgMonthly,
      highMonthly,
      avgAnnual,
    },
    trafficTiers,
  };
}
