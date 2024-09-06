import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const MemberArea = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('Life Member');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 8; // Adjust as needed
  const [newMember, setNewMember] = useState({
    fullName: '',
    nationality: '',
    imageUrl: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetch members data from the backend
    fetch('http://localhost:5000/members')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched members:', data); // Debug: Check the fetched data
        setMembers(data);
      })
      .catch(error => console.error('Error fetching members:', error));
  }, []);
  
  useEffect(() => {
    const filterMembers = () => {
      let filtered = members.filter(
        (member) => member.membership === activeTab
      );

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(member =>
          member.fullName.toLowerCase().includes(query) ||
          member.nationality.toLowerCase().includes(query)
        );
      }

      setFilteredMembers(filtered);
      setCurrentPage(1); // Reset to first page on filter change
    };
  
    filterMembers();
  }, [members, activeTab, searchQuery]);
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddMember = () => {
    if (!newMember.fullName || !newMember.nationality) {
      Swal.fire({
        title: 'Error!',
        text: 'Full Name and Nationality are required.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!image) {
      Swal.fire({
        title: 'Error!',
        text: 'Please upload an image.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    // Replace 'YOUR_IMGBB_API_KEY' with your actual ImgBB API key
    fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_REACT_APP_IMGEBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const imageUrl = data.data.url;
          const memberData = {
            ...newMember,
            imageUrl,
            membership: activeTab, // Assign current tab's membership
          };

          return fetch('http://localhost:5000/members', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberData),
          });
        } else {
          throw new Error(data.error.message || 'Image upload failed');
        }
      })
      .then(response => response.json())
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Member added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Refresh the members list
        return fetch('http://localhost:5000/members')
          .then(response => response.json())
          .then(data => setMembers(data));
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Failed to add member.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  // Calculate indices for pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-6">
        {['Life Member', 'General Member', 'EC Member', 'SC Member'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 mx-2 text-white rounded-lg ${
              activeTab === tab ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          >
            {tab}
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
                src={member.imageUrl || 'https://via.placeholder.com/150'}
                alt={member.fullName}
                className="rounded-full mb-4 w-32 h-32 object-cover"
              />
              <h3 className="text-lg font-bold">{member.fullName}</h3>
              <p className="text-sm">Nationality: {member.nationality}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No members found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex -space-x-px">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-3 py-2 leading-tight border border-gray-300 ${
                  currentPage === number
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Add Member Form */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Add New Member</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 mb-2 w-full rounded-lg"
            value={newMember.fullName}
            onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nationality"
            className="border p-2 mb-2 w-full rounded-lg"
            value={newMember.nationality}
            onChange={(e) => setNewMember({ ...newMember, nationality: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            className="border p-2 mb-2 w-full rounded-lg"
            onChange={handleImageChange}
          />
          <button
            onClick={handleAddMember}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberArea;
