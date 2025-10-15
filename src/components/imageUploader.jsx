import React, { useRef, useState } from "react";

export default function ImageUploader({ onSearch, setQueryImage }) {
  const fileRef = useRef();
  const [url, setUrl] = useState("");

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const localUrl = URL.createObjectURL(f);
    setQueryImage(localUrl);
    onSearch({ file: f });
  };

  const submitUrl = (e) => {
    e.preventDefault();
    if (!url) return;
    setQueryImage(url);
    onSearch({ imageUrl: url });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Upload image
      </label>
      <div className="mt-2 flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700"
        />
      </div>

      <form onSubmit={submitUrl} className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Or image URL
        </label>
        <div className="mt-2 flex gap-2">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            className="flex-1 rounded-md border p-2 text-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="px-4 py-2 bg-violet-600 text-white rounded-md text-sm">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
