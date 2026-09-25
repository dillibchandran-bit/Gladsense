import { AiEvaluationResult } from '../types';

export function evaluateNicheClientSide(nicheName: string, targetAudience?: string, description?: string): AiEvaluationResult {
  const combined = `${nicheName} ${targetAudience || ''} ${description || ''}`.trim();
  const lower = combined.toLowerCase();
  const cleanName = nicheName.trim();

  const isYmyl = /health|medical|finance|loan|crypto|cure|diet|doctor|invest/i.test(combined);
  const isJob = /jobs?|career|hiring|fresher|graduate|recruitment|employment|internship|vacancy|vacancies|walk[- ]?in|developer|engineer/i.test(lower);
  const isRealEstate = /apartment|flat|rent|plot|villa|sq ?ft|property|housing|real estate|pg /i.test(lower);
  const isEducation = /college|school|university|admission|exam|syllabus|cutoff|degree|course|gpa|scholarship|fees/i.test(lower);
  const isCivic = /visa|passport|license|title|permit|certificate|apostille|dmv|court|legal|tax|form/i.test(lower);
  const isFood = /recipe|bread|cake|dough|hydration|baking|flour|sourdough|cooking/i.test(lower);
  const isCalculator = /calculator|ratio|formula|volume|density|mixing|sqft|epoxy|resins?|concrete|amp hour|offset smoker/i.test(lower);

  let kgrKeywords: Array<{ keyword: string; estimatedVolume: number; kgrScore: number; intent: string }>;
  let recommendedModel: string;
  let dwellTimeAdvantage: string;
  let topAdPlacements: string[];

  if (isJob) {
    kgrKeywords = [
      { keyword: `${cleanName} for freshers`, estimatedVolume: 210, kgrScore: 0.08, intent: 'Entry level vacancies' },
      { keyword: `${cleanName} without experience`, estimatedVolume: 180, kgrScore: 0.11, intent: 'Direct openings for beginners' },
      { keyword: `${cleanName} walk in interview dates`, estimatedVolume: 150, kgrScore: 0.06, intent: 'Hiring drives' },
      { keyword: `${cleanName} resume checklist and templates`, estimatedVolume: 190, kgrScore: 0.09, intent: 'Application preparation' },
    ];
    recommendedModel = 'Curated job board directory and filter micro-tool paired with entry-level resume templates, salary benchmarks, and interview preparation guides.';
    dwellTimeAdvantage = 'Job seekers actively filter vacancies and read interview preparation guides, keeping session duration high (>2m 15s).';
    topAdPlacements = ['Above job search filters (responsive)', 'In-feed between job listing cards', 'Inside career guide and interview articles'];
  } else if (isRealEstate) {
    kgrKeywords = [
      { keyword: `${cleanName} price per square foot current rate`, estimatedVolume: 220, kgrScore: 0.12, intent: 'Pricing rate lookup' },
      { keyword: `${cleanName} for rent direct owner no broker`, estimatedVolume: 240, kgrScore: 0.14, intent: 'Zero broker search' },
      { keyword: `${cleanName} verified listings checklist`, estimatedVolume: 160, kgrScore: 0.07, intent: 'Property evaluation' },
    ];
    recommendedModel = 'Local real estate price-per-square-foot calculator and neighborhood comparison directory paired with buyer verification checklists.';
    dwellTimeAdvantage = 'Property seekers spend considerable time comparing rates and neighborhood data, ensuring high ad viewability.';
    topAdPlacements = ['Above property comparison table', 'Directly below rate estimation cards', 'Mid-article neighborhood breakdown'];
  } else if (isEducation) {
    kgrKeywords = [
      { keyword: `${cleanName} eligibility criteria and cutoff`, estimatedVolume: 230, kgrScore: 0.11, intent: 'Admission requirements' },
      { keyword: `${cleanName} fee structure and scholarship`, estimatedVolume: 190, kgrScore: 0.08, intent: 'Tuition planning' },
      { keyword: `${cleanName} syllabus and study material pdf`, estimatedVolume: 170, kgrScore: 0.09, intent: 'Study material' },
    ];
    recommendedModel = 'Course and college cutoff searcher tool paired with detailed syllabus breakdowns and admission eligibility calculators.';
    dwellTimeAdvantage = 'Students and parents thoroughly research cutoffs and fees, resulting in long dwell times and repeated visits.';
    topAdPlacements = ['Above cutoff search tool', 'Directly below eligibility results', 'Mid-syllabus educational guide'];
  } else if (isCivic) {
    kgrKeywords = [
      { keyword: `${cleanName} required documents checklist`, estimatedVolume: 220, kgrScore: 0.1, intent: 'Document preparation' },
      { keyword: `${cleanName} online application processing time and fees`, estimatedVolume: 180, kgrScore: 0.08, intent: 'Application timeline' },
      { keyword: `${cleanName} application status tracking guide`, estimatedVolume: 160, kgrScore: 0.07, intent: 'Status tracking' },
    ];
    recommendedModel = 'Interactive document readiness checker and fee estimator paired with step-by-step bureaucratic walkthroughs.';
    dwellTimeAdvantage = 'High user intent to avoid paperwork rejection keeps users following step-by-step checklists carefully.';
    topAdPlacements = ['Above checklist generator', 'Below required documents summary', 'In-content application guide'];
  } else if (isFood) {
    kgrKeywords = [
      { keyword: `${cleanName} hydration ratio and recipe chart`, estimatedVolume: 240, kgrScore: 0.11, intent: 'Recipe consistency' },
      { keyword: `${cleanName} grams to ounces conversion table`, estimatedVolume: 190, kgrScore: 0.08, intent: 'Measurement conversion' },
      { keyword: `${cleanName} troubleshooting tips for beginners`, estimatedVolume: 160, kgrScore: 0.06, intent: 'Baking troubleshooting' },
    ];
    recommendedModel = 'Interactive ingredient scaling calculator and hydration ratio estimator paired with illustrated troubleshooting guides.';
    dwellTimeAdvantage = 'Bakers and home chefs keep the calculator open while prepping in the kitchen, driving exceptional session length.';
    topAdPlacements = ['Above recipe calculator', 'Below scaled ingredient list', 'Mid-recipe method guide'];
  } else if (isCalculator) {
    kgrKeywords = [
      { keyword: `${cleanName} calculation formula step by step`, estimatedVolume: 220, kgrScore: 0.12, intent: 'Formula explanation' },
      { keyword: `free online ${cleanName} estimator`, estimatedVolume: 240, kgrScore: 0.14, intent: 'Interactive tool query' },
      { keyword: `${cleanName} ratio chart and safety factor`, estimatedVolume: 180, kgrScore: 0.09, intent: 'Safety ratio guide' },
    ];
    recommendedModel = 'Client-side interactive calculator / conversion micro-tool paired with structured FAQ and step-by-step formula explanations.';
    dwellTimeAdvantage = 'Interactive problem-solving keeps session duration high (>1m 45s), maximizing AdSense Active View percentage.';
    topAdPlacements = ['Above calculator container', 'Directly below calculation results card', 'Mid-content methodology breakdown'];
  } else {
    kgrKeywords = [
      { keyword: `${cleanName} for beginners`, estimatedVolume: 190, kgrScore: 0.08, intent: 'Beginner starter guide' },
      { keyword: `${cleanName} step by step guide`, estimatedVolume: 210, kgrScore: 0.11, intent: 'Practical walkthrough' },
      { keyword: `${cleanName} complete checklist and requirements`, estimatedVolume: 160, kgrScore: 0.07, intent: 'Requirements list' },
      { keyword: `${cleanName} verified reviews and comparison`, estimatedVolume: 140, kgrScore: 0.06, intent: 'Comparison lookup' },
    ];
    recommendedModel = 'Curated informational directory with interactive comparison tools, paired with comprehensive guides.';
    dwellTimeAdvantage = 'Visitors actively explore options and read detailed breakdowns, driving steady ad engagement.';
    topAdPlacements = ['Above directory filters', 'Between key recommendation cards', 'Inside comprehensive guide section'];
  }

  return {
    nicheName: cleanName,
    competitionScore: isYmyl ? 'High' : 'Low',
    competitionSummary: isYmyl
      ? 'Heavy competition from established high-authority domains subject to strict YMYL algorithmic filters.'
      : 'Favorable long-tail search landscape with mostly legacy forums or unformatted blog posts.',
    estimatedRPM: {
      min: isYmyl ? 18 : 12,
      max: isYmyl ? 45 : 28,
      average: isYmyl ? 25 : 18,
    },
    policyApprovalRisk: isYmyl ? 'High' : 'Low',
    policyRiskExplanation: isYmyl
      ? 'Caution: Google AdSense evaluates financial and health advice under strict YMYL policies. Focus strictly on objective mathematical calculations rather than personal advice.'
      : 'Excellent approval outlook. Provided each page includes 800+ words of explanatory educational copy, the risk of Thin Content rejection is minimal.',
    approvalProbability: isYmyl ? 58 : 95,
    approvalFactors: {
      policyCompliance: isYmyl ? 68 : 98,
      thinContentSafety: 94,
      ymylSafety: isYmyl ? 42 : 98,
      commercialDemand: isYmyl ? 95 : 92,
    },
    hostingCostFeasibility: '100% compatible with $0 static hosting (Cloudflare Pages or Vercel). Logic can be executed entirely client-side.',
    recommendedModel,
    trafficPotentialMonthly: '20,000 - 65,000 pageviews within 6 months via long-tail KGR search queries.',
    kgrKeywords,
    monetizationBlueprint: {
      recommendedAdDensity: '3 standard responsive units + 1 mobile sticky anchor',
      dwellTimeAdvantage,
      topAdPlacements,
    },
    verdictScore: isYmyl ? 62 : 89,
    verdictReasoning: isYmyl
      ? 'Requires careful editorial framing to avoid YMYL scrutiny. Best pivoted towards tool-based objective math.'
      : 'Outstanding candidate for ultra-low-budget high-margin AdSense monetization. Low competition with strong buyer/maker intent.',
  };
}
