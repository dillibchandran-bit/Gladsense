import React from 'react';
import {
  Compass,
  Calculator,
  CheckCircle2,
  DollarSign,
  Sparkles,
  Stethoscope,
  Zap,
} from 'lucide-react';
import { GoogleAdSenseLogo } from './GoogleAdSenseLogo';

export type NavTabType =
  | 'site-doctor'
  | 'single-click'
  | 'budget'
  | 'niches'
  | 'calculator'
  | 'kgr'
  | 'audit'
  | 'ai-evaluator';

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  auditPassedCount: number;
  totalAuditCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  auditPassedCount,
  totalAuditCount,
}) => {
  const readinessPercent = Math.round((auditPassedCount / totalAuditCount) * 100);

  const navItems: { id: NavTabType; label: string; badge?: string }[] = [
    { id: 'site-doctor', label: 'Home' },
    { id: 'single-click', label: '1-Click Fixes', badge: 'New' },
    { id: 'niches', label: 'Niche Ideas' },
    { id: 'calculator', label: 'Revenue Planner' },
    { id: 'budget', label: 'Budget & P&L' },
    { id: 'kgr', label: 'SEO Keywords' },
    { id: 'audit', label: 'Compliance Audit' },
    { id: 'ai-evaluator', label: 'AI Evaluator' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#dadce0] text-[#202124]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Google AdSense Logo */}
          <div className="flex items-center gap-8">
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setActiveTab('site-doctor')}
            >
              <GoogleAdSenseLogo />
            </div>

            {/* Desktop Google Style Nav links with blue active underline */}
            <nav className="hidden xl:flex items-center space-x-1 h-16">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative h-16 px-3.5 text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'text-[#1a73e8] font-medium'
                        : 'text-[#5f6368] hover:text-[#202124]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-[#e8f0fe] text-[#1a73e8]">
                        {item.badge}
                      </span>
                    )}
                    {/* Active Blue Bottom Underline Indicator (exact Google AdSense style) */}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[3px] bg-[#1a73e8] rounded-t-sm" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons (Sign in / Sign up exactly like google.com/adsense/start/) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('audit')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#1a73e8] hover:bg-[#f8f9fa] rounded-md transition-colors"
            >
              <span>Score: {readinessPercent}%</span>
            </button>

            {/* Google Pill "Sign in" Button */}
            <button
              onClick={() => setActiveTab('site-doctor')}
              className="px-5 py-2 text-sm font-medium text-[#1a73e8] hover:bg-[#f1f3f4] rounded-full border border-[#dadce0] transition-colors cursor-pointer"
            >
              Sign in
            </button>

            {/* Google Solid Blue "Sign up" Button */}
            <button
              onClick={() => {
                setActiveTab('single-click');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2 text-sm font-medium text-white bg-[#1a73e8] hover:bg-[#1765cc] rounded-full transition-all shadow-xs cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Medium and Mobile Horizontal Scroll Bar */}
        <div className="xl:hidden flex space-x-1 overflow-x-auto scrollbar-none py-2 border-t border-[#f1f3f4] text-xs font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors flex items-center gap-1 shrink-0 ${
                  isActive
                    ? 'bg-[#e8f0fe] text-[#1a73e8] font-semibold'
                    : 'text-[#5f6368] hover:bg-[#f8f9fa] hover:text-[#202124]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
