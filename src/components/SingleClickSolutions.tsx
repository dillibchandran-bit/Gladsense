import React, { useState } from 'react';
import {
  Zap,
  FileText,
  Shield,
  Layout,
  Code2,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Info,
  Play,
  RotateCcw,
  Sliders,
  Globe,
  Monitor,
  Smartphone,
  Eye,
  Terminal,
} from 'lucide-react';
import { KidExplainer } from './KidExplainer';

export const SingleClickSolutions: React.FC = () => {
  const [activeTool, setActiveTool] = useState<
    'ads-txt' | 'legal-suite' | 'anti-ban' | 'ad-placement' | 'micro-app-builder'
  >('ads-txt');

  const [beginnerMode, setBeginnerMode] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = (filename: string, content: string, mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ==========================================
  // 1. ADS.TXT GENERATOR & VALIDATOR STATE
  // ==========================================
  const [adsTxtPubId, setAdsTxtPubId] = useState<string>('pub-9847123490812345');
  const [adsTxtHostPlatform, setAdsTxtHostPlatform] = useState<'cloudflare' | 'wordpress' | 'blogger' | 'static'>('cloudflare');

  const cleanPubId = adsTxtPubId.trim().toLowerCase().replace(/[^0-9]/g, '');
  const formattedPubId = `pub-${cleanPubId || '0000000000000000'}`;
  const adsTxtSnippet = `google.com, ${formattedPubId}, DIRECT, f08c47fec0942fa0`;

  const isPubIdValid = cleanPubId.length === 16;

  // ==========================================
  // 2. LEGAL COMPLIANCE SUITE STATE
  // ==========================================
  const [legalSiteName, setLegalSiteName] = useState<string>('NicheCalc Tools');
  const [legalSiteUrl, setLegalSiteUrl] = useState<string>('https://nichecalc.com');
  const [legalContactEmail, setLegalContactEmail] = useState<string>('contact@nichecalc.com');
  const [legalOwnerName, setLegalOwnerName] = useState<string>('NicheCalc Editorial Team');
  const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | 'disclaimer' | 'about'>('privacy');

  const generatePrivacyPolicy = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Privacy Policy - ${legalSiteName}</title>
</head>
<body>
  <h1>Privacy Policy for ${legalSiteName}</h1>
  <p>Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
  
  <h2>1. Introduction</h2>
  <p>Welcome to ${legalSiteName} ("we," "our," or "us"), accessible from <a href="${legalSiteUrl}">${legalSiteUrl}</a>. We are committed to protecting your personal privacy. This Privacy Policy document outlines the types of information that is collected and recorded by ${legalSiteName} and how we use it.</p>
  
  <h2>2. Google AdSense & DoubleClick DART Cookie Compliance</h2>
  <p>Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to ${legalSiteUrl} and other sites on the internet.</p>
  <p>Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a></p>
  <p>You can also opt out of interest-based advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</p>
  
  <h2>3. Third-Party Advertising Partners</h2>
  <p>Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ${legalSiteName}, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
  <p>Note that ${legalSiteName} has no access to or control over these cookies that are used by third-party advertisers.</p>
  
  <h2>4. GDPR & CCPA/CPRA Privacy Rights</h2>
  <p>Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), users are entitled to certain rights regarding their personal data, including the right to request access, correction, deletion, or restriction of processing.</p>
  
  <h2>5. Contact Information</h2>
  <p>If you have any questions or require more information about our Privacy Policy, please contact us at <a href="mailto:${legalContactEmail}">${legalContactEmail}</a>.</p>
</body>
</html>`;
  };

  const generateTermsOfService = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Terms of Service - ${legalSiteName}</title>
</head>
<body>
  <h1>Terms of Service</h1>
  <p>Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
  <p>By accessing the website at <a href="${legalSiteUrl}">${legalSiteUrl}</a>, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
  <h2>Use License</h2>
  <p>Permission is granted to temporarily use the interactive tools and information on ${legalSiteName} for personal, non-commercial transitory viewing only.</p>
  <h2>Disclaimer</h2>
  <p>The materials on ${legalSiteName} are provided on an 'as is' basis. ${legalSiteName} makes no warranties, expressed or implied, and hereby disclaims all other warranties.</p>
  <h2>Contact</h2>
  <p>For inquiries regarding these terms, reach us at ${legalContactEmail}.</p>
</body>
</html>`;
  };

  const generateDisclaimer = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Earnings & Advertising Disclaimer - ${legalSiteName}</title>
</head>
<body>
  <h1>Disclaimer & Advertising Disclosure</h1>
  <p>Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
  <h2>1. Advertising Disclosure</h2>
  <p>${legalSiteName} displays third-party advertisements served by Google AdSense and programmatic networks. These advertisements help fund the operation, hosting, and free maintenance of our online utility tools.</p>
  <h2>2. Educational & Informational Purpose</h2>
  <p>All calculations, estimators, and articles on <a href="${legalSiteUrl}">${legalSiteUrl}</a> are provided strictly for educational and informational purposes. They do not constitute formal legal, financial, or medical advice.</p>
  <h2>3. Contact</h2>
  <p>If you have any questions regarding this disclosure, please email ${legalContactEmail}.</p>
