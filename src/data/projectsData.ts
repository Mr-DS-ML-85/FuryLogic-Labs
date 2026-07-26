import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'strikedb',
    name: 'StrikeDB',
    repoName: 'Mr-DS-ML-85/StrikeDB',
    githubUrl: 'https://github.com/Mr-DS-ML-85/StrikeDB',
    liveUrl: 'https://strikedb.devforge.qzz.io',
    category: 'database',
    categoryLabel: 'Unified Database Engine',
    tagline: 'One engine. Every data model. The fastest path for AI agents, RAG, and real-time apps.',
    description: 'StrikeDB is a single, unified data engine where relational tables, key-value, vectors, time-series, pub/sub, AI agent memory, and RAG are all views over one storage substrate — not five bolted-together systems. Written in pure Rust with zero external crates, Apache-2.0 licensed.',
    architectureDetails: 'MVCC + WAL engine where tables, KV, vectors, time-series, and CDC are all key conventions over one store. 32 shards, group-commit, hash-tag routing. Cost-based RAG planner, 7-type AI agent memory, MITM cache debugger, and fuel-metered reducers built-in.',
    keyFeatures: [
      'Unified substrate: KV, vectors, time-series, pub/sub, agent memory, RAG in one engine',
      '7 AI agent memory primitives: working, long-term, episodic, keyword, graph, bi-temporal, procedural',
      'Cost-based RAG: hybrid dense+sparse retrieval with Reciprocal Rank Fusion',
      'MITM cache debugger: STALE_HIT / PHANTOM flags on every cache read',
      'Realtime SUBSCRIBE/PUBLISH over RESP wire (p50 = 31µs round-trip)'
    ],
    techStack: ['Rust', 'RESP Protocol', 'HNSW', 'BM25', 'MVCC', 'Zero External Crates'],
    metrics: [
      { label: 'SET ops/s', value: '5.88M', unit: 'Pipelined', badge: 'Peak' },
      { label: 'vs Redis SET', value: '5.8×', unit: 'Faster', badge: 'Beats Redis' },
      { label: '1M Vector Recall', value: '0.995', unit: '@10 (768-d)' }
    ],
    model3DType: 'strikedb',
    accentColor: '#00f3ff',
    badgeText: 'LIVE DEMO AVAILABLE',
    codeSnippet: {
      language: 'rust',
      filename: 'strikedb_demo.rs',
      code: `// StrikeDB — Unified engine demo over RESP wire
// talk to it with any Redis client
redis-cli -p 6380 SET user:1 ada
redis-cli -p 6380 VADD 1 1.0 0.0 0.0
redis-cli -p 6380 VSEARCH 5 1.0 0.0 0.0

// AI agent memory
redis-cli -p 6380 MEM.REMEMBER "user prefers Rust" user 0.9 1.0 0.2 0.0
redis-cli -p 6380 MEM.RECALL 5 "rust preference" 1.0 0.2 0.0
redis-cli -p 6380 MEM.LINK alice works_at acme 1.0
redis-cli -p 6380 MEM.TRAV alice 3

// pub/sub
redis-cli -p 6380 SUBSCRIBE trades &
redis-cli -p 6380 PUBLISH trades "AAPL 42"`
    }
  },
  {
    id: 'chimera-ai-gateway',
    name: 'Chimera AI Gateway',
    repoName: 'Mr-DS-ML-85/chimera-ai-gateway',
    githubUrl: 'https://github.com/Mr-DS-ML-85/chimera-ai-gateway',
    category: 'ai-gateway',
    categoryLabel: 'Multi-Provider AI API Gateway',
    tagline: 'One API. 20+ AI Providers. Smart Routing. Strong Security. Self-hosted OpenAI-compatible gateway.',
    description: 'Chimera Gateway is a production-grade, self-hosted AI API gateway that routes LLM requests across 15+ free providers with intelligent fallback, latency-aware routing, local Ollama support, and battle-tested security defenses. Drop in as a replacement for any OpenAI-compatible client — zero code changes required. MIT licensed.',
    architectureDetails: 'Python/FastAPI gateway with Auth Gate, WAF, Prompt Shield, Content Policy, intelligent routing engine with circuit breakers per provider, rate limiters, canary token detection, AES-256-GCM E2EE, HMAC request signing, and SHA-256 transparency log. Supports 21 providers including Groq, Google, OpenRouter, Ollama, Anthropic direct, and custom BYOK.',
    keyFeatures: [
      '21 provider integrations with intelligent auto-fallback and circuit breakers',
      'Virtual models: auto, auto:reasoning, fast, quality, balanced, reasoning:free',
      'Security: WAF (SQLi/XSS/CMDi), prompt injection detection, PII redaction, SSRF guard',
      'Anthropic SDK / Claude Code native support via /v1/messages endpoint',
      'OpenAI-compatible drop-in replacement — zero client code changes needed'
    ],
    techStack: ['Python', 'FastAPI', 'AES-256-GCM', 'HMAC', 'SHA-256', 'Docker'],
    metrics: [
      { label: 'Providers', value: '21', unit: 'Integrated' },
      { label: 'Free Providers', value: '15+', unit: 'No CC Required' },
      { label: 'Security Tests', value: 'AC-1/2', unit: 'WAF + Prompt Shield' }
    ],
    model3DType: 'chimera',
    accentColor: '#a855f7',
    badgeText: 'AI INFRASTRUCTURE',
    codeSnippet: {
      language: 'python',
      filename: 'chimera_gateway.py',
      code: `# Chimera AI Gateway — Quick Start
# One endpoint, 21 providers, zero vendor lock-in

curl -X POST http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"model": "auto", "messages": [{"role": "user", "content": "Hello!"}]}'

# Virtual models for intelligent routing:
#   "auto"           — Best free non-reasoning model
#   "auto:reasoning"  — Best free reasoning/math/code model
#   "fast"           — Prioritize latency
#   "quality"        — Prioritize output quality`
    }
  },
  {
    id: 'mips-xip-kernel',
    name: 'MIPS XIP Linux Kernel',
    repoName: 'Mr-DS-ML-85/mips-xip-kernel',
    githubUrl: 'https://github.com/Mr-DS-ML-85/mips-xip-kernel',
    liveUrl: 'https://mr-ds-ml-85.github.io/mips-xip-kernel',
    category: 'kernel',
    categoryLabel: 'Embedded Systems & Kernel Engineering',
    tagline: 'Execute-In-Place Linux kernel for MIPS — kernel code runs directly from SPI-NOR flash, no RAM copy.',
    description: 'A working implementation of CONFIG_XIP_KERNEL for arch/mips on Linux 6.12.34, booting in QEMU malta with the kernel executing directly from flash — no copy to RAM, no decompression. On routers with 8–16 MiB of RAM, XIP frees 2304 KiB — nearly 30% of total memory. GPL-2.0 licensed.',
    architectureDetails: 'Five patches against Linux 6.12.34: Kconfig additions, XIP linker script, head.S data copy, memblock accounting, and TLB handler uasm buffers in RAM with ROM trampolines. MIPS KSEG0/KSEG1 are unmapped segments, so flash below 512 MiB is directly CPU-addressable — no page-table fixups needed unlike RISC-V.',
    keyFeatures: [
      'CONFIG_XIP_KERNEL for MIPS on Linux 6.12.34 — 5 patches total',
      'Frees 2304 KiB of RAM (kernel .text/.rodata/.init.text stay in flash)',
      '4 KiB boot shim: GT-64120 init + fake YAMON + jump to kernel_entry',
      'Freestanding PID 1 binary under 1 KiB (raw MIPS o32 syscalls, no libc)',
      'CI on every push: static layout assertions + QEMU smoke test'
    ],
    techStack: ['C', 'MIPS Assembly', 'Linux 6.12.34', 'Clang', 'QEMU', 'SPI-NOR Flash'],
    metrics: [
      { label: 'RAM Saved', value: '2304', unit: 'KiB', badge: 'Key Metric' },
      { label: 'Patches', value: '5', unit: 'Kernel Patches' },
      { label: 'Boot Shim', value: '4', unit: 'KiB' }
    ],
    model3DType: 'mips',
    accentColor: '#3b82f6',
    badgeText: 'LIVE DEMO & DOCS',
    codeSnippet: {
      language: 'bash',
      filename: 'build_and_test.sh',
      code: `# MIPS XIP Kernel — build and test
make            # build/out/xip-bios.bin (~5 min)
make verify     # static XIP layout assertions
make test       # boot in QEMU, assert markers, clean poweroff
make run        # interactive QEMU session

# Expected output:
# Linux version 6.12.34 ...
# Memory: 245760K/262144K available
# XIP-USERSPACE-OK
# XIP-POWEROFF: requesting power off`
    }
  },
  {
    id: 'vugva',
    name: 'VUGVA',
    repoName: 'Mr-DS-ML-85/VUGVA',
    githubUrl: 'https://github.com/Mr-DS-ML-85/VUGVA',
    liveUrl: 'https://vugva.devforge.qzz.io/',
    category: 'gpu-virtualization',
    categoryLabel: 'GPU VRAM Virtualization',
    tagline: 'Unified GPU VRAM virtualization with CPU bypass. Turn multiple GPUs into one accelerator.',
    description: 'VUGVA implements software-defined GPU memory virtualization with CPU-bypass hybrid DRAM/VRAM tiering. Turns multiple GPUs into one unified accelerator. 85% NVLink performance at <15% cost. Pure Rust with zero external crates via dlopen(3). AGPL-3.0 licensed.',
    architectureDetails: 'Software-defined Virtual Memory Table (VMT) maps string names to physical GPU chunks. 5-state page machine: Unmapped → Allocated → Resident ↔ Warm ↔ Cold. DMA ring with 64-byte descriptors — CPU touches only 72B metadata per promotion, DMA engine moves megabytes. Three-tier hierarchy: VRAM (1008 GB/s) → DRAM (28 GB/s) → SSD (7 GB/s).',
    keyFeatures: [
      'CPU-bypass DMA: 64-byte descriptors, CPU touches < 0.01% of transferred data',
      'Three-tier memory hierarchy: VRAM → DRAM → SSD with auto promotion/demotion',
      'Predictive prefetch: Look-Ahead Attention Tracking K layers ahead via P2P DMA',
      'NUMA-aware routing: bandwidth factors 0.95/0.80/0.65 based on physical distance',
      'Works from Tesla P100 (sm_60) through Blackwell (sm_120) via NVRTC runtime'
    ],
    techStack: ['Rust', 'CUDA FFI', 'NVRTC', 'dlopen(3)', 'Zero External Crates', 'AGPL-3.0'],
    metrics: [
      { label: 'VRAM BW', value: '1008', unit: 'GB/s' },
      { label: 'Metadata/Promotion', value: '72', unit: 'Bytes' },
      { label: '256MB Alloc', value: '109', unit: 'µs' }
    ],
    model3DType: 'vugva',
    accentColor: '#10b981',
    badgeText: 'LIVE DEMO AVAILABLE',
    codeSnippet: {
      language: 'rust',
      filename: 'vugva_demo.rs',
      code: `// VUGVA — unified GPU VRAM with CPU-bypass DMA
use vugva::allocator::VugvaEngine;

fn main() -> vugva::Result<()> {
    let mut engine = VugvaEngine::new(&[0])?;
    let name = engine.allocate("model.embed.weight", &[8192, 8192], 2)?;
    let ptr = engine.access(&name, 0)?;
    println!("VRAM pointer: {:#x}", ptr);
    engine.free(&name)?;
    Ok(())
}`
    }
  },
  {
    id: 'polyglot-toolkit',
    name: 'PolyglotShield',
    repoName: 'Mr-DS-ML-85/polyglot-toolkit',
    githubUrl: 'https://github.com/Mr-DS-ML-85/polyglot-toolkit',
    category: 'security',
    categoryLabel: 'Polyglot File Security Toolkit',
    tagline: 'Red team + ML-powered defensive shield for polyglot file detection, building, and analysis.',
    description: 'PolyglotShield v3.0 combines a red team offensive toolkit with ML-powered defensive shield in one unified application. Build polyglot files, detect hidden threats, monitor directories in real-time, train ML models, run payload evasion, and investigate incidents — 18 TUI panels and 20 GUI panels. MIT licensed.',
    architectureDetails: 'CatBoost ML classifier on 354 features, 49 YARA rules, format parser differential analysis for 104 media formats, steganography detection (LSB/chi-square/histogram/entropy), PE/ELF anomaly analysis, office macro static analysis, and archive recursion scanning. Multi-architecture payload builds for x86-64, ARM64, ARM32.',
    keyFeatures: [
      'ML Detection: CatBoost classifier on 354 features, 97.7% accuracy, 100% malicious recall',
      'Polyglot Builder: 8 container types (JPEG/PNG/GIF/PDF/ZIP/MP4/XLSX/DOCX), 9 payload types',
      'Multi-arch payloads: x86-64, ARM64, ARM32 for Windows/Linux/macOS',
      'Real-time Watchdog monitoring with auto-scan and desktop notifications',
      'Server mode: Flask REST API + web dashboard with 12 endpoints'
    ],
    techStack: ['Python', 'CatBoost', 'PyQt6', 'Rich TUI', 'Flask', 'YARA'],
    metrics: [
      { label: 'ML Accuracy', value: '97.7%', unit: 'CatBoost', badge: 'High' },
      { label: 'Features', value: '354', unit: 'Extracted' },
      { label: 'YARA Rules', value: '49', unit: 'Built-in' }
    ],
    model3DType: 'polyglot',
    accentColor: '#f59e0b',
    badgeText: 'SECURITY TOOLKIT',
    codeSnippet: {
      language: 'python',
      filename: 'polyglot_scan.py',
      code: `# PolyglotShield — scan, build, detect
python polyglot.py scan suspicious.jpg
python polyglot.py build cover.jpg payload.exe \\
  --type jpeg --fud --encrypt --mime
python polyglot.py build cover.jpg payload.bin \\
  --type jpeg --payload-type bash --target-os linux --arch arm64

# ML training
python polyglot.py train --data training_dataset.csv --gpu

# Server mode (web dashboard + REST API)
python polyglot.py server --port 8888`
    }
  },
  {
    id: 'opusedge',
    name: 'OpusEdge',
    repoName: 'Mr-DS-ML-85/OpusEdge',
    githubUrl: 'https://github.com/Mr-DS-ML-85/OpusEdge',
    liveUrl: 'https://opusai.devforge.qzz.io/',
    category: 'llm-inference',
    categoryLabel: 'LLM Inference Optimization',
    tagline: 'One signal. 30 primitives. Every architecture. Telemetry-guided compute allocation for LLMs.',
    description: 'OpusEdge extracts a single per-token importance signal — Δ — from any transformer family (dense, hybrid SSM-attention, MoE) and drives 10 core primitives + 4 stabilizers + 2 task controllers to shrink KV cache, sparsify attention, gate heads, compress state, and modulate compute. 93.8% measured KV cache reduction at 65K context on a single RTX 4060. C++20 + Python SDK.',
    architectureDetails: 'Three signal sources: native SSM selectivity in hybrid models, RMS hidden-state drift as O(L) proxy in dense transformers, router-softmax entropy in MoE. 16 C++ headers, ~50 member functions, 30 Python bindings. Header-only C++20 engine with Eigen dependency. PolyForm Noncommercial license.',
    keyFeatures: [
      'SelKV: Δ-guided KV eviction — 100.5× quality vs random at 87.5% compression',
      'SMSA: Adaptive sliding-window attention — 4.98× speedup at 2K tokens',
      'Delta-AR: Per-query top-K routing before softmax — O(S²) → O(S·K)',
      'StateCompress: Zero low-magnitude channels — 37.5% state reduction at ~0 PPL',
      'Works across dense (Qwen), hybrid (Falcon-H1), and MoE (Granite) architectures'
    ],
    techStack: ['C++20', 'Eigen', 'Python SDK', 'PyTorch', 'HuggingFace', 'NVIDIA RTX'],
    metrics: [
      { label: 'KV Reduction', value: '93.8%', unit: '@65K ctx', badge: 'Headline' },
      { label: 'Attention Speedup', value: '4.98×', unit: '@2K tokens' },
      { label: 'Primitives', value: '30', unit: 'C++/Python' }
    ],
    model3DType: 'opusedge',
    accentColor: '#ec4899',
    badgeText: 'LIVE DEMO AVAILABLE',
    codeSnippet: {
      language: 'cpp',
      filename: 'opusedge_selkv.cpp',
      code: `// OpusEdge — evict 87.5% of KV cache using Δ signal
#include <opusedge/primitives/selkv.h>
using namespace opusedge;

VectorXf delta = signal_from_your_model();
auto r = SelKV::evict(delta, /*ratio=*/0.875, delta.size());
// r.retained_indices  — keep
// r.evicted_indices   — drop
// r.memory_savings    — 0.875

// Python SDK:
// retained, evicted = oe.selkv_evict(delta_scores, 0.875)`
    }
  },
  {
    id: 'rtl8188fu',
    name: 'RTL8188FU Linux Driver',
    repoName: 'Mr-DS-ML-85/rtl8188fu',
    githubUrl: 'https://github.com/Mr-DS-ML-85/rtl8188fu',
    category: 'driver',
    categoryLabel: 'WiFi Security Driver',
    tagline: 'RTL8188FU driver patched for Linux 7.0+ with monitor mode and pentesting support.',
    description: 'Patched Linux kernel driver for Realtek RTL8188FU USB WiFi adapters supporting kernel 7.0+ (Ubuntu 26.04). Includes OEM USB ID patch, UBSAN bug fixes, monitor mode with frame injection, and pentesting scripts. GPL-2.0 licensed.',
    architectureDetails: 'Patches include OEM USB ID (0xf149) for hardware detection, 6 UBSAN bug fixes (array-index/out-of-bounds, shift-out-of-bounds), sprintf overlap fix, and WPA3-SAE investigation (firmware limitation — SAE offload not available in RTL8188FU firmware). Monitor mode with radiotap headers and aircrack-ng compatibility.',
    keyFeatures: [
      'Linux kernel 7.0+ support (Ubuntu 26.04 confirmed)',
      'OEM USB ID 0xbda:f149 patch for hardware detection',
      '6 UBSAN bug fixes: array bounds, shift overflow, sprintf overlap',
      'Monitor mode + frame injection for aircrack-ng / Kismet / Wireshark',
      'Pentesting scripts: airmon, wifi-scanner, deauth-detector, evil-twin, softap'
    ],
    techStack: ['C', 'Linux Kernel Module', 'mac80211', 'USB', '802.11', 'Monitor Mode'],
    metrics: [
      { label: 'Kernel', value: '7.0+', unit: 'Compatible' },
      { label: 'UBSAN Fixes', value: '6', unit: 'Bugs Fixed' },
      { label: 'USB IDs', value: '2', unit: 'f179 + f149' }
    ],
    model3DType: 'rtl8188fu',
    accentColor: '#06b6d4',
    badgeText: 'HARDWARE DRIVER',
    codeSnippet: {
      language: 'bash',
      filename: 'install_driver.sh',
      code: `# RTL8188FU — one-click install
git clone https://github.com/Mr-DS-ML-85/rtl8188fu
cd rtl8188fu
sudo bash install.sh

# Verify it works
ip -br link          # look for wlan0
iw dev               # wireless interface details
dmesg | grep RTL871X # driver init log

# Monitor mode for pentesting
sudo airmon-ng start wlan0
sudo airodump-ng wlan0mon`
    }
  }
];
