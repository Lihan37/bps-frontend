import React from "react";
import logo from "../assets/bpa-logo.jpg"; // Update with the correct path to the logo image
import samplePdf from "../assets/Name and Pic.pdf"; // Update with the correct path to your PDF file

const LogoDetails = () => {
  return (
    <div className="max-w-screen-2xl mt-10 mx-auto p-8 bg-white shadow-xl rounded-lg">
      {/* Logo Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="md:w-1/2 text-center mb-6 md:mb-0">
          {/* Adding the new lines of text above the logo */}
          <h3 className="text-lg italic font-bold mb-1">Sister Organization</h3>
          <h4 className="text-md italic text-gray-600 mb-3">
            National Professional Trade Body
          </h4>

          <img
            src={logo}
            alt="BPS Logo"
            className="w-48 h-48 object-contain mx-auto shadow-md rounded-full border-4 border-blue-200"
          />
        </div>

        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="text-3xl font-bold mb-6 text-blue-600">
            BANGLADESH PHYSICAL THERAPY ASSOCIATION (BPA)
          </h3>
          <p className="text-gray-600 italic leading-relaxed text-lg">
            Bangladesh Physical Therapy Association is the only Government
            Approved Professional Trade Body for the Physiotherapy profession.
            Govt. Joint Stock Reg. No.: TO-839
          </p>
        </div>
      </div>

      {/* PDF Download Section (Moved below the BPA paragraph) */}
      <div className="mt-10 mb-5 text-center">
       
        <a
          href={samplePdf}
          download
          className="inline-block bg-gradient-to-r from-[#65EFE7] to-[#30EDE2] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition duration-300"
        >
          Download PDF
        </a>
      </div>

      {/* YouTube Channel Link */}
      <div className="border-t border-gray-200 pt-8 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-teal-600">Follow Us</h3>
        <p className="text-lg text-gray-700 mb-6">
          Subscribe to our YouTube channel for the latest updates:
        </p>
        <a
          href="https://youtube.com/@bangladeshphysiotherapysociety?si=ZLj04EIYfdJlcBR8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#64EF8B] to-[#30EDE2] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition duration-300"
        >
          Visit Our YouTube Channel
        </a>
      </div>
    </div>
  );
};

export default LogoDetails;
