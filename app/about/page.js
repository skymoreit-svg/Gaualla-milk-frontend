import React from 'react'
import Aboutus from '../components/Aboutus'


import { FaLeaf, FaFlask, FaRecycle, FaSeedling, FaAward, FaUsers, FaHeart } from "react-icons/fa";
import OtherBanner from '../components/OtherBanner';
import SuccessStory from '../components/Testmonails';

const features = [
  {
    icon: <FaLeaf size={28} className="text-green-500" />,
    title: "Certified A2 Milk",
    description: "This milk is certified A2 and is sourced exclusively from indigenous Indian cow breeds raised with ethical care.",
  },
  {
    icon: <FaFlask size={28} className="text-green-500" />,
    title: "Zero Chemicals, No Adulteration",
    description: "We strictly avoid synthetic antibiotics, hormones, and preservatives to give you only pure and natural nutrition.",
  },
  {
    icon: <FaRecycle size={28} className="text-green-500" />,
    title: "Sustainable & Ethical Farming",
    description: "Cow dung and urine naturally enrich the soil, ensuring chemical-free, fertile land where cows thrive.",
  },
  {
    icon: <FaSeedling size={28} className="text-green-500" />,
    title: "Tradition Meets Purity",
    description: "We blend time-honoured practices with modern cleanliness to deliver milk and ghee filled with natural goodness.",
  },
];


export default function page() {
  return (
    <>
      <OtherBanner text="About Us" />

      <Aboutus />

      <div className="pb-16 px-5 md:px-16 xl:px-32 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Commitment to Quality
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SuccessStory />
    </>
  )
}
