"use client";
import React from "react";
import { FaLongArrowAltRight, FaLeaf, FaHeart, FaShieldAlt, FaSeedling, FaMapMarkerAlt, FaFirstAid } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function OfferProductValid() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-05-01T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Fresh & Pure, Just Like It Should Be",
      description: "The Gaualla milk is provided by desi cows raised in spacious areas. We pledge to deliver fresh milk every single day, which is not processed and contains complete natural goodness.",
      icon: <FaLeaf className="text-2xl text-green-600" />,
      color: "bg-green-50"
    },
    {
      title: "No Preservatives. No Compromise",
      description: "We never include chemicals or artificial preservatives in our milk or A2 ghee. What you receive is pure milk that is as close to nature as it gets.",
      icon: <FaHeart className="text-2xl text-red-500" />,
      color: "bg-red-50"
    },
    {
      title: "From Cow to Kitchen—With Complete Trust",
      description: "We believe in transparency and honesty. Gaualla feels that everyone should be able to trace their milk, and we guarantee that.",
      icon: <FaShieldAlt className="text-2xl text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "Packed with Strength & Nourishment",
      description: "A2 milk from Gaualla boosts your body's growth, strength, and vitality because it is packed with important nutrients.",
      icon: <FaSeedling className="text-2xl text-amber-600" />,
      color: "bg-amber-50"
    },
    {
      title: "Grown Local. Trusted More",
      description: "We offer our support to Indian farmers by sourcing the milk locally from them to give you purified milk.",
      icon: <FaMapMarkerAlt className="text-2xl text-purple-500" />,
      color: "bg-purple-50"
    },
    {
      title: "Immunity-Boosting Goodness",
      description: "Gaualla milk contains vitamins and minerals, it supports your family's health and keeps their immune defences strong.",
      icon: <FaFirstAid className="text-2xl text-teal-500" />,
      color: "bg-teal-50"
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-100 opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-100 opacity-30"></div>

      <div className="container mx-auto px-0 py-12 lg:py-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Image with offer badge */}
            <div className="relative lg:w-2/5 p-8 lg:p-12 bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/img2.webp"
                    alt="A2 Desi Cow Milk"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Offer badge */}
                <div className="absolute -top-4 -right-4 w-18 lg:w-28 h-18 lg:h-28  bg-red-500 text-white rounded-full flex flex-col items-center justify-center shadow-lg z-20">
                  <span className="text-xs font-semibold">OFFER</span>
                  <span className="text-xl font-bold">20%</span>
                  <span className="text-xs">OFF</span>
                </div>

                {/* Countdown timer */}
                <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">Offer Ends In:</h3>
                  <div className="flex justify-between">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="flex flex-col items-center">
                        <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-lg">
                          <span className="text-xl font-bold text-green-800">{value}</span>
                        </div>
                        <span className="text-xs mt-2 text-gray-600 capitalize">{unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:w-3/5 p-5 lg:p-12">
              {/* Tagline */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="rounded-full h-2 w-2 bg-green-600"></div>
                  ))}
                </div>
                <span className="text-green-700 font-medium text-sm uppercase tracking-wider">
                  The Soul of Desi Cow Milk - Gaualla
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Hamara A2 desi cow milk <br />
                <span className="text-green-700">Shuddh Bharatiya Parampara</span>
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Hamara A2 desi cow milk shuddh Bharatiya gaayon se prapt hota
                hai—yeh sirf ek drink nahi, ek parampara hai. Poshan se bharpoor,
                prakritik kheti se utpaadit, aur har boond mein shuddhata aur
                swasthya ka vaada chhupa hai.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className={`p-4 rounded-xl ${feature.color} border border-transparent hover:border-green-200 transition-all duration-300`}>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="group flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Order Now
                  <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <div className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free delivery on orders above ₹499
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}