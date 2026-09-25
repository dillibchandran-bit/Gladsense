import { Niche } from '../types';

export const NICHES_DATA: Niche[] = [
  {
    id: 'trades-craft-calculators',
    title: 'Specialized Trades & Craft Estimators',
    category: 'Trades & Craft',
    competition: 'Ultra-Low',
    trafficPotential: '45,000 - 130,000 / mo',
    rpmRange: { min: 14, max: 32, avg: 22 },
    avgDwellTime: '2m 50s',
    hostingCost: '$0 / mo (Cloudflare Pages)',
    policyRisk: 'Very Low',
    approvalProbability: 97,
    approvalFactors: {
      policyCompliance: 98,
      thinContentSafety: 96,
      ymylSafety: 99,
      commercialDemand: 95
    },
    tagline: 'Dimensional volume, resin mixing, HVAC airflow & concrete calculators for hands-on makers.',
    description: 'DIY builders, contractors, and woodworkers regularly search on mobile job-sites for exact formulas: epoxy resin volume, slab yardage, HVAC CFM sizing, and rebar tonnage. Competitor sites are either broken 2005-era web forms or paywalled construction software.',
    competitorWeakness: 'Existing pages are outdated desktop-only tables without mobile responsiveness, lack visual mixing guides, and contain no explanatory educational text.',
    whyItWins: [
      'High commercial intent: Users are actively planning purchases (epoxy, concrete, tools), driving high advertiser bids.',
      'Mobile-first demand: Contractors and craftsmen search directly from job sites on smartphones.',
      'Superb dwell time: Users repeatedly tweak inputs (depth, width, mix ratios) keeping AdSense Active View high.',
      '100% Client-Side: Simple geometry and math run instantly with 0ms server latency on static hosts.'
    ],
    kgrKeywords: [
      { keyword: 'epoxy resin table volume calculator deep pour', volume: 210, allInTitle: 14, kgr: 0.07, intent: 'Tool calculation' },
      { keyword: 'how many bags of concrete for 10x10 slab 4 inches', volume: 290, allInTitle: 24, kgr: 0.08, intent: 'Formula & calculation' },
      { keyword: 'hvac cfm room size calculation formula', volume: 320, allInTitle: 31, kgr: 0.10, intent: 'Guide & solver' },
      { keyword: 'board feet to square feet conversion for hardwood', volume: 180, allInTitle: 12, kgr: 0.07, intent: 'Conversion table' },
      { keyword: 'rebar grid weight calculator per square foot', volume: 140, allInTitle: 9, kgr: 0.06, intent: 'Estimator tool' }
    ],
    siteArchitecture: [
      {
        title: 'Deep Pour Epoxy Resin Volume & Ratio Calculator',
        slug: '/tools/epoxy-volume-calculator',
        type: 'tool',
        targetWords: 1100,
        contentStructure: ['Interactive Resin Slider Tool', '2:1 vs 1:1 Mixing Ratio Differences', 'Curing Temperature Chart', 'Common Resin Bubbling Mistakes FAQ']
      },
      {
        title: 'Concrete Slab Bag & Yardage Estimator with Rebar Grid',
        slug: '/tools/concrete-slab-calculator',
        type: 'tool',
        targetWords: 1250,
        contentStructure: ['Cubic Yard Interactive Solver', '80lb vs 60lb Bag Breakdown', 'Sub-base Preparation Guide', 'Curing Water Spritzing Rules']
      },
      {
        title: 'HVAC CFM & Duct Velocity Calculator',
        slug: '/tools/hvac-cfm-calculator',
        type: 'tool',
        targetWords: 1400,
        contentStructure: ['CFM by Room Cubic Feet Tool', 'Manual J Airflow Simplified', 'Duct Diameter Friction Chart', 'FAQ on Static Pressure']
      }
    ],
    monetizationBlueprint: {
      recommendedAdUnits: ['1x Top Billboard (728x90 desktop / 320x100 mobile)', '1x Immediate Post-Result Box (300x250)', '1x Sticky Anchor Footer'],
      viewabilityStrategy: 'Place the main ad unit directly under the calculation result button where user attention settles for 5-10 seconds.',
      tier1TrafficShare: '78% (US, Canada, UK, Australia)',
      estimatedCpc: 1.45,
      recommendedLayout: 'Clean single-column tool container flanked by wide margins and high-contrast educational sections.'
    },
    sampleToolSpec: {
      toolName: 'Epoxy Resin Volume & Cost Calculator',
      inputs: ['Length (inches)', 'Width (inches)', 'Depth (inches)', 'Mix Ratio (1:1 or 2:1)', 'Cost per gallon ($)'],
      output: 'Total Ounces Needed, Part A & Part B Breakdown, Estimated Project Cost',
      valueSnippet: 'Includes shrinkage compensation (+10% safety margin toggle).'
    }
  },
  {
    id: 'academic-lab-solvers',
    title: 'Academic, Laboratory & Grade Converters',
    category: 'Academic & Lab',
    competition: 'Ultra-Low',
    trafficPotential: '60,000 - 180,000 / mo',
    rpmRange: { min: 10, max: 24, avg: 17 },
    avgDwellTime: '3m 15s',
    hostingCost: '$0 / mo (GitHub Pages / Vercel)',
    policyRisk: 'Very Low',
    approvalProbability: 99,
    approvalFactors: {
      policyCompliance: 99,
      thinContentSafety: 98,
      ymylSafety: 100,
      commercialDemand: 93
    },
    tagline: 'ECTS grade conversions, molarity serial dilutions, and statistical sample size tools.',
    description: 'University students, international scholars, and laboratory researchers require quick, trustworthy calculation tools for grading scale conversions (e.g., German Bavarian formula to US GPA), buffer preparation, and chemical dilutions.',
    competitorWeakness: 'Universities host static PDF charts that require manual math; commercial software is bloated behind paywalls or student portals.',
    whyItWins: [
      'Inelastic student and researcher demand with predictable seasonal spikes around admissions and midterms.',
      'Zero YMYL penalties: Academic and chemical arithmetic is purely objective factual calculation.',
      'Natural institutional backlinking: Students post links on college subreddits, university forums, and thesis resource hubs.',
      'Ultra-high compliance: Easy to write comprehensive 1,200-word guides explaining the mathematical derivations.'
    ],
    kgrKeywords: [
      { keyword: 'bavarian formula gpa converter germany online', volume: 260, allInTitle: 8, kgr: 0.03, intent: 'Direct converter tool' },
      { keyword: 'serial dilution calculator c1v1 c2v2 step by step', volume: 390, allInTitle: 22, kgr: 0.06, intent: 'Lab math tool' },
      { keyword: 'sample size calculator t test unequal variance', volume: 170, allInTitle: 15, kgr: 0.09, intent: 'Statistics tool' },
      { keyword: 'ects credits to us semester credit hours formula', volume: 310, allInTitle: 19, kgr: 0.06, intent: 'Academic guide' },
      { keyword: 'molarity to ppm conversion formula calculator', volume: 220, allInTitle: 14, kgr: 0.06, intent: 'Chemistry solver' }
    ],
    siteArchitecture: [
      {
        title: 'German Bavarian Formula Grade Converter (ECTS to GPA)',
        slug: '/academic/bavarian-formula-converter',
        type: 'tool',
        targetWords: 1300,
        contentStructure: ['Interactive Grading Scale Converter', 'Mathematical Formula Proof', 'German Grading Scale 1.0 - 5.0 Guide', 'University Application FAQ']
      },
      {
        title: 'Laboratory Serial Dilution & Molarity Solver (C1V1 = C2V2)',
        slug: '/lab/serial-dilution-calculator',
        type: 'tool',
        targetWords: 1200,
        contentStructure: ['Multi-Step Dilution Cascade Tool', 'Stock Solution Preparation Steps', 'Pipetting Precision Tips', 'FAQ for Microplate Setups']
      }
    ],
    monetizationBlueprint: {
      recommendedAdUnits: ['1x Top Adaptive Leaderboard', '1x Mid-content Formula Explanation Ad', '1x In-feed Related Converter ad'],
      viewabilityStrategy: 'Students study the formula breakdown step-by-step, resulting in 85%+ ad viewability rates.',
      tier1TrafficShare: '65% (US, Germany, UK, Canada, Australia)',
      estimatedCpc: 0.95,
      recommendedLayout: 'Academic LaTeX-style clean serif typography with interactive calculation widgets.'
    },
    sampleToolSpec: {
      toolName: 'German University Grade Equivalence (Bavarian Formula)',
      inputs: ['Maximum Grade Possible (Nmax)', 'Minimum Passing Grade (Nmin)', 'Your Achieved Grade (Nd)'],
      output: 'German Equivalent Grade (1.0 - 4.0 scale), Classification (Very Good / Good / Satisfactory)',
      valueSnippet: 'Automates: 1 + 3 * (Nmax - Nd) / (Nmax - Nmin) with instant visual scale.'
    }
  },
  {
    id: 'civic-bureaucracy-decoders',
    title: 'Civic & Public Procedure Decoders',
    category: 'Civic & Bureaucracy',
    competition: 'Low',
    trafficPotential: '50,000 - 150,000 / mo',
    rpmRange: { min: 16, max: 35, avg: 24 },
    avgDwellTime: '3m 40s',
    hostingCost: '$0 / mo (Cloudflare Pages)',
    policyRisk: 'Low',
    approvalProbability: 92,
    approvalFactors: {
      policyCompliance: 93,
      thinContentSafety: 94,
      ymylSafety: 88,
      commercialDemand: 96
    },
    tagline: 'DMV title fees, solar permit checklists, and apostille procedural guides.',
    description: 'Citizens face nightmare official government portals when trying to calculate state vehicle transfer taxes, international document apostille fees, or residential solar permitting checklists. A clean, streamlined site with fee estimation and document checklists captures massive search interest.',
    competitorWeakness: 'Government websites (.gov) are notorious for confusing PDF circulars, broken links, and total lack of mobile-responsive calculators.',
    whyItWins: [
      'Extremely high AdSense RPM: Legal, financial, and automotive services bid aggressively on these search terms.',
      'Huge user relief: Turning a 40-page bureaucratic document into an 8-question step-by-step checklist builds instant trust.',
      'High bookmarking & direct shares: Users save and share with family members navigating the same paperwork.',
      'Static-ready: Rule-based decision trees execute smoothly in plain client-side JavaScript.'
    ],
    kgrKeywords: [
      { keyword: 'out of state car title transfer fee calculator california', volume: 410, allInTitle: 29, kgr: 0.07, intent: 'Civic fee tool' },
      { keyword: 'hague apostille document checklist step by step', volume: 280, allInTitle: 18, kgr: 0.06, intent: 'Process guide' },
      { keyword: 'residential solar permit inspection checklist by state', volume: 190, allInTitle: 11, kgr: 0.06, intent: 'Compliance guide' },
      { keyword: 'probate court filing fee estimate calculator', volume: 220, allInTitle: 16, kgr: 0.07, intent: 'Legal estimation' }
    ],
    siteArchitecture: [
      {
        title: 'State Vehicle Sales Tax & Out-of-State Title Transfer Estimator',
        slug: '/dmv/title-transfer-tax-calculator',
        type: 'tool',
        targetWords: 1500,
        contentStructure: ['Interactive State Tax & Fee Estimator', 'Required Documents Checklist Generator', 'Smog & VIN Inspection Exceptions', 'FAQ']
      },
      {
        title: 'International Document Apostille & Authentication Wizard',
        slug: '/legal/apostille-document-wizard',
        type: 'tool',
        targetWords: 1350,
        contentStructure: ['Country Hague Convention Checker', 'Secretary of State Fee Matrix', 'Step-by-Step Mail-in Checklist', 'FAQ']
      }
    ],
    monetizationBlueprint: {
      recommendedAdUnits: ['1x Top Header Banner', '1x Inline Checklist Ad Unit', '1x Bottom Summary Ad'],
      viewabilityStrategy: 'Ad placed right above printable document checklist to catch print/download intent.',
      tier1TrafficShare: '88% (Primarily US and Canada)',
      estimatedCpc: 1.85,
      recommendedLayout: 'Official-style clean typography with interactive printable checklists.'
    },
    sampleToolSpec: {
      toolName: 'Vehicle Title Transfer & Registration Fee Estimator',
      inputs: ['Purchase Price ($)', 'Current State', 'Destination State', 'Vehicle Age', 'Fuel Type (ICE / EV)'],
      output: 'Estimated Sales Tax, Title Fee, Registration Fee, EV Surcharge, Grand Total',
      valueSnippet: 'Generates a downloadable PDF/print checklist of required documents.'
    }
  },
  {
    id: 'aquascaping-pet-care',
    title: 'Micro-Hobby Aquascaping & Fertilizer Dosing',
    category: 'Hobby & Care',
    competition: 'Ultra-Low',
    trafficPotential: '30,000 - 85,000 / mo',
    rpmRange: { min: 11, max: 22, avg: 16 },
    avgDwellTime: '2m 40s',
    hostingCost: '$0 / mo (Vercel)',
    policyRisk: 'Very Low',
    approvalProbability: 98,
    approvalFactors: {
      policyCompliance: 99,
      thinContentSafety: 97,
      ymylSafety: 100,
      commercialDemand: 92
    },
    tagline: 'Estimative Index (EI) nutrient dosing, water GH/KH remineralization & CO2 bubble rate calculators.',
    description: 'Planted aquarium hobbyists and shrimp breeders need precise calculations for dry salts (KNO3, KH2PO4, Trace elements), GH/KH remineralization for reverse osmosis water, and photoperiod timing. The existing niche tools are dated and abandonware.',
    competitorWeakness: 'Existing tools built on old PHP scripts (e.g. Rotala Butterfly) have slow servers or lack mobile touch responsiveness.',
    whyItWins: [
      'Passionate, engaged hobbyists who run repeat calculations every week during aquarium water changes.',
      'Strong e-commerce ad bids from pet stores, LED lighting manufacturers, and fertilizer brands.',
      'Completely safe from any AdSense policy flags (no YMYL, no copyright risk, pure botanical math).',
      'Zero server overhead: Calculation formulas for parts-per-million (ppm) are instant in JavaScript.'
    ],
    kgrKeywords: [
      { keyword: 'estimative index dry salt dosing calculator aquarium', volume: 280, allInTitle: 16, kgr: 0.06, intent: 'Dosing calculator' },
      { keyword: 'ro water remineralizer gh kh ratio calculator', volume: 190, allInTitle: 12, kgr: 0.06, intent: 'Water chemistry tool' },
      { keyword: 'aquarium co2 bubble counter to bps estimate', volume: 220, allInTitle: 15, kgr: 0.07, intent: 'Technical calculator' },
      { keyword: 'substrate volume calculator planted tank bags needed', volume: 340, allInTitle: 24, kgr: 0.07, intent: 'Volume estimator' }
    ],
    siteArchitecture: [
      {
        title: 'Estimative Index (EI) Planted Tank Dosing Calculator',
        slug: '/planted-tank/ei-dosing-calculator',
        type: 'tool',
        targetWords: 1150,
        contentStructure: ['Aquarium Dimensions & PPM Target Tool', 'Macro vs Micro Dry Salt Recipes', 'Algae Troubleshooting Matrix', 'FAQ']
      },
      {
        title: 'Reverse Osmosis (RO) Water Remineralizer for Caridina Shrimp',
        slug: '/shrimp/ro-water-remineralizer-calculator',
        type: 'tool',
        targetWords: 1050,
        contentStructure: ['Target TDS & GH/KH Input Form', 'SaltyShrimp vs DIY Salt Mix Guide', 'TDS Drift & Evaporation FAQ']
      }
    ],
    monetizationBlueprint: {
      recommendedAdUnits: ['1x Above Tool Leaderboard', '1x Under Dosing Results Table', '1x Sticky Anchor Footer'],
      viewabilityStrategy: 'Weekly recurring visits drive high repeat impressions from stable loyal users.',
      tier1TrafficShare: '72% (US, UK, Germany, Canada, Japan)',
      estimatedCpc: 1.10,
      recommendedLayout: 'Card-based aquarium measurement dashboard with clean visual dosing tables.'
    },
    sampleToolSpec: {
      toolName: 'Aquarium EI Nutrient Dosing & PPM Targeter',
      inputs: ['Tank Volume (Gallons/Liters)', 'Dosing Method (EI / PPS-Pro / Lean)', 'Compound (KNO3, KH2PO4, K2SO4, Plantex)'],
      output: 'Gram/Teaspoon Dry Salt Dose per Day, Resulting PPM Concentration',
      valueSnippet: 'Visual bar chart comparing achieved PPM against optimal target ranges.'
    }
  },
  {
    id: 'audio-podcast-utilities',
    title: 'Audio Production & Podcast Timing Utilities',
    category: 'Audio & Media',
    competition: 'Ultra-Low',
    trafficPotential: '35,000 - 95,000 / mo',
    rpmRange: { min: 12, max: 26, avg: 19 },
    avgDwellTime: '3m 05s',
    hostingCost: '$0 / mo (Cloudflare Pages)',
    policyRisk: 'Very Low',
    approvalProbability: 98,
    approvalFactors: {
      policyCompliance: 99,
      thinContentSafety: 98,
      ymylSafety: 100,
      commercialDemand: 94
    },
    tagline: 'BPM to millisecond delay/reverb calculators, LUFS loudness normalizers, and sample rate math.',
    description: 'Music producers, beatmakers, and podcast editors need precise timing calculations: converting tempo (BPM) into exact milliseconds for sync delays and reverb pre-delay times, subtitle word-rate timing, and LUFS target matching.',
    competitorWeakness: 'Existing sites are cluttered with obtrusive popups or outdated flash-era interfaces that fail on mobile tablet DAWs.',
    whyItWins: [
      'Producers keep these tool tabs pinned in their browser while working in FL Studio, Ableton, or Logic Pro.',
      'High session duration: Producers refer back to the timing table continuously throughout their mixing session.',
      'High-paying tech & music gear ads (audio interfaces, plugin developers, DAW hardware).',
      'Ultra-fast: Pure mathematical arithmetic with instant millisecond conversions.'
    ],
    kgrKeywords: [
      { keyword: 'bpm to milliseconds delay reverb calculator table', volume: 450, allInTitle: 32, kgr: 0.07, intent: 'Audio timing tool' },
      { keyword: 'podcast audio lufs target spotify apple podcasts', volume: 290, allInTitle: 19, kgr: 0.07, intent: 'Standards guide' },
      { keyword: 'sample rate pitch shift percentage formula', volume: 160, allInTitle: 9, kgr: 0.06, intent: 'Pitch conversion' },
      { keyword: 'subtitle reading speed words per minute calculator', volume: 210, allInTitle: 14, kgr: 0.07, intent: 'Media timing' }
    ],
    siteArchitecture: [
      {
        title: 'BPM to Milliseconds Delay & Reverb Pre-Delay Matrix',
        slug: '/audio/bpm-to-ms-delay-calculator',
        type: 'tool',
        targetWords: 1200,
        contentStructure: ['Interactive Tempo to Millisecond Grid', 'Triplet & Dotted Note Equivalents', 'How to Calculate Pre-Delay Guide', 'FAQ']
      },
      {
        title: 'Podcast Streaming Loudness (LUFS & True Peak) Target Guide',
        slug: '/audio/podcast-lufs-target-standards',
        type: 'guide',
        targetWords: 1400,
        contentStructure: ['Interactive Streaming Platform Normalizer Table', 'Integrated vs Short-Term LUFS Explainer', 'True Peak Limiting Tips', 'FAQ']
      }
    ],
    monetizationBlueprint: {
      recommendedAdUnits: ['1x Top Banner', '1x Mid-Table Embedded Ad', '1x Sticky Anchor Unit'],
      viewabilityStrategy: 'Because producers leave the tab open during mix sessions, AdSense active refresh generates compounding views.',
      tier1TrafficShare: '75% (US, UK, Germany, Canada)',
      estimatedCpc: 1.30,
      recommendedLayout: 'Sleek dark-mode compatible interface mimicking professional studio hardware.'
    },
    sampleToolSpec: {
      toolName: 'BPM Tempo to Milliseconds Audio Sync Matrix',
      inputs: ['Tempo (BPM)', 'Sample Rate (44.1k / 48k / 96k)'],
      output: 'Full, 1/2, 1/4, 1/8, 1/16, 1/32 Notes in Milliseconds, Samples, and Hertz (Hz)',
      valueSnippet: 'One-click copy of exact ms values for instant DAW plugin pasting.'
    }
  },
  {
    id: 'baking-food-science',
    title: 'Artisan Baking & Food Science Solvers',
    category: 'Trades & Craft',
    competition: 'Ultra-Low',
    trafficPotential: '40,000 - 110,000 / mo',
    rpmRange: { min: 11, max: 25, avg: 18 },
    avgDwellTime: '3m 20s',
    hostingCost: '$0 / mo (GitHub Pages)',
    policyRisk: 'Very Low',
    approvalProbability: 96,
    approvalFactors: {
      policyCompliance: 98,
      thinContentSafety: 95,
      ymylSafety: 99,
      commercialDemand: 94
    },
    tagline: 'Sourdough hydration %, baker percentage scaling, and ambient yeast temperature adjustments.',
    description: 'Artisan sourdough bakers, pizza makers, and pastry chefs calculate recipe formulas strictly by "Bakers Percentage". Scaling a recipe from 1 loaf to 12 loaves, calculating exact water hydration taking into account sourdough starter hydration, and adjusting yeast for ambient room temperature.',
    competitorWeakness: 'Recipe blogs are drowned in thousands of words of personal diary stories with lagging JavaScript ads and no interactive percentage sliders.',
    whyItWins: [
      'Bakers love clean, fast utilities that don\'t clutter their counter with 200 food blog ads and story essays.',
      'Excellent AdSense category: Kitchen appliances, Dutch ovens, flour mills, and culinary courses bid heavily.',
      'Zero YMYL risk: Pure mathematical food science and baking ratios.',
      'Static-ready: Instant scaling of grams and percentages in browser memory.'
    ],
    kgrKeywords: [
      { keyword: 'sourdough hydration calculator including starter', volume: 380, allInTitle: 24, kgr: 0.06, intent: 'Baking tool' },
      { keyword: 'bakers percentage calculator scaling grams to ounces', volume: 270, allInTitle: 18, kgr: 0.07, intent: 'Formula converter' },
      { keyword: 'pizza dough fermentation yeast ambient temperature table', volume: 210, allInTitle: 13, kgr: 0.06, intent: 'Fermentation guide' },
      { keyword: 'flour protein content ash conversion calculator', volume: 150, allInTitle: 8, kgr: 0.05, intent: 'Baking science' }
    ],
    siteArchitecture: [
      {
        title: 'Complete Sourdough Hydration & Starter Ratio Calculator',
        slug: '/baking/sourdough-hydration-calculator',
        type: 'tool',
        targetWords: 1300,
        contentStructure: ['Interactive Hydration Slider (65% - 85%)', 'Accounting for 100% Starter Hydration', 'Flour Absorption Differences Guide', 'FAQ']
      },
      {
        title: 'Pizza Dough Bakers Percentage & Yeast Room Temp Estimator',
        slug: '/baking/pizza-dough-calculator',
        type: 'tool',
        targetWords: 1200,
        contentStructure: ['Dough Ball Count & Weight Calculator', 'Neapolitan vs NY Style Ratios', 'Cold Fermentation Schedule Guide', 'FAQ']
      }
    ],
    monetizationBlueprint: {
      recommendedAdUnits: ['1x Top Clean Banner', '1x Bottom Recipe Card Ad', '1x Anchor Sticky Ad'],
      viewabilityStrategy: 'Kitchen users keep their phone propped up on the counter while weighing flour and water.',
      tier1TrafficShare: '76% (US, Canada, UK, Australia, Italy)',
      estimatedCpc: 1.25,
      recommendedLayout: 'Clean, legible high-contrast layout with large touch sliders designed for floury kitchen fingers.'
    },
    sampleToolSpec: {
      toolName: 'Sourdough Total Hydration & Ingredient Scaler',
      inputs: ['Flour Weight (g)', 'Target Hydration (%)', 'Starter / Levain Weight (g)', 'Salt (%)'],
      output: 'Exact Water to Add (g), Total Dough Weight, Baker\'s Percentage Breakdown',
      valueSnippet: 'Accurately offsets flour and water already present in your sourdough levain.'
    }
  }
];

