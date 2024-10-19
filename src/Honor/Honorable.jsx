import React, { useState } from "react";
import placeholderImage from "../assets/Picture1.jpg";
import placeholderImage2 from "../assets/Picture2.jpg";

const Honorable = () => {
  const [showFullTextSecretary, setShowFullTextSecretary] = useState(false);

  const handleToggleSecretaryView = () => {
    setShowFullTextSecretary(!showFullTextSecretary);
  };

  const truncatedSecretaryText = ` Message from General Secretary,
  
  Dear Colleagues,

    Physiotherapy is an evolving field of Healthcare System. It requires both deep theoretical knowledge and interventional skills in order to practice Physiotherapy.
    
    This society has been established for practicing physiotherapists with an interest to upgrade their expertise in the Physiotherapy profession. 
    
    The objective of Bangladesh Physiotherapy Society is to...  `;

  const fullSecretaryText = `Message from General Secretary,
  
  Dear Colleagues,

    Physiotherapy is an evolving field of Healthcare System. It requires both deep theoretical knowledge and interventional skills in order to practice Physiotherapy.
    This society has been established for practicing physiotherapists with an interest to upgrade their expertise in the Physiotherapy profession.

    The objective of Bangladesh Physiotherapy Society is to institutionalize & spread the research, and treatment of physiotherapy in Bangladesh.

    Bangladesh Physiotherapy Society (BPS) facilitates the provision of equitable high-quality healthcare to physiotherapy patients in Bangladesh through world-class excellence in education, academic activities, research, and advocacy.

    I would like to welcome you to our website and hope for BPS success with your cordial participation.

    Thank you all.

    Dr. Md. Mizanur Rahman`;

  return (
    <div
      className="bg-white mt-14 p-10 rounded-lg shadow-xl"
      style={{ boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)" }}
    >
      <h2 className="text-2xl font-bold mb-4">Honorable</h2>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
              <div
                className="h-2 sm:h-48 w-full sm:w-2 rounded-full mb-4 sm:mb-0 sm:mr-4"
                style={{
                  background:
                    "linear-gradient(to bottom, #BCFFFB 0%, #65EFE7 100%)",
                }}
              ></div>
              <img
                src={placeholderImage}
                alt="Honorable Member"
                className="w-48 h-48 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold">Dr. Md. Towhiduzzaman</h3>
                <p className="text-gray-600">President</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 text-left whitespace-pre-line">
              Message from President,
              <br />
              <br />
              Bangladesh Physiotherapy Society (BPS).
              <br />
              <br />
              I am delighted to extend my warm felicitation to all Members of Bangladesh Physiotherapy Society (BPS). BPS is the only Joint Stock registered professional organization of Physiotherapy in the country with a mission to work for the welfare of the physiotherapy community as well as for the development of the Physiotherapy profession in the country. This is the forum where the Physiotherapists of the country work together to achieve its goal. I hope that the newly launched website will add momentum to the activity of the Society.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
              <div
                className="h-2 sm:h-48 w-full sm:w-2 rounded-full mb-4 sm:mb-0 sm:mr-4"
                style={{
                  background:
                    "linear-gradient(to bottom, #BCFFFB 0%, #65EFE7 100%)",
                }}
              ></div>
              <img
                src={placeholderImage2}
                alt="Honorable Member"
                className="w-48 h-48 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold">Dr. Md Mizanur Rahman</h3>
                <p className="text-gray-600">General Secretary</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 text-left whitespace-pre-line">
              {showFullTextSecretary
                ? fullSecretaryText
                : truncatedSecretaryText}
            </p>
            <button
              onClick={handleToggleSecretaryView}
              className="text-blue-500 underline text-sm"
            >
              {showFullTextSecretary ? "View Less" : "View More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Honorable;
