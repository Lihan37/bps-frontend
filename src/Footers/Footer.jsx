import React from "react";
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#E0FFFD] p-6 rounded-lg shadow-md mt-10">
      <div className="max-w-screen-2xl mx-auto px-6 flex flex-wrap justify-between items-start">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h3 className="font-bold text-lg">BANGLADESH PHYSIOTHERAPY SOCIETY - BPS</h3>
          
          <p className="mt-1 text-gray-700">
            Address: 12/1, Ring Road, Shyamoli, Dhaka-1207
          </p>
        </div>
        
        {/* Right Section */}
        <div className="w-full md:w-1/2 text-right">
          <h3 className="font-bold text-lg">Get In Touch</h3>
          
          {/* Phone */}
          <p className="mt-2 text-gray-700 flex items-center justify-end">
            <FaPhoneAlt className="mr-2" />
            <a href="tel:+8801310099580" className="hover:underline">
              +8801310099580
            </a>
          </p>
          
          {/* Email */}
          <p className="mt-1 text-gray-700 flex items-center justify-end">
            <FaEnvelope className="mr-2" />
            <a href="mailto:bpsinfo.24@gmail.com" className="hover:underline">
              bpsinfo.24@gmail.com
            </a>
          </p>
          
          {/* Social Media */}
          {/* <div className="mt-4 flex justify-end space-x-4 text-gray-700">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FaLinkedinIn />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
