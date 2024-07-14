import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#E0FFFD] p-6 rounded-lg shadow-md mt-10">
      <div className="max-w-screen-2xl mx-auto px-6 flex flex-wrap justify-between items-start">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h3 className="font-bold text-lg">BANGLADESH PHYSIOTHERAPY SOCIETY - BPS</h3>
          <p className="mt-2 text-gray-700">
            National Institute of Traumatology & Orthopaedic Rehabilitation (NITOR)
          </p>
          <p className="mt-1 text-gray-700">Sher-e-Bangla Nagar, Dhaka - 1207, Bangladesh</p>
          <p className="mt-1 text-gray-700">info@gmail.com</p>
        </div>
        <div className="w-full md:w-1/2 text-right">
          <h3 className="font-bold text-lg">Get In Touch</h3>
          <p className="mt-2 text-gray-700">+0123455688</p>
          <p className="mt-1 text-gray-700">Sher-e-Bangla Nagar, Dhaka - 1207, Bangladesh</p>
          <p className="mt-1 text-gray-700">info@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
