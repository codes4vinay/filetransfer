import React, { useState } from "react";

export default function ClipboardSend() {
  const [text, setText] = useState("");
  const [code, setCode] = useState(null);
  const [error, setError] = useState("");

  const send = async () => {
    try {
      setError("");
      const res = await fetch("http://localhost:8000/api/clipboard/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to send clipboard");
      }

      const data = await res.json();
      setCode(data.code);
      setText("");
    } catch (err) {
      console.error(err);
      setError("Failed to send. Check backend is running.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Send Clipboard</h2>
      <textarea
        className="w-full border rounded p-2 mb-3"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to share..."
      />
      <button
        onClick={send}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Generate Code
      </button>

      {code && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p>
            Share this code: <b className="text-xl">{code}</b>
          </p>
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
