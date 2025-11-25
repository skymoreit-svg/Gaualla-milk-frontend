"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { baseurl, imageurl } from "./utlis/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
    <section className="py-12 px-5 lg:px-32 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xl lg:text-3xl font-semibold">
            Crafted for all your needs!
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            From traditional kitchens to modern homes, our products are designed
            to serve every purpose with grace and durability.
          </p>
        </div>

        {/* Shop by Utility */}
        <div>
          <h3 className="font-semibold text-center text-lg mb-2">
            Shop by Utility
          </h3>

          <div className="mt-5">
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 15 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 6, spaceBetween: 25 },
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {categoryData.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/product?name=${item.name}`}
                    className="block group bg-white rounded-xl p-1 hover:shadow-md transition border border-gray-200"
                  >
                    <div className="flex justify-center">
                      <Image
                        src={`${imageurl}/${item.image}`}
                        alt={item.name}
                        width={130}
                        height={130}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h5 className="text-center mt-2 capitalize font-medium">
                      {item.name}
                    </h5>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
