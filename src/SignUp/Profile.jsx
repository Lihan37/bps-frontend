import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIdCard,
  FaUniversity,
} from "react-icons/fa"; // Importing icons

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null); // State for user information

  useEffect(() => {
    if (user) {
      fetchUserInfo(user.uid); // Fetch user info based on userId
    }
  }, [user]);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/members/user/${userId}`
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
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
            <img
              src={userInfo.imageUrls && userInfo.imageUrls[0]} // Displaying the first image URL
              alt={userInfo.fullName}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mb-4"
            />
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              {userInfo.fullName}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {userInfo.role === "admin" ? "Administrator" : "Member"}
            </p>

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
                <strong>D.D No: </strong> {userInfo.payment?.ddNo || "N/A"}
              </p>
              <p>
                <strong>Date: </strong> {userInfo.payment?.date || "N/A"}
              </p>
              <p>
                <strong>Bank: </strong> {userInfo.payment?.bank || "N/A"}
              </p>
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
