import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const loadModelAndData = async () => {
      try {
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        console.log("MobileNet loaded");

        const res = await fetch("/data/product.json");
        const data = await res.json();
        setProducts(data);
        console.log("Products loaded:", data.length);
      } catch (err) {
        console.error("Error loading model or products:", err);
      }
    };

    loadModelAndData();
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setImageUrl("");
    setResults([]);
  };

  // Handle URL input
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setPreview(e.target.value);
    setSelectedImage(null);
    setResults([]);
  };

  // Cosine similarity
  const cosineSimilarity = (a, b) => {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB);
  };

  // Handle search
  const handleSearch = async () => {
    if (!model) {
      alert("Model not loaded yet. Please wait.");
      return;
    }
    if (!selectedImage && !imageUrl) {
      alert("Please upload an image or enter an image URL.");
      return;
    }

    try {
      setLoading(true);
      let imgElement = new Image();
      imgElement.crossOrigin = "anonymous";

      const getEmbedding = async (img) => {
        const activation = model.infer(img, true); // get intermediate activation
        return Array.from(activation.dataSync());
      };

      const results = await new Promise((resolve, reject) => {
        imgElement.onload = async () => {
          try {
            const queryVector = await getEmbedding(imgElement);

            // Compute similarity with all products
            const sims = products.map((p) => ({
              ...p.product,
              score: cosineSimilarity(queryVector, p.vector),
            }));

            // Sort by similarity descending
            sims.sort((a, b) => b.score - a.score);
            resolve(sims.slice(0, 8)); // top 8
          } catch (err) {
            reject(err);
          }
        };

        imgElement.onerror = () => reject("Failed to load image");
        imgElement.src = selectedImage ? URL.createObjectURL(selectedImage) : imageUrl;
      });

      setResults(results);
    } catch (err) {
      console.error("Search error:", err);
      alert("Error during search. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Visual Product Matcher
      </h1>

      {/* Upload or URL input */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded-lg w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          className="border p-2 rounded-lg w-full md:w-1/2"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-6">
          <img
            src={preview}
            alt="Preview"
            className="w-64 h-64 object-cover rounded-xl shadow-md"
          />
        </div>
      )}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={loading || !model || products.length === 0}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
      >
        {loading ? "Searching..." : "Find Similar Products"}
      </button>

      {/* Results Section */}
      <div className="mt-8 w-full max-w-4xl">
        {results.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Similar Products:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-xl shadow hover:scale-105 transition"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="text-gray-800 font-semibold mt-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs">{item.category}</p>
                  <p className="text-blue-600 text-sm font-medium mt-1">
                    Similarity: {item.score?.toFixed(2) ?? "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          !loading && (
            <p className="text-gray-500 text-center mt-4">
              No similar products found yet. Upload an image to start!
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default App;