export const ADSENSE_READINESS_CHECKLIST = [
  {
    id: 'privacy-policy',
    category: 'AdSense Policy',
    title: 'Comprehensive Privacy Policy Page with Cookie Disclosures',
    description: 'AdSense explicitly mandates a Privacy Policy disclosing third-party advertising cookies, Google DoubleClick Dart cookies, and user opt-out instructions.',
    whyGoogleCares: 'Failure to provide explicit disclosures under GDPR, CCPA, and Google Ad Technology policies leads to immediate application rejection.',
    isPassed: true,
    actionTip: 'Must be linked in the persistent footer of every single page on the domain.',
    boilerplateSnippet: `### Privacy Policy & Cookie Disclosure
This website displays advertisements served by Google AdSense and third-party advertising vendors. Google uses cookies, including the DoubleClick DART cookie, to serve ads based on a user's prior visits to this website or other websites on the Internet.
Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com).
We collect standard server log data (IP address, browser type, referring pages) strictly for analytical and performance monitoring purposes.`
  },
  {
    id: 'about-us',
    category: 'AdSense Policy',
    title: 'Authentic "About Us" Page with Methodology & Mission',
    description: 'AdSense reviewers inspect the About Us page to confirm who owns the site, why it exists, and the editorial/mathematical methodology behind calculations.',
    whyGoogleCares: 'Separates legitimate publisher resources from faceless programmatic scraper websites.',
    isPassed: true,
    actionTip: 'Include the creator background, mathematical formulas used, and testing standards.',
    boilerplateSnippet: `### About Our Mission
Our mission is to provide tradespeople, students, and craftsmen with instant, free, client-side calculation utilities without paywalls or bloated software.
All formulas on this website are derived directly from standard industry engineering handbooks and academic standards. Our tools run 100% in your local browser for maximum privacy and zero latency.`
  },
  {
    id: 'contact-page',
    category: 'AdSense Policy',
    title: 'Working Contact Page / Author Email Address',
    description: 'A genuine contact mechanism (contact form, verified domain email, or physical/virtual address) showing user accountability.',
    whyGoogleCares: 'Google requires publishers to be reachable for copyright notices, correction requests, and policy compliance inquiries.',
    isPassed: true,
    actionTip: 'Use a domain-branded email (e.g., support@yourdomain.com via free Cloudflare Email Routing to your Gmail).',
    boilerplateSnippet: `### Contact & Correction Notice
Have a question, feedback, or formula verification request?
Contact the editorial team directly at: contact@yourdomain.com
We review and respond to inquiries within 48 business hours.`
  },
  {
    id: 'terms-disclaimer',
    category: 'AdSense Policy',
    title: 'Terms of Service & Mathematical Disclaimer',
    description: 'Disclaiming that calculation tools are provided "as-is" for estimating purposes and users should verify critical structural or financial data.',
    whyGoogleCares: 'Protects the publisher and demonstrates professional stewardship for utility websites.',
    isPassed: true,
    actionTip: 'State clearly that calculations are for planning and estimation purposes.',
    boilerplateSnippet: `### Terms of Service & Estimator Disclaimer
All tools and calculation engines provided on this site are for educational and estimation purposes only. While every effort is made to maintain mathematical accuracy, users must verify project calculations with certified professionals before purchasing materials or executing construction.`
  },
  {
    id: 'content-depth',
    category: 'Content Depth',
    title: '15 to 25 Distinct Comprehensive Tool & Guide Pages',
    description: 'AdSense routinely rejects websites with fewer than 10-15 pages under "Site has insufficient content" or "Under Construction".',
    whyGoogleCares: 'Google requires an established site with enough valuable inventory to justify ad placements.',
    isPassed: false,
    actionTip: 'Launch with at least 15 distinct, fully functional pages before submitting your AdSense application.'
  },
  {
    id: 'explanatory-text',
    category: 'Content Depth',
    title: '800 - 1,200 Words of Educational Content per Tool Page',
    description: 'Never submit a bare calculator alone. Each tool page must include step-by-step formula derivations, real-world examples, and an FAQ accordion.',
    whyGoogleCares: 'Bare tools without text trigger the "Thin Content / Low Value Content" automated rejection bot.',
    isPassed: true,
    actionTip: 'Structure every tool with: 1) Interactive Widget, 2) Formula Breakdown, 3) Worked Example, 4) FAQ Accordion.'
  },
  {
    id: 'site-navigation',
    category: 'Navigation & UX',
    title: 'Clear Global Header, Footer, and Category Breadcrumbs',
    description: 'Reviewers check that all links work, navigation is intuitive, and there are no orphan pages or broken URLs.',
    whyGoogleCares: 'Deceptive navigation or hidden menus breach the Google Webmaster Quality Guidelines.',
    isPassed: true,
    actionTip: 'Ensure every page can be reached within 2 clicks from the homepage.'
  },
  {
    id: 'mobile-core-web-vitals',
    category: 'Technical & SEO',
    title: 'Sub-500ms Page Load Speed & Core Web Vitals Pass',
    description: 'Static hosting on Cloudflare Pages or Vercel delivers 100/100 Core Web Vitals scores with instant First Contentful Paint (FCP).',
    whyGoogleCares: 'Slow or shifting layouts cause accidental ad clicks, leading to AdSense ad limit penalties.',
    isPassed: true,
    actionTip: 'Keep all JavaScript client-side; avoid heavy client tracking libraries.'
  },
  {
    id: 'search-console-indexing',
    category: 'Technical & SEO',
    title: 'Google Search Console Verification & XML Sitemap',
    description: 'Your domain must be verified in Google Search Console, with a clean XML sitemap submitted and at least 10+ pages already indexed.',
    whyGoogleCares: 'AdSense bots fetch your pages through the Google Search index to evaluate site quality before human review.',
    isPassed: false,
    actionTip: 'Submit sitemap.xml to Google Search Console and wait for pages to appear in search before applying.'
  }
];
