"use client";
import React from "react";
import { FaLongArrowAltRight, FaLeaf, FaHeart, FaShieldAlt, FaSeedling, FaMapMarkerAlt, FaFirstAid } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function OfferProductValid() {
  const [currentOffer, setCurrentOffer] = useState(null);
  const [loadingOffer, setLoadingOffer] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Fetch active offers from API
  const fetchActiveOffer = async () => {
    try {
      setLoadingOffer(true);
      const apiUrl = process.env.NEXT_PUBLIC_OFFERS_API_URL || 
        "https://api.gauallamilk.com/admin/offers";
        // "http://localhost:8000/admin/offers";
      const { data } = await axios.get(`${apiUrl}?limit=1&offset=0&status=active`, {
        withCredentials: true,
      });

      if (data.success && data.data && data.data.length > 0) {
        setCurrentOffer(data.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch offer:", error);
      // Fallback to default offer if API fails
      setCurrentOffer({
        offer_title: "Summer Sale",
        offer_percent: 20,
        end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    } finally {
      setLoadingOffer(false);
    }
  };

  const calculateTimeLeft = () => {
    if (!currentOffer?.end_time) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const targetDate = new Date(currentOffer.end_time);
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

  // Fetch offer on mount
  useEffect(() => {
    fetchActiveOffer();
  }, []);

  // Update timer every second
  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentOffer]);

  const features = [
    {
      title: "Fresh & Pure, Just Like It Should Be",
      description: "The Gaualla milk is provided by desi cows raised in spacious areas. We pledge to deliver fresh milk every single day, which is not processed and contains complete natural goodness.",
      icon: <FaLeaf className="text-lg md:text-3xl text-[var(--primary)]" />,
      color: "bg-white/80",
      isDark: false
    },
    {
      title: "No Preservatives. No Compromise",
      description: "We never include chemicals or artificial preservatives in our milk or A2 ghee. What you receive is pure milk that is as close to nature as it gets.",
      icon: <FaHeart className="text-lg md:text-3xl text-white" />,
      color: "bg-primary",
      isDark: true
    },
    {
      title: "From Cow to Kitchen—With Complete Trust",
      description: "We believe in transparency and honesty. Gaualla feels that everyone should be able to trace their milk, and we guarantee that.",
      icon: <FaShieldAlt className="text-lg md:text-3xl text-[var(--primary)]" />,
      color: "bg-white/80",
      isDark: false
    },
    {
      title: "Packed with Strength & Nourishment",
      description: "A2 milk from Gaualla boosts your body's growth, strength, and vitality because it is packed with important nutrients.",
      icon: <FaSeedling className="text-lg md:text-3xl text-white" />,
      color: "bg-primary",
      isDark: true
    },
    {
      title: "Grown Local. Trusted More",
      description: "We offer our support to Indian farmers by sourcing the milk locally from them to give you purified milk.",
      icon: <FaMapMarkerAlt className="text-lg md:text-3xl text-[var(--primary)]" />,
      color: "bg-white/80",
      isDark: false
    },
    {
      title: "Immunity-Boosting Goodness",
      description: "Gaualla milk contains vitamins and minerals, it supports your family's health and keeps their immune defences strong.",
      icon: <FaFirstAid className="text-lg md:text-3xl text-white" />,
      color: "bg-primary",
      isDark: true
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--primary)]/10 opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-100 opacity-30"></div>

      <div className="container mx-auto px-0 py-12 lg:py-16">
        <div className="bg-background rounded-3xl shadow-xl overflow-hidden border border-[var(--primary)]/10">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Image with offer badge */}
            <div className="relative lg:w-2/5 p-8 lg:p-16 bg-gradient-to-br from-[var(--background)] to-amber-50 flex items-center justify-center">
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
                {currentOffer && (
                  <div className="absolute -top-4 -right-4 w-18 lg:w-28 h-18 lg:h-28 bg-red-500 text-white rounded-full flex flex-col items-center justify-center shadow-lg z-20">
                    <span className="text-xs font-semibold">OFFER</span>
                    <span className="text-xl font-bold">{currentOffer.offer_percent || 20}%</span>
                    <span className="text-xs">OFF</span>
                  </div>
                )}

                {/* Countdown timer */}
                {loadingOffer ? (
                  <div className="mt-8 bg-background rounded-2xl p-6 shadow-lg text-center">
                    <div className="animate-pulse">
                      <div className="h-6 bg-background00 rounded mb-4"></div>
                      <div className="flex justify-between gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="flex-1 h-14 bg-background00 rounded-lg"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : currentOffer ? (
                  <div className="mt-8 bg-background rounded-2xl p-6 shadow-lg">
                    <h3 className="text-center text-lg font-semibold text-text mb-4">Offer Ends In:</h3>
                    <div className="flex justify-between">
                      {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="flex flex-col items-center">
                          <div className="w-14 h-14 flex items-center justify-center bg-[var(--background)] rounded-lg">
                            <span className="text-xl font-bold text-[var(--primary)]">{value}</span>
                          </div>
                          <span className="text-xs mt-2 text-text capitalize">{unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:w-3/5 p-5 lg:p-16">
              {/* Tagline */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="rounded-full h-2 w-2 bg-[var(--primary)]"></div>
                  ))}
                </div>
                <span className="text-[var(--primary)] font-bold text-sm uppercase tracking-wider">
                  The Soul of Desi Cow Milk - Gaualla
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text mb-6 leading-tight">
                Hamara A2 desi cow milk <br />
                <span className="text-[var(--primary)]">Shuddh Bharatiya Parampara</span>
              </h1>

              {/* Description */}
              {/* <p className="text-text text-lg mb-8 leading-relaxed">
                Hamara A2 desi cow milk shuddh Bharatiya gaayon se prapt hota
                hai—yeh sirf ek drink nahi, ek parampara hai. Poshan se bharpoor,
                prakritik kheti se utpaadit, aur har boond mein shuddhata aur
                swasthya ka vaada chhupa hai.
              </p> */}

              {/* Features grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 mb-10">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`p-2.5 md:p-6 rounded-xl md:rounded-2xl ${feature.color} border border-transparent transition-all duration-300 flex items-center md:flex-col md:justify-center md:text-center md:gap-3 gap-2 ${
                      feature.isDark 
                        ? "hover:border-white/30" 
                        : "hover:border-[var(--primary)]/20"
                    }`}
                  >
                    <div className={`p-1.5 md:p-3 rounded-lg shadow-sm shrink-0 ${
                      feature.isDark ? "bg-white/20" : "bg-background"
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`font-oswald uppercase tracking-wider text-[10px] sm:text-xs md:text-base font-bold leading-tight ${
                        feature.isDark ? "text-white" : "text-text"
                      }`}>{feature.title}</h3>
                      {/* <p className={`text-sm ${
                        feature.isDark ? "text-amber-50/90" : "text-text/90"
                      }`}>{feature.description}</p> */}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/product?name=all"
                  className="group flex items-center gap-3 bg-[var(--primary)] hover:bg-[#4a2917] text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-fit"
                >
                  Order Now
                  <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <div className="flex items-center text-sm text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-1" viewBox="0 0 20 20" fill="currentColor">
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
