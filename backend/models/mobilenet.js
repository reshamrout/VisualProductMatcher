// backend/models/mobilenet.js
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs-node";

let model;

// Load MobileNet model
export async function loadModel() {
  if (!model) {
    console.log("🔹 Loading MobileNet model...");
    model = await mobilenet.load();
    console.log("✅ MobileNet model loaded successfully");
  }
  return model;
}

// Extract embeddings from image buffer
export async function getEmbeddingFromBuffer(imageBuffer) {
  const imageTensor = tf.node.decodeImage(imageBuffer, 3);
  const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
  const expanded = resized.expandDims(0);
  const loadedModel = await loadModel();
  const embeddings = loadedModel.infer(expanded, true);
  return embeddings;
}
