import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // Importing icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-center font-bold text-4xl sm:text-5xl text-white max-w-screen-2xl mx-auto rounded-md shadow-lg">
        Contact & Feedback
      </h2>
      <div className="max-w-screen-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <div className="mt-8">
          <p className="text-xl text-center text-gray-800 mb-8">
            Feel free to reach out to us through any of the following methods:
          </p>
          <div className="flex flex-col sm:flex-row justify-around items-center mb-10 space-y-6 sm:space-y-0">
            {/* Contact Method: Email */}
            <div className="flex flex-col items-center text-center group transition transform duration-300 hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FaEnvelope className="text-3xl text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">Email Us</p>
              <p className="text-lg text-blue-500 group-hover:underline">
                <a href="mailto:bpsinfo.24@gmail.com">bpsinfo.24@gmail.com</a>
              </p>
            </div>
            {/* Contact Method: Phone */}
            <div className="flex flex-col items-center text-center group transition transform duration-300 hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FaPhoneAlt className="text-3xl text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">Call Us</p>
              <p className="text-lg text-blue-500 group-hover:underline">
                <a href="tel:+8801310099580">+8801310099580</a>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm transition ease-in-out duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm transition ease-in-out duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm transition ease-in-out duration-200"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
