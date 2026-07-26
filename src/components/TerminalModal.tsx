import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2, Maximize2, Play, CornerDownLeft, RefreshCw, Copy, Check } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'furylogiclabs --version',
      output: (
        <div className="text-emerald-400 font-mono text-xs space-y-1">
          <pre className="text-emerald-400 font-bold">
{` _____               _                 _ 
|  ___|            | |               (_)
| |_   _   _ _ __  | | ___   __ _ ___ _  ___ 
|  _| | | | | '__| | |/ _ \\ / _\` / __| |/ __|
| |   | |_| | |    | | (_) | (_| \\__ \\ | (__ 
\\_|    \\__,_|_|    |_|\\___/ \\__, |___/_|\\___|
                             __/ |           
                            |___/            `}
          </pre>
          <p className="text-zinc-300">FuryLogic Labs High-Performance Systems Suite v2.4.0 [x86_64 / RISC-V / MIPS]</p>
          <p className="text-zinc-500">Type <span className="text-emerald-400 font-bold">help</span> to view available system CLI commands.</p>
        </div>
      )
    }
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <p className="text-emerald-400 font-bold">Available FuryLogic Labs CLI Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
              <div><span className="text-cyan-400 font-bold">strikedb query</span> - Run zero-copy in-memory SQL query benchmark</div>
              <div><span className="text-purple-400 font-bold">chimera stats</span> - Fetch AI gateway proxy throughput metrics</div>
              <div><span className="text-blue-400 font-bold">xip boot</span> - Simulate MIPS kernel XIP direct flash execution</div>
              <div><span className="text-emerald-400 font-bold">vugva benchmark</span> - Run AVX-512 SIMD vector search</div>
              <div><span className="text-amber-400 font-bold">polyglot arena</span> - Compare language IPC benchmarks</div>
              <div><span className="text-pink-400 font-bold">opusedge status</span> - Check lightweight LLM agent runtime</div>
              <div><span className="text-emerald-400 font-bold">driver rtl8188fu</span> - Inspect Linux Wi-Fi kernel module</div>
              <div><span className="text-zinc-400 font-bold">papers</span> - List Zenodo peer-reviewed DOIs</div>
              <div><span className="text-zinc-400 font-bold">clear</span> - Clear terminal output buffer</div>
            </div>
          </div>
        );
        break;

      case 'strikedb query':
        outputNode = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-cyan-400 font-bold">[StrikeDB v1.8] Executing Zero-Copy Scan across 10,000,000 tuples...</p>
            <p className="text-zinc-400">Memory Map: /dev/shm/strikedb.mmap (Size: 812 MB, Locked Pages: YES)</p>
            <p className="text-emerald-400 font-bold">✓ Scan Completed in 8.42 microseconds (1.18 Billion rows/sec)</p>
            <p className="text-zinc-500">Live URL: https://strikedb.devforge.qzz.io</p>
          </div>
        );
        break;

      case 'chimera stats':
        outputNode = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-purple-400 font-bold">[Chimera AI Gateway] Multi-Provider Fallback Status:</p>
            <div className="pl-2 space-y-0.5 text-zinc-400">
              <p>• Google Gemini API (Priority 1): <span className="text-emerald-400">ONLINE</span> (Avg Latency: 124ms)</p>
              <p>• OpenAI GPT-4o (Priority 2): <span className="text-emerald-400">ONLINE</span> (Avg Latency: 310ms)</p>
              <p>• Anthropic Claude 3.5 (Priority 3): <span className="text-emerald-400">ONLINE</span> (Avg Latency: 280ms)</p>
            </div>
            <p className="text-emerald-400 font-bold">Token Routing Efficiency: +42% Cost Savings | 99.999% Uptime</p>
          </div>
        );
        break;

      case 'xip boot':
        outputNode = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-blue-400 font-bold">[MIPS32 Kernel XIP] Direct Flash Boot sequence starting...</p>
            <p className="text-zinc-500">[ 0.000000] MIPS XIP Kernel v5.10.120 booting from NOR Flash 0xbf000000</p>
            <p className="text-zinc-500">[ 0.001200] RAM allocated for BSS: 142 KB (No kernel text copied to RAM!)</p>
            <p className="text-emerald-400 font-bold">[ 0.014200] Init process spawned in 14.2 milliseconds! (RAM Savings: 91.4%)</p>
            <p className="text-zinc-400">Repository: https://github.com/Mr-DS-ML-85/mips-xip-kernel</p>
          </div>
        );
        break;

      case 'vugva benchmark':
        outputNode = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-emerald-400 font-bold">[VUGVA Vector Framework] SIMD Cosine Similarity Benchmark:</p>
            <p className="text-zinc-400">Dataset: 1,000,000 vectors x 1536 dimensions (float32)</p>
            <p className="text-emerald-400 font-bold">✓ AVX-512 AVX-VNNI Throughput: 14,200 queries/sec (0.07ms/query)</p>
            <p className="text-zinc-500">Live URL: https://vugva.devforge.qzz.io/</p>
          </div>
        );
        break;

      case 'polyglot arena':
        outputNode = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-amber-400 font-bold">[Polyglot Toolkit] Cross-Language Benchmarks:</p>
            <p className="text-zinc-400">C++ Native vs Rust vs Go vs Python C-Extension</p>
            <p className="text-emerald-400 font-bold">Rust FFI zero-copy overhead: &lt; 1.2 nanoseconds</p>
          </div>
        );
        break;

      case 'opusedge status':
        outputNode = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-pink-400 font-bold">[OpusEdge AI Runtime] Local Agent Engine:</p>
            <p className="text-zinc-400">RAM Footprint: 28.4 MB | Quantized INT4 Execution</p>
            <p className="text-emerald-400 font-bold">Live URL: https://opusai.devforge.qzz.io/</p>
          </div>
        );
        break;

      case 'driver rtl8188fu':
        outputNode = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-emerald-400 font-bold">[RTL8188FU Linux Driver] Module Info:</p>
            <p className="text-zinc-400">Kernel Support: Linux 6.x+ | Chipset: Realtek RTL8188FU USB Wi-Fi</p>
            <p className="text-emerald-400 font-bold">Status: Patched for modern host AP mode & low power suspend</p>
          </div>
        );
        break;

      case 'papers':
        outputNode = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-emerald-400 font-bold">[Zenodo Research Papers]:</p>
            <p className="text-zinc-300">1. Zenodo DOI: 10.5281/zenodo.21471506 (XIP Kernel Optimization)</p>
            <p className="text-zinc-300">2. Zenodo DOI: 10.5281/zenodo.21549808 (High-Density Vector Engines)</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <p className="text-red-400 font-mono text-xs">
            Command not recognized: '{trimmed}'. Type <span className="text-emerald-400 font-bold">help</span> to list available commands.
          </p>
        );
        break;
    }

    setHistory(prev => [...prev, { command: cmdStr, output: outputNode }]);
    setInputVal('');
  };

  const copyTerminalHistory = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl card-shadow rounded-2xl border border-zinc-700 bg-zinc-950 overflow-hidden flex flex-col h-[80vh]">
        
        {/* Terminal Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-zinc-200">
              furylogiclabs-cli@system-node:~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyTerminalHistory}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Copy Terminal Text"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Command Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs text-zinc-300 bg-black/90">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>furylogiclabs@root:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-2 border-l-2 border-emerald-500/30">{item.output}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="bg-zinc-900 border-t border-zinc-800 p-3 flex items-center gap-2"
        >
          <span className="text-emerald-400 font-mono text-xs font-bold pl-2">furylogiclabs@root:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'strikedb query', 'xip boot', or 'chimera stats'..."
            className="flex-1 bg-transparent border-none text-xs font-mono text-white focus:outline-none placeholder-zinc-500"
            autoFocus
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
