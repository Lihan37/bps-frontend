import React from "react";
import placeholderImage from "../assets/image 6.png";

const Members = () => {
  return (
    <div className="bg-white mt-10 p-10 rounded-lg shadow-xl" style={{ boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)" }}>
      <div className="flex justify-center mb-4">
        <button className="bg-[#C5F3F0] text-gray-700 font-bold py-2 px-4 rounded-full mx-2">Life Member</button>
        <button className="bg-[#C5F3F0] text-gray-700 font-bold py-2 px-4 rounded-full mx-2 border-2 border-[#000000]">General Member</button>
        <button className="bg-[#C5F3F0] text-gray-700 font-bold py-2 px-4 rounded-full mx-2">EC Member</button>
        <button className="bg-[#C5F3F0] text-gray-700 font-bold py-2 px-4 rounded-full mx-2">SC Member</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D8FBC] p-6 rounded-lg text-white flex flex-col items-center">
          <img src={placeholderImage} alt="President" className="rounded-full mb-4 w-32 h-32 object-cover" />
          <h3 className="text-lg font-bold">President</h3>
          <p className="text-sm">Prof. Dr. Monaim Hossen</p>
        </div>
        <div className="bg-[#15D4BC] p-6 rounded-lg text-white flex flex-col items-center">
          <img src={placeholderImage} alt="Secretary" className="rounded-full mb-4 w-32 h-32 object-cover" />
          <h3 className="text-lg font-bold">Secretary</h3>
          <p className="text-sm">Prof. Dr. Md. Jahangir Alam</p>
        </div>
        <div className="bg-[#0D8FBC] p-6 rounded-lg text-white flex flex-col items-center">
          <img src={placeholderImage} alt="President" className="rounded-full mb-4 w-32 h-32 object-cover" />
          <h3 className="text-lg font-bold">President</h3>
          <p className="text-sm">Prof. Dr. Monaim Hossen</p>
        </div>
        <div className="bg-[#15D4BC] p-6 rounded-lg text-white flex flex-col items-center">
          <img src={placeholderImage} alt="Secretary" className="rounded-full mb-4 w-32 h-32 object-cover" />
          <h3 className="text-lg font-bold">Secretary</h3>
          <p className="text-sm">Prof. Dr. Md. Jahangir Alam</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button className="text-gray-700 font-bold">View more...</button>
      </div>
    </div>
  );
};

export default Members;
