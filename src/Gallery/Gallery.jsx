import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [eventName, setEventName] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle adding more images to the state
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (images.length === 0) {
      setError("Please select at least one image.");
      setLoading(false);
      return;
    }

    const imgBBApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const uploadedImages = [];

    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
          formData
        );
        uploadedImages.push({ imageUrl: response.data.data.url });
      }

      await axios.post("http://localhost:5000/events", {
        eventName,
        paragraph,
        images: uploadedImages,
      });

      Swal.fire({
        icon: "success",
        title: "Upload Successful!",
        text: `Event "${eventName}" has been uploaded with ${uploadedImages.length} images.`,
      });

      setEventName("");
      setParagraph("");
      setImages([]);
      fetchEvents(); 
    } catch (err) {
      setError("Error uploading images or saving event.");
      Swal.fire({
        icon: "error",
        title: "Upload Failed!",
        text: "There was an error uploading the images or saving the event.",
      });
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events");
      setEvents(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0", // Ensures the image is in the center without padding
  };

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Event Images</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="images">
            Add Event Images
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap">
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 overflow-hidden rounded-md">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="eventName">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            className="block w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="paragraph">
            Description
          </label>
          <textarea
            id="paragraph"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            required
            rows="4"
            className="block w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Event Gallery</h2>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="mb-8 p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{event.eventName}</h3>
              <p className="mb-4">{event.paragraph}</p>
              {event.images && event.images.length > 0 ? (
                <Slider {...sliderSettings}>
                  {event.images.map((img, index) => (
                    <div key={index} className="flex justify-center">
                      <img
                        src={img.imageUrl}
                        alt={`Event ${event._id} - Image ${index}`}
                        className="w-full max-h-[500px] object-contain mx-auto rounded-lg"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <p>No images available for this event.</p>
              )}
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
