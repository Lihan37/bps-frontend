import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/bps-t.png";
import UseAdmin from "../Hooks/UseAdmin";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
  const [isAdmin, isAdminLoading] = UseAdmin();
  let timeoutId;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownVisible(!isMobileDropdownVisible);
  };

  const showDropdown = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsDropdownVisible(true);
  };

  const hideDropdown = () => {
    timeoutId = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 100);
  };

  const cancelHideDropdown = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 mr-3" />
          <span className="text-2xl font-bold text-gray-800 tracking-wide">
            Bangladesh Physiotherapy Society
          </span>
        </Link>
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
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="text-gray-800 hover:text-blue-500 font-medium"
          >
            Home
          </Link>
          <div
            className="relative group"
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <span className="text-gray-800 hover:text-blue-500 cursor-pointer font-medium">
              About Us
            </span>
            {isDropdownVisible && (
              <div
                className="absolute left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 transition duration-300 ease-in-out transform translate-y-2"
                onMouseEnter={cancelHideDropdown}
                onMouseLeave={hideDropdown}
              >
                
                
                <Link
                  to="/mission"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                >
                  Mission & Vision
                </Link>
                <Link
                  to="/honorary"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                >
                  List of Honorary
                </Link>
                <Link
                  to="/sc-members"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                >
                  PSC Members
                </Link>
                <Link
                  to="/ec-members"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                >
                  EC Members
                </Link>
                {/* Show "All Users" link only if user is an admin */}
                {isAdmin && (
                  <Link
                    to="/users"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                  >
                    All Users
                  </Link>
                )}
              </div>
            )}
          </div>
          <Link
            to="/members"
            className="text-gray-800 hover:text-blue-500 font-medium"
          >
            Member Area
          </Link>
          <Link
            to="/publications"
            className="text-gray-800 hover:text-blue-500 font-medium"
          >
            Publications
          </Link>
          <Link
            to="/news"
            className="text-gray-800 hover:text-blue-500 font-medium"
          >
            News & Event
          </Link>
          <Link
            to="/gallery"
            className="text-gray-800 hover:text-blue-500 font-medium"
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-blue-500 font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
      {/* Responsive Navigation for Small Screens */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 z-20">
          <div className="px-2 py-3 space-y-1">
            <Link
              to="/"
              className="block text-gray-800 hover:text-blue-500 font-medium"
            >
              Home
            </Link>
            <div>
              <button
                onClick={toggleMobileDropdown}
                className="w-full text-left block text-gray-800 hover:text-blue-500 font-medium"
              >
                About Us
              </button>
              {isMobileDropdownVisible && (
                <div className="bg-white border rounded-lg shadow-lg p-4 mt-2">
                  
                  
                  <Link
                    to="/mission"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                  >
                    Mission & Vision
                  </Link>
                  <Link
                    to="/honorary"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                  >
                    List of Honorary
                  </Link>
                  <Link
                    to="/sc-members"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                  >
                    PSC Members
                  </Link>
                  <Link
                    to="/ec-members"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                  >
                    EC Members
                  </Link>
                  {/* Show "All Users" link only if user is an admin */}
                  {isAdmin && (
                    <Link
                      to="/users"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                    >
                      All Users
                    </Link>
                  )}
                </div>
              )}
            </div>
            <Link
              to="/members"
              className="block text-gray-800 hover:text-blue-500 font-medium"
            >
              Member Area
            </Link>
            <Link
              to="/publications"
              className="block text-gray-800 hover:text-blue-500 font-medium"
            >
              Publications
            </Link>
            <Link
              to="/news"
              className="block text-gray-800 hover:text-blue-500 font-medium"
            >
              News & Event
            </Link>
            <Link
              to="/gallery"
              className="block text-gray-800 hover:text-blue-500 font-medium"
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className="block text-gray-800 hover:text-blue-500 font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;
