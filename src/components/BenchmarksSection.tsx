import React, { useState } from 'react';
import { BENCHMARKS_DATA, FURYLOGIC_PILLARS } from '../data/benchmarksData';
import { BarChart2, Zap, ShieldCheck, Cpu, HardDrive, Bot, TrendingUp, CheckCircle } from 'lucide-react';

export const BenchmarksSection: React.FC = () => {
  const [activeBenchmark, setActiveBenchmark] = useState<string>('query-throughput');

  const selectedData = BENCHMARKS_DATA.find((b) => b.id === activeBenchmark) || BENCHMARKS_DATA[0];

  return (
    <section id="benchmarks" className="py-16 md:py-24 border-b border-zinc-800/80 bg-[#050508] relative grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/30 bg-emerald-950/40 text-xs font-mono text-emerald-400">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>REAL-TIME HARDWARE & SOFTWARE BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Microsecond <span className="text-emerald-400 text-glow">System Performance</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Empirical latency, query QPS, and memory footprint comparisons derived from bare-metal workloads across FuryLogic Labs projects.
          </p>
        </div>

        {/* Benchmark Visualizer Card */}
        <div className="card-shadow rounded-2xl p-6 md:p-8 space-y-8">
          
          {/* Tabs selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-zinc-800 pb-4">
            {BENCHMARKS_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveBenchmark(item.id)}
                className={`px-4 py-2 rounded font-mono text-xs transition-all ${
                  activeBenchmark === item.id
                    ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Active Benchmark Detailed View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Metadata */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Metric: {selectedData.unit}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedData.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  {selectedData.subtitle}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
                <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Methodology & Notes:
                </div>
                {selectedData.notes}
              </div>
            </div>

            {/* Right: Comparative Bars */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* FuryLogic Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 animate-pulse" />
                    {selectedData.furyLabel} (FuryLogic Labs)
                  </span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {selectedData.furyValue} {selectedData.unit}
                  </span>
                </div>
                <div className="w-full h-7 bg-zinc-900 rounded-lg p-1 border border-emerald-500/40 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-400 rounded transition-all duration-700 shadow-md shadow-emerald-500/30"
                    style={{
                      width: `${
                        selectedData.higherIsBetter
                          ? (selectedData.furyValue / selectedData.furyValue) * 100
                          : (selectedData.furyValue / selectedData.comp1Value) * 100
                      }%`
                    }}
                  />
                </div>
              </div>

              {/* Competitor 1 Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{selectedData.comp1Label}</span>
                  <span>{selectedData.comp1Value} {selectedData.unit}</span>
                </div>
                <div className="w-full h-5 bg-zinc-900/80 rounded-lg p-1 border border-zinc-800">
                  <div
                    className="h-full bg-zinc-700 rounded transition-all duration-700"
                    style={{
                      width: `${
                        selectedData.higherIsBetter
                          ? (selectedData.comp1Value / selectedData.furyValue) * 100
                          : (selectedData.comp1Value / selectedData.comp1Value) * 100
                      }%`
                    }}
                  />
                </div>
              </div>

              {/* Competitor 2 Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{selectedData.comp2Label}</span>
                  <span>{selectedData.comp2Value} {selectedData.unit}</span>
                </div>
                <div className="w-full h-5 bg-zinc-900/80 rounded-lg p-1 border border-zinc-800">
                  <div
                    className="h-full bg-zinc-800 rounded transition-all duration-700"
                    style={{
                      width: `${
                        selectedData.higherIsBetter
                          ? (selectedData.comp2Value / selectedData.furyValue) * 100
                          : (selectedData.comp2Value / selectedData.comp1Value) * 100
                      }%`
                    }}
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
