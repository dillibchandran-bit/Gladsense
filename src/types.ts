export type NicheCategory =
  | 'Trades & Craft'
  | 'Academic & Lab'
  | 'Civic & Bureaucracy'
  | 'Audio & Media'
  | 'Hobby & Care'
  | 'Engineering & Technical';

export type CompetitionLevel = 'Ultra-Low' | 'Low' | 'Medium';
export type PolicyRiskLevel = 'Very Low' | 'Low' | 'Medium';

export interface KgrKeyword {
  keyword: string;
  volume: number;
  allInTitle: number;
  kgr: number;
  intent: string;
}

export interface PageBlueprint {
  title: string;
  slug: string;
  type: 'tool' | 'guide' | 'legal';
  targetWords: number;
  contentStructure: string[];
}

export interface Niche {
  id: string;
  title: string;
  category: NicheCategory;
  competition: CompetitionLevel;
  trafficPotential: string;
  rpmRange: { min: number; max: number; avg: number };
  avgDwellTime: string;
  hostingCost: string;
  policyRisk: PolicyRiskLevel;
  approvalProbability: number; // percentage 0 - 100 (e.g. 97 for 97%)
  approvalFactors: {
    policyCompliance: number; // 0 - 100
    thinContentSafety: number; // 0 - 100
    ymylSafety: number; // 0 - 100
    commercialDemand: number; // 0 - 100
  };
  tagline: string;
  description: string;
  whyItWins: string[];
  competitorWeakness: string;
  kgrKeywords: KgrKeyword[];
  siteArchitecture: PageBlueprint[];
  monetizationBlueprint: {
    recommendedAdUnits: string[];
    viewabilityStrategy: string;
    tier1TrafficShare: string;
    estimatedCpc: number;
    recommendedLayout: string;
  };
  sampleToolSpec: {
    toolName: string;
    inputs: string[];
    output: string;
    valueSnippet: string;
  };
}

export interface RevenueInputs {
  monthlyVisitors: number;
  pagesPerVisit: number;
  tier1Share: number; // percentage 0 - 100
  baseRpm: number;
  adUnitsCount: number;
  annualDomainCost: number;
  monthlyHostingCost: number;
  estimatedCtr: number;
  estimatedCpc: number;
}

export interface RevenueBreakdown {
  totalPageviews: number;
  blendedRpm: number;
  grossMonthlyRevenue: number;
  grossAnnualRevenue: number;
  totalAnnualCost: number;
  netAnnualProfit: number;
  netMonthlyProfit: number;
  profitMargin: number;
  breakEvenDays: number;
  rpmContribution: {
    displayAds: number;
    anchorSticky: number;
    inContent: number;
  };
}

export interface AuditItem {
  id: string;
  category: 'AdSense Policy' | 'Content Depth' | 'Navigation & UX' | 'Technical & SEO';
  title: string;
  description: string;
  whyGoogleCares: string;
  isPassed: boolean;
  actionTip: string;
  boilerplateSnippet?: string;
}

export interface AiEvaluationResult {
  nicheName: string;
  competitionScore: string;
  competitionSummary: string;
  estimatedRPM: { min: number; max: number; average: number };
  policyApprovalRisk: string;
  policyRiskExplanation: string;
  approvalProbability: number; // percentage 0 - 100
  approvalFactors?: {
    policyCompliance: number;
    thinContentSafety: number;
    ymylSafety: number;
    commercialDemand: number;
  };
  hostingCostFeasibility: string;
  recommendedModel: string;
  trafficPotentialMonthly: string;
  kgrKeywords: Array<{
    keyword: string;
    estimatedVolume: number;
    kgrScore: number;
    intent: string;
  }>;
  monetizationBlueprint: {
    recommendedAdDensity: string;
    dwellTimeAdvantage: string;
    topAdPlacements: string[];
  };
  verdictScore: number;
  verdictReasoning: string;
}

export type SiteAuditMode = 'pre-approval' | 'rejection-doctor';

export type RejectionCategory =
  | 'low-value-content'
  | 'site-behavior-navigation'
  | 'site-down-or-unavailable'
  | 'scraped-unoriginal'
  | 'policy-violations'
  | 'multiple-unspecified';

export interface SiteAuditRequest {
  url: string;
  mode: SiteAuditMode;
  rejectionReason?: RejectionCategory;
  customNotes?: string;
  sampleContent?: string;
}

export interface MonthlyExpenseItem {
  id: string;
  name: string;
  category: 'Hosting & Domain' | 'Security & Email' | 'Content & Tools' | 'Maintenance';
  monthlyCost: number;
  annualAmortized: number;
  isZeroCostAlternative: boolean;
  notes: string;
}

export interface MonthlyBudgetModel {
  expenses: {
    domainMonthly: number;
    hostingMonthly: number;
    sslCdnMonthly: number;
    emailMonthly: number;
    contentToolsMonthly: number;
    seoToolsMonthly: number;
    miscMonthly: number;
  };
  traffic: {
    monthlyVisitors: number;
    pagesPerVisit: number;
    rpm: number;
    tier1Share: number;
  };
}

export interface SiteAuditBlocker {
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  fixAdvice: string;
}

export interface SiteAuditFinding {
  category: 'Legal & TOS' | 'Content Depth' | 'Navigation & UX' | 'Technical' | 'Security & UX' | 'Technical & SEO';
  label: string;
  status: 'pass' | 'fail' | 'warn';
  detail: string;
}

export interface SiteAuditResult {
  url: string;
  mode: SiteAuditMode;
  analyzedAt: string;
  approvalProbability: number; // 0 - 100%
  overallStatus: 'ready' | 'needs-work' | 'critical-blockers';
  verdictSummary: string;
  pageTitle?: string;
  isSimulatedDemo?: boolean;
  metrics: {
    isHttps: boolean;
    hasMobileViewport: boolean;
    hasRobotsNoindex: boolean;
    estimatedWordCount: number;
    h1Count: number;
    h2Count: number;
    paragraphCount: number;
    legalPagesFound: {
      privacyPolicy: boolean;
      termsOfService: boolean;
      aboutUs: boolean;
      contactUs: boolean;
      cookieConsent: boolean;
    };
    navigationHealth: {
      totalLinks: number;
      emptyHashLinks: number;
      internalLinks: number;
    };
    detectedAdCodes: string[];
    thinContentRisk: 'Low' | 'Medium' | 'High';
    ymylRisk: 'Low' | 'Medium' | 'High';
  };
  scoreBreakdown: {
    contentDepthScore: number; // 0 - 100
    legalComplianceScore: number; // 0 - 100
    navigationUxScore: number; // 0 - 100
    technicalSeoScore: number; // 0 - 100
  };
  criticalBlockers: SiteAuditBlocker[];
  findings: SiteAuditFinding[];
  rejectionDiagnosis?: {
    rejectionReason: string;
    primaryTrigger: string;
    googleBotPerspective: string;
    humanReviewerPerspective: string;
    fourteenDayPlan: Array<{
      days: string;
      phase: string;
      tasks: string[];
    }>;
  };
  reApplicationChecklist: string[];
}

