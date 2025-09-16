import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="relative min-h-screen font-sans text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Global Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center px-6 pt-28 pb-16">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
          About Filespire
        </h1>
        <p className="text-lg text-purple-200 max-w-2xl mx-auto leading-relaxed">
          Welcome to <span className="font-semibold">Filespire</span> — a
          secure, reliable, and user-friendly platform designed to make file
          sharing seamless, efficient, and accessible for everyone.
        </p>
      </section>

      {/* Contact Section */}
      <section className="bg-white/0 backdrop-blur-sm rounded-2xl mx-6 md:mx-20 p-10 shadow-lg text-center mb-16">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-purple-200 mb-4">
          Have questions or feedback?<br /> We’d love to hear from you!
        </p>
        <a
          href="mailto:Filespire@gmail.com"
          className="text-lg font-medium px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition text-white inline-block"
        >
          Email Us: Filespire@gmail.com
        </a>
      </section>
    </div>
  );
};

export default About;
