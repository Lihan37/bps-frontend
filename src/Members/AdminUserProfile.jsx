import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminUserProfile = () => {
  const { email } = useParams(); // Get the email from the URL params
  const [userInfo, setUserInfo] = useState(null); // State to store user info

  useEffect(() => {
    fetchUserInfo();
  }, [email]);

  // Fetch user info based on email
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/members?email=${email}`);
      const user = response.data.find((user) => user.email === email);
      setUserInfo(user); // Set the user info based on the email
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  if (!userInfo) {
    return <p>Loading profile...</p>; // Loading state
  }

  return (
    <div>
      <h2 className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 sm:p-8 text-center font-bold my-5 text-3xl sm:text-4xl lg:text-5xl text-white max-w-screen-2xl mx-auto rounded-md shadow-lg">
        {userInfo.fullName}'s Profile
      </h2>
      <div className="max-w-screen-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Profile Picture */}
        {userInfo.imageUrls && (
          <div className="flex justify-center mb-6">
            <img
              src={userInfo.imageUrls[0]} // Display the first image URL
              alt={userInfo.fullName}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
            />
          </div>
        )}

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-2 text-blue-800">Personal Information</h2>
            <p><strong>Father's Name:</strong> {userInfo.fatherName}</p>
            <p><strong>Mother's Name:</strong> {userInfo.motherName}</p>
            <p><strong>Date of Birth:</strong> {userInfo.dateOfBirth}</p>
            <p><strong>Nationality:</strong> {userInfo.nationality}</p>
            <p><strong>National ID:</strong> {userInfo.nationalId}</p>
            <p><strong>Permanent Address:</strong> {userInfo.permanentAddress}</p>
            <p><strong>Present Address:</strong> {userInfo.presentAddress}</p>
            <p><strong>Village:</strong> {userInfo.village}</p>
            <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Membership:</strong> {userInfo.membership}</p>
          </div>

          {/* Payment Information */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-2 text-blue-800">Payment Information</h2>
            <p><strong>Amount:</strong> {userInfo.payment?.amount || "N/A"}</p>
            <p><strong>Payment Method:</strong> {userInfo.payment?.method || "N/A"}</p>
            <p><strong>D.D No:</strong> {userInfo.payment?.ddNo || "N/A"}</p>
            <p><strong>Date:</strong> {userInfo.payment?.date || "N/A"}</p>
            <p><strong>Bank:</strong> {userInfo.payment?.bank || "N/A"}</p>
          </div>
        </div>

        {/* Education Information */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Education Information</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Degree</th>
                <th className="px-4 py-2 border">Passing Year</th>
                <th className="px-4 py-2 border">Board</th>
                <th className="px-4 py-2 border">Registration No</th>
                <th className="px-4 py-2 border">School</th>
                <th className="px-4 py-2 border">File</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(userInfo.education).map((degree) => (
                <tr key={degree}>
                  <td className="px-4 py-2 border">{degree.toUpperCase()}</td>
                  <td className="px-4 py-2 border">{userInfo.education[degree].passingYear}</td>
                  <td className="px-4 py-2 border">{userInfo.education[degree].board}</td>
                  <td className="px-4 py-2 border">{userInfo.education[degree].registrationNo}</td>
                  <td className="px-4 py-2 border">{userInfo.education[degree].school}</td>
                  <td className="px-4 py-2 border">
                    {userInfo.education[degree].file ? (
                      <a href={userInfo.education[degree].file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View File</a>
                    ) : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Professional Information */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Professional Qualifications</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Degree</th>
                <th className="px-4 py-2 border">University</th>
                <th className="px-4 py-2 border">Institute</th>
                <th className="px-4 py-2 border">Passing Year</th>
                <th className="px-4 py-2 border">File</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(userInfo.professional).map((degree) => (
                <tr key={degree}>
                  <td className="px-4 py-2 border">{degree.toUpperCase()}</td>
                  <td className="px-4 py-2 border">{userInfo.professional[degree].university}</td>
                  <td className="px-4 py-2 border">{userInfo.professional[degree].institute}</td>
                  <td className="px-4 py-2 border">{userInfo.professional[degree].passingYear}</td>
                  <td className="px-4 py-2 border">
                    {userInfo.professional[degree].file ? (
                      <a href={userInfo.professional[degree].file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View File</a>
                    ) : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Additional Information</h2>
          <p><strong>Other Membership:</strong> {userInfo.otherMembership || "N/A"}</p>
          <p><strong>Additional Particulars:</strong> {userInfo.additionalParticulars || "N/A"}</p>
          {userInfo.signatureFile && (
            <p>
              <strong>Signature: </strong>
              <a href={userInfo.signatureFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Signature</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfile;
