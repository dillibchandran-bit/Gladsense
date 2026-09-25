import React, { useState } from 'react';
import {
  SiteAuditMode,
  RejectionCategory,
  SiteAuditResult,
} from '../types';
import { runClientSideAudit } from '../services/siteAuditorClient';
import {
  Stethoscope,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Info,
  RefreshCw,
  HelpCircle,
  Activity,
  FileCheck,
  Layers,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { NavTabType } from './Navbar';
import { KidExplainer } from './KidExplainer';

interface SiteAuditorProps {
  onSwitchTab?: (tab: NavTabType) => void;
}

export const SiteAuditor: React.FC<SiteAuditorProps> = ({ onSwitchTab }) => {
  const [mode, setMode] = useState<SiteAuditMode>('pre-approval');
  const [showKidExplainer, setShowKidExplainer] = useState<boolean>(true);
  const [url, setUrl] = useState<string>('');
  const [rejectionReason, setRejectionReason] = useState<RejectionCategory>('low-value-content');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [sampleContent, setSampleContent] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [activeResultTab, setActiveResultTab] = useState<'overview' | 'plan' | 'checklist' | 'metrics'>('overview');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SiteAuditResult | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<{ [index: number]: boolean }>({});

  const handleRunAudit = async (customUrl?: string, customMode?: SiteAuditMode, customReason?: RejectionCategory) => {
    const targetUrl = customUrl || url;
    const targetMode = customMode || mode;
    const targetReason = customReason || rejectionReason;

    if (!targetUrl.trim()) {
      setError('Please enter a website domain or URL to analyze.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let data: SiteAuditResult;
      try {
        const response = await fetch('/api/audit-site', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: targetUrl.trim(),
            mode: targetMode,
            rejectionReason: targetReason,
            customNotes,
            sampleContent,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        data = await response.json();
      } catch (backendErr) {
        // Cloudflare Pages Static SPA fallback: Run client-side analysis directly in browser
        console.warn('Backend endpoint unavailable, running GladSense client audit engine:', backendErr);
        data = await runClientSideAudit({
          url: targetUrl.trim(),
          mode: targetMode,
          rejectionReason: targetReason,
          customNotes,
          sampleContent,
        });
      }

      setResult(data);
      setCheckedItems({});
      setActiveResultTab(targetMode === 'rejection-doctor' ? 'plan' : 'overview');

      // Scroll smoothly down to results
      setTimeout(() => {
        const resultsEl = document.getElementById('audit-results-container');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.warn('Audit error:', err);
      setError('Failed to analyze the website. Please check the URL format and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectInspiration = (domain: string, demoType: 'compliant' | 'thin' | 'rejected' | 'generic') => {
    setUrl(domain);
    if (demoType === 'compliant') {
      setMode('pre-approval');
      handleRunAudit('demo-compliant', 'pre-approval');
    } else if (demoType === 'rejected') {
      setMode('rejection-doctor');
      setRejectionReason('low-value-content');
      handleRunAudit('demo-rejected', 'rejection-doctor', 'low-value-content');
    } else if (demoType === 'thin') {
      setMode('pre-approval');
      handleRunAudit('demo-thin', 'pre-approval');
    } else {
      setMode('pre-approval');
      handleRunAudit(domain, 'pre-approval');
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const text = `Google AdSense Site Audit Report
Website: ${result.url}
Approval Probability: ${result.approvalProbability}% (${result.overallStatus})
Analyzed At: ${new Date(result.analyzedAt).toLocaleDateString()}

Verdict:
${result.verdictSummary}

Score Breakdown:
- Content Depth & Originality: ${result.scoreBreakdown.contentDepthScore}/100
- Legal & TOS Compliance: ${result.scoreBreakdown.legalComplianceScore}/100
- Navigation & UX Health: ${result.scoreBreakdown.navigationUxScore}/100
- Technical SEO & Indexability: ${result.scoreBreakdown.technicalSeoScore}/100

Critical Blockers:
${
  result.criticalBlockers.length > 0
    ? result.criticalBlockers.map((b, i) => `${i + 1}. [${b.severity.toUpperCase()}] ${b.title}: ${b.fixAdvice}`).join('\n')
    : 'None! Ready for submission.'
}
`;
    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const toggleChecklist = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full bg-white">
      {/* GOOGLE ADSENSE OFFICIAL LANDING PAGE HERO SECTION */}
      <section className="relative w-full pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#dadce0] bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Google AdSense Big Hero Typography */}
          <div className="lg:col-span-7 text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#202124] tracking-tight leading-[1.1] font-['Google_Sans_Display','Google_Sans',sans-serif]">
              You create.<br />
              We’ll help you<br />
              <span className="text-[#1a73e8] font-medium">earn.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5f6368] max-w-xl leading-relaxed font-normal">
              AdSense makes it easy to earn money from your content, whether you're an independent creator or a larger company. Check your approval readiness, eliminate low-value content flags, and maximize earnings with zero server expenses.
            </p>

            {/* Quick Action Button & Link (Exact Google AdSense style) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('search-input-box');
                  if (el) el.focus();
                }}
                className="px-6 py-2.5 rounded-full text-sm font-medium text-white bg-[#1a73e8] hover:bg-[#1765cc] transition-all shadow-xs cursor-pointer"
              >
                Audit your site
              </button>
              <button
                type="button"
                onClick={() => onSwitchTab && onSwitchTab('niches')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a73e8] hover:text-[#1765cc] cursor-pointer"
              >
                <span>Learn how to start earning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Switcher Pill (Google Style) */}
            <div className="inline-flex items-center bg-[#f1f3f4] p-1 rounded-full border border-[#dadce0] mt-4">
              <button
                type="button"
                onClick={() => setMode('pre-approval')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  mode === 'pre-approval'
                    ? 'bg-white text-[#1a73e8] shadow-xs font-semibold'
                    : 'text-[#5f6368] hover:text-[#202124]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#188038]" />
                <span>Pre-Approval Audit</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('rejection-doctor')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  mode === 'rejection-doctor'
                    ? 'bg-white text-[#1a73e8] shadow-xs font-semibold'
                    : 'text-[#5f6368] hover:text-[#202124]'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-[#1a73e8]" />
                <span>Rejection Doctor</span>
              </button>
            </div>
          </div>

          {/* Right Column: Google AdSense Phone & Graphic Mockup (from image) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Phone Mockup Frame */}
              <div className="bg-[#202124] rounded-[36px] p-2.5 shadow-2xl border-4 border-[#3c4043]">
                {/* Screen */}
                <div className="bg-white rounded-[28px] overflow-hidden p-4 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#f1f3f4] text-xs font-medium text-[#5f6368]">
                    <span>The Creator Hub</span>
                    <span className="w-2 h-2 rounded-full bg-[#34a853]"></span>
                  </div>

                  {/* Header / Graphic banner */}
                  <div className="h-28 rounded-xl bg-gradient-to-tr from-[#fce8e6] via-[#fef7e0] to-[#e8f0fe] p-3 flex flex-col justify-end">
                    <span className="text-[11px] font-medium text-[#1a73e8] uppercase tracking-wider">AdSense Verified</span>
                    <span className="text-sm font-semibold text-[#202124]">$2,450.00 / mo</span>
                  </div>

                  {/* Sample content boxes representing website blocks */}
                  <div className="space-y-2">
                    <div className="h-3 bg-[#f1f3f4] rounded-full w-3/4"></div>
                    <div className="h-3 bg-[#f1f3f4] rounded-full w-full"></div>
                    <div className="h-3 bg-[#f1f3f4] rounded-full w-5/6"></div>
                  </div>

                  {/* Ad Banner representation */}
                  <div className="p-2.5 bg-[#e8f0fe] rounded-lg border border-[#d2e3fc] flex items-center justify-between">
                    <span className="text-[10px] text-[#1a73e8] font-medium">Google Ad Unit</span>
                    <span className="text-[10px] text-[#5f6368]">Responsive</span>
                  </div>
                </div>
              </div>

              {/* Floating Google Badges (matching image: blue click icon & graph card) */}
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-[#1a73e8] text-white flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 fill-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-2xl border border-[#dadce0] shadow-lg flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
                <div className="text-left text-xs">
                  <span className="font-semibold text-[#202124] block">100% Policy Compliant</span>
                  <span className="text-[#5f6368] text-[10px]">Zero Rejection Risk</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Search Bar & Audit Trigger Container */}
        <div className="max-w-3xl mx-auto mt-12 text-center">

          {/* Rejection Reason Selector (when in Rejection Doctor mode) */}
          {mode === 'rejection-doctor' && (
            <div className="max-w-xl mx-auto mt-2 mb-4 p-3 bg-white/95 rounded-2xl border border-purple-200 shadow-md text-left transition-all">
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span>Specify Google AdSense Rejection Reason:</span>
                <span className="text-[11px] font-normal text-purple-600 font-medium">Rejection Fix Mode Active</span>
              </label>
              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value as RejectionCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-purple-500"
              >
                <option value="low-value-content">Low-value content / Thin content (Most Common)</option>
                <option value="site-behavior-navigation">Site behavior: Navigation (Broken/dummy links)</option>
                <option value="site-down-or-unavailable">Site down or unavailable (Bot timeout/WAF)</option>
                <option value="scraped-unoriginal">Scraped or unoriginal content</option>
                <option value="policy-violations">Policy violations / YMYL sensitive flags</option>
                <option value="multiple-unspecified">Multiple violations / General rejection</option>
              </select>
            </div>
          )}

          {/* GOOGLE ADSENSE CLEAN ROUNDED SEARCH BAR */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAudit();
            }}
            className="max-w-2xl mx-auto mt-6"
          >
            <div className="bg-white rounded-full p-2 shadow-md hover:shadow-lg border border-[#dadce0] flex items-center gap-2 transition-all focus-within:border-[#1a73e8] focus-within:ring-4 focus-within:ring-[#e8f0fe]">
              <div className="pl-4 text-[#5f6368]">
                <Search className="w-5 h-5 text-[#5f6368]" />
              </div>
              <input
                id="search-input-box"
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL (e.g. yoursite.com)"
                className="flex-1 bg-transparent px-2 py-2 text-sm sm:text-base text-[#202124] placeholder:text-[#80868b] focus:outline-none font-['Google_Sans',sans-serif]"
              />

              {/* GOOGLE SOLID BLUE BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1a73e8] hover:bg-[#1765cc] text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-xs whitespace-nowrap flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Analyze Website</span>
                )}
              </button>
            </div>

            {/* Localhost / Firewalled Paste Fallback Accordion */}
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-[#5f6368] hover:text-[#202124] transition-colors inline-flex items-center gap-1 font-medium"
              >
                {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>Testing localhost or behind Cloudflare? Optional content assist</span>
              </button>

              {showAdvanced && (
                <div className="mt-2.5 p-4 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] text-left text-xs max-w-xl mx-auto shadow-xs">
                  <p className="text-[#3c4043] mb-2 font-normal">
                    If your website is on localhost or blocked by Cloudflare captcha, paste your sample article text or footer content here for instant analysis:
                  </p>
                  <textarea
                    rows={3}
                    value={sampleContent}
                    onChange={(e) => setSampleContent(e.target.value)}
                    placeholder="Paste article body text, paragraph copy, or footer links here..."
                    className="w-full p-2.5 bg-white border border-[#dadce0] rounded-xl text-[#202124] text-xs focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
              )}
            </div>
          </form>

          {/* Quick Guide Component Placement */}
          <div className="mt-8 text-left">
            <KidExplainer
              title="GladSense Site Doctor"
              badge="QUICK GUIDE"
              what="An automated audit that inspects your website structure, content depth, and required legal disclosures."
              why="Google rejects up to 85% of new websites on first review. Auditing with GladSense beforehand ensures your site satisfies all webmaster quality guidelines."
              how="Enter your domain URL in the search bar above and click the blue 'Analyze Website' button."
              result="You receive a clear 0–100% readiness score with prioritized fixes to resolve before applying to AdSense."
            />
          </div>

          {/* Inspiration Suggestion Pills (matching image: "Need inspiration? Try: google.com  apple.com") */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-slate-500">
            <span>Need inspiration? Try:</span>
            <button
              onClick={() => handleSelectInspiration('google.com', 'generic')}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-full font-medium text-slate-700 transition-colors shadow-sm"
            >
              google.com
            </button>
            <button
              onClick={() => handleSelectInspiration('apple.com', 'generic')}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-full font-medium text-slate-700 transition-colors shadow-sm"
            >
              apple.com
            </button>
            <button
              onClick={() => handleSelectInspiration('https://tradescalculator-pro.pages.dev', 'compliant')}
              className="px-3 py-1 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-full font-medium text-emerald-700 transition-colors shadow-sm flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              tradescalculator-pro.pages.dev (97% Ready)
            </button>
            <button
              onClick={() => handleSelectInspiration('https://smartkitchen-recipes-hub.com', 'rejected')}
              className="px-3 py-1 bg-white hover:bg-rose-50 border border-rose-300 rounded-full font-medium text-rose-700 transition-colors shadow-sm flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              smartkitchen-recipes-hub.com (Rejected Fix)
            </button>
          </div>

          {/* Subtext link (matching "Need more than a free SEO check? Try Site Audit.") */}
          <div className="mt-6 text-xs text-slate-500">
            Need more than a free AdSense check? Explore{' '}
            <button
              onClick={() => onSwitchTab && onSwitchTab('niches')}
              className="text-slate-900 font-bold underline hover:text-[#9d62ec] transition-colors"
            >
              Niche Matrix
            </button>
            ,{' '}
            <button
              onClick={() => onSwitchTab && onSwitchTab('calculator')}
              className="text-slate-900 font-bold underline hover:text-[#9d62ec] transition-colors"
            >
              Revenue Simulator
            </button>
            , or{' '}
            <button
              onClick={() => onSwitchTab && onSwitchTab('kgr')}
              className="text-slate-900 font-bold underline hover:text-[#9d62ec] transition-colors"
            >
              KGR Keyword Tool
            </button>
            .
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-[#fce8e6] border border-[#fad2cf] text-[#c5221f] text-xs flex items-center justify-center gap-2 max-w-xl mx-auto shadow-xs">
              <AlertTriangle className="w-4 h-4 text-[#ea4335] shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </section>

      {/* THREE STEPS TO GET STARTED (EXACTLY MATCHING GOOGLE ADSENSE HOMEPAGE IMAGE) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#dadce0]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#202124] tracking-tight font-['Google_Sans_Display','Google_Sans',sans-serif]">
            Three steps to get started
          </h2>
          <p className="text-sm text-[#5f6368] mt-2 max-w-xl mx-auto">
            From zero to your first Google AdSense deposit in 3 guided milestones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] font-['Google_Sans',sans-serif] text-2xl font-bold flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="text-lg font-medium text-[#202124] font-['Google_Sans',sans-serif]">
                Audit & configure
              </h3>
              <p className="text-xs text-[#5f6368] leading-relaxed max-w-xs">
                Verify your domain with our Site Doctor to ensure you have 30+ compliant pages, zero thin content, and mandatory privacy policies.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] font-['Google_Sans',sans-serif] text-2xl font-bold flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="text-lg font-medium text-[#202124] font-['Google_Sans',sans-serif]">
                Take control
              </h3>
              <p className="text-xs text-[#5f6368] leading-relaxed max-w-xs">
                Use our 1-Click Fixes for ads.txt, responsive ad containers with zero layout shift, and automated anti-click-bombing defense.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] font-['Google_Sans',sans-serif] text-2xl font-bold flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="text-lg font-medium text-[#202124] font-['Google_Sans',sans-serif]">
                Start earning
              </h3>
              <p className="text-xs text-[#5f6368] leading-relaxed max-w-xs">
                Watch impressions convert into revenue. Model your 12-month net profit using our $0.85/month zero-server budget blueprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIT RESULTS REPORT SECTION */}
      {result && (
        <section id="audit-results-container" className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Top Report Header Bar */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                        result.overallStatus === 'ready'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : result.overallStatus === 'needs-work'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {result.overallStatus === 'ready'
                        ? 'AdSense Ready (Pass)'
                        : result.overallStatus === 'needs-work'
                        ? 'Remediation Required'
                        : 'Critical Policy Blockers'}
                    </span>
                    <span className="text-xs text-slate-400">
                      • Scanned: <span className="text-slate-200 font-mono font-medium">{result.url}</span>
                    </span>
                    {result.isSimulatedDemo && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        Benchmark Case Study
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {result.pageTitle || result.url}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                    {result.verdictSummary}
                  </p>
                </div>

                {/* Big Semrush-style Circular/Score Badge */}
                <div className="flex items-center gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      AdSense Approval Probability
                    </span>
                    <span className="text-xs text-slate-400">
                      {result.approvalProbability >= 85
                        ? 'High Confidence Pass'
                        : result.approvalProbability >= 60
                        ? 'Moderate Risk'
                        : 'Immediate Rejection Risk'}
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span
                      className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
                        result.approvalProbability >= 85
                          ? 'text-emerald-400'
                          : result.approvalProbability >= 60
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {result.approvalProbability}%
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Pillars Scoring Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8 pt-6 border-t border-slate-800">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">Content Depth & Utility</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {result.scoreBreakdown.contentDepthScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${result.scoreBreakdown.contentDepthScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    ~{result.metrics.estimatedWordCount} body words • {result.metrics.paragraphCount} paragraphs
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">Legal & TOS Disclosures</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {result.scoreBreakdown.legalComplianceScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${result.scoreBreakdown.legalComplianceScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    {result.metrics.legalPagesFound.privacyPolicy ? '✓ Privacy Policy' : '✗ Missing Privacy'} •{' '}
                    {result.metrics.legalPagesFound.aboutUs ? '✓ About Us' : '✗ Missing About'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">Navigation & UX Health</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {result.scoreBreakdown.navigationUxScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${result.scoreBreakdown.navigationUxScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    {result.metrics.navigationHealth.emptyHashLinks > 0
                      ? `⚠️ ${result.metrics.navigationHealth.emptyHashLinks} empty dummy href="#" links`
                      : '✓ Zero broken dummy anchors'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">Technical SEO & Speed</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {result.scoreBreakdown.technicalSeoScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${result.scoreBreakdown.technicalSeoScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    {result.metrics.isHttps ? '✓ HTTPS' : '✗ Insecure'} •{' '}
                    {result.metrics.hasMobileViewport ? '✓ Responsive' : '✗ Desktop only'}
                  </span>
                </div>
              </div>
            </div>

            {/* Critical Blockers Callout */}
            <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
              {result.criticalBlockers.length > 0 ? (
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                      !
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {result.criticalBlockers.length} Critical Policy Blocker{result.criticalBlockers.length > 1 ? 's' : ''} Detected
                      </h3>
                      <p className="text-xs text-rose-700">
                        Google automated review bots will reject the site unless these items are resolved first.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
                    {result.criticalBlockers.map((blocker, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-rose-200 shadow-sm space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">{blocker.title}</span>
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              blocker.severity === 'critical'
                                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                : 'bg-amber-100 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {blocker.severity}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">{blocker.description}</p>
                        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2">
                          <span className="font-bold shrink-0 text-emerald-700">Fix Action:</span>
                          <span>{blocker.fixAdvice}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {onSwitchTab && (
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                        <span className="font-bold text-slate-900">
                          Fix ads.txt warnings and missing legal compliance pages automatically:
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onSwitchTab('single-click');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 bg-[#9d62ec] hover:bg-purple-700 text-white font-bold rounded-lg shrink-0 transition-colors"
                      >
                        Open 1-Click Solutions →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3.5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Zero Critical Blockers Found</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      This domain conforms to the essential structural and technical requirements of the Google Publisher Policies.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs for Deep Findings */}
            <div className="p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 gap-2 overflow-x-auto">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveResultTab('overview')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeResultTab === 'overview'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    <span>Audit Signals</span>
                  </button>

                  {result.rejectionDiagnosis && (
                    <button
                      onClick={() => setActiveResultTab('plan')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeResultTab === 'plan'
                          ? 'bg-[#9d62ec] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>14-Day Recovery Prescription</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveResultTab('checklist')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeResultTab === 'checklist'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pre-Submission Checklist ({Object.values(checkedItems).filter(Boolean).length}/{result.reApplicationChecklist.length})</span>
                  </button>
                </div>

                <button
                  onClick={handleCopyReport}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedReport ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              {/* Tab 1: Audit Signals */}
              {activeResultTab === 'overview' && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {result.findings.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                      >
                        {item.status === 'pass' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : item.status === 'warn' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{item.label}</span>
                            <span className="text-[10px] text-slate-500 px-1.5 py-0.2 rounded bg-white border border-slate-200">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-slate-600 text-xs mt-0.5">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technical Summary Bar */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-slate-300 text-xs mt-6">
                    <h4 className="font-bold text-white mb-2">Technical Page Audit Summary:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-400">
                      <div>• Total Links: <strong className="text-white">{result.metrics.navigationHealth.totalLinks}</strong></div>
                      <div>• Internal Links: <strong className="text-white">{result.metrics.navigationHealth.internalLinks}</strong></div>
                      <div>• Headings (H1/H2): <strong className="text-white">{result.metrics.h1Count} / {result.metrics.h2Count}</strong></div>
                      <div>• HTTPS Secured: <strong className="text-white">{result.metrics.isHttps ? 'Yes (SSL)' : 'No'}</strong></div>
                      <div>• Mobile Viewport: <strong className="text-white">{result.metrics.hasMobileViewport ? 'Present' : 'Missing'}</strong></div>
                      <div>• Robots Noindex: <strong className="text-white">{result.metrics.hasRobotsNoindex ? 'Blocked!' : 'Clean'}</strong></div>
                      <div>• Thin Content Risk: <strong className="text-white">{result.metrics.thinContentRisk}</strong></div>
                      <div>• YMYL Sensitivity: <strong className="text-white">{result.metrics.ymylRisk}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: 14-Day Recovery Prescription Plan */}
              {activeResultTab === 'plan' && result.rejectionDiagnosis && (
                <div className="mt-6 space-y-6">
                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                    <div className="flex items-center gap-2 text-purple-900">
                      <Stethoscope className="w-5 h-5 text-[#9d62ec]" />
                      <h4 className="text-sm font-bold">
                        Diagnosis: {result.rejectionDiagnosis.rejectionReason}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-white border border-purple-100 shadow-sm">
                        <span className="font-bold text-slate-900 block mb-1">🤖 Googlebot Automated Crawler Perspective:</span>
                        <p className="text-slate-600 leading-relaxed">
                          {result.rejectionDiagnosis.googleBotPerspective}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-purple-100 shadow-sm">
                        <span className="font-bold text-slate-900 block mb-1">👤 Human Quality Rater Perspective:</span>
                        <p className="text-slate-600 leading-relaxed">
                          {result.rejectionDiagnosis.humanReviewerPerspective}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Phased 14-Day Re-Approval Action Plan:
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.rejectionDiagnosis.fourteenDayPlan.map((phase, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                            <span className="font-bold text-[#9d62ec] font-mono">{phase.days}</span>
                            <span className="font-bold text-slate-900">{phase.phase}</span>
                          </div>

                          <ul className="space-y-1.5 pt-1">
                            {phase.tasks.map((task, tIdx) => (
                              <li key={tIdx} className="text-slate-600 flex items-start gap-1.5">
                                <span className="text-[#9d62ec] font-bold shrink-0">•</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Pre-Submission Checklist */}
              {activeResultTab === 'checklist' && (
                <div className="mt-6 space-y-3">
                  <p className="text-xs text-slate-600 mb-2">
                    Check off each requirement as you implement it on your website. Once complete, your site will meet the benchmark for first-pass or re-appeal AdSense approval.
                  </p>

                  <div className="space-y-2">
                    {result.reApplicationChecklist.map((item, idx) => {
                      const isChecked = Boolean(checkedItems[idx]);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleChecklist(idx)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                isChecked
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-slate-300 bg-slate-50'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                              {item}
                            </span>
                          </div>

                          <span className="text-[10px] text-slate-400 font-mono">
                            {isChecked ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
