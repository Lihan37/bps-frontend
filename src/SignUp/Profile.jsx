import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2"; // Importing SweetAlert2
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa"; // Importing icons

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null); // State for user information
  const [newTransactionId, setNewTransactionId] = useState(""); // State for new transaction ID

  useEffect(() => {
    if (user) {
      fetchUserInfo(user.uid); // Fetch user info based on userId
    }
  }, [user]);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `https://bps-server.vercel.app/members/user/${userId}`
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Function to update the transaction ID
  const updateTransactionId = async () => {
    try {
      if (!newTransactionId) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please enter a transaction ID",
        });
        return;
      }

      await axios.patch(`https://bps-server.vercel.app/members/${user.uid}/payment`, {
        ddNo: newTransactionId, // Sending the new transaction ID
      });
      fetchUserInfo(user.uid); // Refetch the user info to reflect the updated transaction ID
      setNewTransactionId(""); // Clear the input field after update

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Transaction ID updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating transaction ID.",
      });
      console.error("Error updating transaction ID:", error);
    }
  };

  return (
    <div>
      <h2 className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 sm:p-8 text-center font-bold my-5 text-3xl sm:text-4xl lg:text-5xl text-white max-w-screen-2xl mx-auto rounded-md shadow-lg">
        My Profile
      </h2>
      <div className="max-w-screen-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {userInfo ? (
          <div className="flex flex-col items-center text-center">
            {/* Fetching the profile image URL correctly */}
            <img
              src={userInfo.imageUrls?.image?.file || ""} // Correctly accessing the main image URL
              alt={userInfo.fullName}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mb-4"
            />
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              {userInfo.fullName}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {userInfo.role === "admin" ? "Administrator" : "Member"}
            </p>

            {/* Membership Information */}
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm w-full mt-4">
              <h2 className="text-xl font-bold mb-2 text-blue-800">Membership Information</h2>
              <p><strong>Membership ID:</strong> {userInfo?.membershipId || "Not Assigned"}</p>
              <p><strong>Status:</strong> {userInfo?.status || "Not Assigned"}</p>
              <p><strong>Membership Type:</strong> {userInfo?.membership}</p>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
              {/* Personal Information */}
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-2 text-blue-800">
                  Personal Information
                </h2>
                <p className="flex items-center mb-2">
                  <FaUser className="text-blue-500 mr-2" /> Father:{" "}
                  {userInfo.fatherName}
                </p>
                <p className="flex items-center mb-2">
                  <FaUser className="text-blue-500 mr-2" /> Mother:{" "}
                  {userInfo.motherName}
                </p>
                <p className="flex items-center mb-2">
                  <FaCalendarAlt className="text-blue-500 mr-2" /> Date of
                  Birth: {userInfo.dateOfBirth}
                </p>
                <p className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-blue-500 mr-2" /> Permanent
                  Address: {userInfo.permanentAddress}
                </p>
                <p className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-blue-500 mr-2" /> Present
                  Address: {userInfo.presentAddress}
                </p>
                <p className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-blue-500 mr-2" /> Village:{" "}
                  {userInfo.village}
                </p>
                <p className="flex items-center mb-2">
                  <FaIdCard className="text-blue-500 mr-2" /> National ID:{" "}
                  {userInfo.nationalId}
                </p>
                <p className="flex items-center mb-2">
                  <FaUser className="text-blue-500 mr-2" /> Nationality:{" "}
                  {userInfo.nationality}
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-2 text-blue-800">
                  Contact Information
                </h2>
                <p className="flex items-center mb-2">
                  <FaPhone className="text-blue-500 mr-2" /> Phone:{" "}
                  {userInfo.phoneNumber}
                </p>
                <p className="flex items-center mb-2">
                  <FaEnvelope className="text-blue-500 mr-2" /> Email:{" "}
                  {userInfo.email}
                </p>
              </div>
            </div>

            {/* Educational and Professional Qualifications */}
            <div className="w-full mt-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">
                Educational Qualifications
              </h2>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th>Degree</th>
                    <th>Passing Year</th>
                    <th>Board</th>
                    <th>Registration No</th>
                    <th>School/College</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.education &&
                    Object.keys(userInfo.education).map((degree) => (
                      <tr key={degree}>
                        <td>{degree.toUpperCase()}</td>
                        <td>{userInfo.education[degree].passingYear}</td>
                        <td>{userInfo.education[degree].board}</td>
                        <td>{userInfo.education[degree].registrationNo}</td>
                        <td>{userInfo.education[degree].school}</td>
                        <td>
                          <a
                            href={userInfo.education[degree].file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View File
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="w-full mt-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">
                Professional Qualifications
              </h2>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th>Degree</th>
                    <th>University</th>
                    <th>Institute</th>
                    <th>Passing Year</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.professional &&
                    Object.keys(userInfo.professional).map((degree) => (
                      <tr key={degree}>
                        <td>{degree.toUpperCase()}</td>
                        <td>{userInfo.professional[degree].university}</td>
                        <td>{userInfo.professional[degree].institute}</td>
                        <td>{userInfo.professional[degree].passingYear}</td>
                        <td>
                          <a
                            href={userInfo.professional[degree].file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View File
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Payment Information */}
            <div className="w-full mt-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">
                Payment Information
              </h2>
              <p>
                <strong>Amount: </strong> {userInfo.payment?.amount || "N/A"}{" "}
                Taka
              </p>
              <p>
                <strong>Method: </strong> {userInfo.payment?.method || "N/A"}
              </p>
              <p>
                <strong>Transaction ID and latest amount: </strong>{" "}
                {userInfo.payment?.ddNo || "N/A"}
              </p>

              {/* Transaction History */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">
                  Transaction ID and cash History:
                </h3>
                <table className="table-auto border-collapse border border-gray-300 mx-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2">#</th>
                      <th className="border px-4 py-2">Transaction ID and cash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userInfo.payment?.history?.map((transId, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{transId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Input for new transaction ID */}
              <div className="mt-4">
                <input
                  type="text"
                  value={newTransactionId}
                  onChange={(e) => setNewTransactionId(e.target.value)}
                  placeholder="#TRXN-ID #CASH"
                  className="border px-4 py-2 rounded-md mr-2"
                />
                <button
                  onClick={updateTransactionId}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Update Transaction ID
                </button>
              </div>
            </div>

            {/* Additional Information */}
            <div className="w-full mt-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">
                Additional Information
              </h2>
              <p>
                <strong>Other Membership: </strong> {userInfo.otherMembership}
              </p>
              <p>
                <strong>Additional Particulars: </strong>{" "}
                {userInfo.additionalParticulars}
              </p>
              <p>
                <strong>Signature: </strong>{" "}
                <a
                  href={userInfo.signatureFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Signature
                </a>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
