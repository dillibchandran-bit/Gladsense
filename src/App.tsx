/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Niche, AuditItem } from './types';
import { NICHES_DATA, ADSENSE_READINESS_CHECKLIST } from './data/nichesData';
import { Navbar } from './components/Navbar';
import { NicheExplorer } from './components/NicheExplorer';
import { NicheDetailModal } from './components/NicheDetailModal';
import { RevenueCalculator } from './components/RevenueCalculator';
import { KgrCalculator } from './components/KgrCalculator';
import { AdSenseAudit } from './components/AdSenseAudit';
import { BudgetBlueprint } from './components/BudgetBlueprint';
import { AiNicheEvaluator } from './components/AiNicheEvaluator';
import { SiteAuditor } from './components/SiteAuditor';
import { SingleClickSolutions } from './components/SingleClickSolutions';
import { NavTabType } from './components/Navbar';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('site-doctor');

  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [calculatorRpm, setCalculatorRpm] = useState<number>(22);

  // Persistent Audit Checklist
  const [checklist, setChecklist] = useState<AuditItem[]>(() => {
    const saved = localStorage.getItem('adsense_audit_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved checklist', e);
      }
    }
    return ADSENSE_READINESS_CHECKLIST;
  });

  useEffect(() => {
    localStorage.setItem('adsense_audit_checklist', JSON.stringify(checklist));
  }, [checklist]);

  const handleToggleAuditItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPassed: !item.isPassed } : item))
    );
  };

  const handleSimulateInCalculator = (rpm: number) => {
    setCalculatorRpm(rpm);
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const auditPassedCount = checklist.filter((item) => item.isPassed).length;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-[#202124] selection:bg-[#d2e3fc] selection:text-[#174ea6]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        auditPassedCount={auditPassedCount}
        totalAuditCount={checklist.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-white">
        {activeTab === 'site-doctor' && (
          <SiteAuditor onSwitchTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab !== 'site-doctor' && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'single-click' && <SingleClickSolutions />}

            {activeTab === 'budget' && <BudgetBlueprint />}

            {activeTab === 'niches' && (
              <NicheExplorer
                niches={NICHES_DATA}
                onSelectNiche={(niche) => setSelectedNiche(niche)}
                onSimulateInCalculator={handleSimulateInCalculator}
                onOpenAiIdea={() => setActiveTab('ai-evaluator')}
              />
            )}

            {activeTab === 'calculator' && (
              <RevenueCalculator initialRpm={calculatorRpm} />
            )}

            {activeTab === 'kgr' && <KgrCalculator />}

            {activeTab === 'audit' && (
              <AdSenseAudit
                checklist={checklist}
                onToggleItem={handleToggleAuditItem}
              />
            )}

            {activeTab === 'ai-evaluator' && (
              <AiNicheEvaluator onSimulateRpm={handleSimulateInCalculator} />
            )}
          </div>
        )}
      </main>

      {/* Blueprint Detail Modal */}
      {selectedNiche && (
        <NicheDetailModal
          niche={selectedNiche}
          onClose={() => setSelectedNiche(null)}
          onSimulateInCalculator={handleSimulateInCalculator}
        />
      )}

      {/* GladSense Official Footer with Statutory Trademark Disclaimer */}
      <footer className="mt-auto py-8 text-xs border-t border-[#dadce0] bg-[#f8f9fa] text-[#5f6368]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-['Google_Sans_Display','Google_Sans',sans-serif] font-bold text-sm text-[#202124]">
                Glad<span className="text-[#1a73e8]">Sense</span>
              </span>
              <span className="text-[#dadce0]">|</span>
              <span className="text-[#5f6368]">The Pre-Approval Site Auditor & Policy Doctor for Google AdSense</span>
            </div>
            <div className="flex items-center gap-6 text-[12px] text-[#5f6368]">
              <a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noreferrer" className="hover:text-[#1a73e8] transition-colors">
                Publisher Policies
              </a>
              <a href="https://support.google.com/adsense/answer/7532444" target="_blank" rel="noreferrer" className="hover:text-[#1a73e8] transition-colors">
                ads.txt Guide
              </a>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:text-[#1a73e8] transition-colors">
                Privacy
              </a>
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:text-[#1a73e8] transition-colors">
                Terms
              </a>
            </div>
          </div>
          <div className="pt-3 border-t border-[#f1f3f4] text-[11px] text-[#80868b] text-center sm:text-left">
            <p>
              Disclaimer: GladSense is an independent analytical tool and web application. GladSense is not affiliated with, endorsed by, sponsored by, or associated with Google LLC. Google and Google AdSense are registered trademarks of Google LLC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
