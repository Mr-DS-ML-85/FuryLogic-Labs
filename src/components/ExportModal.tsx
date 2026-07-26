import React, { useState } from 'react';
import { Download, X, Copy, Check, Globe, Github, Terminal, CheckCircle } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const ghPagesScript = `# Steps to deploy FuryLogic Labs Landing Page to GitHub Pages:
# 1. Build the production static distribution
npm run build

# 2. Deploy dist/ directory using gh-pages CLI
npx gh-pages -d dist

# Alternatively, set up GitHub Action (.github/workflows/deploy.yml)
# Target repository: Mr-DS-ML-85/furylogiclabs-website`;

  const handleCopy = () => {
    navigator.clipboard.writeText(ghPagesScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="card-shadow w-full max-w-xl rounded-2xl overflow-hidden border border-cyan-500/40 p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                Deploy & Export to GitHub Pages
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Zero-config production deployment guide for furylogic.com
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="space-y-3 text-xs text-zinc-300 leading-relaxed font-sans">
          <p>
            This application is built with Vite, React, Tailwind CSS v4, and Three.js. It generates static assets in the <code className="text-emerald-400 font-mono bg-zinc-900 px-1 py-0.5 rounded">dist/</code> directory that can be hosted on GitHub Pages, Cloudflare Pages, Vercel, or custom bare-metal Nginx servers.
          </p>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="text-cyan-400 font-bold font-mono flex items-center gap-1.5 text-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified Build Target Specs:
            </div>
            <ul className="list-disc list-inside font-mono text-[11px] text-zinc-400 space-y-1">
              <li>SPA Route Fallback support for single-page routing</li>
              <li>WebGL 3D Fallback canvas for low-end devices</li>
              <li>Full-stack server-side Gemini proxy on `/api/chat`</li>
            </ul>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              deploy_gh_pages.sh
            </span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1.5 text-[11px] transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Commands'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#030305] border border-zinc-800 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed">
            {ghPagesScript}
          </pre>
        </div>

        {/* Footer actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors"
          >
            Close
          </button>
          <a
            href="https://github.com/Mr-DS-ML-85"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Visit Mr-DS-ML-85 Org</span>
          </a>
        </div>

      </div>
    </div>
  );
};
