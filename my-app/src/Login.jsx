import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebaseConfig"; // Correct import of firebaseConfig

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Both fields are required.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "/"; // Redirect to homepage
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center px-4">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login to Filespire
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4 flex justify-between items-center text-sm">
          <button
            onClick={handleReset}
            className="text-purple-500 text-xl hover:text-amber-400"
          >
            Forgot Password?
          </button>
          <a
            href="/signup"
            className="text-purple-500 text-xl hover:text-amber-400"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
