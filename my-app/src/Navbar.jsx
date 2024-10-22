import React from 'react';
import './Navbar.css'; // Import the navbar CSS

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">FileSpire</a>
            </div>
            <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="./about">About</a></li>
                <li><a href='./login'>Login</a></li>
            </ul>
            <a href='./signup'><button className="navbar-btn">Sign Up</button></a>

        </nav>
    );
};

export default Navbar;

