import React from 'react';
import { X, ShieldCheck, Mail, FileText, CheckCircle2, Globe, HeartHandshake } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'about' | 'contact' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#f8f9fa]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shrink-0">
              {type === 'privacy' && <ShieldCheck className="w-5 h-5" />}
              {type === 'terms' && <FileText className="w-5 h-5" />}
              {type === 'about' && <HeartHandshake className="w-5 h-5" />}
              {type === 'contact' && <Mail className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#202124] font-['Google_Sans',sans-serif]">
                {type === 'privacy' && 'Privacy Policy & Google AdSense Cookie Disclosures'}
                {type === 'terms' && 'Terms of Service & Publisher Guidelines'}
                {type === 'about' && 'About GladSense — Editorial Mission & Transparency'}
                {type === 'contact' && 'Contact Publisher & Editorial Office'}
              </h2>
              <span className="text-xs text-[#5f6368]">
                GladSense Official Publisher Verification & Compliance Document
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#3c4043] leading-relaxed">
          {type === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>AdSense Policy Guarantee:</strong> This privacy policy strictly satisfies Section 8 of the Google AdSense Terms of Service, CCPA disclosures, and EU User Consent Policy.
                </span>
              </div>

              <h3 className="text-base font-bold text-[#202124]">1. Information We Collect and Process</h3>
              <p>
                GladSense ("we", "our", or "the Service") operates as a free diagnostic site auditor and niche monetization planner. When users input a website domain for automated compliance evaluation, our system retrieves publicly accessible HTML document structures solely to calculate policy readiness and structural hygiene metrics. No personal identity records, passwords, or financial transactions are harvested.
              </p>

              <h3 className="text-base font-bold text-[#202124]">2. Google AdSense & DoubleClick DART Cookies</h3>
              <p>
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
              </p>
              <p>
                Users may opt out of personalized advertising by visiting{' '}
                <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" className="text-[#1a73e8] underline">
                  Google My Ad Center
                </a>
                . Alternatively, users can opt out of third-party vendors' use of cookies for personalized advertising by visiting{' '}
                <a href="https://optout.aboutads.info/" target="_blank" rel="noreferrer" className="text-[#1a73e8] underline">
                  aboutads.info
                </a>
                .
              </p>

              <h3 className="text-base font-bold text-[#202124]">3. California Consumer Privacy Act (CCPA) & GDPR</h3>
              <p>
                We do not sell personal information to data brokers. European Economic Area (EEA) and UK visitors are presented with cookie consent controls in accordance with the EU General Data Protection Regulation (GDPR) and Google Consent Mode v2.
              </p>

              <h3 className="text-base font-bold text-[#202124]">4. Direct Inquiries</h3>
              <p>
                If you have questions regarding our privacy practices or data handling, please contact our privacy compliance desk at <code className="px-2 py-0.5 bg-slate-100 rounded text-slate-800">privacy@gladsense.pages.dev</code>.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#202124]">1. Agreement to Terms</h3>
              <p>
                By accessing or using GladSense, you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not access the service.
              </p>

              <h3 className="text-base font-bold text-[#202124]">2. Permitted Use & Analytical Accuracy</h3>
              <p>
                GladSense provides heuristic benchmarks, mathematical calculators (RPM, Pageviews, KGR keyword formulas), and pre-approval diagnostic audits. While our rules engine mirrors Google AdSense Publisher Policies, final site approval decisions rest exclusively with Google LLC's manual and automated review systems. GladSense does not guarantee approval by third-party advertising platforms.
              </p>

              <h3 className="text-base font-bold text-[#202124]">3. Intellectual Property & Trademarks</h3>
              <p>
                Google, Google AdSense, and Google Search Console are trademarks of Google LLC. GladSense is an independent web application and is not endorsed by, sponsored by, or affiliated with Google LLC.
              </p>
            </div>
          )}

          {type === 'about' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                <span>
                  <strong>E-E-A-T Editorial Statement:</strong> We adhere to high editorial transparency. All calculators, KGR keyword formulas, and policy checkers are built by verified monetization engineers.
                </span>
              </div>

              <h3 className="text-base font-bold text-[#202124]">Our Mission</h3>
              <p>
                Over 85% of independent website publishers and blog creators face immediate rejection upon their first Google AdSense application due to preventable policy misunderstandings—such as missing legal disclosures, thin boilerplate content, or faulty ads.txt syntax.
              </p>
              <p>
                GladSense was created to give web creators, indie developers, and niche webmasters a zero-cost, enterprise-grade pre-approval auditor and policy doctor. Our platform models low-competition keyword niches, provides 1-click compliant legal pages, and diagnoses rejection notices in seconds.
              </p>

              <h3 className="text-base font-bold text-[#202124]">Author & Development Team</h3>
              <p>
                Lead Engineer & Publisher: <strong>Dillib Chandran</strong><br />
                Focus: Web Monetization, Algorithmic Search Architecture & Static Web Performance.<br />
                Hosting: 100% Serverless, globally distributed on Cloudflare Pages.
              </p>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#202124]">Get in Touch</h3>
              <p>
                We welcome editorial inquiries, bug reports, and publisher compliance questions. Reach out directly through the verified contact channels below:
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#1a73e8]" />
                  <div>
                    <span className="text-xs text-[#5f6368] block">Primary Editorial Email</span>
                    <a href="mailto:dillib.chandran@gmail.com" className="font-semibold text-[#1a73e8] hover:underline">
                      dillib.chandran@gmail.com
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-xs text-[#5f6368] block">Project Repository & Issues</span>
                    <a href="https://github.com/dillibchandran-bit/Gladsense" target="_blank" rel="noreferrer" className="font-semibold text-slate-800 hover:underline">
                      github.com/dillibchandran-bit/Gladsense
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#5f6368]">
                Average response time: Within 24-48 business hours.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-sm font-medium text-white bg-[#1a73e8] hover:bg-[#1765cc] transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
