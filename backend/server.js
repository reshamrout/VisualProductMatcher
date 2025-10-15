// backend/server.js
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;


app.use(express.json());


const PRODUCTS_FILE = path.join(process.cwd(), "./data/product.json");


let products = [];
try {
  const data = fs.readFileSync(PRODUCTS_FILE, "utf-8");
  products = JSON.parse(data);
  console.log(`✅ Loaded ${products.length} products from product.json`);
} catch (err) {
  console.error("❌ Failed to load product.json:", err);
}


app.get("/products", (req, res) => {
  res.json(products.map(p => p.product));
});


app.post("/search", (req, res) => {
  const { vector } = req.body; e
  if (!vector || !Array.isArray(vector)) {
    return res.status(400).json({ error: "Vector array is required" });
  }

  // Cosine similarity
  const similarity = (vecA, vecB) => {
    const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dot / (magA * magB);
  };

  // Compute similarity for all products
  const results = products
    .map(p => ({
      product: p.product,
      score: similarity(vector, p.vector)
    }))
    .sort((a, b) => b.score - a.score) // highest similarity first
    .slice(0, 10); // top 10 results

  res.json(results);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
