import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "Single",
    nationalId: "",
    dateOfBirth: "",
    age: "",
    placeOfBirth: "",
    nationality: "Bangladeshi",
    gender: "Male",
    officePhone: "",
    mobile: "",
    residenceNumber: "",
    email: "",
    membership: "General",
    membershipId: "",
    center: "",
    imageUrl: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }

    return "";
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          uploadFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          const imageUrl = response.data.data.display_url;
          setFormData((prevData) => ({ ...prevData, imageUrl }));

          Swal.fire({
            title: "Success!",
            text: "Image uploaded successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to upload image. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordValidationError = validatePassword(password);

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      if (!formData.email || !password) {
        throw new Error("Email and password must be provided.");
      }

      // Create the user with email and password
      const userCredential = await createUser(formData.email, password);
      const userId = userCredential.user.uid;

      // Log formData to ensure imageUrl is present
      console.log("FormData before submission:", formData);

      // Send the form data to the backend
      const response = await axios.post("http://localhost:5000/members", {
        ...formData,
        userId: userId,
      });

      Swal.fire({
        title: "Success!",
        text: "Account created and data submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
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
    <div className="max-w-4xl mt-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Father's Name */}
          <div>
            <label
              htmlFor="fatherName"
              className="block text-sm font-medium text-gray-700"
            >
              Father's Name
            </label>
            <input
              type="text"
              id="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Mother's Name */}
          <div>
            <label
              htmlFor="motherName"
              className="block text-sm font-medium text-gray-700"
            >
              Mother's Name
            </label>
            <input
              type="text"
              id="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label
              htmlFor="maritalStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Marital Status
            </label>
            <select
              id="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          {/* National ID */}
          <div>
            <label
              htmlFor="nationalId"
              className="block text-sm font-medium text-gray-700"
            >
              National ID
            </label>
            <input
              type="text"
              id="nationalId"
              value={formData.nationalId}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Place of Birth */}
          <div>
            <label
              htmlFor="placeOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Place of Birth
            </label>
            <input
              type="text"
              id="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Nationality */}
          <div>
            <label
              htmlFor="nationality"
              className="block text-sm font-medium text-gray-700"
            >
              Nationality
            </label>
            <select
              id="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <option value="Bangladeshi">Bangladeshi</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Office Phone */}
          <div>
            <label
              htmlFor="officePhone"
              className="block text-sm font-medium text-gray-700"
            >
              Office Phone
            </label>
            <input
              type="text"
              id="officePhone"
              value={formData.officePhone}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Residence Number */}
          <div>
            <label
              htmlFor="residenceNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Residence Number
            </label>
            <input
              type="text"
              id="residenceNumber"
              value={formData.residenceNumber}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Membership */}
          <div>
            <label
              htmlFor="membership"
              className="block text-sm font-medium text-gray-700"
            >
              Membership
            </label>
            <select
              id="membership"
              value={formData.membership}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <option value="General">General</option>
              <option value="Life">Life</option>
              <option value="EC">EC</option>
              <option value="SC">SC</option>
            </select>
          </div>

          {/* Membership ID */}
          <div>
            <label
              htmlFor="membershipId"
              className="block text-sm font-medium text-gray-700"
            >
              Membership ID
            </label>
            <input
              type="text"
              id="membershipId"
              value={formData.membershipId}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Center */}
          <div>
            <label
              htmlFor="center"
              className="block text-sm font-medium text-gray-700"
            >
              Center
            </label>
            <input
              type="text"
              id="center"
              value={formData.center}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-700"
            >
              Image Upload
            </label>
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageUpload}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Uploaded Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
