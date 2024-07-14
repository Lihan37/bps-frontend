import React from "react";
import placeholderImage from "../assets/image 6.png";

const Honorable = () => {
  return (
    <div className="bg-white p-10 rounded-lg shadow-xl" style={{ boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)" }}>
      <h2 className="text-2xl font-bold mb-4">Honorable</h2>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
              <div className="h-2 sm:h-48 w-full sm:w-2 rounded-full mb-4 sm:mb-0 sm:mr-4" style={{ background: "linear-gradient(to bottom, #BCFFFB 0%, #65EFE7 100%)" }}></div>
              <img
                src={placeholderImage}
                alt="Honorable Member"
                className="w-48 h-48 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold">Prof. Dr. Monaim Hossen</h3>
                <p className="text-gray-600">President</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 text-center sm:text-left">
              “It is my great pleasure to address the honorable members as the secretary general of Bangladesh orthopaedic society.”
            </p>
            <button className="bg-gradient-to-r from-[#64EF8B] to-[#30EDE2] text-white font-bold py-2 px-4 rounded-full mt-2 self-center sm:self-end">
              View More
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
              <div className="h-2 sm:h-48 w-full sm:w-2 rounded-full mb-4 sm:mb-0 sm:mr-4" style={{ background: "linear-gradient(to bottom, #BCFFFB 0%, #65EFE7 100%)" }}></div>
              <img
                src={placeholderImage}
                alt="Honorable Member"
                className="w-48 h-48 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold">Prof. Dr. Monaim Hossen</h3>
                <p className="text-gray-600">President</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 text-center sm:text-left">
              “It is my great pleasure to address the honorable members as the secretary general of Bangladesh orthopaedic society.”
            </p>
            <button className="bg-gradient-to-r from-[#64EF8B] to-[#30EDE2] text-white font-bold py-2 px-4 rounded-full mt-2 self-center sm:self-end">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Honorable;
