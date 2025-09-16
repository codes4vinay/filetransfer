import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="text-center px-6">
        {/* Big 404 */}
        <h1 className="text-9xl font-extrabold text-amber-100 drop-shadow-lg">
          404
        </h1>
        <h2 className="mt-6 text-3xl font-semibold text-purple-200">
          Oops! Page not found.
        </h2>
        <p className="mt-4 text-lg text-purple-300">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-medium transition"
          >
            Go Home
          </Link>
          <Link
            to="/features"
            className="px-6 py-3 bg-gray-100 text-purple-600 hover:bg-gray-200 rounded-md font-medium transition"
          >
            Explore Features
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
