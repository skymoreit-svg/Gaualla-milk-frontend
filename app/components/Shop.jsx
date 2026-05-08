"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { baseurl, imageurl } from "./utlis/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";Order Summary

import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function CategoriesGrid() {
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${baseurl}/category`);
      const data = response.data;
      if (data.success) {
        setCategoryData(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#fdfaf7] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-12 h-px bg-[#62371f]"></span>
            <span className="text-[#62371f] text-xs font-bold uppercase tracking-[0.3em]">Pure Collection</span>
            <span className="w-12 h-px bg-[#62371f]"></span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 font-serif">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm font-medium leading-relaxed">
            From farm-fresh A2 milk to traditionally churned ghee, discover the essence of purity in every category.
          </p>
        </div>

        {/* Categories Swiper */}
        <div className="relative group/swiper">
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            loop={categoryData.length > 6}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 6, spaceBetween: 40 },
              1280: { slidesPerView: 7, spaceBetween: 50 },
            }}
            modules={[Pagination, Navigation]}
            className="!pb-12"
          >
            {categoryData.map((item, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={`/product?name=${item.name}`}
                  className="flex flex-col items-center group/card"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-5"
                  >
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#62371f]/20 group-hover/card:border-[#62371f] group-hover/card:scale-110 transition-all duration-500" />

                    {/* Image Container */}
                    <div className="absolute inset-2 rounded-full overflow-hidden bg-white shadow-sm group-hover/card:shadow-xl transition-all duration-500 border-4 border-white">
                      <Image
                        src={`${imageurl}/${item.image}`}
                        alt={item.name}
                        fill
                        className="object-contain p-2 transition-transform duration-700 group-hover/card:scale-110"
                      />
                    </div>
                  </motion.div>

                  <h5 className="text-sm font-bold text-gray-900 uppercase tracking-widest group-hover/card:text-[#62371f] transition-colors text-center">
                    {item.name}
                  </h5>
                  <div className="w-0 h-0.5 bg-[#62371f] group-hover/card:w-8 transition-all duration-300 mt-1" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation (Optional visual polish) */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/swiper:opacity-100 transition-opacity hidden lg:block">
            {/* Swiper will handle standard nav if enabled, but clean UI is better */}
          </div>
        </div>
      </div>
    </section>
  );
}
