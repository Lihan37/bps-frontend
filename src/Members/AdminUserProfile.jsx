import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UseAdmin from "../Hooks/UseAdmin"; // Admin control hook for authorization
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaIdCard } from "react-icons/fa"; // Importing icons
import Swal from "sweetalert2"; // Importing SweetAlert2

const AdminUserProfile = () => {
  const { email } = useParams(); // Get the email from the URL params
  const [userInfo, setUserInfo] = useState(null); // State to store user info
  const [membershipId, setMembershipId] = useState(""); // Admin-controlled field
  const [status, setStatus] = useState(""); // Admin-controlled field
  const [isAdmin] = UseAdmin(); // Check if the current user is an admin

  useEffect(() => {
    fetchUserInfo();
  }, [email]);

  // Fetch user info based on email
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/members?email=${email}`);
      const user = response.data.find((user) => user.email === email);
      setUserInfo(user); // Set the user info based on the email
      setMembershipId(user?.membershipId || "");
      setStatus(user?.status || "");
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Clear form fields after an update
  const clearFormFields = () => {
    setMembershipId("");
    setStatus("");
  };

  const handleAdminUpdate = async () => {
    if (!isAdmin) return; // Only admins can update the fields

    try {
      const token = localStorage.getItem("access-token"); // Get the token from localStorage
      if (!token) {
        throw new Error("No access token found.");
      }

      const response = await axios.patch(
        `http://localhost:5000/members/${userInfo._id}/admin-update`,
        { membershipId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Membership ID and status updated successfully.",
        });
        fetchUserInfo(); // Refresh the data after update
        clearFormFields(); // Clear form fields after update
      }
    } catch (error) {
      console.error("Error updating membershipId and status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update membership ID and status.",
      });
    }
  };

  // Loading state while fetching user data
  if (!userInfo) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2 className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 sm:p-8 text-center font-bold my-5 text-3xl sm:text-4xl lg:text-5xl text-white max-w-screen-2xl mx-auto rounded-md shadow-lg">
        {userInfo?.fullName}'s Profile
      </h2>
      <div className="max-w-screen-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Profile Picture */}
        {userInfo?.imageUrls && (
          <div className="flex justify-center mb-6">
            <img
              src={userInfo.imageUrls.image.file} // Display the image URL
              alt={userInfo.fullName}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
            />
          </div>
        )}

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-2 text-blue-800">Personal Information</h2>
            <p className="flex items-center mb-2">
              <FaUser className="text-blue-500 mr-2" /> Father's Name: {userInfo?.fatherName}
            </p>
            <p className="flex items-center mb-2">
              <FaUser className="text-blue-500 mr-2" /> Mother's Name: {userInfo?.motherName}
            </p>
            <p className="flex items-center mb-2">
              <FaCalendarAlt className="text-blue-500 mr-2" /> Date of Birth: {userInfo?.dateOfBirth}
            </p>
            <p className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-blue-500 mr-2" /> Permanent Address: {userInfo?.permanentAddress}
            </p>
            <p className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-blue-500 mr-2" /> Present Address: {userInfo?.presentAddress}
            </p>
            <p className="flex items-center mb-2">
              <FaIdCard className="text-blue-500 mr-2" /> National ID: {userInfo?.nationalId}
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-2 text-blue-800">Contact Information</h2>
            <p className="flex items-center mb-2">
              <FaPhone className="text-blue-500 mr-2" /> Phone: {userInfo?.phoneNumber}
            </p>
            <p className="flex items-center mb-2">
              <FaEnvelope className="text-blue-500 mr-2" /> Email: {userInfo?.email}
            </p>
          </div>
        </div>

        {/* Membership Information (shown for both user and admin, editable by admin only) */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Membership Information</h2>
          <p><strong>Membership ID:</strong> {userInfo?.membershipId || "Not Assigned"}</p>
          <p><strong>Status:</strong> {userInfo?.status || "Not Assigned"}</p>
        </div>

        {/* Payment Information */}
        <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Payment Information</h2>
          <p><strong>Amount:</strong> {userInfo.payment?.amount || "N/A"} Taka</p>
          <p><strong>Payment Method:</strong> {userInfo.payment?.method || "N/A"}</p>
          <p><strong>Transaction ID and latest amount:</strong> {userInfo.payment?.ddNo || "N/A"}</p>

          {/* Transaction History */}
          {userInfo.payment?.history && userInfo.payment.history.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Transaction History:</h3>
              <table className="table-auto border-collapse border border-gray-300 mx-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">#</th>
                    <th className="border px-4 py-2">Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.payment.history.map((transId, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{transId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Education Information */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Educational Qualifications</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Degree</th>
                <th className="px-4 py-2 border">Passing Year</th>
                <th className="px-4 py-2 border">Board</th>
                <th className="px-4 py-2 border">Registration No</th>
                <th className="px-4 py-2 border">School/College</th>
                <th className="px-4 py-2 border">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(userInfo?.education || {}).map((degree) => (
                <tr key={degree}>
                  <td className="px-4 py-2 border">{degree.toUpperCase()}</td>
                  <td className="px-4 py-2 border">{userInfo.education[degree].passingYear}</td>
                  <td className="px-4 py-2 border">{userInfo.education[degree].board}</td>
                  <td className="px-4 py-2 border">{userInfo.education[degree].registrationNo}</td>
                  <td className="px-4 py-2 border">{userInfo.education[degree].school}</td>
                  <td className="px-4 py-2 border">
                    {userInfo.education[degree].file ? (
                      <a
                        href={userInfo.education[degree].file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Certificate
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Professional Qualifications */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Professional Qualifications</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Degree</th>
                <th className="px-4 py-2 border">University</th>
                <th className="px-4 py-2 border">Institute</th>
                <th className="px-4 py-2 border">Passing Year</th>
                <th className="px-4 py-2 border">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(userInfo?.professional || {}).map((degree) => (
                <tr key={degree}>
                  <td className="px-4 py-2 border">{degree.toUpperCase()}</td>
                  <td className="px-4 py-2 border">{userInfo.professional[degree].university}</td>
                  <td className="px-4 py-2 border">{userInfo.professional[degree].institute}</td>
                  <td className="px-4 py-2 border">{userInfo.professional[degree].passingYear}</td>
                  <td className="px-4 py-2 border">
                    {userInfo.professional[degree].file ? (
                      <a
                        href={userInfo.professional[degree].file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Certificate
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Additional Information</h2>
          <p><strong>Other Membership:</strong> {userInfo?.otherMembership || "N/A"}</p>
          <p><strong>Additional Particulars:</strong> {userInfo?.additionalParticulars || "N/A"}</p>
          {userInfo.signatureFile && (
            <p>
              <strong>Signature: </strong>
              <a
                href={userInfo.signatureFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Signature
              </a>
            </p>
          )}
        </div>

        {/* Admin Fields (form for admins only) */}
        {isAdmin && (
          <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Admin Controls</h2>
            <div className="mb-4">
              <label htmlFor="membershipId" className="block text-sm font-medium text-gray-700">
                Membership ID
              </label>
              <input
                type="text"
                id="membershipId"
                value={membershipId}
                onChange={(e) => setMembershipId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <input
                type="text"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              />
            </div>

            <button
              onClick={handleAdminUpdate}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold shadow-md"
            >
              Update Membership ID & Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserProfile;
