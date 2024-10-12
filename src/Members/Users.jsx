import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UseAdmin from "../Hooks/UseAdmin";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, isAdminLoading] = UseAdmin(); // Use the UseAdmin hook

  // Function to fetch users from the API
  const fetchUsers = () => {
    const token = localStorage.getItem("access-token");

    axios
      .get("http://localhost:5000/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Action handlers with warning alerts
  const toggleAdminRole = (id, currentRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        currentRole === "admin" ? "remove admin rights" : "make admin"
      } for this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/members/${id}/toggle-admin`)
          .then((response) => {
            Swal.fire(
              "Success",
              `User role updated to ${response.data.newRole}!`,
              "success"
            );

            // Update the local state to reflect the role change
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === id
                  ? { ...user, role: response.data.newRole }
                  : user
              )
            );
          })
          .catch((error) => {
            console.error("Error updating user role", error);
            Swal.fire("Error", "Failed to update user role.", "error");
          });
      }
    });
  };

  const blockUser = (id, isBlocked) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${isBlocked ? "unblock" : "block"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/members/${id}/block`)
          .then((response) => {
            Swal.fire(
              response.data.newStatus ? "Blocked" : "Unblocked",
              `User has been ${
                response.data.newStatus ? "blocked" : "unblocked"
              }!`,
              "info"
            );
            // Refetch users to update the state
            fetchUsers();
          })
          .catch((error) => {
            console.error("Error updating user status", error);
            Swal.fire("Error", "Failed to update user status.", "error");
          });
      }
    });
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/members/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The user has been deleted.", "success");
            // Refetch users to update the state
            fetchUsers();
          })
          .catch((error) => {
            console.error("Error deleting user", error);
            Swal.fire("Error", "Failed to delete user.", "error");
          });
      }
    });
  };

  if (isAdminLoading) {
    return <div>Loading...</div>; // Show a loading state if admin status is loading
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="bg-[#0A6F8F] p-8 text-center font-bold mb-10 text-5xl text-white max-w-screen-2xl mx-auto rounded-md">
        Users
      </h2>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">
          Total Users: {filteredUsers.length}
        </div>
        <input
          type="text"
          placeholder="Search by name or email"
          className="border px-4 py-2 rounded-md w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Roles</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{user.fullName}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  {user.role || "user"} {/* Default role is 'user' */}
                </td>
                <td className="px-4 py-2 border">
                  {isAdmin && (
                    <>
                      <button
                        className={`${
                          user.role === "admin" ? "bg-red-500" : "bg-blue-500"
                        } text-white px-4 py-2 mr-2 rounded`}
                        onClick={() => toggleAdminRole(user._id, user.role)}
                      >
                        {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded"
                        onClick={() => blockUser(user._id, user.blocked)}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                      {/* Add a View Profile button styled like others but with Link */}
                      <Link
                        to={`/user/profile/${user.email}`}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        View Profile
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={handlePreviousPage}
          className={`bg-gray-500 text-white px-3 py-1 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={`px-3 py-1 rounded ${
              number === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`bg-gray-500 text-white px-3 py-1 rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
