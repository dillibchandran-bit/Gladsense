import React, { useState } from 'react';
import { Niche, NicheCategory, CompetitionLevel } from '../types';
import {
  Search,
  ArrowUpDown,
  ChevronRight,
  Check,
  Sparkles,
  DollarSign,
  Clock,
  ShieldCheck,
  Zap,
  Filter,
  HelpCircle,
} from 'lucide-react';
import { KidExplainer } from './KidExplainer';

interface NicheExplorerProps {
  niches: Niche[];
  onSelectNiche: (niche: Niche) => void;
  onSimulateInCalculator: (rpm: number) => void;
  onOpenAiIdea: () => void;
}

export const NicheExplorer: React.FC<NicheExplorerProps> = ({
  niches,
  onSelectNiche,
  onSimulateInCalculator,
  onOpenAiIdea,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rpm' | 'traffic' | 'dwell' | 'approval'>('rpm');
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Net Profit Estimation Helper for cards (Gross Revenue - $0.85/mo wholesale domain cost)
  const getNetProfitPreview = (niche: Niche) => {
    const nums = niche.trafficPotential.replace(/,/g, '').match(/\d+/g);
    const midTraffic = nums && nums.length >= 2 ? Math.round((Number(nums[0]) + Number(nums[1])) / 2) : 65000;
    const gross = (midTraffic / 1000) * niche.rpmRange.avg;
    const net = Math.max(0, gross - 0.85);
    return Math.round(net);
  };

  const categories: Array<'All' | NicheCategory> = [
    'All',
    'Trades & Craft',
    'Academic & Lab',
    'Civic & Bureaucracy',
    'Audio & Media',
    'Hobby & Care',
  ];

  // Filtering
  const filteredNiches = niches.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesCompetition = selectedCompetition === 'All' || n.competition === selectedCompetition;

    return matchesSearch && matchesCategory && matchesCompetition;
  });

  // Sorting
  const sortedNiches = [...filteredNiches].sort((a, b) => {
    if (sortBy === 'approval') {
      return b.approvalProbability - a.approvalProbability;
    }
    if (sortBy === 'rpm') {
      return b.rpmRange.avg - a.rpmRange.avg;
    }
    if (sortBy === 'dwell') {
      return b.avgDwellTime.localeCompare(a.avgDwellTime);
    }
    return 0;
  });

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
    } else {
      if (compareIds.length < 3) {
        setCompareIds([...compareIds, id]);
      }
    }
  };

  const comparedNiches = niches.filter((n) => compareIds.includes(n.id));

  return (
    <div className="space-y-6">
      {/* Top Strategy Banner (Google Style) */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              High-RPM Niche Directory
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• Zero Server Cost ($0/mo)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-normal text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            Vetted Micro-Tool & Problem-Solver Niches
          </h1>
          <p className="text-xs sm:text-sm text-[#5f6368] max-w-3xl mt-1 leading-relaxed">
            Every topic below is pre-tested: high visitor demand, low competition, $12–$35 AdSense RPMs, and 95%+ Google approval rate.
          </p>
        </div>

        <button
          onClick={onOpenAiIdea}
          className="shrink-0 px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1765cc] text-white font-medium text-xs sm:text-sm rounded-full transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Test Custom Idea with AI</span>
        </button>
      </div>

      <KidExplainer
        title="Website Topic Ideas"
        what="A menu of proven website ideas (like a menu at an ice cream shop). Each one is a real utility website people use every day."
        why="Most beginners start travel or movie review blogs where competition is impossible and Google rejects 95% of them. These topics have near-zero competition!"
        how="Click on any topic card below (like 'Epoxy Resin Tables' or 'Sourdough Bread Calculator') to see the complete blueprint."
        result="You see the exact pages to build, easy Google keywords to rank for, and how much money it will make you every month!"
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search keywords, tools, or craft..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#9d62ec] shadow-xs"
          />
        </div>

        {/* Sort & Competition Dropdowns */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-700 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-800 text-xs focus:outline-none cursor-pointer font-medium"
            >
              <option value="rpm">Sort: Highest AdSense RPM</option>
              <option value="approval">Sort: Approval Probability</option>
              <option value="dwell">Sort: Longest Dwell Time</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-700 shadow-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCompetition}
              onChange={(e) => setSelectedCompetition(e.target.value)}
              className="bg-transparent text-slate-800 text-xs focus:outline-none cursor-pointer font-medium"
            >
              <option value="All">All Competition</option>
              <option value="Very Low">Very Low Only</option>
              <option value="Low">Low Only</option>
              <option value="Medium-Low">Medium-Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Compare Bar if items selected */}
      {compareIds.length > 0 && (
        <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-purple-900">Comparing {compareIds.length} of 3 niches:</span>
            <div className="flex items-center gap-1.5">
              {comparedNiches.map((n) => (
                <span key={n.id} className="px-2.5 py-0.5 bg-white border border-purple-200 text-purple-800 rounded-full text-[11px] font-medium shadow-2xs">
                  {n.title.split(' ')[0]}...
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setCompareIds([])}
            className="text-xs text-purple-700 hover:text-purple-900 font-bold underline"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Niches Grid (Clean Semrush Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedNiches.map((niche) => {
          const isCompared = compareIds.includes(niche.id);

          return (
            <div
              key={niche.id}
              onClick={() => onSelectNiche(niche)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-purple-300 p-5 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {niche.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {niche.competition} Competition
                    </span>
                    <button
                      onClick={(e) => toggleCompare(niche.id, e)}
                      title="Compare side-by-side"
                      className={`p-1 rounded-md text-xs transition-colors ${
                        isCompared ? 'bg-purple-600 text-white font-bold' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#9d62ec] transition-colors leading-snug">
                  {niche.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {niche.tagline}
                </p>

                {/* Core Metric Highlights */}
                <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Avg RPM</span>
                    <span className="text-sm font-black text-emerald-600">
                      ${niche.rpmRange.avg} <span className="text-[10px] font-normal text-slate-500">/ 1k views</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Monthly Search</span>
                    <span className="text-xs font-bold text-slate-800">{niche.trafficPotential}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Dwell Time</span>
                    <span className="text-xs font-bold text-slate-800">{niche.avgDwellTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Monthly Budget</span>
                    <span className="text-xs font-bold text-slate-800">~$0.85/mo <span className="text-[9px] font-normal text-emerald-600">($0 host)</span></span>
                  </div>
                </div>

                {/* Net Profit & Budget Economics Snippet */}
                <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-900 font-semibold flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Est. Net Profit:
                  </span>
                  <span className="font-mono font-bold text-emerald-700">
                    +${getNetProfitPreview(niche).toLocaleString()}/mo <span className="text-[9px] font-normal text-emerald-800">(99.9% Margin)</span>
                  </span>
                </div>

                {/* AdSense Approval Probability Bar */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-[11px] text-slate-700 font-semibold">Approval Rate:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          niche.approvalProbability >= 95
                            ? 'bg-emerald-500'
                            : niche.approvalProbability >= 85
                            ? 'bg-purple-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${niche.approvalProbability}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-black font-mono ${
                        niche.approvalProbability >= 95
                          ? 'text-emerald-700'
                          : niche.approvalProbability >= 85
                          ? 'text-purple-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {niche.approvalProbability}%
                    </span>
                  </div>
                </div>

                {/* Top KGR keyword snippet */}
                <div className="mt-3 text-[11px] text-slate-600 bg-purple-50/60 px-3 py-1.5 rounded-lg border border-purple-100 flex items-center justify-between">
                  <span className="truncate">🎯 <em>"{niche.kgrKeywords[0].keyword}"</em></span>
                  <span className="text-purple-700 font-mono font-bold shrink-0 ml-1.5">
                    KGR: {niche.kgrKeywords[0].kgr.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSimulateInCalculator(niche.rpmRange.avg);
                  }}
                  className="text-slate-600 hover:text-emerald-700 flex items-center gap-1 font-semibold transition-colors"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Simulate Profit</span>
                </button>

                <span className="text-[#9d62ec] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View Blueprint <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side by side comparison drawer if 2 or 3 selected */}
      {comparedNiches.length >= 2 && (
        <div className="p-6 bg-white rounded-2xl border border-purple-200 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#9d62ec]" />
              Side-by-Side Niche Comparison
            </h3>
            <button
              onClick={() => setCompareIds([])}
              className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
            >
              Dismiss
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3 border-b border-slate-200">Attribute</th>
                  {comparedNiches.map((n) => (
                    <th key={n.id} className="p-3 text-slate-900 font-extrabold border-b border-slate-200">{n.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 text-slate-500 font-semibold">Category</td>
                  {comparedNiches.map((n) => (
                    <td key={n.id} className="p-3">{n.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-500 font-semibold">Avg AdSense RPM</td>
                  {comparedNiches.map((n) => (
                    <td key={n.id} className="p-3 text-emerald-700 font-bold">${n.rpmRange.avg} / 1,000 views</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-500 font-semibold">Competition Level</td>
                  {comparedNiches.map((n) => (
                    <td key={n.id} className="p-3">{n.competition}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-500 font-semibold">Monthly Traffic Cap</td>
                  {comparedNiches.map((n) => (
                    <td key={n.id} className="p-3">{n.trafficPotential}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-500 font-semibold">Average Dwell Time</td>
                  {comparedNiches.map((n) => (
                    <td key={n.id} className="p-3">{n.avgDwellTime}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-500 font-semibold">Policy Risk</td>
                  {comparedNiches.map((n) => (
                    <td key={n.id} className="p-3 text-emerald-700 font-semibold">{n.policyRisk}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-500 font-semibold">Approval Probability</td>
                  {comparedNiches.map((n) => (
                    <td key={n.id} className="p-3">
                      <span className="font-mono font-bold text-emerald-700">{n.approvalProbability}%</span>
                      <span className="text-[10px] text-slate-500 ml-1">
                        ({n.approvalProbability >= 95 ? 'Ultra-High' : 'High'})
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-500 font-semibold">Action</td>
                  {comparedNiches.map((n) => (
                    <td key={n.id} className="p-3">
                      <button
                        onClick={() => onSelectNiche(n)}
                        className="px-3 py-1.5 rounded-full bg-[#9d62ec] hover:bg-[#8b4de3] text-white font-semibold text-[11px] shadow-xs"
                      >
                        Inspect Architecture
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
