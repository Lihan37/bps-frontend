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
    imageUrls: [],
    education: {
      ssc: {
        passingYear: "",
        board: "",
        registrationNo: "",
        school: "",
        file: null,
      },
      hsc: {
        passingYear: "",
        board: "",
        registrationNo: "",
        school: "",
        file: null,
      },
      diploma: {
        passingYear: "",
        board: "",
        registrationNo: "",
        school: "",
        file: null,
      },
    },
    professional: {
      bpt: { university: "", institute: "", passingYear: "", file: null },
      mpt: { university: "", institute: "", passingYear: "", file: null },
      others: { university: "", institute: "", passingYear: "", file: null },
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
    signatureFile: null, // For signature of applicant
  });

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

  const handleFileChange = (e, section, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: { ...formData[section][field], file },
        },
      });
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];

    for (let file of files) {
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
          imageUrls.push(response.data.data.display_url);
        } else {
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to upload image.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }

    setFormData((prevData) => ({ ...prevData, imageUrls }));
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
      if (!formData.email || !formData.password) {
        throw new Error("Email and password must be provided.");
      }

      // Function to upload files (PDFs)
      const uploadFiles = async (file) => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await axios.post(
          "http://localhost:5000/upload-pdf", // Adjust this URL if needed
          uploadFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        return response.data.filePath; // The file path on the server
      };

      // Upload PDFs for education fields
      for (const key of ["ssc", "hsc", "diploma"]) {
        if (formData.education[key].file) {
          const filePath = await uploadFiles(formData.education[key].file);
          formData.education[key].file = filePath; // Update with the file path
        }
      }

      // Upload PDFs for professional fields
      for (const key of ["bpt", "mpt", "others"]) {
        if (formData.professional[key].file) {
          const filePath = await uploadFiles(formData.professional[key].file);
          formData.professional[key].file = filePath; // Update with the file path
        }
      }

      // Upload signature if available
      if (formData.signatureFile) {
        const signaturePath = await uploadFiles(formData.signatureFile);
        formData.signatureFile = signaturePath;
      }

      // Image upload if there are any images
      if (formData.imageUrls.length > 0) {
        const uploadImages = async () => {
          const imageUrls = [];
          for (let image of formData.imageUrls) {
            const uploadFormData = new FormData();
            uploadFormData.append("image", image);

            const response = await axios.post(
              `https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_IMGBB_API_KEY
              }`,
              uploadFormData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );

            if (response.data.success) {
              imageUrls.push(response.data.data.display_url);
            } else {
              throw new Error("Failed to upload images.");
            }
          }
          return imageUrls;
        };

        formData.imageUrls = await uploadImages();
      }

      // Create user and save form data to the database
      const userCredential = await createUser(
        formData.email,
        formData.password
      );
      formData.userId = userCredential.user.uid;

      // Post form data to the backend
      const response = await axios.post(
        "http://localhost:5000/members",
        formData
      );

      // Show success message and navigate
      Swal.fire({
        title: "Success!",
        text: "Account created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); // Navigate to home or any other page after success
      });
    } catch (error) {
      // Error handling for form submission
      console.error("Error during form submission:", error); // Logging error
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
              Upload Passport Size Photo (2 copies)
            </label>
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageUpload}
              multiple
              className="border border-gray-300 rounded-lg p-2 w-full"
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

          {/* Education and Professional Qualification Tables */}
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
                  <th>Registration no</th>
                  <th>Name of school/College/institute</th>
                  <th>Attach File</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(formData.education).map((qualification) => (
                  <tr key={qualification}>
                    <td>{qualification.toUpperCase()}</td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={formData.education[qualification].passingYear}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            education: {
                              ...formData.education,
                              [qualification]: {
                                ...formData.education[qualification],
                                passingYear: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={formData.education[qualification].board}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            education: {
                              ...formData.education,
                              [qualification]: {
                                ...formData.education[qualification],
                                board: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={formData.education[qualification].registrationNo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            education: {
                              ...formData.education,
                              [qualification]: {
                                ...formData.education[qualification],
                                registrationNo: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={formData.education[qualification].school}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            education: {
                              ...formData.education,
                              [qualification]: {
                                ...formData.education[qualification],
                                school: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, "education", qualification)
                        }
                        className="border border-gray-300 rounded-lg p-2"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="text-lg font-bold mt-4">
              Professional Qualifications
            </h3>
            <table className="w-full border mt-2">
              <thead>
                <tr>
                  <th>Degree/Exam</th>
                  <th>Name of university</th>
                  <th>Name of institute</th>
                  <th>Year of passing</th>
                  <th>Attach File</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(formData.professional).map((qualification) => (
                  <tr key={qualification}>
                    <td>{qualification.toUpperCase()}</td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={formData.professional[qualification].university}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            professional: {
                              ...formData.professional,
                              [qualification]: {
                                ...formData.professional[qualification],
                                university: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={formData.professional[qualification].institute}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            professional: {
                              ...formData.professional,
                              [qualification]: {
                                ...formData.professional[qualification],
                                institute: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border"
                        value={formData.professional[qualification].passingYear}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            professional: {
                              ...formData.professional,
                              [qualification]: {
                                ...formData.professional[qualification],
                                passingYear: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, "professional", qualification)
                        }
                        className="border border-gray-300 rounded-lg p-2"
                      />
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
              D.D No / Cash Receipt
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
                setFormData({ ...formData, signatureFile: e.target.files[0] })
              }
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
