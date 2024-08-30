import React, { useState, useEffect } from "react";
import axios from "axios";

const MemberArea = () => {
  const [activeTab, setActiveTab] = useState("Life Member");
  const [membersData, setMembersData] = useState({ members: {} });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { label: "Life Member", key: "life" },
    { label: "General Member", key: "general" },
    { label: "EC Member", key: "ec" },
    { label: "SC Member", key: "sc" }
  ];

  const itemsPerPage = 15;

  useEffect(() => {
    axios.get('http://localhost:5000/members')
      .then(response => {
        console.log('Fetched members data:', response.data);
        if (response.data.members) {
          setMembersData(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      })
      .catch(error => console.error('Error fetching members data:', error));
  }, []);
  
  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const currentTab = tabs.find(tab => tab.label === activeTab);
    const memberType = currentTab ? currentTab.key : '';
    const filteredMembers = membersData.members[memberType] || [];
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

    const paginationItems = [];
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, currentPage + halfMaxPages);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
      endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    }

    if (startPage > 1) {
      paginationItems.push(1);
      if (startPage > 2) {
        paginationItems.push('...');
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      paginationItems.push(page);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push('...');
      }
      paginationItems.push(totalPages);
    }

    return (
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-1 font-bold rounded-full bg-[#C5F3F0] text-gray-700 hover:bg-[#A0D8D0]"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        {paginationItems.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 font-bold rounded-full ${
              item === currentPage
                ? "bg-[#0A6F8F] text-white"
                : "bg-[#C5F3F0] text-gray-700 hover:bg-[#A0D8D0]"
            }`}
            onClick={() => item !== '...' && handlePageChange(item)}
            disabled={item === '...'}
          >
            {item}
          </button>
        ))}
        <button
          className="px-4 py-2 mx-1 font-bold rounded-full bg-[#C5F3F0] text-gray-700 hover:bg-[#A0D8D0]"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
    );
  };

  const renderContent = () => {
    const currentTab = tabs.find(tab => tab.label === activeTab);
    const memberType = currentTab ? currentTab.key : '';
    const filteredMembers = membersData.members[memberType] || [];

    const searchLowerCase = searchTerm.toLowerCase();
    const filteredBySearch = filteredMembers.filter(member =>
      member.name.toLowerCase().includes(searchLowerCase) ||
      member.designation.toLowerCase().includes(searchLowerCase)
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMembers = filteredBySearch.slice(startIndex, endIndex);

    console.log('Filtered members:', paginatedMembers);

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-2xl mx-auto p-4">
          {paginatedMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-[#${index % 2 === 0 ? '0D8FBC' : '15D4BC'}] p-6 rounded-lg text-white flex flex-col items-center shadow-lg`}
            >
              {/* Show the image if available */}
              {member.image && (
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full mb-4 w-32 h-32 object-cover"
                />
              )}
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-sm">{member.nationality}</p>
            </div>
          ))}
        </div>
        {renderPagination()}
      </div>
    );
  };

  return (
    <div className="mt-5">
      <h2 className="bg-[#0A6F8F] p-8 text-center font-bold text-5xl text-white max-w-screen-2xl mx-auto rounded-md">
        Members
      </h2>
      <div className="mt-5 p-4 max-w-screen-2xl mx-auto justify-start">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or designation"
          className="p-2 border border-gray-300 rounded-md w-64 mb-5"
        />
        <div className="flex justify-center mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`p-2 px-4 mx-2 font-bold rounded-full ${
                activeTab === tab.label
                  ? "bg-[#0A6F8F] text-white"
                  : "bg-[#C5F3F0] text-gray-700"
              }`}
              onClick={() => {
                setActiveTab(tab.label);
                setCurrentPage(1);
                setSearchTerm("");
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 bg-white shadow-md rounded-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MemberArea;
