import React, { useState } from 'react';
import { RevenueEstimation } from '../types';
import { DollarSign, TrendingUp, Layers, HelpCircle, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

interface WebsiteRevenueCardProps {
  estimation: RevenueEstimation;
  domainUrl: string;
  onOpenCalculator?: () => void;
}

export const WebsiteRevenueCard: React.FC<WebsiteRevenueCardProps> = ({
  estimation,
  domainUrl,
  onOpenCalculator,
}) => {
  const [selectedViews, setSelectedViews] = useState<number>(estimation.monthlyPageviewsBaseline);

  // Compute earnings for selected traffic view
  const currentEarnings = Math.round((selectedViews / 1000) * estimation.nicheRpmRange.avg);
  const currentAnnual = currentEarnings * 12;

  let host = domainUrl;
  try {
    host = new URL(domainUrl.startsWith('http') ? domainUrl : `https://${domainUrl}`).hostname;
  } catch {
    host = domainUrl;
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-[#131b2e] to-[#0f172a] text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" />
                <span>AdSense Earnings Estimation</span>
              </span>
              <span className="text-xs text-slate-400">
                • Domain: <strong className="text-white font-mono">{host}</strong>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Estimated ${estimation.estimatedEarnings.avgMonthly.toLocaleString()} / mo
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Based on the site's detected niche (<strong className="text-emerald-400">{estimation.detectedNiche}</strong>), ad placement density, and historical Google Publisher benchmarks.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left min-w-[130px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Detected RPM Range
              </span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                ${estimation.nicheRpmRange.min} – ${estimation.nicheRpmRange.max}
              </span>
              <span className="text-[10px] text-slate-400 block">per 1,000 views</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left min-w-[130px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Annual Run Rate
              </span>
              <span className="text-lg font-black text-white font-mono">
                ${estimation.estimatedEarnings.avgAnnual.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 block">at 50k views/mo</span>
            </div>
          </div>
        </div>

        {/* Ad Stack & Tech Detected Footprint */}
        <div className="pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
            Detected Ad Stack & Monetization Infrastructure:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${estimation.detectedAdTech.hasAdSense ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-slate-600'}`}></span>
              <div className="text-xs">
                <span className="font-bold text-white block">Google AdSense</span>
                <span className="text-[10px] text-slate-400">
                  {estimation.detectedAdTech.hasAdSense ? 'Active Script Detected' : 'Not Loaded / Pre-Approval'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${estimation.detectedAdTech.hasGooglePublisherTag ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-slate-600'}`}></span>
              <div className="text-xs">
                <span className="font-bold text-white block">Google Ad Manager (DFP)</span>
                <span className="text-[10px] text-slate-400">
                  {estimation.detectedAdTech.hasGooglePublisherTag ? 'GPT Tags Active' : 'Standard AdSense Units'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${estimation.detectedAdTech.hasHeaderBidding ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-slate-600'}`}></span>
              <div className="text-xs">
                <span className="font-bold text-white block">Header Bidding / Prebid</span>
                <span className="text-[10px] text-slate-400">
                  {estimation.detectedAdTech.hasHeaderBidding ? 'Multi-Exchange Enabled' : 'Direct AdSense Feed'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${estimation.detectedAdTech.hasAffiliateLinks ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-slate-600'}`}></span>
              <div className="text-xs">
                <span className="font-bold text-white block">Affiliate Monetization</span>
                <span className="text-[10px] text-slate-400">
                  {estimation.detectedAdTech.hasAffiliateLinks ? 'Amazon / Partner Links' : 'Zero Commercial Links'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium">Active Ad Layout:</span>
            {estimation.detectedAdTech.adPlacementsDetected.map((placement, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium"
              >
                {placement}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Traffic Tier Explorer */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Explore Earnings by Monthly Traffic Volume</span>
            </h4>
            <p className="text-xs text-slate-600">
              Select or slide to test how much this website makes as traffic scales up:
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Projected Monthly Payout</span>
            <span className="text-2xl font-black text-slate-950 font-mono">
              ${currentEarnings.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              (${currentAnnual.toLocaleString()} / year)
            </span>
          </div>
        </div>

        {/* Traffic Tier Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {estimation.trafficTiers.map((tier) => {
            const isSelected = selectedViews === tier.pageviews;
            return (
              <button
                key={tier.pageviews}
                type="button"
                onClick={() => setSelectedViews(tier.pageviews)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#1a73e8] shadow-md ring-2 ring-blue-100'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  {tier.pageviews.toLocaleString()} Views
                </span>
                <span className="text-sm font-black text-slate-900 block my-0.5 font-mono">
                  ${tier.monthlyEarnings.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block">
                  / month
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Info Box */}
        <div className="mt-5 p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-slate-600">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Calculated using GladSense's zero-cost algorithmic model combining <strong>{estimation.detectedNiche}</strong> RPMs with detected on-page ad density.
            </span>
          </div>

          {onOpenCalculator && (
            <button
              type="button"
              onClick={onOpenCalculator}
              className="text-xs font-bold text-[#1a73e8] hover:text-[#1765cc] transition-colors inline-flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Custom RPM Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
