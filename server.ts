import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Assistant powered by Gemini for FuryLogic Labs
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({
          reply: "I am the FuryLogic Labs Virtual Architecture Assistant. (Note: GEMINI_API_KEY is not configured in environment, but you can explore FuryLogic Labs projects, benchmarks, and research papers using the interactive UI panels above!).",
          systemInfo: {
            apiKeyPresent: false
          }
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemPrompt = `You are the chief architecture AI assistant for FuryLogic Labs (furylogic.com), a deep-tech systems engineering firm and research lab.
Your knowledge includes FuryLogic Labs' key open-source ecosystem & papers:
1. StrikeDB (https://strikedb.devforge.qzz.io | repo: Mr-DS-ML-85/StrikeDB): Ultra-fast embedded/distributed database engine in C++/Rust, zero-copy columnar storage, SIMD accelerated, 1.2M+ QPS.
2. Chimera AI Gateway (repo: Mr-DS-ML-85/chimera-ai-gateway): Unified low-latency AI proxy/gateway with multi-provider routing, dynamic caching, token tracking, fallback, <8ms latency overhead.
3. MIPS XIP Kernel (https://mr-ds-ml-85.github.io/mips-xip-kernel | repo: Mr-DS-ML-85/mips-xip-kernel): Execute-In-Place MIPS Linux kernel patch enabling flash-based execution, saving 68% RAM and achieving 3.2x faster boot for embedded microcontrollers.
4. VUGVA (https://vugva.devforge.qzz.io/ | repo: Mr-DS-ML-85/VUGVA): Vector-Unified GPU & Vector Architecture framework for bare-metal custom tensor cores, BLAS kernels, and quantized neural acceleration.
5. Polyglot Toolkit (repo: Mr-DS-ML-85/polyglot-toolkit): Zero-overhead cross-language interop and memory-safe shared arena generator linking C/C++, Rust, Go, Python, and WASM.
6. OpusEdge (https://opusai.devforge.qzz.io/ | repo: Mr-DS-ML-85/OpusEdge): Autonomous edge AI agent runtime for RISC-V and ARM micro-servers.
7. RTL8188FU Driver (repo: Mr-DS-ML-85/rtl8188fu): Hardened Linux wireless driver for Realtek RTL8188FU with packet injection, low-latency monitor mode, kernel 6.x compatibility.
8. Research Papers on Zenodo:
   - Record 21471506: High-Throughput Memory-Mapped Database Systems & Zero-Copy Architecture.
   - Record 21549808: Execute-In-Place Kernel Optimizations for Resource-Constrained Embedded Hardware.

Be highly technical, concise, clear, and enthusiastic about systems performance, C++, Rust, kernel engineering, and AI infrastructure. Limit responses to 2-3 paragraphs with technical detail.`;

      const contents = [];
      contents.push({ role: "user", parts: [{ text: systemPrompt }] });
      contents.push({ role: "model", parts: [{ text: "Understood. I am online and ready to assist with FuryLogic Labs engineering questions." }] });

      if (history && Array.isArray(history)) {
        for (const item of history) {
          contents.push({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.content }]
          });
        }
      }

      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });

      return res.json({
        reply: response.text || "No response generated.",
        systemInfo: { apiKeyPresent: true }
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: error?.message || "Internal server error" });
    }
  });

  // Healthcheck endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "online", firm: "FuryLogic Labs", domain: "furylogic.com" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FuryLogic Labs Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
