"use client"
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    number: "01",
    question: "How is A2 desi cow milk special, compared to the milk we normally buy?",
    answer:
      "The milk from a desi cow contains A2 beta-casein. It is easily digested and less caustic on the stomach than regular A1 milk made by crossbred cows.",
  },
  {
    number: "02",
    question: "How fresh is the milk delivered by Gaualla?",
    answer:
      "When you buy premium quality fresh cow milk from us–you can expect maximum freshness as you get it within 24 hours of milking. So it’s still as refreshed as it can be with no artificial additives or preservatives.",
  },
  {
    number: "03",
    question: "How can I get fresh dairy products delivered to my home?",
    answer:
      "If you want to buy our products, just download our Gaualla mobile app. Within just a few taps, you get your pure dairy product.",
  },
  {
    number: "04",
    question: "Do you add preservatives or chemicals to the milk?",
    answer:
      "No, our milk is 100% natural and chemical-free. We do not use preservatives, artificial flavors, or additives. You get pure, farm-fresh milk directly from healthy cows.",
  },
  {
    number: "05",
    question: "How should I store Gaualla milk at home?",
    answer:
      "Our milk should be refrigerated immediately after delivery. Keep it at 4–5°C and consume within 24–36 hours for the best taste and freshness.",
  }
]



export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#F3F1EC] pb-6  lg:pb-20 pt-20">
      <div className="text-center mb-8 px-6">
        <p className="text-lg md:text-xl text-gray-800">Explore</p>
        <h2 className="text-2xl mt-4 md:text-3xl lg:text-4xl italic text-gray-900">
          Get to Know About Gaualla Milk
        </h2>
      </div>

      <div className="container mx-auto px-5 md:px-12 xl:px-32 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src="/img/fa1.webp"
            alt="brass"
            className="w-full h-auto object-cover  shadow-md"
          />
        </div>

        {/* FAQ Section */}
        <div className="w-full md:w-2/3">
          {faqs.map((elm, index) => (
            <ul
              key={index}
              onClick={() => toggleFAQ(index)}
              className="border-b cursor-pointer"
            >
              <div className="flex justify-between items-center text-lg md:text-xl py-4">
                <div className="flex text-xl items-start md:items-center space-x-3">
                  <span className="font-bold text-gray-700">{elm.number}</span>
                  <h6 className="font-medium  text-gray-900">{elm.question}</h6>
                </div>
                <span className="duration-200 transition-all text-gray-700">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>

              {/* Answer Section */}
              <div
                className={`transition-all duration-300 overflow-hidden ${openIndex === index
                  ? "max-h-[300px] opacity-100 py-2"
                  : "max-h-0 opacity-0"
                  }`}
              >
                <p className="text-gray-600 text-justify text-base">{elm.answer}</p>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
