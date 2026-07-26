import React, { useState } from 'react';
import { BENCHMARKS_DATA } from '../data/benchmarksData';

export const BenchmarksSection: React.FC = () => {
  const [activeBenchmark, setActiveBenchmark] = useState<string>('query-throughput');
  const selectedData = BENCHMARKS_DATA.find((b) => b.id === activeBenchmark) || BENCHMARKS_DATA[0];

  return (
    <section id="benchmarks" className="py-20 md:py-28 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Benchmarks
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm sm:text-base">
            Empirical results from bare-metal workloads.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {BENCHMARKS_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveBenchmark(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeBenchmark === item.id
                  ? 'bg-white text-black'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--border-hover)]'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {selectedData.title}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              {selectedData.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-white">{selectedData.furyLabel}</span>
                <span className="text-[var(--accent)] font-semibold">{selectedData.furyValue} {selectedData.unit}</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
                  style={{
                    width: `${selectedData.higherIsBetter
                      ? (selectedData.furyValue / selectedData.furyValue) * 100
                      : (selectedData.furyValue / selectedData.comp1Value) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--text-muted)]">{selectedData.comp1Label}</span>
                <span className="text-zinc-500">{selectedData.comp1Value} {selectedData.unit}</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-600 rounded-full transition-all duration-500"
                  style={{
                    width: `${selectedData.higherIsBetter
                      ? (selectedData.comp1Value / selectedData.furyValue) * 100
                      : (selectedData.comp1Value / selectedData.comp1Value) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--text-muted)]">{selectedData.comp2Label}</span>
                <span className="text-zinc-500">{selectedData.comp2Value} {selectedData.unit}</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-700 rounded-full transition-all duration-500"
                  style={{
                    width: `${selectedData.higherIsBetter
                      ? (selectedData.comp2Value / selectedData.furyValue) * 100
                      : (selectedData.comp2Value / selectedData.comp1Value) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-4">
            {selectedData.notes}
          </p>
        </div>
      </div>
    </section>
  );
};
