import React, { useContext, useState } from "react";
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
    membership: "",
    membershipId: "",
    center: "",
    imageUrl: "", // New field for the image URL
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
      const imageData = new FormData();
      imageData.append("image", file);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=e8268c1e93512f8a89963af81d84fddd`,
          {
            method: "POST",
            body: imageData,
          }
        );

        const result = await response.json();
        console.log(result); // Log the result for debugging

        if (result.success) {
          setFormData({ ...formData, imageUrl: result.data.url });
          Swal.fire("Image uploaded successfully!", "", "success");
        } else {
          Swal.fire(
            "Image upload failed",
            result.error.message || "Unknown error",
            "error"
          ); // Enhanced error message
        }
      } catch (error) {
        console.error("Error uploading image:", error); // Log the error to the console
        Swal.fire("Error uploading image", error.message, "error");
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

    console.log("Form Data:", formData); // Add this line to debug the data being sent

    try {
      // Call createUser to register the user
      await createUser(formData.email, password);

      // Post form data to the backend
      const response = await axios.post(
        "http://localhost:5000/members",
        formData
      );
      console.log("Response from backend:", response.data); // Add this line to check the response

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
            <input
              type="text"
              id="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
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
              <option value="Other">Other</option>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>

          {/* Mobile Phone */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Phone
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
              <option value="">Select Membership</option>
              <option value="General Member">General Member</option>
              <option value="Life Member">Life Member</option>
              <option value="EC Member">EC Member</option>
              <option value="SC Member">SC Member</option>
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
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
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
            <p className="text-red-600 text-sm">{passwordError}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-[#006382] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
