import React from 'react';
import { Sparkles } from 'lucide-react';

interface KidExplainerProps {
  what: string;
  why: string;
  how: string;
  result: string;
  toolNumber?: number | string;
  title?: string;
  badge?: string;
  className?: string;
}

export const KidExplainer: React.FC<KidExplainerProps> = ({
  what,
  why,
  how,
  result,
  toolNumber,
  title,
  badge = 'QUICK GUIDE',
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl border border-[#dadce0] bg-[#f8f9fa] p-5 shadow-xs text-xs text-[#202124] ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#dadce0]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-normal bg-[#e8f0fe] text-[#1a73e8]">
            <Sparkles className="w-3 h-3 text-[#1a73e8]" />
            {badge}
          </span>
          {title && (
            <h4 className="font-['Google_Sans',sans-serif] font-medium text-[#202124] text-sm sm:text-base tracking-normal">
              {toolNumber ? `${toolNumber}. ` : ''}{title}
            </h4>
          )}
        </div>
        <span className="text-[11px] font-normal text-[#5f6368] bg-white px-2.5 py-0.5 rounded-md border border-[#dadce0]">
          Overview: What • Why • How • Result
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* WHAT */}
        <div className="bg-white p-4 rounded-xl border border-[#dadce0] shadow-xs space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#1a73e8] font-medium mb-1.5">
              <span className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center text-[11px] font-bold shrink-0">
                1
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold">WHAT IS THIS?</span>
            </div>
            <p className="text-[#3c4043] text-xs leading-relaxed">
              {what}
            </p>
          </div>
          <div className="pt-2 text-[11px] text-[#1a73e8] font-medium flex items-center gap-1 border-t border-[#f1f3f4]">
            <span>Clear definition</span>
          </div>
        </div>

        {/* WHY */}
        <div className="bg-white p-4 rounded-xl border border-[#dadce0] shadow-xs space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#1a73e8] font-medium mb-1.5">
              <span className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center text-[11px] font-bold shrink-0">
                2
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold">WHY IT MATTERS</span>
            </div>
            <p className="text-[#3c4043] text-xs leading-relaxed">
              {why}
            </p>
          </div>
          <div className="pt-2 text-[11px] text-[#5f6368] font-medium flex items-center gap-1 border-t border-[#f1f3f4]">
            <span>Approval & earnings impact</span>
          </div>
        </div>

        {/* HOW */}
        <div className="bg-white p-4 rounded-xl border border-[#dadce0] shadow-xs space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#1a73e8] font-medium mb-1.5">
              <span className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center text-[11px] font-bold shrink-0">
                3
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold">HOW TO USE IT</span>
            </div>
            <p className="text-[#3c4043] text-xs leading-relaxed">
              {how}
            </p>
          </div>
          <div className="pt-2 text-[11px] text-[#1a73e8] font-medium flex items-center gap-1 border-t border-[#f1f3f4]">
            <span>1-step action</span>
          </div>
        </div>

        {/* RESULT */}
        <div className="bg-white p-4 rounded-xl border border-[#dadce0] shadow-xs space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#188038] font-medium mb-1.5">
              <span className="w-5 h-5 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center text-[11px] font-bold shrink-0">
                4
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold">EXPECTED RESULT</span>
            </div>
            <p className="text-[#3c4043] text-xs leading-relaxed">
              {result}
            </p>
          </div>
          <div className="pt-2 text-[11px] text-[#188038] font-medium flex items-center gap-1 border-t border-[#f1f3f4]">
            <span>Target outcome</span>
          </div>
        </div>
      </div>
    </div>
  );
};
