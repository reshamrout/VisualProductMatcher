import React from "react";

export default function PreviewCard({ imageUrl, alt }) {
  if (!imageUrl)
    return (
      <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md">
        No image selected
      </div>
    );

  return (
    <div className="h-48 rounded-md overflow-hidden bg-gray-100">
      <img
        src={imageUrl}
        alt={alt || "query image"}
        className="object-contain w-full h-full"
      />
    </div>
  );
}
