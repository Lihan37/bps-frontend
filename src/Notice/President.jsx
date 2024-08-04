import React from "react";
import placeholderImage from "../assets/image 6.png";

const President = () => {
  return (
    <div className="mt-5">
      <h2 className="bg-[#0A6F8F] p-8 text-center font-bold text-5xl text-white max-w-screen-2xl mx-auto rounded-md">
        President's Message
      </h2>
      <div className="mt-8 flex flex-col items-center">
        <img
          src={placeholderImage}
          alt="President"
          className="w-full max-w-44 rounded-md shadow-md"
        />
        <div className="mt-6 text-gray-800 text-base lg:text-lg leading-relaxed max-w-3xl text-center">
          <p>
            Bangladesh Orthopaedic Society (BOS) is an Association of
            Orthopaedic and Trauma surgeons in Bangladesh. 950 Orthopaedic
            surgeons are now active members of Bangladesh Orthopaedic Society.
          </p>
          <p className="mt-4">
            Orthopaedic Surgery in Bangladesh has a great historic beginning
            after the liberation war in 1971. Under direct supervision of the
            Father of the Nation Bangabandhu Sheikh Mujibur Rahman, Dr. Ronald
            Joseph Garst, a missionary orthopaedic surgeon from the USA, had
            come forward to give treatment to the war-injured freedom fighters.
            Understanding the necessity of orthopaedics & trauma surgery in
            Bangladesh, the government, with the help of R. J. Garst and other
            renowned orthopaedic surgeons from different countries, established
            RIHD, now known as the National Institute of Orthopaedics &
            Traumatology Rehabilitation (NITOR), a center of excellence for
            orthopaedic & trauma care, from where we started the journey of
            orthopaedic surgery in Bangladesh.
          </p>
        </div>
      </div>
    </div>
  );
};

export default President;
