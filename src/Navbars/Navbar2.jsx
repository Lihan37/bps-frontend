import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/bps-t.png';

const Navbar2 = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo and Title */}
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-10 mr-3" />
                    <span className="text-xl font-bold text-gray-800">Bangladesh Physiotherapy Society</span>
                </div>
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        className="text-gray-800 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                {/* Navigation Links for Medium and Larger Screens */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="text-gray-800 hover:text-blue-500">Home</Link>
                    <Link to="/about" className="text-gray-800 hover:text-blue-500">About Us</Link>
                    <Link to="/members" className="text-gray-800 hover:text-blue-500">Member Area</Link>
                    <Link to="/publications" className="text-gray-800 hover:text-blue-500">Publications</Link>
                    <Link to="/news" className="text-gray-800 hover:text-blue-500">News & Event</Link>
                    <Link to="/gallery" className="text-gray-800 hover:text-blue-500">Gallery</Link>
                    <Link to="/contact" className="text-gray-800 hover:text-blue-500">Contact Us</Link>
                </div>
            </div>
            {/* Responsive Navigation for Small Screens */}
            {isOpen && (
                <div className="md:hidden bg-gray-100">
                    <div className="px-2 py-3 space-y-1">
                        <Link to="/" className="block text-gray-800 hover:text-blue-500">Home</Link>
                        <Link to="/about" className="block text-gray-800 hover:text-blue-500">About Us</Link>
                        <Link to="/members" className="block text-gray-800 hover:text-blue-500">Member Area</Link>
                        <Link to="/publications" className="block text-gray-800 hover:text-blue-500">Publications</Link>
                        <Link to="/news" className="block text-gray-800 hover:text-blue-500">News & Event</Link>
                        <Link to="/gallery" className="block text-gray-800 hover:text-blue-500">Gallery</Link>
                        <Link to="/contact" className="block text-gray-800 hover:text-blue-500">Contact Us</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar2;
