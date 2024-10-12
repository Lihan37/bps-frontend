import React from "react";
import { motion } from "framer-motion";
import "./Mission.css"; // Import the CSS file for balloon animation

const Mission = () => {
  return (
    <div className="p-6 max-w-screen-2xl mx-auto relative">
      <h2 className="text-4xl font-bold mb-8 text-center text-white bg-gradient-to-r from-blue-500 to-teal-400 p-6 rounded-lg shadow-lg">
        Mission & Vision
      </h2>

      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 relative overflow-hidden">
        {/* Balloons Background Animation inside the text container */}
        <div className="balloon-container">
          <div className="balloon balloon1"></div>
          <div className="balloon balloon2"></div>
          <div className="balloon balloon3"></div>
          <div className="balloon balloon4"></div>
        </div>

        <motion.div
          className="space-y-6 text-gray-700 italic relative z-10" // Italic text with balloons behind
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        >
          <p className="leading-relaxed">
            <strong>A)</strong> To protect the dignity, welfare, and development
            of all those engaged in physiotherapy-related activities in
            accordance with the provisions of the Constitution of the People's
            Republic of Bangladesh or accordingly.
          </p>

          <p className="leading-relaxed">
            <strong>B)</strong> To inform and transfer scientific success,
            development, and progress in all branches of physiotherapy including
            modern technology for the welfare and development of
            physiotherapists and patients. Adopting environmentally friendly
            activities based on modern information and technology in
            physiotherapy.
          </p>

          <p className="leading-relaxed">
            <strong>C)</strong> Providing services for the overall development
            of the country including physiotherapy education, research,
            training, and extension. To establish physiotherapy education,
            training, and research institutes/colleges and grant certificates as
            per conditions and regulations.
          </p>

          <p className="leading-relaxed">
            <strong>D)</strong> To protect and promote the rights and privileges
            of members under a genuine democratic society and to encourage the
            members to fulfill their responsibilities for national, social,
            personal, moral, and professional development.
          </p>

          <p className="leading-relaxed">
            <strong>E)</strong> To promote cooperation and solidarity among the
            members, uphold the standards and dignity of the profession, and
            encourage adherence to professional norms in conduct and social
            activities.
          </p>

          <p className="leading-relaxed">
            <strong>F)</strong> Organizing seminars, lectures, conferences,
            workshops; Publishing periodicals, journals, and books of BPS to
            help members acquire scientific knowledge and professional skills.
          </p>

          <p className="leading-relaxed">
            <strong>G)</strong> To play a role in improving the quality of life
            of physiotherapists and to assist the Government in similar
            programs.
          </p>

          <p className="leading-relaxed">
            <strong>H)</strong> Taking initiatives for the development of
            physiotherapy, solving physiotherapists' problems, and providing
            recommendations to the Government.
          </p>

          <p className="leading-relaxed">
            <strong>I)</strong> Developing inter-relationships with public and
            private organizations related to physiotherapy and advising on all
            professional matters.
          </p>

          <p className="leading-relaxed">
            <strong>J)</strong> Strengthening cooperation and understanding with
            other organizations for mutual benefit.
          </p>

          <p className="leading-relaxed">
            <strong>K)</strong> Volunteering in national emergencies due to
            natural calamities.
          </p>

          <p className="leading-relaxed">
            <strong>L)</strong> Providing emergency services to physiotherapists
            and their families in times of distress and raising welfare funds
            for this purpose.
          </p>

          <p className="leading-relaxed">
            <strong>M)</strong> Cooperating with universities and institutes
            related to physiotherapy for mutual welfare and the common interest
            of BPS members.
          </p>

          <p className="leading-relaxed">
            <strong>N)</strong> Providing scholarships to meritorious children
            of physiotherapists and giving awards to contributors in the field
            of physiotherapy.
          </p>

          <p className="leading-relaxed">
            <strong>O)</strong> To perform all other functions relevant to the
            aims and objectives of BPS.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Mission;
