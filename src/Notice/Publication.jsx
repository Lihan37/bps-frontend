import React from "react";

const Publication = () => {
  const notices = [
    "2024 update member list",
    "Annual Budget Report",
    "PDF - 2025 plan and upcoming ebook",
    "Halo BD Event",
    "2024 update member list",
    "Annual Budget Report",
    "PDF - 2025 plan and upcoming ebook",
    "Halo BD Event",
    "2024 update member list",
    "Annual Budget Report",
    "PDF - 2025 plan and upcoming ebook",
    "Halo BD Event",
    "2024 update member list",
    "Annual Budget Report",
    "PDF - 2025 plan and upcoming ebook",
    "Annual Budget Report"
  ];

  return (
    <div className="mt-5">
      <h2 className="bg-[#0A6F8F] p-8 text-center font-bold text-5xl text-white max-w-screen-2xl mx-auto rounded-md shadow-lg">
        Publication
      </h2>
      <div
        className="bg-white shadow-lg rounded-3xl p-8 mt-5 max-w-screen-2xl mx-auto"
        style={{
          boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)",
        }}
      >
        <h3 className="text-2xl font-bold mb-6 text-[#0A6F8F] text-center">
          Papers
        </h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-3">
          {notices.map((notice, index) => (
            <li key={index} className="text-lg leading-relaxed">
              {notice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Publication;
