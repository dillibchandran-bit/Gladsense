import React, { useState } from 'react';
import { Niche } from '../types';
import {
  X,
  Check,
  Copy,
  TrendingUp,
  Clock,
  DollarSign,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Layers,
  ExternalLink,
  Receipt,
  Wallet,
  PieChart,
  ArrowUpRight,
  Sparkles,
  Percent,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface NicheDetailModalProps {
  niche: Niche;
  onClose: () => void;
  onSimulateInCalculator: (rpm: number) => void;
}

export const NicheDetailModal: React.FC<NicheDetailModalProps> = ({
  niche,
  onClose,
  onSimulateInCalculator,
}) => {
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  // Parse traffic potential bounds from string (e.g. "50,000 - 150,000 / mo")
  const parseTrafficRange = (trafficStr: string) => {
    const nums = trafficStr.replace(/,/g, '').match(/\d+/g);
    if (nums && nums.length >= 2) {
      const min = Number(nums[0]);
      const max = Number(nums[1]);
      const avg = Math.round((min + max) / 2);
      return { min, max, avg };
    }
    return { min: 30000, max: 100000, avg: 65000 };
  };

  const trafficRange = parseTrafficRange(niche.trafficPotential);

  // Interactive Monthly Traffic Simulation for Budget & Profitability
  const [trafficPreset, setTrafficPreset] = useState<'conservative' | 'benchmark' | 'scale' | 'custom'>('benchmark');
  const [customTraffic, setCustomTraffic] = useState<number>(trafficRange.avg);

  const activeMonthlyViews =
    trafficPreset === 'conservative'
      ? trafficRange.min
      : trafficPreset === 'scale'
      ? trafficRange.max
      : trafficPreset === 'benchmark'
      ? trafficRange.avg
      : customTraffic;

  // Real-time Financial Calculations: Expenses vs Income vs Net Profit
  const monthlyGrossIncome = (activeMonthlyViews / 1000) * niche.rpmRange.avg;
  const annualGrossIncome = monthlyGrossIncome * 12;

  // Itemized Operational Expenses (The $10.18/year zero-cost static stack)
  const monthlyDomainExpense = 0.85; // $10.18 / 12 months
  const monthlyHostingExpense = 0.00; // Cloudflare Pages / Vercel
  const monthlySslExpense = 0.00; // Cloudflare Universal SSL
  const monthlyEmailExpense = 0.00; // Cloudflare Email Routing
  const monthlyAnalyticsExpense = 0.00; // Google Search Console + GA4
  const totalMonthlyExpenses = monthlyDomainExpense + monthlyHostingExpense + monthlySslExpense + monthlyEmailExpense + monthlyAnalyticsExpense;
  const totalAnnualExpenses = 10.18;

  // Net Profit & Margins
  const monthlyNetProfit = Math.max(0, monthlyGrossIncome - totalMonthlyExpenses);
  const annualNetProfit = Math.max(0, annualGrossIncome - totalAnnualExpenses);
  const netProfitMargin = monthlyGrossIncome > 0 ? ((monthlyNetProfit / monthlyGrossIncome) * 100).toFixed(1) : '0';
  const dailyIncome = monthlyGrossIncome / 30;
  const breakEvenHours = dailyIncome > 0 ? Math.max(0.1, (totalAnnualExpenses / dailyIncome) * 24).toFixed(1) : '0';

  // Interactive Mini-Demo State for the selected niche's tool
  const [demoInput1, setDemoInput1] = useState<number>(36); // e.g., Length
  const [demoInput2, setDemoInput2] = useState<number>(24); // e.g., Width
  const [demoInput3, setDemoInput3] = useState<number>(2); // e.g., Depth

  const handleCopyKeyword = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  // Demo calculation based on niche category
  const calculateDemoResult = () => {
    if (niche.id === 'trades-craft-calculators') {
      const cubicInches = demoInput1 * demoInput2 * demoInput3;
      const totalFluidOunces = Math.round(cubicInches * 0.554);
      const totalCost = (totalFluidOunces * 0.45).toFixed(2);
      return {
        metric1: `${totalFluidOunces} oz (${(totalFluidOunces / 128).toFixed(1)} gal)`,
        metric2: `Part A: ${(totalFluidOunces / 2).toFixed(0)} oz | Part B: ${(totalFluidOunces / 2).toFixed(0)} oz`,
        cost: `$${totalCost}`,
      };
    } else if (niche.id === 'academic-lab-solvers') {
      const nMax = 100;
      const nMin = 50;
      const nd = Math.min(Math.max(demoInput1, nMin), nMax);
      const germanGrade = (1 + 3 * ((nMax - nd) / (nMax - nMin))).toFixed(2);
      return {
        metric1: `German Equivalent: ${germanGrade}`,
        metric2: Number(germanGrade) <= 1.5 ? 'Very Good (Sehr Gut)' : Number(germanGrade) <= 2.5 ? 'Good (Gut)' : 'Satisfactory (Befriedigend)',
        cost: 'Free Open Formula',
      };
    } else if (niche.id === 'baking-food-science') {
      const flour = demoInput1 * 10;
      const hydration = demoInput2;
      const water = Math.round(flour * (hydration / 100));
      const salt = Math.round(flour * 0.02);
      return {
        metric1: `Water to Add: ${water}g`,
        metric2: `Flour: ${flour}g | Salt (2%): ${salt}g`,
        cost: `Total Dough: ${flour + water + salt}g`,
      };
    }
    return {
      metric1: `${(demoInput1 * demoInput2 * 0.85).toFixed(1)} Units`,
      metric2: `Precision Factor: 99.4%`,
      cost: 'Instant Client-Side Output',
    };
  };

  const demoOutput = calculateDemoResult();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full bg-purple-50 text-[#9d62ec] border border-purple-200">
                {niche.category}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Competition: {niche.competition}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Policy Risk: {niche.policyRisk}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-50 text-[#9d62ec] border border-purple-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9d62ec]" />
                AdSense Approval: {niche.approvalProbability}%
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">{niche.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Key Metrics Row (5 High-Level Publisher KPIs) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>AdSense RPM</span>
              </div>
              <p className="text-base sm:text-lg font-black text-emerald-700">
                ${niche.rpmRange.min} - ${niche.rpmRange.max}
              </p>
              <p className="text-[10px] text-slate-400">Avg: ${niche.rpmRange.avg} / 1k</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-[#9d62ec]" />
                <span>Monthly Traffic</span>
              </div>
              <p className="text-base sm:text-lg font-black text-slate-900">{niche.trafficPotential}</p>
              <p className="text-[10px] text-slate-400">Organic search</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <Receipt className="w-3.5 h-3.5 text-slate-600" />
                <span>Operating Budget</span>
              </div>
              <p className="text-base sm:text-lg font-black text-slate-800 font-mono">~$0.85/mo</p>
              <p className="text-[10px] text-slate-400">$10.18/yr domain only</p>
            </div>

            <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-1.5 text-purple-700 text-xs mb-1 font-semibold">
                <Wallet className="w-3.5 h-3.5 text-[#9d62ec]" />
                <span>Est. Net Profit</span>
              </div>
              <p className="text-base sm:text-lg font-black text-[#7939d2] font-mono">
                +${Math.round(monthlyNetProfit).toLocaleString()}<span className="text-[10px] font-normal text-slate-500">/mo</span>
              </p>
              <p className="text-[10px] text-emerald-700 font-bold">{netProfitMargin}% Net Margin</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>Avg Dwell Time</span>
              </div>
              <p className="text-base sm:text-lg font-black text-slate-900">{niche.avgDwellTime}</p>
              <p className="text-[10px] text-slate-400">High Active View</p>
            </div>
          </div>

          {/* AdSense Approval Probability & Policy Audit Breakdown */}
          <div className="p-5 rounded-2xl bg-purple-50/40 border border-purple-200 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-100">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#9d62ec]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9d62ec]">
                    AdSense Approval Probability Rating
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                  {niche.approvalProbability >= 95
                    ? 'Exceptional Probability (Manual & Automated Review Safe)'
                    : 'High Approval Probability (Standard Guidelines Apply)'}
                </h3>
              </div>

              <div className="flex items-baseline gap-1.5 bg-white px-4 py-2 rounded-xl border border-purple-200 shadow-2xs">
                <span className="text-2xl font-black text-purple-800 font-mono">
                  {niche.approvalProbability}%
                </span>
                <span className="text-xs text-slate-500 font-medium">Confidence</span>
              </div>
            </div>

            {/* 4 Approval Factors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex justify-between items-center text-slate-600 mb-1 font-semibold">
                  <span>Policy Compliance</span>
                  <span className="font-mono text-emerald-700 font-bold">{niche.approvalFactors.policyCompliance}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${niche.approvalFactors.policyCompliance}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">TOS & Cookie/GDPR safety</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex justify-between items-center text-slate-600 mb-1 font-semibold">
                  <span>Thin Content Safety</span>
                  <span className="font-mono text-emerald-700 font-bold">{niche.approvalFactors.thinContentSafety}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${niche.approvalFactors.thinContentSafety}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Tool utility + guide depth</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex justify-between items-center text-slate-600 mb-1 font-semibold">
                  <span>YMYL Filter Safety</span>
                  <span className="font-mono text-purple-700 font-bold">{niche.approvalFactors.ymylSafety}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${niche.approvalFactors.ymylSafety}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Free of health/crypto flags</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex justify-between items-center text-slate-600 mb-1 font-semibold">
                  <span>Commercial Demand</span>
                  <span className="font-mono text-emerald-700 font-bold">{niche.approvalFactors.commercialDemand}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${niche.approvalFactors.commercialDemand}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Active advertiser auction bids</span>
              </div>
            </div>
          </div>

          {/* ESTIMATED MONTHLY BUDGET & PROFITABILITY BREAKDOWN (Expenses vs Income vs Net Profit) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Receipt className="w-3 h-3 text-emerald-600" />
                    Monthly Financial Ledger
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Expenses vs. AdSense Revenue & Net Profit</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  Estimated Monthly Cost, Operating Budget & Net Profit
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Static client-side architecture guarantees a near-100% net margin by eliminating all recurring server, database, and software plugin overhead.
                </p>
              </div>

              {/* Traffic Scenario Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-auto text-xs">
                <button
                  type="button"
                  onClick={() => setTrafficPreset('conservative')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    trafficPreset === 'conservative'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Conservative ({trafficRange.min.toLocaleString()}/mo)
                </button>
                <button
                  type="button"
                  onClick={() => setTrafficPreset('benchmark')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    trafficPreset === 'benchmark'
                      ? 'bg-white text-purple-700 shadow-xs border border-purple-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Benchmark ({trafficRange.avg.toLocaleString()}/mo)
                </button>
                <button
                  type="button"
                  onClick={() => setTrafficPreset('scale')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    trafficPreset === 'scale'
                      ? 'bg-white text-emerald-700 shadow-xs border border-emerald-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Scale ({trafficRange.max.toLocaleString()}/mo)
                </button>
              </div>
            </div>

            {/* Top 3 KPI Financial Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Gross Income Card */}
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Gross Monthly Income
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    RPM: ${niche.rpmRange.avg.toFixed(2)}
                  </span>
                </div>
                <p className="text-2xl font-black text-emerald-700 font-mono">
                  +${monthlyGrossIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center justify-between text-[11px] text-emerald-900/80 mt-1.5 font-medium">
                  <span>Annualized: <strong>${annualGrossIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr</strong></span>
                  <span>•</span>
                  <span>~${(monthlyGrossIncome / 30).toFixed(2)}/day</span>
                </div>
                <p className="text-[10px] text-emerald-700/80 mt-1">
                  Based on {activeMonthlyViews.toLocaleString()} monthly views @ ${niche.rpmRange.avg} benchmark RPM.
                </p>
              </div>

              {/* Monthly Expenses Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5 text-slate-500" />
                    Total Monthly Expenses
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    $10.18 / year
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-800 font-mono">
                  -${totalMonthlyExpenses.toFixed(2)} <span className="text-xs font-normal text-slate-500">/ mo</span>
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-600 mt-1.5 font-medium">
                  <span>Annualized: <strong>${totalAnnualExpenses.toFixed(2)}/yr</strong></span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">$0 Server Overhead</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Domain registration amortized monthly. Hosting, SSL, and email are $0.00 forever.
                </p>
              </div>

              {/* Net Monthly Profit Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-emerald-50/40 border border-purple-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#7939d2] flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-[#9d62ec]" />
                    Net Take-Home Profit
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    {netProfitMargin}% Margin
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-900 font-mono">
                  +${monthlyNetProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center justify-between text-[11px] text-purple-950 mt-1.5 font-medium">
                  <span>Annual Take-Home: <strong>+${annualNetProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr</strong></span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-purple-800 font-semibold mt-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Break-even reached in just <strong>{breakEvenHours} hours</strong> of traffic.</span>
                </div>
              </div>
            </div>

            {/* Side-by-Side Detailed Ledger: Expenses vs Income */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Left Column: Itemized AdSense Income Streams */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2.5">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                    Projected AdSense Income Streams
                  </h4>
                  <span className="font-mono text-[11px] text-emerald-700 font-bold">
                    +${monthlyGrossIncome.toFixed(2)}/mo
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-800">Top Responsive Display Banner</p>
                      <p className="text-[10px] text-slate-400">Above tool fold • High initial impression viewability</p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-700">+${(monthlyGrossIncome * 0.45).toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block font-sans">45% share</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-800">In-Article Contextual Units (Guides)</p>
                      <p className="text-[10px] text-slate-400">Embedded in 800+ word procedure theory & FAQ</p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-700">+${(monthlyGrossIncome * 0.35).toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block font-sans">35% share</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-800">Mobile Sticky Anchor Unit</p>
                      <p className="text-[10px] text-slate-400">Persistent bottom footer • 85%+ Active View score</p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-700">+${(monthlyGrossIncome * 0.20).toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block font-sans">20% share</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Total Monthly Revenue:</span>
                  <span className="font-bold font-mono text-emerald-700">+${monthlyGrossIncome.toFixed(2)} / mo</span>
                </div>
              </div>

              {/* Right Column: Relevant Operational Expenses (Budget) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2.5">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5 text-slate-500" />
                    Relevant Monthly Operating Expenses
                  </h4>
                  <span className="font-mono text-[11px] text-slate-700 font-bold">
                    ${totalMonthlyExpenses.toFixed(2)}/mo
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-white border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-800">Wholesale .com Domain</p>
                      <p className="text-[10px] text-slate-400">Cloudflare Registrar • Free WHOIS privacy & ICANN</p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-slate-800">$0.85/mo</span>
                      <span className="text-[10px] text-slate-400 block font-sans">$10.18/yr</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-white border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-800">Serverless Edge Static Hosting</p>
                      <p className="text-[10px] text-slate-400">Cloudflare Pages • Unlimited bandwidth & 300+ edge DCs</p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-700">$0.00</span>
                      <span className="text-[10px] text-slate-400 block font-sans">Free Forever</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-white border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-800">Universal Edge SSL & DDoS Defense</p>
                      <p className="text-[10px] text-slate-400">Cloudflare Enterprise Edge • Auto-renewing HTTPS</p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-700">$0.00</span>
                      <span className="text-[10px] text-slate-400 block font-sans">Included</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-white border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-800">Custom Domain Email Routing</p>
                      <p className="text-[10px] text-slate-400">contact@yourdomain.com routed to personal Gmail</p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-700">$0.00</span>
                      <span className="text-[10px] text-slate-400 block font-sans">Zero Cost</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-white border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-800">Google Search Console & GA4</p>
                      <p className="text-[10px] text-slate-400">Official Google indexing & web analytics suite</p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-700">$0.00</span>
                      <span className="text-[10px] text-slate-400 block font-sans">100% Free</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Total Monthly Budget Required:</span>
                  <span className="font-bold font-mono text-slate-800">${totalMonthlyExpenses.toFixed(2)} / mo</span>
                </div>
              </div>
            </div>

            {/* Bottom Net Summary Banner */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">
                    Net Take-Home: +${monthlyNetProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / month
                    <span className="text-emerald-400 font-mono ml-2">({netProfitMargin}% Net Margin)</span>
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Annual Net Projection: <strong>+${annualNetProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/year</strong> after all domain and operational costs.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                  Break-Even: <strong>{breakEvenHours} Hours</strong> of Traffic
                </span>
              </div>
            </div>
          </div>

          {/* Description & Competitor Weakness */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Why This Niche Dominates on Low Cost
              </h3>
              <ul className="space-y-2 text-xs">
                {niche.whyItWins.map((win, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span className="text-slate-700">{win}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Competitor Vulnerability & Exploitable Gap
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {niche.competitorWeakness}
              </p>
              <div className="mt-3 p-3 rounded-lg bg-purple-50 border border-purple-200 text-[11px] text-purple-900 font-medium">
                <strong>The Opportunity:</strong> Legacy competitors treat these as ugly, unreadable forms. By deploying a clean, responsive single-page web app with 1,000 words of background theory, you easily outrank them within 60 days.
              </div>
            </div>
          </div>

          {/* Live Interactive Micro-Tool Simulation Preview */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900">
                  Live Client-Side Prototype Preview: {niche.sampleToolSpec.toolName}
                </h3>
              </div>
              <span className="text-[11px] text-emerald-800 font-mono bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                0ms Server Cost • 100% Client-Side
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              This demonstrates the exact kind of interactive utility tool that users bookmark and visit repeatedly:
            </p>

            {/* Micro Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Input 1 ({niche.sampleToolSpec.inputs[0] || 'Dimension'})
                </label>
                <input
                  type="number"
                  value={demoInput1}
                  onChange={(e) => setDemoInput1(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#9d62ec] font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Input 2 ({niche.sampleToolSpec.inputs[1] || 'Ratio / Factor'})
                </label>
                <input
                  type="number"
                  value={demoInput2}
                  onChange={(e) => setDemoInput2(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#9d62ec] font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Input 3 ({niche.sampleToolSpec.inputs[2] || 'Safety Factor'})
                </label>
                <input
                  type="number"
                  value={demoInput3}
                  onChange={(e) => setDemoInput3(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#9d62ec] font-mono"
                />
              </div>
            </div>

            {/* Calculated Output Box with Mock Ad Placement */}
            <div className="p-4 bg-slate-50 rounded-xl border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#9d62ec] font-bold">
                  Instant Output:
                </span>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">{demoOutput.metric1}</p>
                <p className="text-xs text-slate-600">{demoOutput.metric2}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 font-medium">Estimated Project Value</span>
                <p className="text-base font-extrabold text-emerald-700">{demoOutput.cost}</p>
                <span className="text-[10px] text-slate-400">{niche.sampleToolSpec.valueSnippet}</span>
              </div>
            </div>

            {/* Ad placement illustration note */}
            <div className="mt-3 p-3 bg-purple-50/50 border border-dashed border-purple-200 rounded-xl text-[11px] text-slate-600 flex items-center justify-between">
              <span>🎯 <strong>Strategic Ad Zone:</strong> AdSense unit placed immediately below this output box achieves a 78%+ viewability score without violating policies.</span>
            </div>
          </div>

          {/* Vetted KGR Keywords Ready to Target */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Verified Low-Competition KGR Keywords (Target First 30 Days)
              </h3>
              <span className="text-xs text-slate-500">KGR &lt; 0.25 = Rapid Google Indexing</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">Target Long-Tail Query</th>
                    <th className="p-3 text-center">Monthly Vol</th>
                    <th className="p-3 text-center">AllInTitle</th>
                    <th className="p-3 text-center">KGR Score</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono bg-white">
                  {niche.kgrKeywords.map((kgr, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-slate-800 font-sans font-medium flex items-center gap-1.5">
                        <span>{kgr.keyword}</span>
                      </td>
                      <td className="p-3 text-center text-slate-600">{kgr.volume}</td>
                      <td className="p-3 text-center text-slate-600">{kgr.allInTitle}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          {kgr.kgr.toFixed(2)} (High Win)
                        </span>
                      </td>
                      <td className="p-3 text-right font-sans">
                        <button
                          onClick={() => handleCopyKeyword(kgr.keyword)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[11px] inline-flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                        >
                          {copiedKeyword === kgr.keyword ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-400" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Proposed 15-Page Site Architecture */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Recommended 15-Page Launch Architecture
              </h3>
              <span className="text-xs text-slate-500">Satisfies AdSense "Depth of Content"</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {niche.siteArchitecture.map((page, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-xs">{page.title}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-white text-slate-600 border border-slate-200 rounded-full font-semibold">
                      {page.targetWords} words
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#9d62ec] font-semibold mb-2">{page.slug}</p>
                  <div className="flex flex-wrap gap-1">
                    {page.contentStructure.map((section, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                        • {section}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monetization & Layout Blueprint */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              AdSense Layout & Placement Strategy (Zero Policy Violations)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-500 mb-1 font-semibold">Recommended Ad Units:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {niche.monetizationBlueprint.recommendedAdUnits.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-slate-500 mb-1 font-semibold">Viewability Optimization:</p>
                <p className="text-slate-700">{niche.monetizationBlueprint.viewabilityStrategy}</p>
                <p className="text-slate-500 mt-2 font-semibold">Tier 1 Traffic Mix: <span className="text-slate-800 font-normal">{niche.monetizationBlueprint.tier1TrafficShare}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Based on historical AdSense publisher benchmark data for this category.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close Blueprint
            </button>
            <button
              onClick={() => {
                onSimulateInCalculator(niche.rpmRange.avg);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#9d62ec] hover:bg-[#8b4de3] text-white font-bold text-xs transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              Simulate in Profit Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
