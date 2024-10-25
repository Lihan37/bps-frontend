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
    sex: "M",
    dateOfBirth: "",
    nationality: "Bangladeshi",
    nationalId: "",
    permanentAddress: "",
    presentAddress: "",
    village: "",
    phoneNumber: "",
    email: "",
    membership: "General",
    password: "",
    imageUrls: [], // For passport photo
    education: {
      ssc: {
        passingYear: "",
        board: "",
        registrationNo: "",
        school: "",
        file: null, // For SSC certificate image
      },
      hsc: {
        passingYear: "",
        board: "",
        registrationNo: "",
        school: "",
        file: null, // For HSC certificate image
      },
      diploma: {
        passingYear: "",
        board: "",
        registrationNo: "",
        school: "",
        file: null, // For Diploma certificate image
      },
    },
    professional: {
      bpt: { university: "", institute: "", passingYear: "", file: null }, // For BPT certificate image
      mpt: { university: "", institute: "", passingYear: "", file: null }, // For MPT certificate image
      others: { university: "", institute: "", passingYear: "", file: null }, // For other certificates
    },
    otherMembership: "",
    additionalParticulars: "",
    payment: {
      amount: "500",
      method: "cash",
      ddNo: "",
      date: "",
      bank: "",
    },
    agreeToTerms: false,
    signatureFile: "", // Initialize with an empty string for signature file
  });

  const [passwordError, setPasswordError] = useState("");
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Validation for password (unchanged)
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

  // Handle input changes correctly for each field without affecting other fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleTableInputChange = (e, section, field, qualification) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [qualification]: {
          ...prevData[section][qualification],
          [field]: value,
        },
      },
    }));
  };

  const handleImageUpload = async (e, section, field, sizeLimitMB = 2) => {
    const file = e.target.files[0];
    const sizeLimitBytes = sizeLimitMB * 1024 * 1024; // Convert size limit to bytes

    if (file && file.size > sizeLimitBytes) {
      Swal.fire({
        title: "Error!",
        text: `File size exceeds the ${sizeLimitMB}MB limit.`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        uploadFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        const imageUrl = response.data.data.display_url;

        // Handle the case where signatureFile needs to be updated
        if (section === "signatureFile") {
          setFormData((prevData) => ({
            ...prevData,
            signatureFile: imageUrl || "", // Safely update signatureFile
          }));
        } else {
          // Update form data for the correct section and field
          setFormData((prevData) => ({
            ...prevData,
            [section]: {
              ...prevData[section],
              [field]: {
                ...prevData[section][field],
                file: imageUrl || null, // Safely update image URL or set to null
              },
            },
          }));
        }
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to upload image.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      // Create user with Firebase (or any auth system)
      const userCredential = await createUser(
        formData.email,
        formData.password
      );
      formData.userId = userCredential.user.uid;

      // Log form data to verify before sending to backend
      console.log("Submitting form data:", formData);

      // Save form data to backend
      const response = await axios.post(
        "https://bps-server.vercel.app/members",
        formData
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Account created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/"); // Redirect after success
        });
      } else {
        throw new Error("Unexpected response status.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to submit the form. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-6xl bg-white p-10 rounded-lg shadow-xl w-full">
        {/* Secretary General Section */}
        <div className="mb-6 text-center bg-blue-100 p-4 rounded-lg">
          <h2 className="text-3xl font-bold text-blue-700">Membership Form</h2>
          <p className="text-gray-700 mt-2">
            The Secretary General <br />
            Bangladesh Physiotherapy Society (BPS) <br />
            Sir, <br />
            Please update my information/enroll me as a primary member of the
            BPS.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Image Upload Section */}
          <div className="flex flex-col items-center md:col-span-2">
            <label className="text-lg font-semibold mb-4">
              Upload Passport Size Photo
            </label>
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, "imageUrls", "image", 2)} // 2MB limit for passport photo
              className="border border-gray-300 rounded-lg p-2 w-full"
              accept="image/*"
            />
            {formData.imageUrls.length > 0 && (
              <div className="mt-4 flex space-x-4">
                {formData.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Uploaded Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-full shadow-md"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Personal Information Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name (Mr/Ms/Mrs)
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Father's Name
            </label>
            <input
              type="text"
              id="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mother's Name
            </label>
            <input
              type="text"
              id="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sex (M/F)
            </label>
            <select
              id="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth (DD/MM/YY)
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              National ID No.
            </label>
            <input
              type="text"
              id="nationalId"
              value={formData.nationalId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Permanent Address
            </label>
            <input
              type="text"
              id="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Present Address
            </label>
            <input
              type="text"
              id="presentAddress"
              value={formData.presentAddress}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Village
            </label>
            <input
              type="text"
              id="village"
              value={formData.village}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Telephone/ Mobile
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Membership Type Selection */}
          <div>
            <label
              htmlFor="membership"
              className="block text-sm font-medium text-gray-700"
            >
              Membership Type
            </label>
            <select
              id="membership"
              value={formData.membership}
              onChange={(e) =>
                setFormData({ ...formData, membership: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <option value="General">General Member</option>
              <option value="Life">Life Member</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Educational Qualifications */}
          <div className="col-span-2">
            <h3 className="text-lg font-bold mt-4">
              Educational Qualifications
            </h3>
            <table className="w-full border mt-2">
              <thead>
                <tr>
                  <th>Degree/Diploma</th>
                  <th>Passing Year</th>
                  <th>Name of Board/Faculty</th>
                  <th>Registration No.</th>
                  <th>Name of School/Institute</th>
                  <th>Attach File</th>
                </tr>
              </thead>
              <tbody>
                {["ssc", "hsc", "diploma"].map((qualification) => (
                  <tr key={qualification}>
                    <td>{qualification.toUpperCase()}</td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={
                          formData.education[qualification].passingYear || ""
                        }
                        onChange={(e) =>
                          handleTableInputChange(
                            e,
                            "education",
                            "passingYear",
                            qualification
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={formData.education[qualification].board || ""}
                        onChange={(e) =>
                          handleTableInputChange(
                            e,
                            "education",
                            "board",
                            qualification
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={
                          formData.education[qualification].registrationNo || ""
                        }
                        onChange={(e) =>
                          handleTableInputChange(
                            e,
                            "education",
                            "registrationNo",
                            qualification
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={formData.education[qualification].school || ""}
                        onChange={(e) =>
                          handleTableInputChange(
                            e,
                            "education",
                            "school",
                            qualification
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleImageUpload(e, "education", qualification, 5)
                        } // Adjust size limit to 5MB
                        className="border border-gray-300 rounded-lg p-2"
                        accept="image/*"
                      />
                      {/* Image Preview */}
                      {formData.education[qualification].file && (
                        <div className="mt-4">
                          <img
                            src={formData.education[qualification].file}
                            alt={`Certificate Preview ${qualification}`}
                            className="w-full max-w-md h-auto object-cover rounded-lg shadow-md" // Adjust size for clearer view
                            style={{ width: "400px", height: "auto" }} // Larger width for bigger preview
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Professional Qualifications */}
          <div className="col-span-2">
            <h3 className="text-lg font-bold mt-4">
              Professional Qualifications
            </h3>
            <table className="w-full border mt-2">
              <thead>
                <tr>
                  <th>Degree/Exam</th>
                  <th>Name of University</th>
                  <th>Name of Institute</th>
                  <th>Year of Passing</th>
                  <th>Attach File</th>
                </tr>
              </thead>
              <tbody>
                {["bpt", "mpt", "others"].map((qualification) => (
                  <tr key={qualification}>
                    <td>{qualification.toUpperCase()}</td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={
                          formData.professional[qualification].university || ""
                        }
                        onChange={(e) =>
                          handleTableInputChange(
                            e,
                            "professional",
                            "university",
                            qualification
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={
                          formData.professional[qualification].institute || ""
                        }
                        onChange={(e) =>
                          handleTableInputChange(
                            e,
                            "professional",
                            "institute",
                            qualification
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={
                          formData.professional[qualification].passingYear || ""
                        }
                        onChange={(e) =>
                          handleTableInputChange(
                            e,
                            "professional",
                            "passingYear",
                            qualification
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleImageUpload(e, "professional", qualification, 5)
                        } // Adjust size limit to 5MB
                        className="border border-gray-300 rounded-lg p-2"
                        accept="image/*"
                      />
                      {/* Image Preview */}
                      {formData.professional[qualification].file && (
                        <div className="mt-4">
                          <img
                            src={formData.professional[qualification].file}
                            alt={`Professional Certificate Preview ${qualification}`}
                            className="w-full max-w-md h-auto object-cover rounded-lg shadow-md" // Adjust size for clearer view
                            style={{ width: "400px", height: "auto" }} // Larger width for bigger preview
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Other Membership Field */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Other Physiotherapy Organization Membership
            </label>
            <input
              type="text"
              id="otherMembership"
              value={formData.otherMembership}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please specify with membership number"
            />
          </div>

          {/* Additional Particulars */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Any other relevant particulars
            </label>
            <textarea
              id="additionalParticulars"
              value={formData.additionalParticulars}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Payment Details */}
          <div className="col-span-2">
            <h3 className="text-lg font-bold mt-4">Payment Details</h3>
            <label className="block text-sm font-medium text-gray-700">
              Amount (Taka/USD)
            </label>
            <input
              type="text"
              id="amount"
              value={formData.payment.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment: { ...formData.payment, amount: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Method
            </label>
            <input
              type="text"
              id="method"
              value={formData.payment.method}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment: { ...formData.payment, method: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
              D.D No / Transaction ID
            </label>
            <input
              type="text"
              id="ddNo"
              value={formData.payment.ddNo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment: { ...formData.payment, ddNo: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.payment.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment: { ...formData.payment, date: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Bank
            </label>
            <input
              type="text"
              id="bank"
              value={formData.payment.bank}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment: { ...formData.payment, bank: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Declaration */}
          <div className="col-span-2">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">
                I declare the above information is true, and I agree to the
                Constitution & laws of the Association.
              </span>
            </label>
          </div>

          {/* Signature Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Signature of the Applicant
            </label>
            <input
              type="file"
              id="signatureFile"
              onChange={(e) =>
                handleImageUpload(e, "signatureFile", "signatureFile", 1)
              } // 1MB limit for signature
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          {/* Sign up button */}
          <button
            type="submit"
            className="md:col-span-2 w-full mt-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
