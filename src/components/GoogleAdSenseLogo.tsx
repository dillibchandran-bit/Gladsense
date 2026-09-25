import React from 'react';
import { Sparkles, Smile } from 'lucide-react';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export const GoogleAdSenseLogo: React.FC<LogoProps> = ({
  className = '',
  showSubtitle = false,
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Friendly, Distinctive GladSense Badge (Cheerful Shield/Smile emblem) */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1a73e8] via-[#2684fc] to-[#00b06f] shadow-xs text-white shrink-0">
        <Smile className="w-5 h-5 text-white stroke-[2.4]" />
        {/* Verification Sparkle */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#fbbc04] ring-2 ring-white flex items-center justify-center">
          <Sparkles className="w-2 h-2 text-[#202124]" />
        </span>
      </div>

      {/* Brand Text: GladSense (Glad in Bold Dark, Sense in Brand Blue) */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1">
          <span className="font-['Google_Sans_Display','Google_Sans',sans-serif] text-[21px] font-bold text-[#202124] tracking-tight">
            Glad<span className="text-[#1a73e8]">Sense</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] ml-1">
            Auditor
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-[#5f6368] font-medium tracking-normal -mt-0.5">
            Website Auditor for Google AdSense
          </span>
        )}
      </div>
    </div>
  );
};
