import { PaperItem } from '../types';

export const PAPERS_DATA: PaperItem[] = [
  {
    id: 'zenodo-21471506',
    title: 'OpusEdge: Telemetry-Guided Dynamic Compute Allocation for Dense, MoE, and Hybrid SSM-Attention Architectures',
    doi: '10.5281/zenodo.21471506',
    zenodoRecordId: '21471506',
    zenodoUrl: 'https://zenodo.org/records/21471506',
    authors: ['Irfan Mahir'],
    date: '2026',
    publicationType: 'Research Paper (AGPL-3.0)',
    abstract: 'OpusEdge extracts a single per-token importance signal — Δ — from any transformer family: native SSM selectivity in hybrid architectures (Falcon-H1, Jamba, Mamba-2), RMS hidden-state drift as an O(L) proxy in dense transformers (Qwen, LLaMA, SmolLM), and router-softmax entropy in MoE models (Mixtral, OLMoE). One signal drives 10 core primitives + 4 stabilizers + 2 task controllers for KV cache eviction, sparse attention, head gating, state compression, and low-rank projection. 93.8% measured KV cache reduction at 65K context on a single RTX 4060.',
    topics: ['LLM Inference', 'KV Cache Compression', 'Sparse Attention', 'MoE', 'Hybrid SSM-Attention', 'Efficient Inference'],
    highlights: [
      'SelKV: 100.5× quality ratio vs random eviction at 87.5% KV compression',
      'SMSA: 4.98× attention speedup at 2,048 tokens via adaptive sliding window',
      '30 primitives across dense, hybrid, and MoE architecture families',
      '93.8% measured KV cache reduction at 65,536 tokens on single RTX 4060'
    ],
    bibtex: `@misc{mahir2026opusedge,
  title        = {OpusEdge: Telemetry-Guided Dynamic Compute Allocation for
                  Dense, MoE, and Hybrid SSM-Attention Architectures},
  author       = {Irfan Mahir},
  year         = {2026},
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.21471506},
  url          = {https://doi.org/10.5281/zenodo.21471506},
  note         = {Furylogic Labs / Infernix Inference Engine Project}
}`
  },
  {
    id: 'zenodo-21549808',
    title: 'VUGVA: A Software-Defined Virtual Unified GPU VRAM Architecture with CPU-Bypass Hybrid Memory for Non-NVLink Multi-GPU Clusters',
    doi: '10.5281/zenodo.21549808',
    zenodoRecordId: '21549808',
    zenodoUrl: 'https://zenodo.org/records/21549808',
    authors: ['Mahir'],
    date: '2026',
    publicationType: 'Research Paper',
    abstract: 'GPU memory is fragmented across cards. When a model layer does not fit in one GPU VRAM, frameworks copy data through the CPU — a bottleneck that wastes 54.8% of throughput. VUGVA eliminates this by virtualizing multi-GPU VRAM into a single unified pool, bypassing the CPU for all data transfers (64-byte DMA descriptors move megabytes), and tiering memory across VRAM to DRAM to SSD with automatic promotion/demotion. Achieves 85% NVLink performance at <15% cost.',
    topics: ['GPU Virtualization', 'Memory Tiering', 'CPU Bypass', 'DMA', 'Multi-GPU', 'CUDA'],
    highlights: [
      '72 bytes metadata per promotion — CPU touches < 0.01% of transferred data',
      'Three-tier hierarchy: VRAM (1008 GB/s) → DRAM (28 GB/s) → SSD (7 GB/s)',
      'DmaDescriptor = exactly 64 bytes (§3.3, verified on hardware)',
      '42/42 tests passing, works from Tesla P100 through Blackwell (sm_60–sm_120)'
    ],
    bibtex: `@article{vugva_2026,
  author = {Mahir},
  title = {VUGVA: A Software-Defined Virtual Unified GPU VRAM Architecture with CPU-Bypass Hybrid Memory for Non-NVLink Multi-GPU Clusters},
  journal = {Zenodo Repository},
  doi = {10.5281/zenodo.21549808},
  url = {https://zenodo.org/records/21549808},
  year = {2026}
}`
  }
];
