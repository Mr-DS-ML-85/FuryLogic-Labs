import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am the FuryLogic Labs Engineering Assistant powered by Gemini 2.5. Ask me anything about StrikeDB, Chimera AI Gateway, MIPS XIP Kernel, VUGVA, OpusEdge, Zenodo DOI research papers, or SIMD performance optimization."
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async () => {
    const query = input.trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (!response.ok) {
        throw new Error('Server route returned non-OK');
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || "FuryLogic Labs systems offer unified database engines, GPU VRAM virtualization, LLM inference optimization, and multi-provider AI gateways."
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Fallback assistant response
      let fallbackText = "FuryLogic Labs specializes in high-performance system software. StrikeDB is a unified database engine beating Redis 5.8x. Chimera Gateway routes across 21 AI providers. VUGVA virtualizes GPU VRAM with CPU-bypass DMA. OpusEdge achieves 93.8% KV cache reduction.";
      if (query.toLowerCase().includes('paper') || query.toLowerCase().includes('zenodo')) {
        fallbackText = "FuryLogic Labs publications on Zenodo: DOI 10.5281/zenodo.21471506 (OpusEdge: Telemetry-Guided LLM Compute Allocation) and DOI 10.5281/zenodo.21549808 (VUGVA: Software-Defined GPU VRAM Architecture).";
      } else if (query.toLowerCase().includes('strikedb')) {
        fallbackText = "StrikeDB (Mr-DS-ML-85/StrikeDB) is an ultra-fast C++20 embedded database. Live demo: https://strikedb.devforge.qzz.io";
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'ai', text: fallbackText }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="card-shadow w-full max-w-2xl rounded-2xl overflow-hidden border border-emerald-500/40 flex flex-col h-[600px] max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                FuryLogic Labs AI System Assistant
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Gemini 2.5
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                Technical queries on Repos, Zenodo Papers & System Benchmarks
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

        {/* Chat Messages */}
        <div className="flex-1 p-4 sm:p-6 bg-[#030305] overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 font-bold ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {msg.sender === 'user' ? 'YOU' : <Sparkles className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm max-w-[80%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-950/60 border border-cyan-800 text-cyan-100 rounded-tr-none'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none font-sans'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 p-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing FuryLogic Labs codebase & system benchmarks...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask e.g. How does StrikeDB handle AVX-512 SIMD?"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500/50 placeholder-zinc-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
