import React, { useState } from "react";

export default function ClipboardReceive() {
  const [code, setCode] = useState("");
  const [content, setContent] = useState(null);
  const [error, setError] = useState("");

  const getContent = async () => {
    try {
      setError("");
      const res = await fetch("http://localhost:8000/api/clipboard/receive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        setContent(null);
        setError("Not found or expired");
        return;
      }

      const data = await res.json();
      setContent(data.content);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch. Check backend is running.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Receive Clipboard</h2>
      <input
        className="border p-2 w-2/3 mr-2 rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter 6-digit code"
      />
      <button
        onClick={getContent}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Fetch
      </button>

      {content && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <pre>{content}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 border rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
