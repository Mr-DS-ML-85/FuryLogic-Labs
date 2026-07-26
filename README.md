<div align="center">

# FuryLogic Labs

**High-Performance Systems & AI Engineering Portfolio**

Open-source bare-metal systems, unified databases, GPU VRAM virtualization, LLM inference optimization, and multi-provider AI gateways.

[Website](https://furylogic.com) · [GitHub](https://github.com/Mr-DS-ML-85) · [Zenodo Papers](https://zenodo.org/search?q=Mr-DS-ML-85)

</div>

---

## Projects

| Project | Description | Tech |
|---------|-------------|------|
| **StrikeDB** | Unified database engine — KV, vectors, time-series, pub/sub, AI agent memory, RAG all over one storage substrate. Beats Redis 5.8× SET ops. | Rust, RESP, HNSW, BM25 |
| **Chimera AI Gateway** | Self-hosted OpenAI-compatible gateway — 21 providers, intelligent auto-fallback, WAF, prompt injection detection, PII redaction. | Python, FastAPI, AES-256-GCM |
| **MIPS XIP Linux Kernel** | Execute-in-place Linux 6.12.34 for MIPS — kernel runs directly from SPI-NOR flash, frees 2304 KiB RAM. | C, MIPS Assembly, QEMU |
| **VUGVA** | GPU VRAM virtualization with CPU-bypass DMA — three-tier VRAM/DRAM/SSD hierarchy, 1008 GB/s bandwidth, 72 bytes metadata per promotion. | Rust, CUDA FFI, NVRTC |
| **OpusEdge** | Telemetry-guided LLM compute allocation — 30 primitives driving KV cache eviction, attention sparsification, state compression. 93.8% KV reduction. | C++20, Eigen, Python SDK |
| **PolyglotShield** | Red team + ML defensive shield — CatBoost classifier on 354 features, polyglot file builder, steganography detection, real-time watchdog. | Python, CatBoost, PyQt6, YARA |
| **RTL8188FU** | Patched Linux 7.0+ driver for Realtek RTL8188FU USB WiFi — monitor mode, frame injection, 6 UBSAN fixes, pentesting scripts. | C, Linux Kernel, mac80211 |

## Research Publications

- [DOI 10.5281/zenodo.21471506](https://zenodo.org/records/21471506) — OpusEdge: Telemetry-Guided LLM Compute Allocation
- [DOI 10.5281/zenodo.21549808](https://zenodo.org/records/21549808) — VUGVA: Software-Defined GPU VRAM Architecture

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Three.js, Tailwind CSS
- **Backend:** Node.js, Express, Google Gemini AI
- **Systems:** Rust, C++20, AVX-512/SSE4.2 SIMD, CUDA, MIPS32 assembly

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## License

[CC BY-NC 4.0](LICENSE) — Copyright © 2026 FuryLogic Labs

## Contact

- **Irfan:** irfan@furylogic.com
- **General:** contact@furylogic.com
