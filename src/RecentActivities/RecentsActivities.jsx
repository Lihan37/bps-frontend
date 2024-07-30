import React from "react";
import placeholderImage1 from "../assets/image 8.png";
import placeholderImage2 from "../assets/image 12.png";

const RecentsActivities = () => {
  return (
    <div className="mt-10 lg:mt-16  px-4 lg:px-0">
      <div className="text-center mb-5">
        <button className="bg-[#0A6F8F] py-4 px-7 text-white font-semibold rounded-full">
          Recent Activities
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-7">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col md:flex-row gap-4">
            <img
              src={placeholderImage1}
              alt="Meeting"
              className="w-full md:w-1/4 object-cover rounded"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="font-bold text-xl mb-2">
                  Bunch of People Meeting
                </h1>
                <p className="text-gray-700">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-5 p-4 flex flex-col md:flex-row gap-4">
            <img
              src={placeholderImage1}
              alt="Meeting"
              className="w-full md:w-1/4 object-cover rounded"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="font-bold text-xl mb-2">
                  Bunch of People Meeting
                </h1>
                <p className="text-gray-700">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
            <button className="bg-[#FF005C] bg-opacity-88 py-2 px-7 text-white font-semibold rounded-full mb-4">
              Videos
            </button>
            <div className="text-center mb-4">
              <img
                src={placeholderImage2}
                alt="Video tutorial"
                className="w-full h-auto rounded"
              />
              <h2 className="font-bold text-xl mt-4">
                Video tutorial - BPS 2024
              </h2>
            </div>
            <button className="bg-[#FF005C] bg-opacity-88 py-2 px-7 text-white font-semibold rounded-full">
              Watch All The Videos Here
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-[#0A6F8F] py-4 px-7 mt-5 text-white font-semibold rounded-full">
          View All News
        </button>
      </div>
    </div>
  );
};

export default RecentsActivities;
