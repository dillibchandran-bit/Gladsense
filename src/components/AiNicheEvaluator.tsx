import React, { useState } from 'react';
import { AiEvaluationResult } from '../types';
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, ShieldCheck, DollarSign, Cpu, TrendingUp, Copy, Check, ExternalLink, Receipt, Wallet, HelpCircle } from 'lucide-react';
import { KidExplainer } from './KidExplainer';

interface AiNicheEvaluatorProps {
  onSimulateRpm: (rpm: number) => void;
}

export const AiNicheEvaluator: React.FC<AiNicheEvaluatorProps> = ({ onSimulateRpm }) => {
  const [nicheName, setNicheName] = useState<string>('Epoxy Resin & Woodworking Volume Estimators');
  const [targetAudience, setTargetAudience] = useState<string>('Woodworkers, DIY river table makers, hobbyist epoxy crafters');
  const [description, setDescription] = useState<string>('Client-side volume, mixing ratio, and cost estimators for epoxy pours with educational curing guides.');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AiEvaluationResult | null>(null);
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(true);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nicheName.trim()) return;

    setLoading(true);
    setError(null);
    setWarningMsg(null);

    try {
      const res = await fetch('/api/evaluate-niche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nicheName, targetAudience, description }),
      });

      if (!res.ok) {
        throw new Error(`Failed to evaluate niche: ${res.statusText}`);
      }

      const data = await res.json();
      setResult(data.evaluation);
      setIsAiGenerated(Boolean(data.isAiGenerated));
      if (data.warning) {
        setWarningMsg(data.warning);
      }
    } catch (err: any) {
      console.error(err);
      setError('Evaluation service was temporarily unable to respond. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header (Google Style) */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#1a73e8]" />
              AI Feasibility Evaluator
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• Gemini Publisher Policy Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            Custom Niche & AdSense Viability Assessment
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Test any website idea against Google AdSense Publisher Policies, estimated Page RPM, low-competition KGR keywords, and $0 static hosting feasibility.
          </p>
        </div>
      </div>

      <KidExplainer
        title="AI Niche Feasibility Evaluator"
        what="An intelligence engine that analyzes custom website concepts against Google's publisher policies and advertiser auction benchmarks."
        why="Building an entire site takes substantial effort. Validating your niche beforehand prevents investing in restricted topics."
        how="Enter your concept, target audience, and brief description below, then click 'Run Evaluation'."
        result="Receive an approval score, projected Page RPM range, low-competition keyword angles, and structural blueprint suggestions."
      />

      {/* Input Form */}
      <form onSubmit={handleEvaluate} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Niche or Website Name / Topic *
            </label>
            <input
              type="text"
              required
              value={nicheName}
              onChange={(e) => setNicheName(e.target.value)}
              placeholder="e.g. Solar panel angle and battery storage sizing"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#9d62ec]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Off-grid homeowners, RV campers, DIY solar installers"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#9d62ec]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Proposed Tool Concept or Content Structure
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what calculators or guides you want to offer..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#9d62ec]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500">
            Evaluated against Google AdSense Thin Content & YMYL policy guidelines.
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#9d62ec] hover:bg-[#8b4de3] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-purple-500/20 flex items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Auditing Niche Feasibility...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Evaluate Niche Viability</span>
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Evaluation Results Display */}
      {result && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          {/* Header & Overall Score */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9d62ec]">
                  AdSense Feasibility Report
                </span>
                <span className="text-xs text-slate-400">• {result.nicheName}</span>
                {isAiGenerated ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
                    Live Gemini Evaluation
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                    Algorithmic AdSense Auditor
                  </span>
                )}
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Overall Niche Viability Score: <span className="text-emerald-700 font-mono">{result.verdictScore}/100</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {result.verdictReasoning}
              </p>
              {warningMsg && (
                <p className="text-[11px] text-amber-800 mt-1.5 flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 max-w-2xl font-medium">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                  <span>{warningMsg}</span>
                </p>
              )}
            </div>

            <button
              onClick={() => onSimulateRpm(result.estimatedRPM.average)}
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              <span>Simulate ${result.estimatedRPM.average} RPM in Calculator</span>
            </button>
          </div>

          {/* AdSense Approval Probability Card */}
          {(() => {
            const approvalRate =
              result.approvalProbability ??
              (result.policyApprovalRisk === 'High' ? 58 : result.policyApprovalRisk === 'Medium' ? 78 : 94);
            const factors = result.approvalFactors ?? {
              policyCompliance: result.policyApprovalRisk === 'High' ? 68 : 96,
              thinContentSafety: 94,
              ymylSafety: result.policyApprovalRisk === 'High' ? 45 : 97,
              commercialDemand: 91,
            };
            const isHigh = approvalRate >= 90;
            const isMed = approvalRate >= 75 && approvalRate < 90;

            return (
              <div
                className={`p-5 rounded-2xl border ${
                  isHigh
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isMed
                    ? 'bg-purple-50/40 border-purple-200'
                    : 'bg-amber-50/40 border-amber-200'
                } space-y-3 shadow-2xs`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isHigh
                          ? 'bg-emerald-100 text-emerald-700'
                          : isMed
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          AdSense Approval Probability
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isHigh
                              ? 'bg-emerald-100 text-emerald-800'
                              : isMed
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isHigh ? 'High Approval Outlook' : isMed ? 'Moderate Approval Outlook' : 'Elevated Policy Risk'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {isHigh
                          ? 'Safe from "Thin Content" and YMYL algorithmic filters when structured with 15+ tool pages and 800+ words of explanatory theory.'
                          : isMed
                          ? 'Moderate approval rate. Ensure every calculator is accompanied by detailed formula derivations and worked examples.'
                          : 'Sensitive niche category. High likelihood of automated bot rejection under YMYL or personal advice filters; pivot towards pure mathematical tools.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 shrink-0 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span
                      className={`text-2xl font-black font-mono ${
                        isHigh ? 'text-emerald-700' : isMed ? 'text-purple-700' : 'text-amber-700'
                      }`}
                    >
                      {approvalRate}%
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Likelihood</span>
                  </div>
                </div>

                {/* 4 Factor Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="flex justify-between text-slate-600 text-[11px] font-semibold mb-1">
                      <span>Policy Compliance</span>
                      <span className="font-mono text-emerald-700 font-bold">{factors.policyCompliance}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${factors.policyCompliance}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">TOS & Cookie/GDPR</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="flex justify-between text-slate-600 text-[11px] font-semibold mb-1">
                      <span>Thin Content Shield</span>
                      <span className="font-mono text-emerald-700 font-bold">{factors.thinContentSafety}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${factors.thinContentSafety}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">Tool + guide depth</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="flex justify-between text-slate-600 text-[11px] font-semibold mb-1">
                      <span>YMYL Safety</span>
                      <span className="font-mono text-purple-700 font-bold">{factors.ymylSafety}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${factors.ymylSafety}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">Non-financial/medical</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="flex justify-between text-slate-600 text-[11px] font-semibold mb-1">
                      <span>Advertiser Demand</span>
                      <span className="font-mono text-emerald-700 font-bold">{factors.commercialDemand}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${factors.commercialDemand}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">Active auction demand</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Metrics Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Estimated RPM</span>
              </div>
              <p className="text-lg font-black text-emerald-700">
                ${result.estimatedRPM.min} - ${result.estimatedRPM.max}
              </p>
              <p className="text-[10px] text-slate-400">Avg: ${result.estimatedRPM.average} / 1k views</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Competition Level</span>
              </div>
              <p className="text-lg font-black text-slate-900">{result.competitionScore}</p>
              <p className="text-[10px] text-slate-400">Market saturation rate</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Policy Rejection Risk</span>
              </div>
              <p className="text-lg font-black text-slate-900">{result.policyApprovalRisk}</p>
              <p className="text-[10px] text-slate-400">Thin content & YMYL factor</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hosting Feasibility</span>
              </div>
              <p className="text-lg font-black text-emerald-700">$0 Static Ready</p>
              <p className="text-[10px] text-slate-400">Cloudflare Pages compatible</p>
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                AdSense Policy Outlook & Risk Guardrails
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {result.policyRiskExplanation}
              </p>
              <p className="text-slate-500 text-[11px] pt-1">
                <strong>Recommended Architecture:</strong> {result.recommendedModel}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Search Competition & Dwell Time Strategy
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {result.competitionSummary}
              </p>
              <p className="text-slate-500 text-[11px] pt-1">
                <strong>Session Duration Advantage:</strong> {result.monetizationBlueprint.dwellTimeAdvantage}
              </p>
            </div>
          </div>

          {/* Monthly Budget, Expenses vs Income & Net Profit */}
          {(() => {
            const nums = result.trafficPotentialMonthly?.replace(/,/g, '').match(/\d+/g) || [];
            const estimatedMonthlyViews = nums.length >= 2 ? Math.round((Number(nums[0]) + Number(nums[1])) / 2) : 45000;
            const grossIncome = (estimatedMonthlyViews / 1000) * result.estimatedRPM.average;
            const monthlyExpenses = 0.85; // $10.18/yr domain amortized
            const netProfit = Math.max(0, grossIncome - monthlyExpenses);
            const annualNetProfit = netProfit * 12;
            const netMargin = grossIncome > 0 ? ((netProfit / grossIncome) * 100).toFixed(1) : '0';

            return (
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <Receipt className="w-4 h-4 text-emerald-600" />
                      <span>Estimated Monthly Budget & Net Profitability (Expenses vs. Income)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Estimated based on ~{estimatedMonthlyViews.toLocaleString()} monthly visits @ ${result.estimatedRPM.average} benchmark RPM.
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {netMargin}% Net Margin
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200">
                    <span className="text-[11px] text-emerald-800 font-semibold block">Gross Monthly Income</span>
                    <p className="text-xl font-black text-emerald-700 font-mono mt-0.5">
                      +${grossIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">AdSense RPM: ${result.estimatedRPM.average} / 1k</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-700 font-semibold block">Operating Expenses (Budget)</span>
                    <p className="text-xl font-black text-slate-800 font-mono mt-0.5">
                      -${monthlyExpenses.toFixed(2)}/mo
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">$10.18/yr domain • $0 hosting</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200">
                    <span className="text-[11px] text-purple-800 font-semibold block">Estimated Net Profit</span>
                    <p className="text-xl font-black text-[#7939d2] font-mono mt-0.5">
                      +${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
                    </p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1">
                      +${annualNetProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr take-home
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Generated KGR Keywords */}
          {result.kgrKeywords && result.kgrKeywords.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Suggested Low-Competition KGR Keywords to Target First
              </h4>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3 border-b border-slate-200 font-sans">Target Query</th>
                      <th className="p-3 text-center border-b border-slate-200">Search Vol</th>
                      <th className="p-3 text-center border-b border-slate-200">KGR Score</th>
                      <th className="p-3 text-right font-sans border-b border-slate-200">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {result.kgrKeywords.map((k, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 text-slate-800 font-sans font-medium">{k.keyword}</td>
                        <td className="p-3 text-center text-slate-600">{k.estimatedVolume}</td>
                        <td className="p-3 text-center text-emerald-700 font-bold">
                          {k.kgrScore.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-sans">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://www.google.com/search?q=allintitle:%22${encodeURIComponent(k.keyword)}%22`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 bg-slate-100 hover:bg-purple-50 hover:text-[#9d62ec] hover:border-purple-200 border border-slate-200 text-slate-700 rounded-full text-[11px] inline-flex items-center gap-1 font-semibold transition-colors shadow-2xs"
                              title="Verify AllInTitle Live on Google"
                            >
                              <ExternalLink className="w-3 h-3 text-purple-600" />
                              <span className="hidden sm:inline">Google Live</span>
                            </a>
                            <button
                              onClick={() => handleCopy(k.keyword)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[11px] inline-flex items-center gap-1 font-semibold transition-colors shadow-2xs cursor-pointer"
                            >
                              {copiedKeyword === k.keyword ? (
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
