import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt, FaFilePdf, FaUpload } from "react-icons/fa"; // Importing icons

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch notices from the backend
  const fetchNotices = () => {
    axios
      .get("http://localhost:5000/notices")
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Error fetching notices:", error));
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadNotice = () => {
    if (!selectedFile) {
      Swal.fire("Error", "Please select a file to upload.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    formData.append("title", selectedFile.name);

    axios
      .post("http://localhost:5000/notices/upload", formData)
      .then((response) => {
        Swal.fire("Success", response.data.message, "success");
        setSelectedFile(null); // Clear selected file
        document.querySelector('input[type="file"]').value = ""; // Clear the file input field
        fetchNotices(); // Refresh notices list
      })
      .catch((error) => {
        console.error("Error uploading notice:", error);
        Swal.fire("Error", "Failed to upload notice.", "error");
      });
  };

  // Delete notice
  const deleteNotice = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the notice.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/notices/${id}`)
          .then((response) => {
            Swal.fire("Deleted!", response.data.message, "success");
            fetchNotices(); // Refresh notices list
          })
          .catch((error) => {
            console.error("Error deleting notice:", error);
            Swal.fire("Error", "Failed to delete notice.", "error");
          });
      }
    });
  };

  return (
    <div className="mt-5 px-4 sm:px-6 lg:px-8">
      {" "}
      {/* Responsive padding */}
      <h2 className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 sm:p-8 text-center font-bold text-3xl sm:text-4xl lg:text-5xl text-white max-w-screen-2xl mx-auto rounded-md shadow-lg">
        Notice Board
      </h2>
      <div className="bg-white shadow-lg rounded-3xl p-6 sm:p-8 mt-8 max-w-screen-2xl mx-auto space-y-8">
        {/* Upload Section */}
        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {" "}
          {/* Responsive flex and spacing */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <FaUpload className="text-xl sm:text-2xl text-blue-500" />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="border px-3 py-2 rounded-md w-full sm:w-auto"
            />
          </div>
          <button
            onClick={uploadNotice}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <FaUpload />
            <span>Upload Notice</span>
          </button>
        </div>

        {/* Notices List */}
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-700">
          Latest Notices
        </h3>
        <ul className="space-y-4"> {/* List layout with space between items */}
          {notices.map((notice, index) => (
            <li
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex justify-between items-center"
            >
              <div className="flex items-center space-x-2 sm:space-x-4">
                <FaFilePdf className="text-red-500 text-2xl sm:text-3xl" />
                <a
                  href={`http://localhost:5000${notice.filePath}`} // Use the correct file path
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
                  download // Makes the link downloadable
                >
                  {notice.title}
                </a>
              </div>
              <button
                onClick={() => deleteNotice(notice._id)}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-200 flex items-center space-x-2"
              >
                <FaTrashAlt />
                <span>Delete</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticeBoard;
