import { BenchmarkData } from '../types';

export const BENCHMARKS_DATA: BenchmarkData[] = [
  {
    id: 'strikedb-redis',
    title: 'StrikeDB vs Redis 8.x — SET Throughput',
    subtitle: 'Pipelined SET ops/s with redis-benchmark 8.0.5 (-P 64, -c 100)',
    furyLabel: 'StrikeDB (Durable)',
    furyValue: 5880,
    comp1Label: 'Redis 8.0.5 (in-mem)',
    comp1Value: 2940,
    comp2Label: 'Redis 8.0.5 (AOF everysec)',
    comp2Value: 2300,
    unit: 'K ops/s',
    higherIsBetter: true,
    notes: 'Same machine, same benchmark tool. StrikeDB 5.88M/s durable vs Redis 2.94M/s in-memory.'
  },
  {
    id: 'strikedb-vector',
    title: 'Vector Search — 1M Scale Recall',
    subtitle: 'VSEARCH p99 on real embeddings, single node, RESP wire',
    furyLabel: 'StrikeDB (1M×768-d)',
    furyValue: 99.5,
    comp1Label: 'Qdrant (published)',
    comp1Value: 95.0,
    comp2Label: 'vs Qdrant 1-client QPS',
    comp2Value: 4652,
    unit: '% Recall@10',
    higherIsBetter: true,
    notes: 'StrikeDB 0.995 recall vs Qdrant ~0.95. Single-client: 4,652 QPS vs Qdrant ~450 QPS (~10× faster).'
  },
  {
    id: 'mips-xip-ram',
    title: 'XIP Kernel RAM Savings',
    subtitle: 'RAM reserved by kernel vs XIP on MIPS (QEMU malta, 256 MiB)',
    furyLabel: 'XIP Kernel',
    furyValue: 4132,
    comp1Label: 'Stock Linux (RAM-loaded)',
    comp1Value: 6436,
    comp2Label: 'Available RAM (XIP)',
    comp2Value: 257724,
    unit: 'KiB reserved',
    higherIsBetter: false,
    notes: 'XIP frees 2304 KiB — kernel .text/.rodata/.init.text execute directly from SPI-NOR flash.'
  },
  {
    id: 'vugva-bandwidth',
    title: 'GPU Memory Bandwidth Hierarchy',
    subtitle: 'VUGVA three-tier bandwidth (GB/s) — RTX 4060',
    furyLabel: 'VRAM (Tier 1)',
    furyValue: 1008,
    comp1Label: 'DRAM (Tier 2)',
    comp1Value: 28,
    comp2Label: 'SSD (Tier 3)',
    comp2Value: 7,
    unit: 'GB/s',
    higherIsBetter: true,
    notes: '1008 >> 28 >> 7 GB/s. CPU-bypass: only 72 bytes metadata per promotion, DMA moves megabytes.'
  },
  {
    id: 'opusedge-kv',
    title: 'OpusEdge SelKV Quality Ratio',
    subtitle: 'Δ-guided vs random eviction at 87.5% KV compression',
    furyLabel: 'OpusEdge SelKV',
    furyValue: 100.5,
    comp1Label: 'Random Eviction',
    comp1Value: 1.0,
    comp2Label: 'SMSA Speedup',
    comp2Value: 4.98,
    unit: '× quality ratio',
    higherIsBetter: true,
    notes: 'Falcon-H1-0.5B: SelKV PPL 5.16 vs Random PPL 519.01 at 87.5% eviction = 100.5× quality ratio.'
  }
];

export const FURYLOGIC_PILLARS = [
  {
    title: 'Unified Data Engine',
    subtitle: 'StrikeDB — One Engine, Every Model',
    description: 'Relational tables, KV, vectors, time-series, pub/sub, AI agent memory, and RAG unified on one storage substrate with one consistency model. Beats Redis on every op.',
    iconName: 'Database',
    stat: '5.88M',
    statLabel: 'SET ops/s (vs Redis 2.94M)'
  },
  {
    title: 'LLM Inference Optimization',
    subtitle: 'OpusEdge — One Signal, 30 Primitives',
    description: 'Telemetry-guided compute allocation for dense, MoE, and hybrid SSM-attention LLMs. 93.8% measured KV cache reduction at 65K context on a single GPU.',
    iconName: 'Zap',
    stat: '93.8%',
    statLabel: 'KV Cache Reduction'
  },
  {
    title: 'GPU VRAM Virtualization',
    subtitle: 'VUGVA — CPU-Bypass DMA',
    description: 'Software-defined GPU memory virtualization turning multiple GPUs into one unified accelerator. 72 bytes metadata per promotion, DMA moves megabytes.',
    iconName: 'Cpu',
    stat: '1008',
    statLabel: 'GB/s VRAM Bandwidth'
  },
  {
    title: 'Embedded Kernel Engineering',
    subtitle: 'MIPS XIP — Flash Execution',
    description: 'Execute-In-Place Linux kernel for MIPS — code runs directly from SPI-NOR flash, no RAM copy. Frees 2304 KiB on memory-constrained routers.',
    iconName: 'HardDrive',
    stat: '2304',
    statLabel: 'KiB RAM Saved'
  }
];
