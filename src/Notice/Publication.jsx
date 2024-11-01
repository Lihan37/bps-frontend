import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt, FaFilePdf, FaUpload } from "react-icons/fa";
import UseAdmin from "../Hooks/UseAdmin"; // Import the admin hook

const Publication = () => {
  const [publications, setPublications] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAdmin, isAdminLoading] = UseAdmin();
  const [currentPage, setCurrentPage] = useState(1);
  const [publicationsPerPage] = useState(5);

  // Fetch publications from the backend
  const fetchPublications = () => {
    axios
      .get("https://app.bps.org.bd/publications")
      .then((response) => setPublications(response.data))
      .catch((error) => console.error("Error fetching publications:", error));
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadPublication = () => {
    if (!selectedFile) {
      Swal.fire("Error", "Please select a file to upload.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    formData.append("title", selectedFile.name);

    axios
      .post("https://app.bps.org.bd/publications", formData)
      .then((response) => {
        Swal.fire("Success", response.data.message, "success");
        setSelectedFile(null);
        document.querySelector('input[type="file"]').value = "";
        fetchPublications();
      })
      .catch((error) => {
        console.error("Error uploading publication:", error);
        Swal.fire("Error", "Failed to upload publication.", "error");
      });
  };

  const deletePublication = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the publication.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://app.bps.org.bd/publications/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            Swal.fire("Deleted!", response.data.message, "success");
            fetchPublications();
          })
          .catch((error) => {
            console.error("Error deleting publication:", error);
            Swal.fire("Error", "Failed to delete publication.", "error");
          });
      }
    });
  };

  // Pagination logic
  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = publications.slice(indexOfFirstPublication, indexOfLastPublication);

  const totalPages = Math.ceil(publications.length / publicationsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-5 px-4 sm:px-6 lg:px-8">
      <h2 className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 sm:p-8 text-center font-bold text-3xl sm:text-4xl lg:text-5xl text-white max-w-screen-2xl mx-auto rounded-md shadow-lg">
        Publications
      </h2>
      <div className="bg-white shadow-lg rounded-3xl p-6 sm:p-8 mt-8 max-w-screen-2xl mx-auto space-y-8">
        {/* Upload Section - Show only for Admin */}
        {!isAdminLoading && isAdmin && (
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
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
              onClick={uploadPublication}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <FaUpload />
              <span>Upload Publication</span>
            </button>
          </div>
        )}

        {/* Publications List */}
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-700">
          Latest Publications
        </h3>
        <ul className="space-y-4">
          {currentPublications.map((publication, index) => (
            <li
              key={index}
              className={`bg-gradient-to-r p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex justify-between items-center 
              ${index % 2 === 0 ? "from-blue-100 to-blue-300" : "from-cyan-100 to-cyan-300"}`}
            >
              <div className="flex items-center space-x-2 sm:space-x-4">
                <FaFilePdf className="text-red-500 text-2xl sm:text-3xl" />
                <a
                  href={`https://drive.google.com/uc?export=download&id=${publication.driveFileId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={publication.title}
                >
                  {publication.title}
                </a>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">
                  {new Date(publication.uploadedAt).toLocaleDateString()}
                </span>
                {!isAdminLoading && isAdmin && (
                  <button
                    onClick={() => deletePublication(publication._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-200 flex items-center space-x-2 mt-2"
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`bg-gray-500 text-white px-3 py-1 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`bg-gray-500 text-white px-3 py-1 rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publication;
