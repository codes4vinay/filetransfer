import React, { useState } from "react";

export default function ClipboardReceive() {
  const [code, setCode] = useState("");
  const [content, setContent] = useState(null);
  const [error, setError] = useState("");

  const getContent = async () => {
    try {
      setError("");
      const res = await fetch("https://go.filetranfer.tech/api/clipboard/receive",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

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

  const copyToClipboard = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      alert("Content copied to clipboard!");
    }
  };

  return (
    <div className="relative min-h-screen font-sans text-white">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          Receive Clipboard
        </h2>

        <input
          className="w-full max-w-lg border border-gray-300 rounded-lg p-4 mb-4 text-lg sm:text-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
        />

        <button
          onClick={getContent}
          className="w-full max-w-lg py-3 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold transition"
        >
          Fetch
        </button>

        {content && (
          <div className="mt-6 p-4 rounded-lg  text-white flex flex-col items-center shadow-lg max-w-lg w-full">
            <p className="text-lg sm:text-xl mb-2 text-center">
              Clipboard Content:
            </p>
            <pre className="whitespace-pre-wrap break-words max-h-96 overflow-auto w-full p-2 border rounded bg-gray-900">
              {content}
            </pre>
            <button
              onClick={copyToClipboard}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition"
            >
              Copy
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 border rounded bg-red-100 text-red-700 text-center max-w-lg w-full">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
