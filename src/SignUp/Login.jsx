import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle state
  const [showRenewModal, setShowRenewModal] = useState(false); // Modal visibility state
  const { user, signIn, logOut } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", imageUrl: "" });
  const navigate = useNavigate();
  const auth = getAuth();
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      fetchUserInfo(user.uid);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axiosSecure.get(`/members/user/${userId}`);
      const memberData = response.data;
      const imageUrl = memberData?.imageUrls?.image?.file || "";

      setUserInfo({
        name: memberData.fullName || "User",
        imageUrl,
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
      const tokenResponse = await axios.post("https://app.bps.org.bd/jwt", userInfo);
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
      setUserInfo({ name: "", imageUrl: "" });
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
    navigate("/profile");
  };

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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </div>
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
                onClick={() => setShowRenewModal(true)} // Show the modal
              >
                Renew Your Membership
              </button>
            </div>
          </>
        )}
      </form>

      {/* Modal for Renew Membership Info */}
      {showRenewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-center">Membership Renewal Information</h3>
            <p className="text-gray-700 mb-4">
              To renew your membership, please pay via Bkash or any preferred online/offline service.
              After making the payment, log in to your profile, add the payment details, and complete
              the renewal process. For any queries, contact us at:
            </p>
            <p className="text-gray-900 font-semibold mb-4">
              Phone: +8801310099580 <br />
              Email: bpsinfo.24@gmail.com
            </p>
            <button
              className="bg-[#006382] text-white py-2 px-4 rounded-full w-full font-bold mt-4"
              onClick={() => setShowRenewModal(false)} // Hide the modal
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
