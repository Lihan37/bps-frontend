import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { sendPasswordResetEmail } from "firebase/auth";
import { getAuth } from "firebase/auth"; // Firebase auth

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn, logOut } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", imageUrl: "" });
  const navigate = useNavigate();
  const auth = getAuth(); // Firebase auth instance
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

      const imageUrl =
        memberData?.imageUrls?.image?.file || ""; // Fetch the main image URL

      setUserInfo({
        name: memberData.fullName || "User",
        imageUrl, // Store the main image URL
      });
    } catch (error) {
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
      const userCredential = await signIn(email, password);
      const userInfo = { email: userCredential.user.email };
      const tokenResponse = await axios.post(
        "https://bps-server.vercel.app/jwt",
        userInfo
      );
      localStorage.setItem("access-token", tokenResponse.data.token);
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

  // Forgot Password function
  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your email address to reset your password.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        title: "Password Reset!",
        text: `A password reset link has been sent to ${email}. Please check your inbox.`,
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
            <div className="text-left pl-3">
              <button
                className="text-white underline text-sm"
                type="button"
                onClick={handleForgotPassword}
              >
                Forgot Password?
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
              onClick={handleViewProfile}
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
