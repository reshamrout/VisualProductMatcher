import React from "react";
import PreviewCard from "./PreviewCard";
import ProductCard from "./ProductCard";

export default function ResultsList({ loading, queryImage, results }) {
  return (
    <div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div className="md:col-span-1">
          <h2 className="text-lg font-semibold">Query Image</h2>
          <div className="mt-2">
            <PreviewCard imageUrl={queryImage} />
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold">Similar Products</h2>
          <p className="text-sm text-gray-500">
            Showing {results.length} result(s)
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {loading && (
          <div className="p-6 text-center text-gray-600">
            Searching... (this talks to your backend)
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No results yet — upload an image or enter URL.
          </div>
        )}

        {results.map((r) => (
          <ProductCard key={r.id} product={r} />
        ))}
      </div>
    </div>
  );
}
