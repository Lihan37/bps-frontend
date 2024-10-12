import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn, logOut } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", imageUrl: "" });
  const navigate = useNavigate();

  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      fetchUserInfo(user.uid); // Fetch user info based on userId
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axiosSecure.get(`/members/user/${userId}`);
      const memberData = response.data;

      // Check if imageUrls is an array and has at least one item
      const imageUrl =
        Array.isArray(memberData.imageUrls) && memberData.imageUrls.length > 0
          ? memberData.imageUrls[0]
          : ""; // Fallback to an empty string if no images available

      setUserInfo({
        name: memberData.fullName || "User", // Fallback to 'User' if fullName is undefined
        imageUrl, // Use the checked imageUrl
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch user information.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      Swal.fire({
        title: "Success!",
        text: "Logged in successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setUserInfo({ name: "", imageUrl: "" }); // Clear user info
      Swal.fire({
        title: "Logged out!",
        text: "You have been logged out successfully.",
        icon: "info",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleViewProfile = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <div
      className="bg-[#006382] shadow-lg rounded-3xl p-6 max-w-md mx-auto"
      style={{
        boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)",
      }}
    >
      <h2 className="text-2xl text-white font-bold mb-6 text-center">
        {isLoggedIn ? `Welcome, ${userInfo.name || "User"}!` : "Login"}
      </h2>

      {isLoggedIn && userInfo.imageUrl && (
        <div className="flex justify-center mb-4">
          <img
            src={userInfo.imageUrl}
            alt={userInfo.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      )}

      <form className="space-y-4">
        {!isLoggedIn ? (
          <>
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-white text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center mb-4 space-x-4">
            <button
              className="bg-white text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogout}
            >
              Sign Out
            </button>
            <button
              className="bg-white text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleViewProfile} // Call the new function
            >
              View Your Profile
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <>
            <div className="flex items-center justify-between mb-2">
              <Link
                to="/signUp"
                className="bg-white bg-opacity-80 text-[#006382] font-bold py-2 px-4 rounded-full inline-block text-center focus:outline-none focus:shadow-outline"
              >
                Apply for new membership
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-white bg-opacity-80 text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
              >
                Renew Your Membership
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
