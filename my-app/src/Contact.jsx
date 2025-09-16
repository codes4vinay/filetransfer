import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="relative min-h-screen font-sans text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <Navbar />

      <div className="flex flex-col md:flex-row justify-center items-center px-4 md:px-12 py-24 gap-8">
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold mb-2 text-white">Get in touch</h2>
          <hr className="border-purple-400 mb-4" />
          <input
            type="hidden"
            name="access_key"
            value="2d32c4d5-87d2-4168-b97e-1d3b689cb625"
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="p-3 rounded-lg border border-white  focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
            className="p-3 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
          />
          <textarea
            name="message"
            placeholder="Your message"
            required
            rows={5}
            className="p-3 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
          ></textarea>
          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
          >
            Submit{" "}
            <img
              src="/contactAssets/arrow_icon.png"
              alt="arrow"
              className="w-5 h-5"
            />
          </button>
        </form>

        {/* Right Image */}
        <div className="w-full max-w-md">
          <img
            src="/contactAssets/right_img.png"
            alt="Contact Illustration"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
