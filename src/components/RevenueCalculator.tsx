import React, { useState } from 'react';
import { RevenueInputs } from '../types';
import { DollarSign, ShieldAlert, Sparkles, TrendingUp, Cpu, Info, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { KidExplainer } from './KidExplainer';

interface RevenueCalculatorProps {
  initialRpm?: number;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ initialRpm = 20 }) => {
  const [showKidExplainer, setShowKidExplainer] = useState<boolean>(true);
  const [inputs, setInputs] = useState<RevenueInputs>({
    monthlyVisitors: 35000,
    pagesPerVisit: 1.8,
    tier1Share: 75,
    baseRpm: initialRpm,
    adUnitsCount: 3,
    annualDomainCost: 10, // wholesale Cloudflare Registrar
    monthlyHostingCost: 0, // Cloudflare Pages / Vercel
    estimatedCtr: 1.8,
    estimatedCpc: 1.25,
  });

  // Calculate outputs
  const totalMonthlyPageviews = Math.round(inputs.monthlyVisitors * inputs.pagesPerVisit);
  const totalAnnualPageviews = totalMonthlyPageviews * 12;

  // Blended RPM adjustment based on Tier 1 geographic share:
  const geoMultiplier = (inputs.tier1Share / 100) * 1.0 + ((100 - inputs.tier1Share) / 100) * 0.35;
  const blendedRpm = Number((inputs.baseRpm * geoMultiplier).toFixed(2));

  const grossMonthlyRevenue = Number(((totalMonthlyPageviews / 1000) * blendedRpm).toFixed(2));
  const grossAnnualRevenue = Number((grossMonthlyRevenue * 12).toFixed(2));

  const totalAnnualHosting = inputs.monthlyHostingCost * 12;
  const totalAnnualCost = inputs.annualDomainCost + totalAnnualHosting;

  const netAnnualProfit = Number((grossAnnualRevenue - totalAnnualCost).toFixed(2));
  const netMonthlyProfit = Number((grossMonthlyRevenue - inputs.monthlyHostingCost - inputs.annualDomainCost / 12).toFixed(2));
  const profitMargin = grossAnnualRevenue > 0 ? ((netAnnualProfit / grossAnnualRevenue) * 100).toFixed(1) : '0';

  // Break even calculation
  const dailyGross = grossMonthlyRevenue / 30;
  const breakEvenDays = dailyGross > 0 ? Math.ceil(totalAnnualCost / dailyGross) : 0;

  return (
    <div className="space-y-6">
      {/* Title & Introduction (Google Style) */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              AdSense Revenue Simulator
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• Publisher Earnings Projection</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            Traffic, RPM & Net Profit Simulation Engine
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Move the visitor slider to see how many dollars Google puts in your bank account every single month based on real advertiser rates.
          </p>
        </div>

        <button
          onClick={() => setShowKidExplainer(!showKidExplainer)}
          className="self-start md:self-auto px-4 py-1.5 rounded-full border border-[#dadce0] bg-white text-[#5f6368] hover:bg-[#f8f9fa] text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#1a73e8]" />
          <span>{showKidExplainer ? 'Hide Quick Guide' : 'Show Quick Guide'}</span>
        </button>
      </div>

      {showKidExplainer && (
        <KidExplainer
          title="Google AdSense Revenue Simulator"
          what="A simulator that predicts how much real cash you earn when people visit your website and look at ads."
          why="Most people guess random numbers or believe crazy online myths. This tool calculates real dollars using official Google advertiser RPM rates."
          how="Drag the 'Monthly Visitors' slider to how many people visit your website each month (for example: 35,000 visitors)."
          result="Look at the big green number on the right! That is your true take-home pay after paying $0.85/month for your website."
        />
      )}

      {/* Main Grid: Inputs (Left) and Financial Dashboard (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Traffic & Monetization Parameters
            </h3>
            <button
              onClick={() =>
                setInputs({
                  monthlyVisitors: 45000,
                  pagesPerVisit: 2.0,
                  tier1Share: 80,
                  baseRpm: 22,
                  adUnitsCount: 3,
                  annualDomainCost: 10,
                  monthlyHostingCost: 0,
                  estimatedCtr: 1.8,
                  estimatedCpc: 1.25,
                })
              }
              className="text-xs text-[#9d62ec] hover:text-purple-700 font-semibold cursor-pointer"
            >
              Reset to Preset
            </button>
          </div>

          {/* Monthly Visitors Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-700 font-semibold">Monthly Unique Visitors</label>
              <span className="text-emerald-700 font-mono font-bold">
                {inputs.monthlyVisitors.toLocaleString()} visits / mo
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="2500"
              value={inputs.monthlyVisitors}
              onChange={(e) => setInputs({ ...inputs, monthlyVisitors: Number(e.target.value) })}
              className="w-full accent-[#9d62ec] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5,000 (Early launch)</span>
              <span>75,000 (Established tool)</span>
              <span>200,000 (Category leader)</span>
            </div>
          </div>

          {/* Pages per Visit Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-700 font-semibold">Pages per Visit (Tool Multiplier)</label>
              <span className="text-slate-900 font-mono font-bold">{inputs.pagesPerVisit.toFixed(1)} pages</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="3.5"
              step="0.1"
              value={inputs.pagesPerVisit}
              onChange={(e) => setInputs({ ...inputs, pagesPerVisit: Number(e.target.value) })}
              className="w-full accent-[#9d62ec] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Calculators with related conversion tools average 1.8 - 2.4 pageviews per user session.
            </p>
          </div>

          {/* Base Niche RPM */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-700 font-semibold">Base Niche RPM ($ per 1k views)</label>
              <span className="text-emerald-700 font-mono font-bold">${inputs.baseRpm.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="6"
              max="40"
              step="1"
              value={inputs.baseRpm}
              onChange={(e) => setInputs({ ...inputs, baseRpm: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$6 (General entertainment)</span>
              <span>$20 (Trades & Academic)</span>
              <span>$40 (B2B / Legal / Tech)</span>
            </div>
          </div>

          {/* Tier 1 Traffic Geographic Share */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-700 font-semibold">Tier 1 Traffic Share (US, CA, UK, AU)</label>
              <span className="text-purple-700 font-mono font-bold">{inputs.tier1Share}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={inputs.tier1Share}
              onChange={(e) => setInputs({ ...inputs, tier1Share: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Higher Tier 1 ratio dramatically scales your realized RPM; non-Tier 1 traffic yields lower CPM bids.
            </p>
          </div>

          {/* Cost Comparison: Static ($0) vs Traditional VPS/CMS */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Hosting & Domain Cost Comparison
              </h4>
              <span className="text-xs text-emerald-700 font-mono font-bold">
                Total Annual Cost: ${totalAnnualCost}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                  Annual Domain ($/yr)
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    value={inputs.annualDomainCost}
                    onChange={(e) => setInputs({ ...inputs, annualDomainCost: Math.max(0, Number(e.target.value)) })}
                    className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#9d62ec]"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Cloudflare wholesale: $10.18</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                  Monthly Hosting ($/mo)
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    value={inputs.monthlyHostingCost}
                    onChange={(e) => setInputs({ ...inputs, monthlyHostingCost: Math.max(0, Number(e.target.value)) })}
                    className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#9d62ec]"
                  />
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Cloudflare Pages: $0.00</span>
              </div>
            </div>

            {inputs.monthlyHostingCost > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  Notice: Paying ${inputs.monthlyHostingCost}/mo (${inputs.monthlyHostingCost * 12}/yr) for VPS or WordPress reduces your profit margin. With client-side micro-tools, this hosting cost can be strictly <strong>$0</strong> on Cloudflare Pages or Vercel.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Financial Results Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Profit Card (Semrush Style) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-purple-50 border border-slate-200 shadow-sm space-y-5">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                Net Annual Take-Home Profit
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight mt-1 font-mono">
                ${netAnnualProfit.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
                <span>Monthly: <strong className="text-slate-900 font-mono">${netMonthlyProfit.toLocaleString()}</strong></span>
                <span>•</span>
                <span>Margin: <strong className="text-emerald-700 font-mono">{profitMargin}%</strong></span>
              </div>
            </div>

            {/* Metric Rows */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Total Monthly Pageviews</span>
                <span className="text-slate-900 font-mono font-bold">
                  {totalMonthlyPageviews.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Blended Realized RPM</span>
                <span className="text-emerald-700 font-mono font-bold">
                  ${blendedRpm} <span className="text-[10px] text-slate-400">/ 1k views</span>
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Gross Monthly Revenue</span>
                <span className="text-slate-900 font-mono font-bold">
                  ${grossMonthlyRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Total Annual Infrastructure Cost</span>
                <span className="text-slate-700 font-mono font-bold">
                  ${totalAnnualCost.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 bg-emerald-100/70 px-3 rounded-xl border border-emerald-200">
                <span className="text-emerald-900 font-bold">Break-Even Velocity</span>
                <span className="text-emerald-800 font-mono font-black text-sm">
                  Day {breakEvenDays} of Year!
                </span>
              </div>
            </div>

            {/* Why Static Hosting is King */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>The $12/Yr Superpower</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                By hosting client-side on Cloudflare Pages, your server cost remains strictly $0 even if your traffic surges to 500,000 visitors. You keep <strong>{profitMargin}%</strong> of every ad dollar generated.
              </p>
            </div>
          </div>

          {/* AdSense Policy Placement Preview */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#9d62ec]" />
              <span>Compliant Ad Layout Diagram</span>
            </h4>
            <p className="text-[11px] text-slate-600">
              How to place 3 ad units without triggering AdSense penalties for deceptive placement:
            </p>

            {/* Mock Webpage Wireframe */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[10px] font-mono">
              <div className="h-5 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-500 font-sans font-medium">
                Site Navigation Bar & Breadcrumbs
              </div>
              <div className="h-7 bg-purple-50 border border-dashed border-purple-300 rounded flex items-center justify-center text-purple-800 font-semibold">
                [Unit 1: Responsive Top Leaderboard - 728x90]
              </div>
              <div className="h-14 bg-white border border-slate-200 rounded p-2 text-slate-700 font-sans">
                Tool Interactive Container (Inputs & Sliders)
              </div>
              <div className="h-10 bg-purple-50 border border-dashed border-purple-300 rounded flex items-center justify-center text-purple-800 font-semibold">
                [Unit 2: Result Rectangle - 300x250 (78% Active View)]
              </div>
              <div className="h-12 bg-white border border-slate-200 rounded p-1.5 text-slate-500 font-sans leading-tight">
                1,000 Words Educational Guide (Formula, Step-by-Step, FAQs)
              </div>
              <div className="h-6 bg-emerald-50 border border-emerald-300 rounded flex items-center justify-center text-emerald-800 font-bold">
                [Unit 3: Sticky Mobile Bottom Anchor - 320x50]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
