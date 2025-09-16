import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="w-full bg-black/50 backdrop-blur-md text-purple-200 fixed top-0 left-0 z-50 shadow-md">
      <div className="mx-auto bg-black/50 backdrop-blur-md px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-3xl text-stone-300 font-bold">
            <Link to="/">Filespire</Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 items-center font-medium">
            <li>
              <Link to="/" className="hover:text-purple-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-purple-400 transition">
                Features
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-purple-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-400 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/short" className="hover:text-purple-400 transition">
                Shorten Link
              </Link>
            </li>
            <li>
              <Link
                to="/clipboard/send"
                className="hover:text-purple-400 transition"
              >
                Clipboard Send
              </Link>
            </li>
            <li>
              <Link
                to="/clipboard/receive"
                className="hover:text-purple-400 transition"
              >
                Clipboard Receive
              </Link>
            </li>
            <li>
              {/* External stays as <a> */}
              {/* <a
                href="https://convert.filetranfer.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition"
              >
                Word2PDF
              </a> */}
            </li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4">
            <Link to="/login">
              <button className="px-4 py-2 rounded-lg text-white bg-purple-800 hover:bg-purple-700 transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 rounded-lg text-purple-900 bg-white  hover:bg-gray-200 transition">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="focus:outline-none">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden  bg-black/50 backdrop-blur-md text-xl text-purple-200 w-full h-screen flex flex-col gap-6 p-6">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-purple-400 transition"
          >
            Home
          </Link>
          <Link
            to="/features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-purple-400 transition"
          >
            Features
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-purple-400 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-purple-400 transition"
          >
            Contact
          </Link>
          <Link
            to="/short"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-purple-400 transition"
          >
            Shorten Link
          </Link>
          <Link
            to="/clipboard/send"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-purple-400 transition"
          >
            Clipboard Send
          </Link>
          <Link
            to="/clipboard/receive"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-purple-400 transition"
          >
            Clipboard Receive
          </Link>

          {/* Mobile Buttons */}
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className=" px-4 py-2 w-1/3  bg-purple-600 text-white text-center rounded-md hover:bg-purple-700 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            onClick={() => setIsMobileMenuOpen(false)}
            className=" px-4 py-2 w-1/3   bg-white text-purple-600 text-center rounded-md hover:bg-gray-200 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
