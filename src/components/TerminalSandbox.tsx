import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, CornerDownLeft } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  text: string;
}

export const TerminalSandbox: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'info', text: 'Welcome to FuryLogic Labs Interactive System Shell v2.4 (furylogic.com)' },
    { id: '2', type: 'info', text: 'Type "help" to list available commands or click quick presets below.' }
  ]);
  const [copied, setCopied] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newHistory: TerminalLine[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', text: `$ ${trimmed}` }
    ];

    const parts = trimmed.split(' ');
    const main = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    if (main === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (main === 'help') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `AVAILABLE COMMANDS:
  strikedb [--bench|--status]     Run StrikeDB SIMD benchmark or check engine status
  chimera [--route|--providers]    Query Chimera AI Gateway multi-provider routing
  mips-kernel [--xip|--info]      Query MIPS XIP kernel execution state
  vugva [--test|--run]             Run VUGVA UI test suite
  opusedge [--agent|--status]      Simulate OpusEdge local AI agent execution
  projects                         List all 7 FuryLogic Labs repositories
  status                           System bare-metal resource overview
  clear                            Clear terminal history`
      });
    } else if (main === 'strikedb') {
      if (arg === '--bench') {
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: `[STRIKEDB BENCHMARK]
> Vectorized Scan Speed: 12.4 GB/s (AVX-512)
> Index Lookup Latency: 2.1 μs
> Concurrent QPS: 1,450,000 req/sec
> Live App: https://strikedb.devforge.qzz.io`
        });
      } else {
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `StrikeDB v1.8 - Ultra High Performance Embedded Database Engine\nRepository: Mr-DS-ML-85/StrikeDB\nUsage: strikedb --bench`
        });
      }
    } else if (main === 'chimera') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: `[CHIMERA AI GATEWAY]
> Active Providers: OpenAI, Anthropic, Gemini, Local Ollama
> Failover SLA: 100% (Sub-millisecond fallback)
> Latency Overhead: <0.8ms
> Repo: Mr-DS-ML-85/chimera-ai-gateway`
      });
    } else if (main === 'mips-kernel') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: `[MIPS XIP KERNEL]
> Execution Mode: Execute-In-Place (XIP) from NOR Flash
> RAM Overhead Saved: 84%
> Boot Time: 14ms on MIPS32 bare-metal
> Live Site: https://mr-ds-ml-85.github.io/mips-xip-kernel/`
      });
    } else if (main === 'vugva') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: `[VUGVA TESTING FRAMEWORK]
> Modern UI Automated Tests Running...
> Headless Engine: Chromium + WebKit
> Results: 42/42 tests passed in 0.41s
> Live App: https://vugva.devforge.qzz.io`
      });
    } else if (main === 'opusedge') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: `[OPUSEDGE AGENT ENGINE]
> Quantized Local LLM: Q4_K_M (1.8 GB RAM)
> Inference Speed: 48.2 tokens/sec
> Live App: https://opusai.devforge.qzz.io`
      });
    } else if (main === 'projects') {
      const list = PROJECTS_DATA.map((p) => `• ${p.name} (${p.repoName}) - ${p.category}`).join('\n');
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `FURYLOGIC REPOSITORIES (Mr-DS-ML-85):\n${list}`
      });
    } else if (main === 'status') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'info',
        text: `[FURYLOGIC BARE-METAL HARDWARE STATUS]
> System Uptime: 99.999%
> Active Nodes: Bare-Metal x86_64 & MIPS32
> Active Repositories: 7 Open Source
> Zenodo DOI Status: VERIFIED & ACTIVE`
      });
    } else {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `Command not recognized: "${trimmed}". Type "help" for a list of available commands.`
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleCopyLogs = () => {
    const textToCopy = history.map((h) => h.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-16 md:py-24 border-b border-zinc-800/80 bg-[#050508] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/30 bg-emerald-950/40 text-xs font-mono text-emerald-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE BARE-METAL SANDBOX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            FuryLogic Labs <span className="text-emerald-400 text-glow">CLI Terminal</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Test system CLI commands, query benchmark results, and simulate low-level driver execution live in your browser.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="max-w-4xl mx-auto card-shadow rounded-2xl overflow-hidden border border-zinc-800">
          
          {/* Window Header */}
          <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-zinc-400 font-bold">
                fury@furylogiclabs-cli:~$
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLogs}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                title="Copy Terminal Logs"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Logs'}</span>
              </button>
              <button
                onClick={() => setHistory([])}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Clear Output"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="bg-zinc-900/50 p-2.5 border-b border-zinc-800/50 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-zinc-500 text-[11px] px-2">Presets:</span>
            <button
              onClick={() => runCommand('strikedb --bench')}
              className="px-2.5 py-1 rounded bg-zinc-800/80 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
            >
              strikedb --bench
            </button>
            <button
              onClick={() => runCommand('chimera')}
              className="px-2.5 py-1 rounded bg-zinc-800/80 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
            >
              chimera
            </button>
            <button
              onClick={() => runCommand('mips-kernel')}
              className="px-2.5 py-1 rounded bg-zinc-800/80 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
            >
              mips-kernel
            </button>
            <button
              onClick={() => runCommand('projects')}
              className="px-2.5 py-1 rounded bg-zinc-800/80 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30 transition-all"
            >
              projects
            </button>
          </div>

          {/* Terminal Screen Output */}
          <div className="p-4 sm:p-6 bg-[#030305] font-mono text-xs sm:text-sm min-h-[280px] max-h-[420px] overflow-y-auto space-y-2">
            {history.map((line) => (
              <div
                key={line.id}
                className={`whitespace-pre-wrap ${
                  line.type === 'input'
                    ? 'text-white font-bold'
                    : line.type === 'success'
                    ? 'text-emerald-400'
                    : line.type === 'error'
                    ? 'text-red-400'
                    : line.type === 'info'
                    ? 'text-cyan-400'
                    : 'text-zinc-300'
                }`}
              >
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Prompt Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runCommand(input);
            }}
            className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2"
          >
            <span className="text-emerald-400 font-mono text-sm font-bold pl-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command e.g. strikedb --bench, help..."
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-zinc-600"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono flex items-center gap-1 transition-all"
            >
              <span>EXEC</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
