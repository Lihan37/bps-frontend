import React from "react";
import bone from "../assets/bone.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="bg-white p-10 rounded-lg shadow-xl relative overflow-hidden"
      style={{
        boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)",
      }}
    >
      <div
        className="absolute -top-20 -right-16 w-2/4 h-full"
        style={{
          backgroundImage: `url(${bone})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transform: "rotate(360deg)",
          opacity: 0.9,
        }}
      ></div>

      <h2
        className="text-4xl mb-5 font-bold"
        style={{ color: "#FF005C", opacity: 0.7 }}
      >
        <span>Welcome To</span>
        <br /> Bangladesh Physiotherapy Society(BPS)
      </h2>
      <p style={{ color: "#020A47", opacity: 0.7 }}>
        <span className="mb-3">
          Bangladesh Physiotherapy Society(BPS) is the government registered
          national professional Organization of Physiotherapy Since 1972. It is
          registered from the Office of the Registrar of Joint Stock Companies &
          Firms under the Ministry of Commerce. Govt. Joint Stock Registration
          Number is 3890/3/141 of 1972-73.Prof. Dr. Abul Hossain, the father of
          Physiotherapy of Bangladesh was the honourable member and pioneer of
          this national professional organisation.
        </span>
      </p>
      <Link to="/mission">
        <button
          className="bg-gradient-to-r from-[#64EF8B] to-[#30EDE2] text-white mt-5 font-bold py-2 px-4 rounded-full"
          style={{ boxShadow: "0 10px 20px rgba(92, 232, 223, 1)" }}
        >
          Learn more
        </button>
      </Link>
    </div>
  );
};

export default Banner;
