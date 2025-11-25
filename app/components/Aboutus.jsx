"use client";
import React from "react";
import { FaLeaf, FaFlask, FaRecycle, FaSeedling } from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf size={28} className="text-white" />,
    title: "Pure A2 Desi Cow Milk",
    description:
      "Wholesome, A2-certified milk sourced from indigenous cows raised ethically with love and care.",
  },
  {
    icon: <FaFlask size={28} className="text-white" />,
    title: "Chemical & Antibiotic Free",
    description:
      "No adulteration, no antibiotics—just 100% natural, healthy milk for your family’s well-being.",
  },
  {
    icon: <FaRecycle size={28} className="text-white" />,
    title: "Sustainable Farming Practices",
    description:
      "We use cow dung and urine for organic soil health and natural pest control, promoting sustainability.",
  },
  {
    icon: <FaSeedling size={28} className="text-white" />,
    title: "Tradition & Freshness Focused",
    description:
      "Daily milk sourced traditionally with care, maintaining freshness and quality from farm to home.",
  },
];

const AboutSection = () => {
  return (
    <section className="py-16 px-5 md:px-16 xl:px-32 bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 relative flex justify-center">
          {/* Main Image */}
          <div className="relative w-full overflow-hidden  group transition-all duration-500 lg:w-4/5">
            <img
              src="/img1.webp"
              alt="Analyst"
              className=" h-auto object-contain w-full"
            />
          </div>

          {/* Floating Image Box */}

        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Natural Taste From The <br />
            Gaualla Farm!
          </h2>
          <p className="text-gray-600 mb-8">
            Enjoy the authentic, creamy taste of A2 Desi Cow milk—pure, fresh,
            and naturally produced on our ethical Gaualla farms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="p-3 bg-[#63371f] rounded">{item.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;