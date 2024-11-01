import React, { useState, useEffect } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; // For formatting the date
import UseAdmin from '../Hooks/UseAdmin';

const Honorary = () => {
  const [honoraryList, setHonoraryList] = useState([]);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const axiosSecure = UseAxiosSecure(); // Use the secure axios instance
  const [isAdmin, isAdminLoading] = UseAdmin(); // Check if user is admin

  // Fetch the honorary list from the server
  const fetchHonoraryList = async () => {
    try {
      const response = await axiosSecure.get('/honorary');
      setHonoraryList(response.data);
    } catch (error) {
      console.error('Error fetching honorary list:', error);
      Swal.fire('Error', 'Failed to fetch honorary list', 'error');
    }
  };

  // Handle adding a new honorary member
  const handleAddHonorary = async (e) => {
    e.preventDefault();
    if (!startYear || !endYear) {
      Swal.fire('Error', 'Please select a valid year range', 'error');
      return;
    }

    try {
      const newMember = {
        year: `${format(startYear, 'yyyy')} - ${format(endYear, 'yyyy')}`,
        name,
        position,
      };
      const response = await axiosSecure.post('/honorary', newMember);
      Swal.fire('Success', response.data.message, 'success');
      setStartYear(null);
      setEndYear(null);
      setName('');
      setPosition('');
      fetchHonoraryList(); // Refresh the list after adding a new member
    } catch (error) {
      console.error('Error adding honorary member:', error);
      Swal.fire('Error', 'Failed to add honorary member', 'error');
    }
  };

  // Handle deleting an honorary member
  const handleDeleteHonorary = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the honorary member.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/honorary/${id}`);
          Swal.fire('Deleted!', response.data.message, 'success');
          fetchHonoraryList(); // Refresh the list after deletion
        } catch (error) {
          console.error('Error deleting honorary member:', error);
          Swal.fire('Error', 'Failed to delete honorary member', 'error');
        }
      }
    });
  };

  useEffect(() => {
    fetchHonoraryList();
  }, []);

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-white bg-gradient-to-r from-blue-500 to-teal-400 p-6 rounded-lg shadow-lg">
        List of Honorary Members
      </h2>

      {/* Conditionally render form only for admin users */}
      {!isAdminLoading && isAdmin && (
        <form onSubmit={handleAddHonorary} className="mb-8 space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="startYear">
                Start Year
              </label>
              <DatePicker
                selected={startYear}
                onChange={(date) => setStartYear(date)}
                showYearPicker
                dateFormat="yyyy"
                className="block w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-blue-500"
                placeholderText="Select Start Year"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="endYear">
                End Year
              </label>
              <DatePicker
                selected={endYear}
                onChange={(date) => setEndYear(date)}
                showYearPicker
                dateFormat="yyyy"
                className="block w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-blue-500"
                placeholderText="Select End Year"
              />
            </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="position">
              Designation
            </label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="block w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Honorary Member
          </button>
        </form>
      )}

      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-4 text-center">Honorary Members</h3>
        {honoraryList.length > 0 ? (
          <ul className="space-y-4">
            {honoraryList.map((member) => (
              <li
                key={member._id}
                className="p-4 border rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-teal-400 text-white flex justify-between items-center"
              >
                <div className="w-1/3 font-semibold">{member.year}</div>
                <div className="w-1/3 text-center">{member.name}</div>
                <div className="w-1/3 text-right flex items-center justify-end space-x-4">
                  <span>{member.position}</span>
                  {/* Delete button visible only for admin */}
                  {!isAdminLoading && isAdmin && (
                    <button
                      onClick={() => handleDeleteHonorary(member._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No honorary members found.</p>
        )}
      </div>
    </div>
  );
};

export default Honorary;
