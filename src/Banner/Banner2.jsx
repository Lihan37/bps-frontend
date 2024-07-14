import React from "react";
import placeholderImage from "../assets/image 11.png";

const Banner2 = () => {
  return (
    <div className="bg-[#0A6F8F] mt-10 p-10 lg:p-20 flex flex-wrap items-center justify-between rounded-lg">
      <div className="w-full md:w-1/2 text-white mb-6 md:mb-0 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4">
          Way to grow as a community
        </h2>
        <button className="bg-gradient-to-r from-[#64EF8B] to-[#30EDE2] text-[#003546] font-bold py-2 px-4 rounded-full">
          See ways to get started
        </button>
      </div>

      <div className="w-full md:w-1/2 text-white text-center md:text-right">
        <div className="inline-block">
          <img
            src={placeholderImage}
            alt="Community"
            className="mx-auto mb-4 rounded-lg"
          />
          <p className="text-lg text-center lg:w-3/4 lg:mx-auto">
            It is a long established fact that a reader will band web page
            editors now use Lorem Ipsum as their default model text
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
