import React, { useEffect, useState } from "react";
import axios from "axios";

const MemberArea = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("Life");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 8;

  useEffect(() => {
    // Fetch members from the backend
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/members");
        setMembers(response.data);
        console.log("Fetched members:", response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    // Filter members based on the active tab and search query
    const filterMembers = () => {
      let filtered = members.filter(
        (member) => member.membership === activeTab
      );

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (member) =>
            member.fullName.toLowerCase().includes(query) ||
            member.nationality.toLowerCase().includes(query)
        );
      }

      setFilteredMembers(filtered);
      setCurrentPage(1); // Reset to the first page when filters change
    };

    filterMembers();
  }, [members, activeTab, searchQuery]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <h2 className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-center font-bold text-4xl sm:text-5xl mb-10 text-white max-w-screen-2xl mx-auto rounded-md shadow-lg">
        Members
      </h2>
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-6">
        {["General", "Life"].map((tab) => ( // Removed "EC" tab
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 mx-2 text-white rounded-lg ${
              activeTab === tab ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            {tab} Member
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or nationality..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMembers.length > 0 ? (
          currentMembers.map((member) => (
            <div
              key={member._id}
              className="bg-[#0D8FBC] p-6 rounded-lg text-white flex flex-col items-center"
            >
              <img
                src={member.imageUrls?.image?.file || "https://via.placeholder.com/150"} // Correct image path
                alt={member.fullName}
                className="rounded-full mb-4 w-32 h-32 object-cover"
              />
              <h3 className="text-lg font-bold">{member.fullName}</h3>
              <p className="text-sm">Email: {member.email}</p> {/* Added Email */}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No members found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <nav className="inline-flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border border-gray-300 rounded-l-lg ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 border border-gray-300 ${
                number === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border border-gray-300 rounded-r-lg ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MemberArea;
