import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Server,
  Globe,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Calculator,
  PieChart,
  Percent,
  Calendar,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { KidExplainer } from './KidExplainer';

export const BudgetBlueprint: React.FC = () => {
  const [activeView, setActiveView] = useState<'budget-calculator' | 'stack-guide'>('budget-calculator');
  const [beginnerExplainer, setBeginnerExplainer] = useState<boolean>(true);

  // Interactive Monthly Budget & Expenses State
  const [domainCostMonthly, setDomainCostMonthly] = useState<number>(0.85); // $10.18/yr wholesale Cloudflare
  const [hostingCostMonthly, setHostingCostMonthly] = useState<number>(0); // Cloudflare Pages / Vercel
  const [sslCdnMonthly, setSslCdnMonthly] = useState<number>(0); // Free edge SSL
  const [emailRoutingMonthly, setEmailRoutingMonthly] = useState<number>(0); // Free Cloudflare routing
  const [contentToolsMonthly, setContentToolsMonthly] = useState<number>(0); // Free manual / built-in
  const [seoToolsMonthly, setSeoToolsMonthly] = useState<number>(0); // Free KGR tool
  const [backupPluginsMonthly, setBackupPluginsMonthly] = useState<number>(0); // Git automated

  // Income & Monetization State
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(35000);
  const [pagesPerVisit, setPagesPerVisit] = useState<number>(1.8);
  const [baseRpm, setBaseRpm] = useState<number>(22);
  const [affiliateIncomeMonthly, setAffiliateIncomeMonthly] = useState<number>(0);

  // Stack Presets
  const applyStackPreset = (preset: 'zero-cost' | 'wordpress' | 'agency') => {
    if (preset === 'zero-cost') {
      setDomainCostMonthly(0.85);
      setHostingCostMonthly(0);
      setSslCdnMonthly(0);
      setEmailRoutingMonthly(0);
      setContentToolsMonthly(0);
      setSeoToolsMonthly(0);
      setBackupPluginsMonthly(0);
    } else if (preset === 'wordpress') {
      setDomainCostMonthly(1.80);
      setHostingCostMonthly(14.99); // Shared host
      setSslCdnMonthly(4.99); // Paid SSL/CDN addon
      setEmailRoutingMonthly(6.00); // Google Workspace 1 seat
      setContentToolsMonthly(15.00); // AI/plugin addon
      setSeoToolsMonthly(12.00); // Yoast/RankMath Premium
      setBackupPluginsMonthly(5.00); // UpdraftPlus Premium
    } else {
      setDomainCostMonthly(2.50);
      setHostingCostMonthly(45.00); // Managed Cloud / VPS
      setSslCdnMonthly(15.00); // CDN Pro
      setEmailRoutingMonthly(12.00); // Business inboxes
      setContentToolsMonthly(49.00); // Content optimization tools
      setSeoToolsMonthly(99.00); // Ahrefs / Semrush lite
      setBackupPluginsMonthly(15.00); // Automated backup & staging
    }
  };

  // Math Calculations
  const totalMonthlyExpenses = Number(
    (
      domainCostMonthly +
      hostingCostMonthly +
      sslCdnMonthly +
      emailRoutingMonthly +
      contentToolsMonthly +
      seoToolsMonthly +
      backupPluginsMonthly
    ).toFixed(2)
  );

  const totalAnnualExpenses = Number((totalMonthlyExpenses * 12).toFixed(2));

  const totalMonthlyPageviews = Math.round(monthlyVisitors * pagesPerVisit);
  const totalAnnualPageviews = totalMonthlyPageviews * 12;

  const adsenseGrossMonthly = Number(((totalMonthlyPageviews / 1000) * baseRpm).toFixed(2));
  const totalGrossMonthlyIncome = Number((adsenseGrossMonthly + affiliateIncomeMonthly).toFixed(2));
  const totalGrossAnnualIncome = Number((totalGrossMonthlyIncome * 12).toFixed(2));

  const netMonthlyProfit = Number((totalGrossMonthlyIncome - totalMonthlyExpenses).toFixed(2));
  const netAnnualProfit = Number((totalGrossAnnualIncome - totalAnnualExpenses).toFixed(2));

  const profitMargin =
    totalGrossMonthlyIncome > 0
      ? Number(((netMonthlyProfit / totalGrossMonthlyIncome) * 100).toFixed(1))
      : 0;

  // Break-even calculation
  const rpmPerVisitor = (pagesPerVisit * baseRpm) / 1000;
  const breakEvenMonthlyVisitors =
    rpmPerVisitor > 0 ? Math.ceil(totalMonthlyExpenses / rpmPerVisitor) : 0;
  const breakEvenDailyVisitors = Math.ceil(breakEvenMonthlyVisitors / 30);

  // Architectural Guide Steps
  const steps = [
    {
      step: '01',
      title: 'Wholesale Domain Registration',
      provider: 'Cloudflare Registrar',
      annualCost: '$10.18 / year ($0.85/mo)',
      why: 'Unlike GoDaddy or Namecheap which mark up renewal rates to $22+/yr and charge for WHOIS privacy, Cloudflare charges the exact wholesale ICANN registry fee ($10.18 for .com) with zero markup, free permanent WHOIS privacy protection, and enterprise DNS.',
      action: 'Register your brandable .com domain directly on Cloudflare Registrar.',
    },
    {
      step: '02',
      title: 'Permanent Zero-Dollar Global Edge Hosting',
      provider: 'Cloudflare Pages / Vercel',
      annualCost: '$0.00 / year (Free Forever)',
      why: "Client-side micro-tools execute calculations locally in the visitor's browser. Static assets (HTML, CSS, JS) are distributed across 300+ worldwide Cloudflare edge data centers with unlimited bandwidth and 0ms compute cost.",
      action: 'Connect your GitHub repository to Cloudflare Pages. Every git push deploys automatically in 45 seconds.',
    },
    {
      step: '03',
      title: 'Universal Free SSL & DDoS Defense',
      provider: 'Cloudflare Edge SSL',
      annualCost: '$0.00 / year',
      why: 'Google AdSense requires full HTTPS security across all pages. Cloudflare provides auto-renewing SSL certificates and protects against malicious bot scrapers.',
      action: 'Enabled by default in 1 click when domain DNS is routed through Cloudflare.',
    },
    {
      step: '04',
      title: 'Professional Domain Email Forwarding',
      provider: 'Cloudflare Email Routing',
      annualCost: '$0.00 / year',
      why: 'Google AdSense manual reviewers check your Contact page. Having a professional email like contact@yourdomain.com increases trust compared to a generic @gmail.com address.',
      action: 'Configure free Cloudflare Email Routing to forward contact@yourdomain.com straight to your personal Gmail inbox.',
    },
    {
      step: '05',
      title: 'Organic Search Console & Analytics',
      provider: 'Google Search Console + GA4',
      annualCost: '$0.00 / year',
      why: 'Essential for sitemap indexing, discovering new organic query impressions, and monitoring Core Web Vitals before applying to AdSense.',
      action: 'Verify domain ownership via DNS TXT record in 30 seconds.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              Operating Budget & P&L Engine
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• $0.85/mo Infrastructure vs Revenue</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            AdSense Operating Budget & Cash Flow Planner
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Verify real-world monthly infrastructure expenses against estimated Google AdSense earnings to calculate true take-home net profit and break-even thresholds.
          </p>
        </div>

        {/* View Switcher Tabs & Guide Toggle */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setBeginnerExplainer(!beginnerExplainer)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 ${
              beginnerExplainer
                ? 'bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]'
                : 'bg-white text-[#5f6368] border-[#dadce0] hover:bg-[#f8f9fa]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span>{beginnerExplainer ? 'Quick Guide: ON' : 'Quick Guide: OFF'}</span>
          </button>

          <div className="flex items-center bg-[#f1f3f4] p-1 rounded-full border border-[#dadce0] text-xs font-medium">
            <button
              onClick={() => setActiveView('budget-calculator')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeView === 'budget-calculator'
                  ? 'bg-white text-[#1a73e8] shadow-xs font-semibold'
                  : 'text-[#5f6368] hover:text-[#202124]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span>Monthly P&L Calculator</span>
            </button>
            <button
              onClick={() => setActiveView('stack-guide')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeView === 'stack-guide'
                  ? 'bg-white text-[#1a73e8] shadow-xs font-semibold'
                  : 'text-[#5f6368] hover:text-[#202124]'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-[#188038]" />
              <span>$12/Yr Stack Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Plain-English Beginner Summary (When Active) */}
      {beginnerExplainer && (
        <KidExplainer
          title="Website Operating Budget & Cash Calculator"
          what="A money balance sheet that compares how tiny your expenses are ($0.85/month) compared to how much Google AdSense pays you ($500 - $3,000/month)."
          why="Most beginners waste $35 to $200 every single month on expensive WordPress hosting, slow plugins, and agency tools before making their first dollar! That causes people to quit."
          how="Click the green '⚡ Zero-Cost Modern Stack ($0.85/mo)' preset button below and move the visitor slider to your traffic goal."
          result="You see your pure take-home net profit! You only need 3 visitors a day to break even, meaning 99% of Google's payments go directly into your bank account as pure profit."
        />
      )}

      {activeView === 'budget-calculator' && (
        <div className="space-y-6">
          {/* Quick Stack Presets */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9d62ec]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Quick Stack Comparison Presets:
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <button
                onClick={() => applyStackPreset('zero-cost')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  totalMonthlyExpenses <= 1
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ⚡ Zero-Cost Modern Stack ($0.85/mo)
              </button>
              <button
                onClick={() => applyStackPreset('wordpress')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  totalMonthlyExpenses > 10 && totalMonthlyExpenses < 60
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🐢 Traditional WordPress ($36.03/mo)
              </button>
              <button
                onClick={() => applyStackPreset('agency')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  totalMonthlyExpenses >= 60
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🏢 Heavy Agency Stack ($238/mo)
              </button>
            </div>
          </div>

          {/* Key Financial Scorecards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Gross Monthly Income */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Gross Monthly Income</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono">
                ${totalGrossMonthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-slate-500">
                ${totalGrossAnnualIncome.toLocaleString('en-US', { minimumFractionDigits: 0 })} / year gross
              </p>
            </div>

            {/* Total Monthly Expenses */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Total Monthly Expenses</span>
                <DollarSign className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-rose-600 tracking-tight font-mono">
                ${totalMonthlyExpenses.toFixed(2)}
              </div>
              <p className="text-[11px] text-slate-500">
                ${totalAnnualExpenses.toFixed(2)} / year amortized
              </p>
            </div>

            {/* Net Monthly Profit */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Net Monthly Profit (Take-Home)</span>
                <CheckCircle2 className="w-4 h-4 text-[#9d62ec]" />
              </div>
              <div
                className={`text-xl sm:text-2xl font-black tracking-tight font-mono ${
                  netMonthlyProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                ${netMonthlyProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-slate-500">
                ${netAnnualProfit.toLocaleString('en-US', { minimumFractionDigits: 0 })} / year pure profit
              </p>
            </div>

            {/* Net Profit Margin % */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Net Profit Margin</span>
                <Percent className="w-4 h-4 text-purple-600" />
              </div>
              <div
                className={`text-xl sm:text-2xl font-black tracking-tight font-mono ${
                  profitMargin >= 85
                    ? 'text-emerald-700'
                    : profitMargin >= 50
                    ? 'text-purple-700'
                    : 'text-amber-600'
                }`}
              >
                {profitMargin}%
              </div>
              <p className="text-[11px] text-slate-500">
                {profitMargin >= 95
                  ? 'Phenomenal Zero-Cost Efficiency'
                  : profitMargin >= 70
                  ? 'Healthy Operating Margin'
                  : 'High Overhead Burden'}
              </p>
            </div>
          </div>

          {/* Interactive Calculator Section: Expenses (Left) vs Income (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Monthly Expenses Breakdown (6 Cols) */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-rose-50 text-rose-700 font-bold flex items-center justify-center text-xs">
                    -
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Monthly Operating Expenses ($/mo)
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  ${totalMonthlyExpenses.toFixed(2)} / month
                </span>
              </div>

              {/* Expense 1: Domain Name */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold flex items-center gap-1.5">
                    <span>Domain Registration (.com ICANN)</span>
                    <span className="text-[10px] text-slate-400 font-normal">($10.18/yr = $0.85/mo)</span>
                  </label>
                  <span className="font-mono font-bold text-slate-900">${domainCostMonthly.toFixed(2)}/mo</span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="3.00"
                  step="0.05"
                  value={domainCostMonthly}
                  onChange={(e) => setDomainCostMonthly(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
                <p className="text-[10px] text-slate-500">
                  Cloudflare Registrar charges exact wholesale $10.18/yr ($0.85/mo) with free WHOIS privacy.
                </p>
              </div>

              {/* Expense 2: Hosting / Server */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold flex items-center gap-1.5">
                    <span>Static Edge Hosting / Server</span>
                    {hostingCostMonthly === 0 && (
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        Free Forever
                      </span>
                    )}
                  </label>
                  <span className="font-mono font-bold text-slate-900">${hostingCostMonthly.toFixed(2)}/mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="1"
                  value={hostingCostMonthly}
                  onChange={(e) => setHostingCostMonthly(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
                <p className="text-[10px] text-slate-500">
                  Cloudflare Pages or Vercel provides unlimited static bandwidth at $0.00/mo. WordPress hosting typically costs $12-$35/mo.
                </p>
              </div>

              {/* Expense 3: SSL Certificate & CDN */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold flex items-center gap-1.5">
                    <span>Edge SSL & Global CDN DDoS Protection</span>
                  </label>
                  <span className="font-mono font-bold text-slate-900">${sslCdnMonthly.toFixed(2)}/mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={sslCdnMonthly}
                  onChange={(e) => setSslCdnMonthly(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
                <p className="text-[10px] text-slate-500">
                  Cloudflare Universal SSL is 100% free with automatic renew and 300+ edge locations.
                </p>
              </div>

              {/* Expense 4: Email Inboxes */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold flex items-center gap-1.5">
                    <span>Professional Domain Email (contact@yourdomain.com)</span>
                  </label>
                  <span className="font-mono font-bold text-slate-900">${emailRoutingMonthly.toFixed(2)}/mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={emailRoutingMonthly}
                  onChange={(e) => setEmailRoutingMonthly(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
                <p className="text-[10px] text-slate-500">
                  Cloudflare Email Routing forwards domain email directly to your personal Gmail inbox for $0.00.
                </p>
              </div>

              {/* Expense 5: Content & Writing Tools */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold">Content & Research Tools</label>
                  <span className="font-mono font-bold text-slate-900">${contentToolsMonthly.toFixed(2)}/mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={contentToolsMonthly}
                  onChange={(e) => setContentToolsMonthly(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
              </div>

              {/* Expense 6: SEO & Keyword Tools */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold">SEO & Keyword Research Subscriptions</label>
                  <span className="font-mono font-bold text-slate-900">${seoToolsMonthly.toFixed(2)}/mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="10"
                  value={seoToolsMonthly}
                  onChange={(e) => setSeoToolsMonthly(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
                <p className="text-[10px] text-slate-500">
                  Using this built-in KGR tool eliminates the need for $99-$129/mo Ahrefs or Semrush plans.
                </p>
              </div>
            </div>

            {/* Monthly Income & Monetization (6 Cols) */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs">
                    +
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Monthly Revenue Streams ($/mo)
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ${totalGrossMonthlyIncome.toFixed(2)} / month
                </span>
              </div>

              {/* Traffic Visitors Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold">Monthly Unique Organic Visitors</label>
                  <span className="font-mono font-bold text-slate-900">
                    {monthlyVisitors.toLocaleString()} visits
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="200000"
                  step="1000"
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>2K starter</span>
                  <span>35K target</span>
                  <span>100K established</span>
                  <span>200K authority</span>
                </div>
              </div>

              {/* Pages Per Visit */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold">Pages per Visitor Session</label>
                  <span className="font-mono font-bold text-slate-900">{pagesPerVisit.toFixed(1)} pages</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={pagesPerVisit}
                  onChange={(e) => setPagesPerVisit(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
                <p className="text-[10px] text-slate-500">
                  Generates <strong>{totalMonthlyPageviews.toLocaleString()}</strong> monthly ad impressions.
                </p>
              </div>

              {/* AdSense Blended RPM */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold">AdSense RPM (Revenue Per 1K Pageviews)</label>
                  <span className="font-mono font-bold text-emerald-700">${baseRpm.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="60"
                  step="1"
                  value={baseRpm}
                  onChange={(e) => setBaseRpm(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>$4 general</span>
                  <span>$15 hobby/tech</span>
                  <span>$28 finance/trades</span>
                  <span>$50 high commercial</span>
                </div>
              </div>

              {/* Optional Affiliate / Direct Revenue */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold">Supplementary Affiliate / Direct Ads ($/mo)</label>
                  <span className="font-mono font-bold text-slate-900">${affiliateIncomeMonthly.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="25"
                  value={affiliateIncomeMonthly}
                  onChange={(e) => setAffiliateIncomeMonthly(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
                />
                <p className="text-[10px] text-slate-500">
                  Tool recommendation links, Amazon Associates, or direct sidebar sponsorships.
                </p>
              </div>

              {/* Break-even & Runway Insight Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Break-Even Traffic Threshold
                  </span>
                  <span className="font-mono text-emerald-700">
                    {breakEvenDailyVisitors} visitors / day
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  On this current budget of <strong>${totalMonthlyExpenses.toFixed(2)}/mo</strong>, you only need{' '}
                  <strong>{breakEvenMonthlyVisitors.toLocaleString()} total monthly visits</strong> ({breakEvenDailyVisitors} visits/day) to achieve 100% profitability. Any traffic beyond this is 100% pure profit.
                </p>
              </div>
            </div>
          </div>

          {/* 12-Month Projected P&L Cashflow Timeline */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  12-Month Cumulative Profit & Loss Projections
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  How compounding monthly traffic translates into pure bank balance over a full operational year.
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                Net Annual Profit: ${netAnnualProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2.5 px-3">Timeline Milestone</th>
                    <th className="py-2.5 px-3">Est. Traffic</th>
                    <th className="py-2.5 px-3">Gross Income</th>
                    <th className="py-2.5 px-3">Total Expenses</th>
                    <th className="py-2.5 px-3">Net Profit</th>
                    <th className="py-2.5 px-3">Operating Margin</th>
                    <th className="py-2.5 px-3">Cumulative Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {[
                    {
                      label: 'Month 1 - Launch',
                      traffic: Math.round(monthlyVisitors * 0.15),
                      factor: 0.15,
                    },
                    {
                      label: 'Month 3 - Fast Index',
                      traffic: Math.round(monthlyVisitors * 0.4),
                      factor: 0.4,
                    },
                    {
                      label: 'Month 6 - AdSense Approved',
                      traffic: Math.round(monthlyVisitors * 0.75),
                      factor: 0.75,
                    },
                    {
                      label: 'Month 9 - Established',
                      traffic: monthlyVisitors,
                      factor: 1.0,
                    },
                    {
                      label: 'Month 12 - Authority',
                      traffic: Math.round(monthlyVisitors * 1.35),
                      factor: 1.35,
                    },
                  ].map((row, idx) => {
                    const gross = Number((totalGrossMonthlyIncome * row.factor).toFixed(2));
                    const net = Number((gross - totalMonthlyExpenses).toFixed(2));
                    const margin = gross > 0 ? ((net / gross) * 100).toFixed(1) : '0';
                    const cumBalance = Number((net * (idx + 1) * 1.8).toFixed(2));

                    return (
                      <tr key={row.label} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-sans font-bold text-slate-900">{row.label}</td>
                        <td className="py-3 px-3 text-slate-700">{row.traffic.toLocaleString()} /mo</td>
                        <td className="py-3 px-3 text-emerald-700 font-bold">${gross.toLocaleString()}</td>
                        <td className="py-3 px-3 text-rose-600">${totalMonthlyExpenses.toFixed(2)}</td>
                        <td className={`py-3 px-3 font-bold ${net >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                          ${net.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-purple-700 font-bold">{margin}%</td>
                        <td className="py-3 px-3 font-black text-slate-900">
                          ${cumBalance >= 0 ? cumBalance.toLocaleString() : '0'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeView === 'stack-guide' && (
        <div className="space-y-6">
          {/* Cost Comparison Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* The Flawed Traditional Route */}
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  The Flawed Traditional Route (WordPress / VPS)
                </span>
                <span className="text-xs font-mono text-rose-800 font-bold">$180 – $360 / year</span>
              </div>
              <ul className="text-xs space-y-2 text-rose-950/80">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Paid shared hosting ($12/mo) that crashes when a page goes viral on Reddit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Bloated MySQL databases and 35 plugins causing 3.2s page load times and failing Core Web Vitals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Constant WordPress security patches and vulnerability exploits.</span>
                </li>
              </ul>
            </div>

            {/* The Modern Static Route */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  The Micro-Tool Static Stack (Recommended)
                </span>
                <span className="text-sm font-mono text-emerald-800 font-black">~$10.18 / year ($0.85/mo)</span>
              </div>
              <ul className="text-xs space-y-2 text-emerald-950/80">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>$0 Hosting:</strong> 100% static client-side JavaScript on Cloudflare Pages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>100/100 Core Web Vitals:</strong> 350ms instant loading beats bloated competitors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>98.5%+ Pure Net Margin:</strong> Almost every single AdSense dollar goes straight into your pocket.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step-by-Step Blueprint Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              5-Step Zero-Overhead Launch Execution Plan
            </h3>

            {steps.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-[#9d62ec] font-mono font-bold flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full font-mono border border-slate-200">
                        {s.provider}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
                      {s.why}
                    </p>
                    <p className="text-[11px] text-[#9d62ec] mt-1.5 font-semibold">
                      → <strong>Execution:</strong> {s.action}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    {s.annualCost}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Roadmap 60-Day Timeline */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              60-Day Milestone Roadmap to First AdSense Payout
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-[#9d62ec] uppercase font-bold">
                  Days 1 – 14 (Build Phase)
                </span>
                <h5 className="font-bold text-slate-900 text-sm">Deploy 15 Tool Pages</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Build and publish 15 client-side calculators. Pair each with 1,000 words of educational text, formula breakdown, and mandatory legal pages (Privacy, About, Terms).
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-purple-700 uppercase font-bold">
                  Days 15 – 35 (Index Phase)
                </span>
                <h5 className="font-bold text-slate-900 text-sm">Google Search Indexing</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Submit sitemap to Google Search Console. Long-tail KGR keywords begin ranking on page 1-2. Reach 50-100 organic visits/day.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold">
                  Days 36 – 60 (Monetize Phase)
                </span>
                <h5 className="font-bold text-slate-900 text-sm">AdSense Approval & Scale</h5>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Submit application to Google AdSense. Receive approval within 5-7 business days. Place 3 non-intrusive ad units. Compounding daily profit begins.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