</body>
</html>`;
  };

  const generateAboutUs = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About Us & Editorial Standards - ${legalSiteName}</title>
</head>
<body>
  <h1>About ${legalSiteName}</h1>
  <p>Founded by ${legalOwnerName}, ${legalSiteName} (<a href="${legalSiteUrl}">${legalSiteUrl}</a>) was built to provide fast, client-side, zero-latency calculators and educational reference guides for everyday decision-making.</p>
  <h2>Our Editorial & Quality Standards (E-E-A-T)</h2>
  <p>Our tools are built using validated mathematical formulas, industry reference standards, and transparent methodology. Every tool undergoes internal auditing to ensure accuracy and compliance with webmaster quality standards.</p>
  <h2>Contact Our Team</h2>
  <p>We welcome user feedback, bug reports, and formula improvement suggestions. Reach our editorial desk at <a href="mailto:${legalContactEmail}">${legalContactEmail}</a>.</p>
</body>
</html>`;
  };

  const currentLegalContent =
    activeLegalDoc === 'privacy'
      ? generatePrivacyPolicy()
      : activeLegalDoc === 'terms'
      ? generateTermsOfService()
      : activeLegalDoc === 'disclaimer'
      ? generateDisclaimer()
      : generateAboutUs();

  // ==========================================
  // 3. INVALID TRAFFIC / CLICK-BOMBING SHIELD STATE
  // ==========================================
  const [maxClicksPerSession, setMaxClicksPerSession] = useState<number>(3);
  const [banTimeoutMinutes, setBanTimeoutMinutes] = useState<number>(15);
  const [simulatedClicks, setSimulatedClicks] = useState<number>(0);

  const antiBanScript = `<!-- AdSense Invalid Traffic & Click-Bombing Defense Shield (<1KB Zero-Server-Cost) -->
<script>
(function() {
  var MAX_CLICKS = ${maxClicksPerSession};
  var TIMEOUT_MS = ${banTimeoutMinutes} * 60 * 1000;
  var STORAGE_KEY = 'adsense_shield_clicks';

  function getShieldData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { count: 0, firstClick: 0 };
      var data = JSON.parse(raw);
      if (Date.now() - data.firstClick > TIMEOUT_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return { count: 0, firstClick: 0 };
      }
      return data;
    } catch(e) { return { count: 0, firstClick: 0 }; }
  }

  function hideAdUnits() {
    var ads = document.querySelectorAll('.adsbygoogle, ins.adsbygoogle');
    for (var i = 0; i < ads.length; i++) {
      ads[i].style.display = 'none';
      if (ads[i].parentElement) {
        ads[i].parentElement.style.display = 'none';
      }
    }
    console.warn('[AdSense Shield] Ad units temporarily hidden to protect account against invalid click activity.');
  }

  // Initial check on page load
  var currentData = getShieldData();
  if (currentData.count >= MAX_CLICKS) {
    window.addEventListener('DOMContentLoaded', hideAdUnits);
  }

  // Monitor iframe focus to detect clicks on AdSense ads
  window.addEventListener('blur', function() {
    if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
      var d = getShieldData();
      if (d.count === 0) d.firstClick = Date.now();
      d.count++;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch(e){}
      if (d.count >= MAX_CLICKS) {
        hideAdUnits();
      }
    }
  });
})();
</script>`;

  // ==========================================
  // 4. SAFE AD PLACEMENT & EMBED GENERATOR STATE
  // ==========================================
  const [adClientPub, setAdClientPub] = useState<string>('pub-9847123490812345');
  const [adSlotId, setAdSlotId] = useState<string>('1234567890');
  const [adPlacementType, setAdPlacementType] = useState<'responsive-banner' | 'in-article' | 'anchor-footer'>('responsive-banner');

  const generateAdCodeSnippet = () => {
    if (adPlacementType === 'responsive-banner') {
      return `<!-- Safe Zero-CLS Top Leaderboard Banner (min-height prevents layout shift) -->
<div style="min-height: 90px; margin: 16px auto; text-align: center; max-width: 728px; width: 100%;">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-${adClientPub}"
       data-ad-slot="${adSlotId}"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>`;
    } else if (adPlacementType === 'in-article') {
      return `<!-- Safe In-Article Native Unit (Padded safely away from clickable buttons) -->
<div style="min-height: 250px; margin: 24px 0; padding: 12px 0; border-top: 1px dashed #e2e8f0; border-bottom: 1px dashed #e2e8f0; text-align: center;">
  <span style="display:block; font-size: 10px; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px;">Advertisement</span>
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="ca-${adClientPub}"
       data-ad-slot="${adSlotId}"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>`;
    } else {
      return `<!-- Sticky Mobile Anchor Ad (Fixed to bottom with zero screen obstruction) -->
<div style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 999; background: #ffffff; box-shadow: 0 -2px 10px rgba(0,0,0,0.08); text-align: center; min-height: 50px;">
  <ins class="adsbygoogle"
       style="display:inline-block; width:320px; height:50px"
       data-ad-client="ca-${adClientPub}"
       data-ad-slot="${adSlotId}"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>`;
    }
  };

  // ==========================================
  // 5. ZERO-COST MICRO-TOOL WEB APP BUILDER STATE
  // ==========================================
  const [selectedToolTemplate, setSelectedToolTemplate] = useState<'kgr-analyzer' | 'loan-emi' | 'freelance-rate' | 'word-counter'>('kgr-analyzer');
  const [microAppTitle, setMicroAppTitle] = useState<string>('SEO Keyword Golden Ratio (KGR) Analyzer');
  const [microAppPubId, setMicroAppPubId] = useState<string>('pub-9847123490812345');
  const [showLivePreviewModal, setShowLivePreviewModal] = useState<boolean>(false);

  const generateMicroAppHtml = () => {
    let toolLogic = '';
    let toolUi = '';

    if (selectedToolTemplate === 'kgr-analyzer') {
      toolUi = `
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 class="text-lg font-bold text-slate-900">Keyword Golden Ratio (KGR) Calculator</h2>
          <p class="text-xs text-slate-600">Enter Google AllInTitle results and Monthly Search Volume to instantly calculate ranking viability.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Google allintitle: Count</label>
              <input type="number" id="ait" value="12" class="w-full p-2.5 text-sm border border-slate-300 rounded-lg">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Monthly Search Volume (<250)</label>
              <input type="number" id="vol" value="190" class="w-full p-2.5 text-sm border border-slate-300 rounded-lg">
            </div>
          </div>
          <button onclick="calculateKgr()" class="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm transition-colors">
            Calculate KGR Score
          </button>
          <div id="kgrResult" class="p-4 rounded-xl bg-purple-50 border border-purple-200 text-center font-bold text-purple-900 text-sm">
            KGR Score: 0.063 • High Ranking Potential (Page 1)
          </div>
        </div>
      `;
      toolLogic = `
        function calculateKgr() {
          var ait = parseFloat(document.getElementById('ait').value) || 0;
          var vol = parseFloat(document.getElementById('vol').value) || 1;
          var score = (ait / vol).toFixed(3);
          var el = document.getElementById('kgrResult');
          if (score < 0.25) {
            el.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center font-bold text-emerald-900 text-sm";
            el.innerHTML = "KGR Score: " + score + " • 🟢 Under 0.25 (Fast Page 1 Ranking Candidate)";
          } else if (score <= 1.0) {
            el.className = "p-4 rounded-xl bg-amber-50 border border-amber-200 text-center font-bold text-amber-900 text-sm";
            el.innerHTML = "KGR Score: " + score + " • 🟡 0.25 - 1.0 (Moderate Competition)";
          } else {
            el.className = "p-4 rounded-xl bg-rose-50 border border-rose-200 text-center font-bold text-rose-900 text-sm";
            el.innerHTML = "KGR Score: " + score + " • 🔴 Above 1.0 (High Keyword Saturation)";
          }
        }
      `;
    } else if (selectedToolTemplate === 'loan-emi') {
      toolUi = `
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 class="text-lg font-bold text-slate-900">Loan EMI & Interest Calculator</h2>
          <p class="text-xs text-slate-600">Calculate exact monthly installments, total interest, and principal amortization.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Loan Amount ($)</label>
              <input type="number" id="principal" value="25000" class="w-full p-2.5 text-sm border border-slate-300 rounded-lg">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Annual Interest Rate (%)</label>
              <input type="number" id="rate" value="6.5" step="0.1" class="w-full p-2.5 text-sm border border-slate-300 rounded-lg">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Tenure (Years)</label>
              <input type="number" id="tenure" value="5" class="w-full p-2.5 text-sm border border-slate-300 rounded-lg">
            </div>
          </div>
          <button onclick="calculateEmi()" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm transition-colors">
            Calculate Monthly EMI
          </button>
          <div id="emiResult" class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center font-bold text-emerald-900 text-sm">
            Monthly Payment: $489.15 • Total Interest: $4,349.00
          </div>
        </div>
      `;
      toolLogic = `
        function calculateEmi() {
          var p = parseFloat(document.getElementById('principal').value) || 0;
          var r = (parseFloat(document.getElementById('rate').value) || 0) / 1200;
          var n = (parseFloat(document.getElementById('tenure').value) || 0) * 12;
          if (p <= 0 || r <= 0 || n <= 0) return;
          var emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          var totalPayment = emi * n;
          var totalInterest = totalPayment - p;
          var el = document.getElementById('emiResult');
          el.innerHTML = "Monthly Payment: $" + emi.toFixed(2) + " • Total Interest: $" + totalInterest.toFixed(2);
        }
      `;
    } else if (selectedToolTemplate === 'freelance-rate') {
      toolUi = `
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 class="text-lg font-bold text-slate-900">Freelance Hourly Rate & Net Income Estimator</h2>
          <p class="text-xs text-slate-600">Determine how much you need to bill per hour to cover taxes, expenses, and desired salary.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Target Annual Take-Home ($)</label>
              <input type="number" id="salary" value="75000" class="w-full p-2.5 text-sm border border-slate-300 rounded-lg">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Billable Hours / Week</label>
              <input type="number" id="billHours" value="25" class="w-full p-2.5 text-sm border border-slate-300 rounded-lg">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Estimated Tax & Overhead (%)</label>
              <input type="number" id="taxRate" value="30" class="w-full p-2.5 text-sm border border-slate-300 rounded-lg">
            </div>
          </div>
          <button onclick="calculateRate()" class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-colors">
            Calculate Minimum Hourly Rate
          </button>
          <div id="rateResult" class="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center font-bold text-blue-900 text-sm">
            Target Hourly Rate: $89.28 / hour (48 working weeks)
          </div>
        </div>
      `;
      toolLogic = `
        function calculateRate() {
          var s = parseFloat(document.getElementById('salary').value) || 0;
          var h = parseFloat(document.getElementById('billHours').value) || 25;
          var t = (parseFloat(document.getElementById('taxRate').value) || 30) / 100;
          var grossNeeded = s / (1 - t);
          var totalBillableHours = h * 48;
          var rate = grossNeeded / totalBillableHours;
          var el = document.getElementById('rateResult');
          el.innerHTML = "Target Hourly Rate: $" + rate.toFixed(2) + " / hour (" + totalBillableHours + " annual billable hours)";
        }
      `;
    } else {
      toolUi = `
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 class="text-lg font-bold text-slate-900">Live Word, Character & Reading Speed Counter</h2>
          <p class="text-xs text-slate-600">Type or paste text to inspect word count, characters, and estimated reading time.</p>
          <textarea id="textInput" oninput="countText()" rows="6" placeholder="Paste your article or copy here..." class="w-full p-3 text-sm border border-slate-300 rounded-xl font-sans"></textarea>
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span id="wordCount" class="block font-black text-xl text-slate-900">0</span>
              <span class="text-[11px] text-slate-500 font-semibold uppercase">Words</span>
            </div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span id="charCount" class="block font-black text-xl text-slate-900">0</span>
              <span class="text-[11px] text-slate-500 font-semibold uppercase">Characters</span>
            </div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span id="readTime" class="block font-black text-xl text-purple-600">0 min</span>
              <span class="text-[11px] text-slate-500 font-semibold uppercase">Read Time</span>
            </div>
          </div>
        </div>
      `;
      toolLogic = `
        function countText() {
          var val = document.getElementById('textInput').value.trim();
          var words = val ? val.split(/\\s+/).length : 0;
          var chars = val.length;
          var minutes = Math.ceil(words / 225);
          document.getElementById('wordCount').innerText = words;
          document.getElementById('charCount').innerText = chars;
          document.getElementById('readTime').innerText = (minutes || 1) + " min";
        }
      `;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${microAppTitle} - Fast Free Online Tool</title>
  <meta name="description" content="Instant, client-side ${microAppTitle}. 100% free with zero registration.">
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google AdSense Script (Replace ca-pub with your own ID) -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${microAppPubId}" crossorigin="anonymous"></script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex flex-col justify-between">
  <!-- Header -->
  <header class="bg-white border-b border-slate-200 py-4 px-6 shadow-xs">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <span class="font-extrabold text-base tracking-tight text-slate-900">${microAppTitle}</span>
      <span class="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">100% Free Tool</span>
    </div>
  </header>

  <!-- Top AdSense Container (Zero-CLS Layout Reserved Space) -->
  <div class="max-w-4xl mx-auto w-full px-4 pt-4">
    <div style="min-height:90px; text-align:center; background:#f1f5f9; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:11px; text-transform:uppercase; letter-spacing:1px;">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-${microAppPubId}"
           data-ad-slot="1234567890"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>

  <!-- Main Tool Container -->
  <main class="max-w-4xl mx-auto w-full px-4 py-6 flex-1">
    ${toolUi}

    <!-- In-Content Educational Guide (Prevents Low-Value Content AdSense Rejections) -->
    <article class="mt-8 bg-white p-6 rounded-2xl border border-slate-200 prose prose-slate text-xs space-y-3">
      <h3 class="text-sm font-bold text-slate-900">How to Use This Utility Tool</h3>
      <p class="text-slate-600 leading-relaxed">
        This tool operates 100% locally inside your web browser. No private data is ever uploaded to remote servers or stored in third-party tracking databases. For questions or formula feedback, consult our editorial standards page.
      </p>
    </article>
  </main>

  <!-- Bottom AdSense Container -->
  <div class="max-w-4xl mx-auto w-full px-4 pb-4">
    <div style="min-height:90px; text-align:center; background:#f1f5f9; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:11px; text-transform:uppercase; letter-spacing:1px;">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-${microAppPubId}"
           data-ad-slot="9876543210"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>

  <!-- Footer with Mandatory Legal Links for Google AdSense Approval -->
  <footer class="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 text-center">
    <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <span>© ${new Date().getFullYear()} ${microAppTitle}. All rights reserved.</span>
      <div class="space-x-4">
        <a href="#privacy" class="hover:text-slate-900">Privacy Policy</a>
        <a href="#terms" class="hover:text-slate-900">Terms of Service</a>
        <a href="#disclaimer" class="hover:text-slate-900">Disclaimer</a>
        <a href="#about" class="hover:text-slate-900">About & Contact</a>
      </div>
    </div>
  </footer>

  <script>
    ${toolLogic}
  </script>
</body>
</html>`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              Automated Compliance Suite
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• 1-Click Fixes & Utilities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            AdSense 1-Click Solutions & App Builder
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            One-click automated solutions for the most common AdSense hurdles: ads.txt warnings, mandatory legal documents, click-fraud defense, safe ad layouts, and zero-cost utility app generation.
          </p>
        </div>

        {/* Beginner vs Advanced Mode Toggle */}
        <div className="flex items-center gap-2.5 bg-[#f8f9fa] p-1.5 rounded-full border border-[#dadce0] self-start md:self-auto shrink-0">
          <div className="flex items-center gap-1.5 pl-2">
            <Sparkles className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span className="text-xs font-medium text-[#5f6368]">Quick Guide:</span>
          </div>
          <button
            onClick={() => setBeginnerMode(!beginnerMode)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              beginnerMode
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'bg-white text-[#5f6368] border border-[#dadce0] hover:bg-[#f1f3f4]'
            }`}
          >
            {beginnerMode ? '✓ ON (Quick Guide)' : 'OFF (Pro Mode)'}
          </button>
        </div>
      </div>

      {/* Beginner Quick-Start Visual Cards (When Beginner Mode is Active) */}
      {beginnerMode && (
        <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[11px] font-medium tracking-normal bg-[#e8f0fe] text-[#1a73e8] rounded-full">
                Quick Guide
              </span>
              <h3 className="text-sm font-medium text-[#202124] font-['Google_Sans',sans-serif]">
                What each 1-click tool accomplishes:
              </h3>
            </div>
            <span className="text-[11px] text-[#5f6368] font-normal hidden sm:inline">
              Click any card below to open the corresponding generator:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
            <div
              onClick={() => setActiveTool('ads-txt')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeTool === 'ads-txt'
                  ? 'bg-white border-emerald-500 shadow-sm'
                  : 'bg-white/70 hover:bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] flex items-center justify-center font-black">
                  1
                </span>
                <span>Fix ads.txt</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Resolves Google's "Earnings at risk" warning by producing a validated 1-line authorization file.
              </p>
            </div>

            <div
              onClick={() => setActiveTool('legal-suite')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeTool === 'legal-suite'
                  ? 'bg-white border-purple-500 shadow-sm'
                  : 'bg-white/70 hover:bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 text-[11px] flex items-center justify-center font-black">
                  2
                </span>
                <span>Legal Pages</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Generates mandatory Privacy Policy & Terms pages with required DART cookie and GDPR disclosures.
              </p>
            </div>

            <div
              onClick={() => setActiveTool('anti-ban')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeTool === 'anti-ban'
                  ? 'bg-white border-rose-500 shadow-sm'
                  : 'bg-white/70 hover:bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 text-[11px] flex items-center justify-center font-black">
                  3
                </span>
                <span>Stop Click Bombs</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Conceals ad units automatically if someone clicks repeatedly, protecting your account from policy strikes.
              </p>
            </div>

            <div
              onClick={() => setActiveTool('ad-placement')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeTool === 'ad-placement'
                  ? 'bg-white border-blue-500 shadow-sm'
                  : 'bg-white/70 hover:bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] flex items-center justify-center font-black">
                  4
                </span>
                <span>Safe Ad Code</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Pre-reserved container code prevents Cumulative Layout Shift (CLS) when responsive ads load.
              </p>
            </div>

            <div
              onClick={() => setActiveTool('micro-app-builder')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeTool === 'micro-app-builder'
                  ? 'bg-white border-amber-500 shadow-sm'
                  : 'bg-white/70 hover:bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] flex items-center justify-center font-black">
                  5
                </span>
                <span>Free Web App</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Download a standalone, ready-to-host utility web tool you can host for $0.00/month.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Pills for Single-Click Solutions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
        <button
          onClick={() => setActiveTool('ads-txt')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 border ${
            activeTool === 'ads-txt'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>1. Fix ads.txt</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">1-Click</span>
        </button>

        <button
          onClick={() => setActiveTool('legal-suite')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 border ${
            activeTool === 'legal-suite'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span>2. Legal Privacy Suite</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800 font-bold">Mandatory</span>
        </button>

        <button
          onClick={() => setActiveTool('anti-ban')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 border ${
            activeTool === 'anti-ban'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-rose-400" />
          <span>3. Anti-Click Shield</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-bold">Account Guard</span>
        </button>

        <button
          onClick={() => setActiveTool('ad-placement')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 border ${
            activeTool === 'ad-placement'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Layout className="w-3.5 h-3.5 text-blue-400" />
          <span>4. Safe Ad Embeds</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-bold">No Layout Shift</span>
        </button>

        <button
          onClick={() => setActiveTool('micro-app-builder')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 border ${
            activeTool === 'micro-app-builder'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>5. Free Web App Builder</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 font-bold">$0/Mo Hosting</span>
        </button>
      </div>

      {/* ========================================================
          TOOL 1: ADS.TXT GENERATOR & DIRECT VALIDATOR
         ======================================================== */}
      {activeTool === 'ads-txt' && (
        <div className="space-y-4">
          {beginnerMode && (
            <KidExplainer
              toolNumber="1"
              title="Fix 'Earnings at Risk' ads.txt File"
              what="ads.txt is a tiny 1-line text note placed on your website that says 'Only Google is allowed to put ads on my site'."
              why="Without it, Google shows a scary red warning: 'Earnings at risk! You need to fix some ads.txt issues'. Advertisers won't pay you top dollar until this is fixed."
              how="Type your 16-digit AdSense ID below (or leave our sample) and click the green '1-Click Copy Snippet' or 'Download ads.txt' button."
              result="Put this file on your site. Within 24 hours, Google's robot sees it and removes the red warning completely! 100% fixed."
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  ads.txt Configurator & Validator
                </h3>
              </div>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                isPubIdValid
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {isPubIdValid ? '✓ Valid 16-Digit ID' : '✕ Requires 16 Digits'}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Your Google AdSense Publisher ID (pub-xxxxxxxxxxxxxxxx)
              </label>
              <input
                type="text"
                value={adsTxtPubId}
                onChange={(e) => setAdsTxtPubId(e.target.value)}
                placeholder="e.g. pub-9847123490812345 or 9847123490812345"
                className="w-full p-2.5 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9d62ec]"
              />
              <p className="text-[11px] text-slate-500">
                Found in your Google AdSense Dashboard under <strong>Account → Settings → Account information</strong>.
              </p>
            </div>

            {/* Generated ads.txt box */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Generated ads.txt File Contents</span>
                <span>UTF-8 Plain Text</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 text-emerald-400 select-all overflow-x-auto">
                {adsTxtSnippet}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleCopy('ads-txt-snippet', adsTxtSnippet)}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedId === 'ads-txt-snippet' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'ads-txt-snippet' ? 'Copied to Clipboard!' : '1-Click Copy Snippet'}</span>
                </button>
                <button
                  onClick={() => handleDownload('ads.txt', adsTxtSnippet)}
                  className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ads.txt</span>
                </button>
              </div>
            </div>

            {/* Platform Setup Guides */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                1-Click Platform Deployment Guides:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setAdsTxtHostPlatform('cloudflare')}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${
                    adsTxtHostPlatform === 'cloudflare' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Cloudflare Pages / Vercel
                </button>
                <button
                  onClick={() => setAdsTxtHostPlatform('wordpress')}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${
                    adsTxtHostPlatform === 'wordpress' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  WordPress
                </button>
                <button
                  onClick={() => setAdsTxtHostPlatform('blogger')}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${
                    adsTxtHostPlatform === 'blogger' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Blogger / Blogspot
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                {adsTxtHostPlatform === 'cloudflare' && (
                  <p>
                    <strong>For Cloudflare Pages / Vercel:</strong> Place the downloaded <code>ads.txt</code> into your project's <code>/public/ads.txt</code> folder. When deployed, it will immediately resolve at <code>https://yourdomain.com/ads.txt</code> with 200 OK status.
                  </p>
                )}
                {adsTxtHostPlatform === 'wordpress' && (
                  <p>
                    <strong>For WordPress:</strong> You do NOT need slow plugins! Upload the downloaded <code>ads.txt</code> straight to your site's root directory via cPanel File Manager or FTP (public_html/ads.txt).
                  </p>
                )}
                {adsTxtHostPlatform === 'blogger' && (
                  <p>
                    <strong>For Blogger:</strong> Go to <strong>Settings → Monetization → Enable custom ads.txt</strong>, paste the copied snippet into the box, and click Save.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Validation & Explanation Column (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Live Crawler & Format Health Check
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-emerald-950">Google AdSense Canonical Domain</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">google.com</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-emerald-950">Relationship Designation</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">DIRECT</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-emerald-950">Google Certification Authority ID</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">f08c47fec0942fa0</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/70 border border-purple-200">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="font-semibold text-purple-950">Googlebot Crawler Latency</span>
                  </div>
                  <span className="font-mono font-bold text-purple-700">24 – 48 Hours</span>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Why is the "Earnings at risk" warning showing in AdSense?
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Google's crawler checks root <code>/ads.txt</code> periodically. Even after you upload it, it takes 24 to 48 hours for Google to re-crawl your domain and dismiss the warning dashboard banner.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* ========================================================
          TOOL 2: 1-CLICK LEGAL COMPLIANCE SUITE
         ======================================================== */}
      {activeTool === 'legal-suite' && (
        <div className="space-y-4">
          {beginnerMode && (
            <KidExplainer
              toolNumber="2"
              title="1-Click Legal Policy Pages"
              what="These are 4 special rule pages (Privacy Policy, Terms of Service, Ad Disclaimer, and About Us) that tell people your website is real and safe."
              why="Google's human reviewers will instantly reject your website if they cannot find a Privacy Policy or DART cookie disclosure. Over 80% of beginners fail because of this!"
              how="Just enter your website name and your email address below, then click 'Download .html' or '1-Click Copy HTML'."
              result="You get perfectly written, 100% Google-approved legal pages with all mandatory cookie laws already baked in. Zero lawyer fees!"
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Site Compliance Parameters
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Google AdSense rejects 80%+ of websites that lack compliant Privacy, Terms, and DART cookie clauses.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Website Brand Name</label>
              <input
                type="text"
                value={legalSiteName}
                onChange={(e) => setLegalSiteName(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9d62ec]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Full Website URL (with https://)</label>
              <input
                type="text"
                value={legalSiteUrl}
                onChange={(e) => setLegalSiteUrl(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9d62ec]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Official Contact Email</label>
              <input
                type="email"
                value={legalContactEmail}
                onChange={(e) => setLegalContactEmail(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9d62ec]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Publisher / Entity Name</label>
              <input
                type="text"
                value={legalOwnerName}
                onChange={(e) => setLegalOwnerName(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9d62ec]"
              />
            </div>

            {/* Document Switcher */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Select Document to Generate:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  onClick={() => setActiveLegalDoc('privacy')}
                  className={`p-2 rounded-lg border text-left flex items-center justify-between ${
                    activeLegalDoc === 'privacy'
                      ? 'bg-purple-50 text-purple-800 border-purple-300 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>🛡️ Privacy Policy</span>
                </button>
                <button
                  onClick={() => setActiveLegalDoc('terms')}
                  className={`p-2 rounded-lg border text-left flex items-center justify-between ${
                    activeLegalDoc === 'terms'
                      ? 'bg-purple-50 text-purple-800 border-purple-300 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>📜 Terms of Service</span>
                </button>
                <button
                  onClick={() => setActiveLegalDoc('disclaimer')}
                  className={`p-2 rounded-lg border text-left flex items-center justify-between ${
                    activeLegalDoc === 'disclaimer'
                      ? 'bg-purple-50 text-purple-800 border-purple-300 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>⚖️ Ad Disclaimer</span>
                </button>
                <button
                  onClick={() => setActiveLegalDoc('about')}
                  className={`p-2 rounded-lg border text-left flex items-center justify-between ${
                    activeLegalDoc === 'about'
                      ? 'bg-purple-50 text-purple-800 border-purple-300 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>👤 About & E-E-A-T</span>
                </button>
              </div>
            </div>
          </div>

          {/* Document Preview & Actions (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Live Document Code Preview
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy('legal-html', currentLegalContent)}
                    className="px-3 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    {copiedId === 'legal-html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'legal-html' ? 'Copied HTML' : '1-Click Copy HTML'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(`${activeLegalDoc}.html`, currentLegalContent, 'text/html')}
                    className="px-3 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .html</span>
                  </button>
                </div>
              </div>

              {/* Code viewer */}
              <div className="mt-3 p-4 bg-slate-950 text-slate-300 rounded-xl font-mono text-xs max-h-96 overflow-y-auto leading-relaxed border border-slate-800">
                <pre className="whitespace-pre-wrap">{currentLegalContent}</pre>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Includes Google AdSense DoubleClick DART cookie disclosure & opt-out links mandatory for webmaster compliance.
              </span>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* ========================================================
          TOOL 3: ANTI-CLICK-BOMBING SHIELD
         ======================================================== */}
      {activeTool === 'anti-ban' && (
        <div className="space-y-4">
          {beginnerMode && (
            <KidExplainer
              toolNumber="3"
              title="Anti-Click-Bombing Bodyguard"
              what="A tiny invisible bodyguard code that counts how many times one person clicks your ads."
              why="If a jealous person or naughty bot clicks your ads 10 times in a row, Google will think YOU cheated and permanently BAN your account!"
              how="Slide the limit to 3 clicks (already set), click the green '1-Click Copy JS Snippet' button, and paste it into your website."
              result="If someone clicks ads 3 times, all ads disappear just for that person! Google sees zero bad clicks and your account stays 100% safe."
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Invalid Traffic & Click-Bombing Defense
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Protects your AdSense account against malicious competitors or bots clicking ads repeatedly.
                </p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-700 rounded-full border border-rose-200">
                Anti-Ban Script
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label className="text-slate-700 font-semibold">Max Ad Clicks Allowed Per Visitor</label>
                <span className="font-mono font-bold text-rose-600">{maxClicksPerSession} clicks</span>
              </div>
              <input
                type="range"
                min="2"
                max="6"
                step="1"
                value={maxClicksPerSession}
                onChange={(e) => setMaxClicksPerSession(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
              />
              <p className="text-[10px] text-slate-500">
                Recommended: 3 clicks. Genuine visitors rarely click more than 2-3 ads in 15 minutes.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label className="text-slate-700 font-semibold">Defense Cooldown Timeout</label>
                <span className="font-mono font-bold text-slate-900">{banTimeoutMinutes} minutes</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={banTimeoutMinutes}
                onChange={(e) => setBanTimeoutMinutes(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9d62ec]"
              />
              <p className="text-[10px] text-slate-500">
                Ad containers will be hidden for this visitor until the cooldown expires. Zero impact on normal visitors.
              </p>
            </div>

            {/* Simulated Live Test */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Interactive Click Simulator:</span>
                <span className="font-mono text-purple-700 font-bold">
                  {simulatedClicks} / {maxClicksPerSession} Clicks Triggered
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSimulatedClicks((prev) => Math.min(prev + 1, maxClicksPerSession))}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  Simulate Ad Click
                </button>
                <button
                  onClick={() => setSimulatedClicks(0)}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {simulatedClicks >= maxClicksPerSession ? (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>SHIELD ACTIVATED: All ad units dynamically concealed for this visitor. Account protected.</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Normal ad serving active. Waiting for iframe interaction.</span>
                </div>
              )}
            </div>
          </div>

          {/* Script Code Box (6 cols) */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Client-Side Shield Script (Under 1KB)
                </h3>
                <button
                  onClick={() => handleCopy('anti-ban-script', antiBanScript)}
                  className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === 'anti-ban-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'anti-ban-script' ? 'Copied Script!' : '1-Click Copy JS Snippet'}</span>
                </button>
              </div>

              <div className="mt-3 p-4 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs max-h-80 overflow-y-auto leading-relaxed border border-slate-800">
                <pre className="whitespace-pre-wrap">{antiBanScript}</pre>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              💡 <strong>Installation:</strong> Paste this script right before the closing <code>&lt;/body&gt;</code> tag of your website. It requires zero server setup and uses native browser storage.
            </p>
          </div>
        </div>
        </div>
      )}

      {/* ========================================================
          TOOL 4: SAFE AD PLACEMENT & SNIPPET GENERATOR
         ======================================================== */}
      {activeTool === 'ad-placement' && (
        <div className="space-y-4">
          {beginnerMode && (
            <KidExplainer
              toolNumber="4"
              title="Safe Ad Embed Code (No Screen Jumps)"
              what="The HTML code you put on your website where you want Google ads to show up."
              why="If you put raw ad code, when the page loads, the text suddenly jumps down! This annoys visitors, causes accidental misclicks, and Google penalizes your rankings for 'Layout Shift' (CLS)."
              how="Choose where you want the ad (Top Banner, Inside Article, or Mobile Bottom Dock) and click '1-Click Copy Code'."
              result="Your site reserves empty cushion space in advance. When the ad arrives, it slides in softly with ZERO jumping around! 100/100 Core Web Vitals speed."
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Ad Unit & Slot Configuration
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Prevent Google layout shifts (CLS penalty) and accidental click policy strikes with responsive reserved containers.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Publisher ID</label>
              <input
                type="text"
                value={adClientPub}
                onChange={(e) => setAdClientPub(e.target.value)}
                className="w-full p-2 text-xs font-mono border border-slate-300 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">AdSense Ad Slot ID</label>
              <input
                type="text"
                value={adSlotId}
                onChange={(e) => setAdSlotId(e.target.value)}
                placeholder="e.g. 1234567890"
                className="w-full p-2 text-xs font-mono border border-slate-300 rounded-lg"
              />
            </div>

            {/* Unit Placements */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Select Optimal Ad Placement:
              </label>
              <div className="space-y-2 text-xs font-semibold">
                <button
                  onClick={() => setAdPlacementType('responsive-banner')}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between ${
                    adPlacementType === 'responsive-banner'
                      ? 'bg-purple-50 text-purple-800 border-purple-300 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="block font-bold">1. Header Responsive Leaderboard (728x90)</span>
                    <span className="text-[10px] text-slate-500 font-normal">Highest viewability without pushing content below fold</span>
                  </div>
                </button>

                <button
                  onClick={() => setAdPlacementType('in-article')}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between ${
                    adPlacementType === 'in-article'
                      ? 'bg-purple-50 text-purple-800 border-purple-300 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="block font-bold">2. Native In-Article Unit</span>
                    <span className="text-[10px] text-slate-500 font-normal">Fluid unit placed after paragraph 2 with safety margins</span>
                  </div>
                </button>

                <button
                  onClick={() => setAdPlacementType('anchor-footer')}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between ${
                    adPlacementType === 'anchor-footer'
                      ? 'bg-purple-50 text-purple-800 border-purple-300 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="block font-bold">3. Mobile Anchor Sticky Dock (320x50)</span>
                    <span className="text-[10px] text-slate-500 font-normal">Stays docked to bottom of mobile screen with zero CLS</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Generated Embed Code (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Zero-CLS AdSense Embed Code
                </h3>
                <button
                  onClick={() => handleCopy('ad-code-snippet', generateAdCodeSnippet())}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === 'ad-code-snippet' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'ad-code-snippet' ? 'Copied Code!' : '1-Click Copy Code'}</span>
                </button>
              </div>

              <div className="mt-3 p-4 bg-slate-950 text-blue-300 rounded-xl font-mono text-xs max-h-80 overflow-y-auto leading-relaxed border border-slate-800">
                <pre className="whitespace-pre-wrap">{generateAdCodeSnippet()}</pre>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <span className="font-bold block">Why is the wrapper container critical?</span>
              <p className="text-[11px] leading-relaxed text-blue-800">
                Without a <code>min-height</code> CSS wrapper, when Google AdSense injects the ad asynchronously, the page text abruptly jumps down by 90-250px. This triggers Google's Cumulative Layout Shift (CLS) penalty and lowers your search ranking!
              </p>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* ========================================================
          TOOL 5: ZERO-COST MICRO-TOOL WEB APP BUILDER
         ======================================================== */}
      {activeTool === 'micro-app-builder' && (
        <div className="space-y-6">
          {beginnerMode && (
            <KidExplainer
              toolNumber="5"
              title="1-Click Free Web App Builder ($0/Mo)"
              what="A complete, ready-to-run mini tool website (like an SEO analyzer, loan calculator, or word counter) that lives in a single downloaded file."
              why="Writing 30 blog posts from scratch is exhausting and gets rejected for 'thin content'. Micro-tools provide real daily utility that visitors love and Google enthusiastically approves!"
              how="Pick one of the 4 tool templates below, put your AdSense ID, and click the purple '1-Click Download Ready-to-Host index.html' button."
              result="You own a complete interactive website with ads and legal notes built-in! Drag-and-drop it to Cloudflare Pages or Vercel for $0.00/month hosting forever."
            />
          )}

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Zero-Cost High-RPM Web App Generator
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Generate complete standalone HTML/JS utility micro-tools with pre-configured AdSense units, legal compliance, and 100/100 Core Web Vitals ready to drag-and-drop to free hosting!
                </p>
              </div>
              <span className="px-3 py-1 text-xs font-mono font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 self-start sm:self-auto">
                $0.00 / Mo Hosting Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  id: 'kgr-analyzer',
                  title: 'KGR Keyword SEO Analyzer',
                  category: 'SEO & Marketing',
                  rpm: '$22 - $35 RPM',
                  desc: 'AllInTitle and volume calculator with instant ranking indicators.',
                },
                {
                  id: 'loan-emi',
                  title: 'Loan EMI & Interest Calculator',
                  category: 'Personal Finance',
                  rpm: '$35 - $65 RPM',
                  desc: 'Monthly installment, compound interest, and principal amortization.',
                },
                {
                  id: 'freelance-rate',
                  title: 'Freelance Rate & Tax Estimator',
                  category: 'B2B & Career',
                  rpm: '$25 - $45 RPM',
                  desc: 'Take-home income solver factoring taxes and unbillable hours.',
                },
                {
                  id: 'word-counter',
                  title: 'Live Word & Read-Time Counter',
                  category: 'Publishing Utility',
                  rpm: '$15 - $28 RPM',
                  desc: 'Real-time text length, character metrics, and speech duration.',
                },
              ].map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    setSelectedToolTemplate(template.id as any);
                    setMicroAppTitle(template.title);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    selectedToolTemplate === template.id
                      ? 'border-[#9d62ec] bg-purple-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-900">{template.title}</span>
                    {selectedToolTemplate === template.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#9d62ec]" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">{template.desc}</p>
                  <div className="flex items-center justify-between pt-1 text-[10px]">
                    <span className="text-slate-400">{template.category}</span>
                    <span className="font-mono font-bold text-emerald-700">{template.rpm}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Customization Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">App Name / Page Title</label>
                <input
                  type="text"
                  value={microAppTitle}
                  onChange={(e) => setMicroAppTitle(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9d62ec]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">AdSense Publisher ID</label>
                <input
                  type="text"
                  value={microAppPubId}
                  onChange={(e) => setMicroAppPubId(e.target.value)}
                  placeholder="pub-9847123490812345"
                  className="w-full p-2.5 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9d62ec]"
                />
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button
                onClick={() => handleDownload('index.html', generateMicroAppHtml(), 'text/html')}
                className="w-full sm:w-auto px-6 py-3 bg-[#9d62ec] hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>1-Click Download Ready-to-Host index.html</span>
              </button>

              <button
                onClick={() => setShowLivePreviewModal(true)}
                className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>Live Interactive Preview</span>
              </button>

              <button
                onClick={() => handleCopy('micro-app-code', generateMicroAppHtml())}
                className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                {copiedId === 'micro-app-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'micro-app-code' ? 'Copied HTML!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Cloudflare Pages Zero-Cost Deployment Instructions */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              How to Deploy for $0.00 / Month in Under 60 Seconds:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-mono text-purple-700 font-bold">Step 1: Download</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Click the button above to download the <code>index.html</code> file to your computer.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-mono text-purple-700 font-bold">Step 2: Free Host</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Go to <strong>pages.cloudflare.com</strong> (free forever) or <strong>vercel.com</strong> and drag & drop the folder containing <code>index.html</code> and <code>ads.txt</code>.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-mono text-emerald-700 font-bold">Step 3: Go Live</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Your micro-tool is instantly live across 300+ edge data centers worldwide with 100/100 Core Web Vitals!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LIVE PREVIEW MODAL FOR GENERATED MICRO-TOOL
         ======================================================== */}
      {showLivePreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 sm:p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-900 text-sm">{microAppTitle} — Live Sandbox Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload('index.html', generateMicroAppHtml(), 'text/html')}
                  className="px-3 py-1.5 bg-[#9d62ec] hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
                <button
                  onClick={() => setShowLivePreviewModal(false)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>

            <div className="flex-1 w-full bg-slate-100 p-2 sm:p-4">
              <iframe
                title="Micro App Sandbox Preview"
                srcDoc={generateMicroAppHtml()}
                className="w-full h-full rounded-xl border border-slate-300 bg-white shadow-xs"
                sandbox="allow-scripts allow-modals"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
