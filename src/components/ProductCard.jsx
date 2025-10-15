import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-3 flex gap-3 items-center hover:shadow-md transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex-1">
        <div className="font-semibold text-sm">{product.name}</div>
        <div className="text-xs text-gray-500">{product.category}</div>
      </div>
      <div className="text-sm font-mono">{(product.score ?? 0).toFixed(3)}</div>
    </div>
  );
}
