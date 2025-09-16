import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthComponent from "./AuthComponent";
import Container from "./Container";

import Features from "./Features";
import About from "./About";
import Contact from "./Contact";
import Short from "./Short";
import Login from "./Login";
import Signup from "./Signup";
import ClipboardSend from "./pages/ClipboardSend";
import ClipboardReceive from "./pages/ClipboardReceive";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Navbar />
        <div className="">
          {" "}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AuthComponent />
                  <Container />
                </>
              }
            />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/short" element={<Short />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/clipboard/send" element={<ClipboardSend />} />
            <Route path="/clipboard/receive" element={<ClipboardReceive />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
