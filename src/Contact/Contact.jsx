import React, { useState } from "react";

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
    // Here you can handle form submission, such as sending the data to an API or email service
    console.log("Form submitted with data:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="mt-5">
      <h2 className="bg-[#0A6F8F] p-8 text-center font-bold text-5xl text-white max-w-screen-2xl mx-auto rounded-md">
        Contact And Feedback
      </h2>
      <div className="max-w-screen-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <div className="mt-8">
          <p className="text-xl text-center text-gray-800 mb-4">
            Feel free to reach out to us through any of the following methods:
          </p>
          <div className="flex justify-around items-center mb-8">
            <div className="text-center group">
              <p className="text-2xl font-bold text-gray-800 mb-2">Email Us</p>
              <p className="text-lg text-blue-500 group-hover:underline transition duration-300 ease-in-out transform group-hover:scale-110">
                <a href="mailto:info@example.com">info@example.com</a>
              </p>
            </div>
            <div className="text-center group">
              <p className="text-2xl font-bold text-gray-800 mb-2">Call Us</p>
              <p className="text-lg text-blue-500 group-hover:underline transition duration-300 ease-in-out transform group-hover:scale-110">
                <a href="tel:+1234567890">+1 234 567 890</a>
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
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0A6F8F] focus:border-[#0A6F8F] sm:text-sm"
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
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0A6F8F] focus:border-[#0A6F8F] sm:text-sm"
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
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0A6F8F] focus:border-[#0A6F8F] sm:text-sm"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-[#0A6F8F] text-white font-bold text-lg rounded-md shadow-md hover:bg-[#075a73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A6F8F]"
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
