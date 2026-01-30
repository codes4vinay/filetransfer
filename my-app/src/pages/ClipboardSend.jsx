import React, { useState } from "react";

export default function ClipboardSend() {
  const [text, setText] = useState("");
  const [code, setCode] = useState(null);
  const [error, setError] = useState("");

  const send = async () => {
    try {
      setError("");
      const res = await fetch(
        "https://filespire-911562915445.asia-south2.run.app/api/clipboard/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        },
      );

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

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="relative min-h-screen font-sans text-white">
      {/* Keep your original radial gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          Send Clipboard
        </h2>

        <textarea
          className="w-full max-w-lg min-h-[150px] sm:min-h-[200px] border border-gray-300 rounded-lg p-4 mb-4 text-lg sm:text-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-black text-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to share..."
        />

        <button
          onClick={send}
          className="w-full max-w-lg py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition"
        >
          Generate Code
        </button>

        {code && (
          <div className="mt-6 p-4 rounded-lg bg-black text-white flex flex-col items-center shadow-lg max-w-lg w-full">
            <p className="text-lg sm:text-xl mb-2 text-center">
              Share this code:
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl font-bold">{code}</span>
              <button
                onClick={copyCode}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
              >
                Copy
              </button>
            </div>
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
