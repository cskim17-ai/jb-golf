import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const PRICING_FILE = path.join(__dirname, "src/data/pricing.json");
  const QUOTES_FILE = path.join(__dirname, "src/data/quotes.json");

  // Ensure data directory exists
  const dataDir = path.join(__dirname, "src/data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Initialize files if they don't exist
  if (!fs.existsSync(PRICING_FILE)) {
    fs.writeFileSync(PRICING_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(QUOTES_FILE)) {
    fs.writeFileSync(QUOTES_FILE, JSON.stringify([], null, 2));
  }

  // API routes
  app.get("/api/pricing", (req, res) => {
    try {
      const data = fs.readFileSync(PRICING_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      console.error("Error reading pricing data:", error);
      res.status(500).json({ error: "Failed to read pricing data" });
    }
  });

  app.post("/api/pricing", (req, res) => {
    try {
      const data = req.body;
      fs.writeFileSync(PRICING_FILE, JSON.stringify(data, null, 2));
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving pricing data:", error);
      res.status(500).json({ error: "Failed to save pricing data" });
    }
  });

  app.get("/api/quotes", (req, res) => {
    try {
      const data = fs.readFileSync(QUOTES_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      console.error("Error reading quotes data:", error);
      res.status(500).json({ error: "Failed to read quotes data" });
    }
  });

  app.post("/api/quotes", (req, res) => {
    try {
      const newQuote = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...req.body
      };
      const data = JSON.parse(fs.readFileSync(QUOTES_FILE, "utf-8"));
      data.unshift(newQuote); // Newest first
      fs.writeFileSync(QUOTES_FILE, JSON.stringify(data, null, 2));
      res.json({ success: true, quote: newQuote });
    } catch (error) {
      console.error("Error saving quote data:", error);
      res.status(500).json({ error: "Failed to save quote data" });
    }
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
