import React from "react";

const Navbar1 = () => {
  return (
    <div
      className="text-gray-900 p-2"
      style={{ backgroundColor: "rgba(48, 237, 226, 0.18)" }}
    >
      <div className="flex items-center max-w-screen-2xl mx-auto space-x-2">
        <a href="tel:+8801310099580" className="ml-5 hover:underline">
          +8801310099580
        </a>
        <span className="border-l border-gray-900 h-4"></span>
        <a
          href="bpsinfo.24@gmail.com"
          className="hover:underline"
        >
          bpsinfo.24@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Navbar1;
