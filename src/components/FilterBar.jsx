import React from "react";

export default function FilterBar({ minScore, setMinScore }) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium">Filters</h3>
      <div className="mt-2">
        <label className="text-xs text-gray-600">
          Minimum similarity score: {minScore.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={minScore}
          onChange={(e) => setMinScore(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
