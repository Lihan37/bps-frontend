import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../assets/image 6.png"; // Placeholder image
import UseAxiosPublic from "../Hooks/UseAxiosPublic"; // Axios hook

const Members = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("Life"); // Default tab is "Life"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = UseAxiosPublic(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true); // Start loading state
      setError(null); // Reset error state
      try {
        const response = await axiosPublic.get("/members");
        setMembers(response.data);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to fetch members. Please try again.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchMembers();
  }, [axiosPublic]);

  // Filter members based on the active tab
  const filteredMembers = members.filter(
    (member) => member.membership === activeTab
  );

  // Handle tab change
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className="bg-white mt-10 p-10 rounded-lg shadow-xl"
      style={{ boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)" }}
    >
      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-4">
        {["Life", "General"].map((tab) => (
          <button
            key={tab}
            className={`bg-[#C5F3F0] text-gray-700 font-bold py-2 px-4 rounded-full mx-2 mb-2 sm:mb-0 ${
              activeTab === tab ? "border-2 border-[#000000]" : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab} Member
          </button>
        ))}
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <p className="text-center text-gray-500">Loading members...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        // Member Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMembers.slice(0, 4).map((member) => (
            <div
              key={member._id}
              className="bg-[#0D8FBC] p-6 rounded-lg text-white flex flex-col items-center"
            >
              <img
                src={member.imageUrls?.image?.file || placeholderImage} // Fetch image from correct path
                alt={member.fullName}
                className="rounded-full mb-4 w-32 h-32 object-cover"
              />
              <h3 className="text-lg font-bold">{member.fullName}</h3>
              <p className="text-sm">Email: {member.email}</p> {/* Display email */}
            </div>
          ))}
        </div>
      )}

      {/* View More Button */}
      {!loading && !error && (
        <div className="flex justify-end mt-4">
          <button
            className="text-gray-700 font-bold"
            onClick={() => navigate("/members")}
          >
            View more...
          </button>
        </div>
      )}
    </div>
  );
};

export default Members;
