"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { baseurl, imageurl } from "./utlis/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";

import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import LogoLoader from "./LogoLoader";

export default function CategoriesGrid() {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/category`);
      const data = response.data;
      if (data.success) {
        setCategoryData(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  if (loading) return (
    <section className="py-10 sm:py-10 md:py -12 lg:py-14 bg-[var(--background)]">
      <LogoLoader text="Discovering Purity..." />
    </section>
  );

  return (
    <section className="py-10 sm:py-10 md:py -12 lg:py-14 bg-[var(--background)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-8 w-full overflow-hidden py-2">
          <img
            src="/design_cat.png"
            alt="decorative design left"
            className="w-full md:w-56 lg:w-72 object-contain shrink-0"
          />
          <h2 className="luxury-title-main text-3xl sm:text-4xl lg:text-5xl text-center tracking-wide whitespace-nowrap shrink-0">
            Categories
          </h2>
          <img
            src="/design_cat.png"
            alt="decorative design right"
            className="w-full md:w-56 lg:w-72 object-contain shrink-0 scale-x-[-1]"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:justify-center gap-3 sm:gap-4 md:gap-6 justify-items-center">
          {categoryData.map((item, index) => (
            <Link
              key={index}
              href={`/product?name=${item.name}`}
              className="flex flex-col items-center group/card w-full max-w-[12rem] lg:w-auto"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="relative w-full aspect-[3/4] lg:w-40 lg:h-52 bg-[#62371F] p-3 shadow-md group-hover/card:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center group-hover/card:scale-105"
              >
                {/* Sawtooth Inner Container */}
                <div className="absolute inset-2.5 bg-white flex flex-col items-center justify-center p-2 shadow-inner">
                  {/* Top Sawtooth Edge */}
                  <div 
                    className="absolute -top-2 left-0 right-0 h-2 bg-repeat-x z-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpolygon points='0,8 6,0 12,8' fill='%23ffffff'/%3E%3C/svg%3E")`
                    }}
                  />
                  {/* Bottom Sawtooth Edge */}
                  <div 
                    className="absolute -bottom-2 left-0 right-0 h-2 bg-repeat-x z-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpolygon points='0,0 6,8 12,0' fill='%23ffffff'/%3E%3C/svg%3E")`
                    }}
                  />
                  {/* Left Sawtooth Edge */}
                  <div 
                    className="absolute top-0 -left-2 bottom-0 w-2 bg-repeat-y z-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'%3E%3Cpolygon points='8,0 0,6 8,12' fill='%23ffffff'/%3E%3C/svg%3E")`
                    }}
                  />
                  {/* Right Sawtooth Edge */}
                  <div 
                    className="absolute top-0 -right-2 bottom-0 w-2 bg-repeat-y z-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'%3E%3Cpolygon points='0,0 8,6 0,12' fill='%23ffffff'/%3E%3C/svg%3E")`
                    }}
                  />

                  {/* Image Container */}
                  <div className="relative w-full h-3/4 mb-4">
                    <Image
                      src={`${imageurl}/${item.image}`}
                      alt={item.name}
                      fill
                      className="object-contain p-1 transition-transform duration-700 group-hover/card:scale-110"
                    />
                  </div>

                  {/* Category Name Inside Box */}
                  <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 z-20 flex justify-center px-2">
                    <h5 className="text-[10px] sm:text-xs lg:text-sm font-bold text-text uppercase tracking-widest group-hover/card:text-[var(--primary)] transition-colors text-center bg-white/95 backdrop-blur-sm px-2.5 sm:px-3.5 py-1 rounded-full shadow max-w-full truncate border border-gray-100">
                      {item.name}
                    </h5>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
