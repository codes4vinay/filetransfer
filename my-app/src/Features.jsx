import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Features = () => {
  return (
    <div className="relative min-h-screen font-sans text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Global Navbar */}
      <Navbar />

      {/* Header */}
      <header className="text-center py-24">
        <h1 className="text-4xl mt-5 font-bold mb-2 text-amber-100">
          Why Choose Filespire?
        </h1>
        <p className="text-lg text-purple-200">
          Secure, reliable, and easy-to-use file-sharing platform.
        </p>
      </header>

      {/* Features Grid */}
      <section className="mt-25 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-12">
        {[
          { icon: "🔒", title: "Secure File Sharing", desc: "Ensure privacy." },
          {
            icon: "🔗",
            title: "Instant Link Generation",
            desc: "Get a sharable link as soon as you upload a file.",
          },
          {
            icon: "📧",
            title: "Email Notifications",
            desc: "Send file links directly to your email.",
          },
          {
            icon: "🛡️",
            title: "User Authentication",
            desc: "Securely log in and manage your files with Firebase.",
          },
          {
            icon: "📱",
            title: "Mobile Friendly",
            desc: "Access and share files seamlessly on any device.",
          },
          {
            icon: "📋",
            title: "Online Clipboard",
            desc: "Share and receive text instantly with a 6-digit code.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-black/40 backdrop-blur-md rounded-2xl p-6 h-60 shadow-md text-center hover:scale-105 transition"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold text-white">
              {feature.title}
            </h2>
            <p className="text-purple-200 mt-2">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Features;
