import React, { useState, useRef, useEffect } from "react";
import { uploadFile } from "./services/api.js";
import { QRCodeCanvas } from "qrcode.react";
import ChildContainer from "./Childcontainer";
import { Link } from "react-router-dom"; // ✅ Import Link

const Container = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();
  const qrRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setIsLoading(true);
        setResult(""); 
        const data = new FormData();
        data.append("file", file);

        try {
          const response = await uploadFile(data);
          if (response && response.path) {
            setResult(response.path);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getImage();
  }, [file]);

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result).then(() => alert("Link copied!"));
    }
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 w-full h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-8 min-h-screen">
        <div
          className={`flex-1 flex flex-col space-y-4 ${
            !result ? "justify-center items-center" : "items-start"
          }`}
        >
          <h1 className="mb-8  text-6xl font-bold text-amber-100 text-center lg:text-left">
            Filespire
          </h1>
          <h3 className="mb-8 text-purple-400 text-xl text-center lg:text-left">
            Upload and share the download link
          </h3>

          {/* Upload button */}
          <button
            onClick={onUploadClick}
            className={`px-6 py-2 mb-8 rounded-md text-white transition flex items-center justify-center ${
              isLoading
                ? "bg-purple-800 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 bg-white rounded-full animate-pulse"></span>
                Uploading...
              </span>
            ) : (
              "Upload"
            )}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          {result && (
            <>
              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 mb-5 break-words"
              >
                {result}
              </a>
              <div className="flex gap-4 mb-5">
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-md"
                  onClick={copyToClipboard}
                >
                  Copy Link
                </button>
                <a href="./short">
                  <button className="px-4 py-2 bg-gray-100 text-purple-600 rounded-md">
                    Shorten Link
                  </button>
                </a>
              </div>
            </>
          )}

          {/* Send via Email */}
          <a href="https://mail.filespire.in">
            <button className="px-6 py-2 bg-gray-100 text-purple-600 rounded-md hover:bg-gray-200 transition">
              Send File via Email
            </button>
          </a>

          {/* New Buttons for Online Clipboard */}
          <div className="flex gap-4 mt-8 flex-wrap">
            <Link to="/clipboard/send">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
                Send Clipboard
              </button>
            </Link>
            <Link to="/clipboard/receive">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                Receive Clipboard
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column: QR Code */}
        {result && (
          <div
            className="flex-1 flex flex-col items-center lg:items-end space-y-4 w-full max-w-[220px]"
            ref={qrRef}
          >
            <h2 className="text-lg font-semibold">Scan QR Code!</h2>
            <QRCodeCanvas
              className="border-4 border-amber-100 rounded-lg"
              value={result}
              size={200}
            />
            <button
              onClick={downloadQRCode}
              className="px-6 py-2 bg-gray-200 text-purple-600 rounded-md hover:bg-gray-300 transition"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <ChildContainer />
    </div>
  );
};

export default Container;
