import React, { useState } from 'react';
import { AuditItem } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, Copy, Check, ShieldCheck, FileText, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { KidExplainer } from './KidExplainer';

interface AdSenseAuditProps {
  checklist: AuditItem[];
  onToggleItem: (id: string) => void;
}

export const AdSenseAudit: React.FC<AdSenseAuditProps> = ({ checklist, onToggleItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSnippetId, setExpandedSnippetId] = useState<string | null>('privacy-policy');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const passedCount = checklist.filter((item) => item.isPassed).length;
  const totalCount = checklist.length;
  const scorePercent = Math.round((passedCount / totalCount) * 100);

  const filteredItems = checklist.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) {
      return {
        label: 'Guaranteed AdSense Approval Blueprint Ready',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50/70 border-emerald-200',
        recommendation: 'Your site fulfills all primary human reviewer criteria and automated bot scans. Ready to submit application!',
      };
    }
    if (score >= 70) {
      return {
        label: 'Moderate Readiness - Minor Deficits',
        color: 'text-purple-700',
        bg: 'bg-purple-50/70 border-purple-200',
        recommendation: 'Good progress. Finish missing content depth or legal disclosures before applying to avoid a 4-week review delay.',
      };
    }
    return {
      label: 'High Risk of "Low Value Content" Rejection',
      color: 'text-rose-700',
      bg: 'bg-rose-50/70 border-rose-200',
      recommendation: 'Do NOT apply yet. Google will reject your application for "Site has insufficient content" or missing mandatory legal disclosures.',
    };
  };

  const scoreStatus = getScoreStatus(scorePercent);

  return (
    <div className="space-y-6">
      {/* Header Banner (Google Style) */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              Publisher Quality Compliance
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• Human Review Guidelines Checklist</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            Official Google AdSense Publisher Approval Audit
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Every policy standard Google's automated scanners and human inspectors verify before activating ad serving on your domain.
          </p>
        </div>
      </div>

      <KidExplainer
        title="Google AdSense Quality Checklist"
        what="A step-by-step verification checklist covering Google's content policies, webmaster navigation criteria, and legal requirements."
        why="Google rejects up to 85% of first-time applications due to 'Low Value Content' or missing mandatory publisher disclosures."
        how="Review each checkpoint below. When your site satisfies a requirement, mark the checkbox to track readiness."
        result="Achieve 90%+ readiness score before applying to secure direct, frictionless approval without 4-week review delays."
      />

      {/* Score Overview Card */}
      <div className={`p-6 rounded-2xl border ${scoreStatus.bg} bg-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 shadow-inner">
            <span className={`text-xl font-black font-mono ${scoreStatus.color}`}>
              {scorePercent}%
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className={`w-5 h-5 ${scoreStatus.color}`} />
              <h3 className={`text-base font-bold ${scoreStatus.color}`}>
                {scoreStatus.label}
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              {scoreStatus.recommendation}
            </p>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Completed {passedCount} of {totalCount} mandatory quality checkpoints.
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto text-center sm:text-right shrink-0">
          <button
            onClick={() => {
              checklist.forEach((item) => {
                if (!item.isPassed) onToggleItem(item.id);
              });
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            Mark All as Complete
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {['All', 'AdSense Policy', 'Content Depth', 'Navigation & UX', 'Technical & SEO'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Audit Checklist Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl bg-white border transition-all ${
              item.isPassed
                ? 'border-slate-200 shadow-2xs'
                : 'border-purple-200 bg-purple-50/20 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={item.isPassed}
                  onChange={() => onToggleItem(item.id)}
                  className="mt-1 h-4 w-4 rounded accent-[#9d62ec] cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-[11px] text-amber-800 mt-1.5 font-medium">
                    <strong>Why Google Cares:</strong> {item.whyGoogleCares}
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                    💡 <strong>Action Tip:</strong> {item.actionTip}
                  </p>
                </div>
              </div>

              {item.boilerplateSnippet && (
                <button
                  onClick={() =>
                    setExpandedSnippetId(expandedSnippetId === item.id ? null : item.id)
                  }
                  className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full border border-slate-200 flex items-center gap-1.5 shrink-0 transition-colors font-semibold"
                >
                  <FileText className="w-3.5 h-3.5 text-[#9d62ec]" />
                  <span>Template</span>
                  {expandedSnippetId === item.id ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              )}
            </div>

            {/* Expandable Boilerplate Policy Snippet */}
            {item.boilerplateSnippet && expandedSnippetId === item.id && (
              <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider">
                    Copy-Paste AdSense-Compliant Boilerplate
                  </span>
                  <button
                    onClick={() => handleCopySnippet(item.boilerplateSnippet!, item.id)}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-full border border-slate-200 text-[11px] inline-flex items-center gap-1 font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    {copiedSnippet === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy Template</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                  {item.boilerplateSnippet}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
