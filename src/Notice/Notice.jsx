import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa"; // Importing icons for PDF files

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch notices from the backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notices"); // Update with your backend URL
        setNotices(response.data);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError("Failed to fetch notices. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };

    fetchNotices();
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

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : notices.length > 0 ? (
        <ul
          className="list-none pl-0 text-gray-700 space-y-4"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#c4c4c4 transparent" }}
        >
          {notices.map((notice) => (
            <li
              key={notice._id}
              className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-200"
            >
              <FaFilePdf className="text-red-500 text-xl mr-3" />
              <a
                href={`http://localhost:5000${notice.filePath}`} // Ensure the correct file path is used
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
      ) : (
        <p className="text-center text-gray-500">No notices available at the moment.</p>
      )}
    </div>
  );
};

export default Notice;
