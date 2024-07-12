import React from "react";
import bone from "../assets/bone.png";

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
        <br /> Bangladesh Physiotherapy Society
      </h2>
      <p style={{ color: "#020A47", opacity: 0.7 }}>
        <span className="mb-3">
          Bangladesh Orthopaedic Society (BOS) is an Association of Orthopaedic
          and Trauma surgeons in Bangladesh. 950 Orthopaedic surgeons are now
          active members of Bangladesh Orthopaedic Society.
        </span>
        <br />
        <br />
        <span className="mt-5">
          Orthopaedic Surgery in Bangladesh has a great historic beginning after
          the liberation war in 1971. Under direct supervision of the Father of
          the Nation Bangabandhu Sheikh Mujibur Rahman, Dr. Ronald Joseph Garst,
          a missionary orthopaedic surgeon from USA had come forward to give
          treatment to the war injured freedom fighters. Understanding necessity
          of orthopaedics & trauma surgery in Bangladesh the government with the
          help R. J. Garst and other renowned orthopaedic surgeons from
          different countries of the world established RIHD which is now known
          as the National Institute of Orthopaedics & Traumatology
          Rehabilitation (NITOR), centre of excellence of orthopaedic & trauma,
          from where we started the journey of orthopaedic surgery in
          Bangladesh.
        </span>
      </p>
      <button
        className="bg-gradient-to-r from-[#64EF8B] to-[#30EDE2] text-white mt-5 font-bold py-2 px-4 rounded-full"
        style={{ boxShadow: "0 10px 20px rgba(92, 232, 223, 1)" }}
      >
        Learn more
      </button>
    </div>
  );
};

export default Banner;
