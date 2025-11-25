

"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import { IoArrowBack } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
// import SuccessStoryAbove from "./SuccessStoryAbove";

export default function SuccessStory() {
  const prevRef = useRef(null); // Ref for the previous button
  const nextRef = useRef(null); // Ref for the next button

  const testimonials = [
    {
      heading: "Freshness you can taste in every sip!",
      rating: 5,
      desc: "I’ve tried many brands, but this milk truly reminds me of the freshness I enjoyed growing up in my village. Creamy, rich, and pure – my family loves it every morning.",
      img: "/admin.avif",
      name: "Ravi Kumar",
      position: "School Teacher",
    },
    {
      heading: "The best paneer I’ve ever had!",
      rating: 5,
      desc: "Soft, fresh, and absolutely delicious. The paneer doesn’t crumble like store-bought ones – it cooks perfectly and enhances the taste of every dish.",
      img: "/admin.avif",
      name: "Priya Mehta",
      position: "Nutritionist",
    },
    {
      heading: "Yogurt that feels homemade.",
      rating: 5,
      desc: "The curd is so thick and creamy that my kids finish it within minutes. It tastes just like the dahi my grandmother used to set at home. Truly authentic!",
      img: "/admin.avif",
      name: "Anjali Sharma",
      position: "Dairy Farm Manager",
    },
    {
      heading: "Perfect for health-conscious families!",
      rating: 4,
      desc: "Their ghee has an aroma that fills the whole kitchen. Knowing it’s pure and free from additives makes me confident I’m giving my family the best.",
      img: "/admin.avif",
      name: "Vishal Thakur",
      position: "Pastry Chef",
    },
    {
      heading: "Cheese that melts hearts.",
      rating: 5,
      desc: "The cheese is creamy, flavorful, and melts beautifully. My kids enjoy it on sandwiches, while I love adding it to homemade pasta. Absolutely premium quality!",
      img: "/admin.avif",
      name: "Arjun Verma",
      position: "Café Owner",
    },
  ];

  const [showDec, setShowDec] = useState(110);
  const [expan, setExpand] = useState(null);

  const setExpnadHandler = (id) => {
    setExpand((prev) => (prev == id ? null : id));
  };

  return (
    <div className="relative  mt-5 lg:mt-10 overflow-hidden  py-5 md:py-10 lg:py-16  bg-[url('/test-bg.webp')]  ">

      <img
        src="/test-bg.webp"
        alt="cleint-review "
        className="absolute left-0 top-0"
      />

      <div className="relative z-10  bg-cover  bg-center space-y-10 lg:space-y-16 text-black  ">
        <div className="px-5 md:px-16 xl:px-32 grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-y-0 gap-x-5 justify-center items-center">
          {/* Left Section */}
          <div className="col-span-1 space-y-5">

            <h3 className="text-xl mt-2 md:text-3xl xl:text-5xl font-bold">
              {/* What people say  <br /> about us */}
              What Our  Clients Say
            </h3>
            <p className="text-sm md:text-base text-justify">
              Real feedback from real users who have experienced the magic of traditional brass cooking in their modern kitchens, celebrating authentic flavors, healthier meals, and timeless craftsmanship.
            </p>
            <div className="relative space-x-2 flex justify-start">
              <button
                ref={prevRef}
                className="w-10 h-10 md:w-12 md:h-12 text-[#62371F] hover:bg-[#62371F] hover:text-white flex items-center justify-center text-lg md:text-2xl bg-white group rounded-full transition-all duration-500 ease-in-out"
              >
                <IoArrowBack className="group-hover:-translate-x-1 transition-all duration-100 ease-in-out" />
              </button>
              <button
                ref={nextRef}
                className="w-10 h-10 md:w-12 md:h-12 text-[#62371F] hover:bg-[#62371F] hover:text-white flex items-center justify-center text-lg md:text-2xl bg-white group rounded-full transition-all duration-500 ease-in-out"
              >
                <IoArrowForward className="group-hover:translate-x-1 transition-all duration-100 ease-in-out" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2">
            <Swiper
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 20 },
                1280: { slidesPerView: 2, spaceBetween: 25 },
              }}
            >
              {testimonials.map((member, index) => (
                <SwiperSlide key={index} className="pb-10 md:pb-0">
                  <div className="bg-white shadow-xl text-black h-max lg:h-[280px] border border-gray-200 rounded-xl p-6 transition-all  hover:border-gray-300">
                    <h5 className="font-bold text-xl md:text-2xl text-gray-800">
                      {member.heading}
                    </h5>

                    <div className="flex items-center gap-x-2 text-yellow-500 mb-2">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{member.desc}</p>

                    <hr className="border-gray-200 mb-4" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-3">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <h6 className="font-semibold text-gray-700">
                            {member.name}
                          </h6>
                          <p className="text-sm text-gray-500">
                            {member.position}
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {/* Any additional content can go here */}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
