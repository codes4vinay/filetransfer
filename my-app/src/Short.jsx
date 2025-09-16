import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // make sure installed

const Short = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [loading, setLoading] = useState(false);

  const shortenURL = async () => {
    if (!originalURL.trim()) return;
    setLoading(true);
    try {
      const data = {
        domain: "filespire.short.gy",
        originalURL,
        allowDuplicates: false,
      };

      const response = await fetch("https://api.short.io/links/public", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: "pk_dKHlV99oqmBXjswE",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.shortURL) setShortURL(result.shortURL);
      else alert("Failed to shorten URL. Please try again.");
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector("#qrcode canvas");
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg text-center w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-white">Shorten Your URL</h1>

        <input
          type="url"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
          placeholder="Enter your URL here"
          className="w-full px-4 py-2 mb-4 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
        />

        <button
          onClick={shortenURL}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>

        {shortURL && (
          <div className="mt-6">
            <p className="text-lg text-white">Your shortened URL:</p>
            <a
              href={shortURL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-teal-300 font-medium mt-2 break-all"
            >
              {shortURL}
            </a>

            <div id="qrcode" className="flex justify-center mt-4">
              <QRCodeCanvas value={shortURL} size={128} />
            </div>

            <button
              onClick={downloadQRCode}
              className="mt-4 px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Short;
