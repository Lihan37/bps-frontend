import React from "react";
import placeholderImage from "../assets/image 11.png";
import { Link } from "react-router-dom";

const Banner2 = () => {
  return (
    <div className="bg-[#0A6F8F] mt-10 p-10 lg:p-20 flex flex-wrap items-center justify-between rounded-lg">
      <div className="w-full md:w-1/2 text-white mb-6 md:mb-0 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4">
          Way to grow as a community
        </h2>
        <Link to="/signUp">
          <button className="bg-gradient-to-r from-[#64EF8B] to-[#30EDE2] text-[#003546] font-bold py-2 px-4 rounded-full">
            See ways to get started
          </button>
        </Link>
      </div>

      <div className="w-full md:w-1/2 text-white text-center md:text-right">
        <div className="inline-block">
          <img
            src={placeholderImage}
            alt="Community"
            className="mx-auto mb-4 rounded-lg"
          />
          <p className="text-lg text-center lg:w-3/4 lg:mx-auto">
            "Physiotherapy is dedicated to enhancing movement, relieving pain,
            and restoring function. Our goal is to empower individuals on their
            journey to wellness, using evidence-based treatments and
            personalized care. Discover how our expertise can support you in
            achieving a healthier, more active life."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
