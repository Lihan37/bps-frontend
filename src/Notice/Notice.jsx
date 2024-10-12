import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa"; // Importing icons for PDF files

const Notice = () => {
  const [notices, setNotices] = useState([]);

  // Fetch notices from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/notices") // Update with your backend URL
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  return (
    <div
      className="bg-white shadow-lg rounded-3xl p-6 max-w-sm h-full"
      style={{
        boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)",
        overflowY: "auto",
        maxHeight: "606px", 
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-[#0A6F8F]">
        Notices
      </h2>
      <ul className="list-none pl-0 text-gray-700 space-y-4">
        {notices.map((notice) => (
          <li
            key={notice._id}
            className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-200"
          >
            <FaFilePdf className="text-red-500 text-xl mr-3" />
            <a
              href={`http://localhost:5000/${notice.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-800 font-semibold flex-1"
              download
            >
              {notice.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notice;
