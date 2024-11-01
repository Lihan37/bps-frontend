import React, { useState, useEffect } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import UseAdmin from '../Hooks/UseAdmin';

const SCmembers = () => {
  const [scMembers, setScMembers] = useState([]);
  const [designation, setDesignation] = useState('President');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null); // Image file
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const membersPerPage = 9; // Number of cards per page

  const axiosSecure = UseAxiosSecure(); // Secure axios instance
  const [isAdmin, isAdminLoading] = UseAdmin(); // Check if user is admin

  // Predefined order for SC Members
  const designations = [
    'President',
    'Vice-president',
    'General Secretary',
    'Joint Secretary',
    'Organizing Secretary',
    'Assistant Organizing Secretary',
    'Treasurer',
    'Education & Student Welfare Secretary',
    'Cultural & Welfare Secretary',
    'Science & International Affairs Secretary',
    'Research and Publications Secretary',
    'Office Secretary',
    'Press and Public Relations Secretary',
    'Women\'s Welfare Secretary',
    'Executive Member',
  ];

  // Fetch the SC members from the server
  const fetchScMembers = async () => {
    try {
      const response = await axiosSecure.get('/scmembers');
      const orderedMembers = response.data.sort((a, b) =>
        designations.indexOf(a.designation) - designations.indexOf(b.designation)
      );
      setScMembers(orderedMembers); // Sort SC members by designation
    } catch (error) {
      console.error('Error fetching PSC members:', error);
      Swal.fire('Error', 'Failed to fetch PSC members', 'error');
    }
  };

  // Handle image upload to IMGBB and submit form
const handleAddMember = async (e) => {
  e.preventDefault();

  if (!image) {
    Swal.fire("Error", "Please upload an image", "error");
    return;
  }

  const imgBBApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  try {
    // Step 1: Upload image to IMGBB
    const formData = new FormData();
    formData.append("image", image);

    const imgBBResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, {
      method: 'POST',
      body: formData,
    });

    const imgBBData = await imgBBResponse.json();

    if (imgBBData.success) {
      // Step 2: Use image URL from IMGBB to send to backend
      const imageUrl = imgBBData.data.url;
      
      const newMember = {
        designation,
        name,
        imageUrl, // Store the URL in the database
      };

      const response = await axiosSecure.post('/scmembers', newMember);
      Swal.fire("Success", "PSC member added successfully", "success");
      setDesignation(designations[0]);
      setName("");
      setImage(null);
      fetchScMembers(); // Refresh SC members list
    } else {
      Swal.fire("Error", "Image upload failed", "error");
    }
  } catch (error) {
    console.error('Error adding PSC member:', error);
    Swal.fire('Error', 'Failed to add PSC member', 'error');
  }
};


  // Handle deleting an SC member
  const handleDeleteMember = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        // Send delete request to backend
        const response = await axiosSecure.delete(`/scmembers/${id}`);
        Swal.fire('Deleted!', response.data.message, 'success');
        fetchScMembers(); // Refresh SC members list after deletion
      }
    } catch (error) {
      console.error('Error deleting SC member:', error);
      Swal.fire('Error', 'Failed to delete SC member', 'error');
    }
  };

  // Pagination controls
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = scMembers.slice(indexOfFirstMember, indexOfLastMember);

  const totalPages = Math.ceil(scMembers.length / membersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchScMembers();
  }, []);

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-white bg-gradient-to-r from-blue-500 to-teal-400 p-6 rounded-lg shadow-lg">
        List of PSC Members
      </h2>

      {/* Conditionally render form only for admin users */}
      {!isAdminLoading && isAdmin && (
        <form onSubmit={handleAddMember} className="mb-8 space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="designation">
                Designation
              </label>
              <select
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="block w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-blue-500"
              >
                {designations.map((des, index) => (
                  <option key={index} value={des}>
                    {des}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="block w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add PSC Member
          </button>
        </form>
      )}

      <div className="mt-6">
        <h3 className="text-3xl font-bold mb-4 text-center">PSC Members</h3>
        {currentMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMembers.map((member, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center text-white bg-gradient-to-r from-indigo-500 to-teal-400 transform transition duration-500 ease-in-out hover:scale-105"
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white animate-fade-in"
                />
                <h4 className="text-2xl font-bold animate-slide-in">{member.name}</h4>
                <p className="text-md font-semibold mb-4 animate-fade-in">{member.designation}</p>
                {!isAdminLoading && isAdmin && (
                  <button
                    onClick={() => handleDeleteMember(member._id)}
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 animate-fade-in"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No PSC members found.</p>
        )}

        {/* Pagination Controls */}
        {scMembers.length > membersPerPage && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 ${currentPage === page + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded hover:bg-gray-300 transition`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SCmembers;
