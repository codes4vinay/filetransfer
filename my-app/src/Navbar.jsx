import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">filetranfer</a>
            </div>
            <div className="navbar-toggle" onClick={toggleMobileMenu}>
                <span className="hamburger"></span>
                <span className="hamburger"></span>
                <span className="hamburger"></span>
            </div>
            <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <li><a href="/">Home</a></li>
                <li><a href="./features.html">Features</a></li>
                <li><a href="./about.html">About</a></li>
                <li><a href="./contact.html">Contact</a></li>
                <li><a href="./short.html">Shorten Link</a></li>
            </ul>
            <div className="navbar-buttons">
                <a href="./login.html"><button className="navbar-btn login-btn-nav">Login</button></a>
                <a href="./signup.html"><button className="navbar-btn">Sign Up</button></a>
            </div>
        </nav>
    );
};

export default Navbar;
