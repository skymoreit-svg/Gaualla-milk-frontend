"use client";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    number: "01",
    question: "How is A2 desi cow milk special, compared to the milk we normally buy?",
    answer:
      "The milk from a desi cow contains A2 beta-casein. It is easily digested and gentler on the stomach compared to regular A1 milk from crossbred cows.",
  },
  {
    number: "02",
    question: "How fresh is the milk delivered by Gaualla?",
    answer:
      "You receive milk within 24 hours of milking, ensuring maximum freshness with no artificial additives or preservatives.",
  },
  {
    number: "03",
    question: "How can I get fresh dairy products delivered to my home?",
    answer:
      "Simply download the Gaualla mobile app, place your order, and enjoy doorstep delivery of pure dairy products.",
  },
  {
    number: "04",
    question: "Do you add preservatives or chemicals to the milk?",
    answer:
      "No, our milk is 100% natural and chemical-free. We never use preservatives, artificial flavors, or additives.",
  },
  {
    number: "05",
    question: "How should I store Gaualla milk at home?",
    answer:
      "Refrigerate immediately at 4–5°C and consume within 24–36 hours for best taste and freshness.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F3F1EC] py-16 lg:py-24">
      {/* Heading */}
      <div className="text-center mb-10 lg:mb-14 px-4 sm:px-6">
        <p className="text-lg md:text-xl text-gray-900 tracking-wide">
          Explore
        </p>
        <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl italic text-gray-900">
          Get to Know About Gaualla Milk
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-7xl flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
        {/* Image */}
        <div className="w-full md:w-2/5 lg:w-2/5">
          <img
            src="/img/fa1.webp"
            alt="Gaualla Milk"
            className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
          />
        </div>

        {/* FAQ */}
        <div className="w-full md:w-3/5 lg:w-3/5 space-y-4">
          {faqs.map((elm, index) => (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer px-6 py-4"
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-start">
                  <span className="font-bold text-gray-500 text-lg">
                    {elm.number}
                  </span>
                  <h6 className="text-lg md:text-xl font-medium text-gray-900">
                    {elm.question}
                  </h6>
                </div>

                <span
                  className={`text-gray-700 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed text-base">
                  {elm.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
