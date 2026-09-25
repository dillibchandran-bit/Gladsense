import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Copy,
  Check,
  HelpCircle,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Filter,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { KidExplainer } from './KidExplainer';

interface KgrItem {
  kw: string;
  vol: number;
  ait: number;
  kgr: number;
  category: string;
  intent?: string;
}

export const KgrCalculator: React.FC = () => {
  // Calculator State
  const [keyword, setKeyword] = useState<string>('epoxy resin table volume calculator deep pour');
  const [allInTitle, setAllInTitle] = useState<number>(14);
  const [searchVolume, setSearchVolume] = useState<number>(210);
  const [copiedKw, setCopiedKw] = useState<string | null>(null);

  // Search State for Any Keyword / Topic
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<KgrItem[] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [preVettedFilter, setPreVettedFilter] = useState<string>('');

  // KGR Calculation
  const kgrScore = searchVolume > 0 ? Number((allInTitle / searchVolume).toFixed(3)) : 0;

  const getVerdict = (kgr: number, vol: number) => {
    if (vol > 250) {
      return {
        label: 'Volume Exceeds Standard KGR (<250 recommended)',
        color: 'text-amber-800',
        bg: 'bg-amber-50 border-amber-200',
        icon: AlertTriangle,
        description:
          'While still rankable, classic KGR specifically targets queries under 250 monthly searches for rapid index ranking within 48-72 hours.',
      };
    }
    if (kgr < 0.25) {
      return {
        label: 'Outstanding KGR Candidate (< 0.25)',
        color: 'text-emerald-800',
        bg: 'bg-emerald-50 border-emerald-200',
        icon: CheckCircle2,
        description:
          'Rank in Google Top 10-30 within 48-72 hours of indexing! Minimal to zero competing domains have optimized this exact title.',
      };
    }
    if (kgr <= 1.0) {
      return {
        label: 'Moderate Opportunity (0.25 - 1.00)',
        color: 'text-purple-800',
        bg: 'bg-purple-50 border-purple-200',
        icon: HelpCircle,
        description:
          'Good ranking potential. Should reach the top 100 within 3-6 weeks as content matures.',
      };
    }
    return {
      label: 'High Competition (KGR > 1.00)',
      color: 'text-rose-800',
      bg: 'bg-rose-50 border-rose-200',
      icon: XCircle,
      description:
        'Too many pages have targeted this in their title tag. Requires high domain authority and external backlinks.',
    };
  };

  const verdict = getVerdict(kgrScore, searchVolume);
  const VerdictIcon = verdict.icon;

  const preVettedKeywords: KgrItem[] = [
    { kw: 'epoxy resin table volume calculator deep pour', vol: 210, ait: 14, kgr: 0.067, category: 'Trades', intent: 'Volume & depth solver' },
    { kw: 'bavarian formula gpa converter germany online', vol: 260, ait: 8, kgr: 0.031, category: 'Academic', intent: 'Foreign grade conversion' },
    { kw: 'hague apostille document checklist step by step', vol: 280, ait: 18, kgr: 0.064, category: 'Civic', intent: 'Legal document preparation' },
    { kw: 'sourdough hydration calculator including starter', vol: 380, ait: 24, kgr: 0.063, category: 'Food Science', intent: 'Baker flour/water percentage' },
    { kw: 'estimative index dry salt dosing calculator aquarium', vol: 280, ait: 16, kgr: 0.057, category: 'Hobby', intent: 'Planted tank fertilizer ratio' },
    { kw: 'bpm to milliseconds delay reverb calculator table', vol: 450, ait: 32, kgr: 0.071, category: 'Audio', intent: 'Studio sound design timing' },
    { kw: 'out of state car title transfer fee calculator california', vol: 410, ait: 29, kgr: 0.071, category: 'Civic', intent: 'DMV tax & fee estimation' },
    { kw: 'offset smoker firebox size calculator formula', vol: 190, ait: 9, kgr: 0.047, category: 'Trades', intent: 'BBQ airflow volume design' },
    { kw: 'solar battery amp hour wire gauge drop calculator', vol: 230, ait: 15, kgr: 0.065, category: 'Tech', intent: 'Off-grid electrical safety' },
    { kw: 'pottery glaze specific gravity hydrometer calculator', vol: 140, ait: 5, kgr: 0.036, category: 'Hobby', intent: 'Ceramic recipe consistency' },
  ];

  const categories = ['All', 'Trades', 'Academic', 'Civic', 'Food Science', 'Hobby', 'Audio', 'Tech'];

  // Handle Search for ANY keyword
  const handleSearchAnyKeyword = async (e?: React.FormEvent, customTerm?: string) => {
    if (e) e.preventDefault();
    const queryToSearch = customTerm || searchQuery;
    if (!queryToSearch.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch('/api/search-kgr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToSearch.trim() }),
      });

      if (!response.ok) {
        throw new Error('Search failed. Please try a different term.');
      }

      const data = await response.json();
      if (Array.isArray(data.keywords)) {
        setSearchResults(data.keywords);
      } else {
        setSearchResults([]);
      }
    } catch (err: any) {
      setSearchError(err?.message || 'Could not fetch keyword data.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKw(text);
    setTimeout(() => setCopiedKw(null), 2000);
  };

  const handleLoadIntoCalculator = (item: KgrItem) => {
    setKeyword(item.kw);
    setAllInTitle(item.ait);
    setSearchVolume(item.vol);
    // Smooth scroll to top of calculator on mobile
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Filtered pre-vetted list
  const filteredPreVetted = preVettedKeywords.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesText =
      preVettedFilter.trim() === '' ||
      item.kw.toLowerCase().includes(preVettedFilter.toLowerCase()) ||
      item.category.toLowerCase().includes(preVettedFilter.toLowerCase());
    return matchesCategory && matchesText;
  });

  return (
    <div className="space-y-6">
      {/* Introduction Header (Google Style) */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              SEO Discovery Tool
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• Keyword Golden Ratio (KGR)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            Find Low-Competition Keywords to Rank on Google
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Discover specific search queries that real people search on Google every week, where minimal competing sites have targeted the exact title.
          </p>
        </div>
      </div>

      <KidExplainer
        title="Keyword Golden Ratio (KGR)"
        what="A formula (AllInTitle results divided by monthly search volume) that uncovers search questions where minimal competition exists."
        why="High-competition keywords take months or years to rank for. KGR keywords allow new websites to rank on Google in days."
        how="Type any topic in the search box below or pick from our pre-vetted list. If KGR is under 0.25 (Green), it's a candidate."
        result="Fast indexing and first-page organic traffic from Google without external backlink campaigns."
      />

      {/* GOOGLE-STYLE KEYWORD DISCOVERY SEARCH BAR */}
      <div className="bg-white p-6 rounded-2xl border border-[#dadce0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-medium text-[#202124] flex items-center gap-2 font-['Google_Sans',sans-serif]">
              <Sparkles className="w-4 h-4 text-[#1a73e8]" />
              Search ANY Niche or Root Keyword for KGR Opportunities
            </h3>
            <p className="text-xs text-[#5f6368]">
              Type any topic (e.g., "epoxy resin", "solar wiring", "baking", "coffee roaster", "car title") to discover instant rankable phrases.
            </p>
          </div>
          {searchResults && (
            <button
              onClick={() => {
                setSearchResults(null);
                setSearchQuery('');
              }}
              className="text-xs text-[#1a73e8] hover:underline self-start sm:self-auto cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>

        <form onSubmit={(e) => handleSearchAnyKeyword(e)} className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5f6368]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter ANY keyword, product, calculation, or topic (e.g. sourdough hydration, offset smoker, gpa converter)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#dadce0] rounded-full text-xs sm:text-sm text-[#202124] placeholder:text-[#80868b] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#e8f0fe] shadow-xs"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1765cc] text-white font-medium text-xs sm:text-sm rounded-full transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Find Keywords</span>
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs text-slate-500">
          <span className="font-medium text-[11px] text-slate-400">Popular Searches:</span>
          {['epoxy resin', 'sourdough bread', 'offset smoker', 'aquarium dosing', 'solar battery', 'gpa converter', 'freelance tax'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setSearchQuery(term);
                handleSearchAnyKeyword(undefined, term);
              }}
              className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-[#9d62ec] hover:border-purple-200 border border-slate-200 text-[11px] text-slate-700 transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {searchError && (
          <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{searchError}</span>
          </div>
        )}
      </div>

      {/* DYNAMIC SEARCH RESULTS SECTION (Shown when user searches any keyword) */}
      {searchResults && (
        <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-md shadow-purple-900/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live KGR Results
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {searchResults.length} Opportunities Found for "{searchQuery}"
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                All results meet KGR criteria (<code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-mono font-bold">KGR &lt; 0.25</code>). Click any item to load into the solver or test on Google:
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Formula: AllInTitle / Volume
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {searchResults.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-purple-50/40 border border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between gap-2.5 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        item.category.includes('Exact') || idx === 0
                          ? 'bg-purple-100 text-[#7939d2] border-purple-300 font-extrabold flex items-center gap-1'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {(item.category.includes('Exact') || idx === 0) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9d62ec]"></span>
                      )}
                      {item.category.includes('Exact') ? '🎯 Exact Search Query' : item.category}
                    </span>
                    <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                      KGR: {item.kgr.toFixed(3)} (Golden)
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#9d62ec] transition-colors leading-snug">
                    {item.kw}
                  </p>

                  {item.intent && (
                    <p className="text-[11px] text-slate-500 mt-1">
                      Intent: <span className="text-slate-700 font-medium">{item.intent}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                    <span>Vol: <strong className="text-slate-900">{item.vol}</strong></span>
                    <span>•</span>
                    <span>AllInTitle: <strong className="text-slate-900">{item.ait}</strong></span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Direct Google Live Test Link */}
                    <a
                      href={`https://www.google.com/search?q=allintitle:%22${encodeURIComponent(item.kw)}%22`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-medium transition-colors flex items-center gap-1"
                      title="Verify Live AllInTitle on Google"
                    >
                      <ExternalLink className="w-3 h-3 text-purple-600" />
                      <span className="hidden sm:inline">Google Live</span>
                    </a>

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={() => handleCopy(item.kw)}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                      title="Copy Keyword"
                    >
                      {copiedKw === item.kw ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>

                    {/* Load Into Calculator Button */}
                    <button
                      type="button"
                      onClick={() => handleLoadIntoCalculator(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#9d62ec] hover:bg-[#8b4de3] text-white text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span>Simulate</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Left Column Calculator, Right Column Pre-Vetted Database */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Calculator (6 cols) */}
        <div className="lg:col-span-6 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#9d62ec]" />
              KGR Math Simulator
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Test Any Phrase</span>
          </div>

          {/* Keyword Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Target Keyword / Problem Phrase
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. epoxy resin volume calculator for river table"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#9d62ec]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* AllInTitle Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-slate-700 font-semibold">AllInTitle Results</label>
                <a
                  href={`https://www.google.com/search?q=allintitle:%22${encodeURIComponent(keyword)}%22`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#9d62ec] hover:underline flex items-center gap-0.5"
                >
                  <span>Verify on Google</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <input
                type="number"
                min="0"
                value={allInTitle}
                onChange={(e) => setAllInTitle(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:border-[#9d62ec]"
              />
              <p className="text-[10px] text-slate-500">
                Google operator: <code className="text-purple-700 bg-purple-50 px-1 py-0.5 rounded font-mono">allintitle:"{keyword || 'exact phrase'}"</code>
              </p>
            </div>

            {/* Monthly Search Volume */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-slate-700 font-semibold">Monthly Search Volume</label>
                <span className="text-[11px] text-slate-400 font-mono">&lt;250 is optimal</span>
              </div>
              <input
                type="number"
                min="1"
                value={searchVolume}
                onChange={(e) => setSearchVolume(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:border-[#9d62ec]"
              />
              <p className="text-[10px] text-slate-500">
                From free Google Keyword Planner or search autosuggest tools.
              </p>
            </div>
          </div>

          {/* Formula Display */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono flex items-center justify-between">
            <span className="text-slate-600">
              Formula: <span className="text-slate-900 font-bold">{allInTitle} (AllInTitle)</span> / <span className="text-slate-900 font-bold">{searchVolume} (Volume)</span>
            </span>
            <span className="text-emerald-700 font-black text-sm">
              = {kgrScore}
            </span>
          </div>

          {/* Verdict Box */}
          <div className={`p-4 rounded-xl border ${verdict.bg} space-y-2`}>
            <div className="flex items-center gap-2">
              <VerdictIcon className={`w-5 h-5 ${verdict.color}`} />
              <span className={`font-bold text-sm ${verdict.color}`}>
                {verdict.label}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {verdict.description}
            </p>
          </div>

          {/* Free 100% No-Cost Workflow Guide */}
          <div className="pt-3 border-t border-slate-100 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
              How to find these for $0 (No Ahrefs / Semrush needed)
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
              <li>Use <strong>Google Autocomplete</strong>: Type your root term (e.g., "epoxy resin calculator...") and observe suggested long-tail completions.</li>
              <li>Use free <strong>Google Keyword Planner</strong> to verify volume is ~100-300.</li>
              <li>Go to Google and search <code className="text-purple-700 bg-purple-50 px-1 py-0.5 rounded font-mono">allintitle:"exact phrase"</code> to count exact competing pages.</li>
              <li>If the result count is under 30-40, write a 1,000-word tool page targeting that exact title!</li>
            </ol>
          </div>
        </div>

        {/* Right Column: Pre-Vetted KGR Opportunities (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Pre-Vetted KGR Opportunities
                </h3>
                <span className="text-[11px] text-slate-500">
                  {filteredPreVetted.length} verified zero-competition queries
                </span>
              </div>
              <span className="text-xs text-emerald-700 font-semibold font-mono bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 self-start sm:self-auto">
                Ready to Target
              </span>
            </div>

            {/* Pre-vetted Search / Filter Box */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={preVettedFilter}
                  onChange={(e) => setPreVettedFilter(e.target.value)}
                  placeholder="Filter pre-vetted keywords by name or topic..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#9d62ec]"
                />
                <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#9d62ec] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword List Cards */}
            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredPreVetted.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                  No pre-vetted keywords match your filter. Try the search box above to discover new terms for any topic.
                </div>
              ) : (
                filteredPreVetted.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleLoadIntoCalculator(item)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200 hover:border-purple-200 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-white text-slate-700 rounded-md border border-slate-200">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-mono font-black">
                          KGR: {item.kgr.toFixed(3)}
                        </span>
                        {item.intent && (
                          <span className="text-[10px] text-slate-400 hidden sm:inline">
                            • {item.intent}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-900 font-semibold truncate group-hover:text-[#9d62ec] transition-colors">
                        {item.kw}
                      </p>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5 font-mono">
                        <span>Vol: {item.vol}</span>
                        <span>•</span>
                        <span>AllInTitle: {item.ait}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://www.google.com/search?q=allintitle:%22${encodeURIComponent(item.kw)}%22`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#9d62ec] transition-colors"
                        title="Verify Live on Google"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleCopy(item.kw)}
                        className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                        title="Copy Keyword"
                      >
                        {copiedKw === item.kw ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick FAQ Card on KGR */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900">Why KGR beats High-Volume keywords for AdSense:</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              If you target "concrete calculator" (100,000 search volume), you will compete against massive commercial aggregators and get 0 visitors for 2 years. If you target 20 long-tail KGR queries (e.g. "concrete bags for 10x10 slab 4 inches"), you rank on page 1 within 72 hours and aggregate <strong>50,000+ monthly visits</strong> with zero backlink expense!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
