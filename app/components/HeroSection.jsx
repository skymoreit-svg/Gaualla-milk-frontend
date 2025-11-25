"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { baseurl, imageurl } from "./utlis/apis";

export default function HeroSection() {

  const [banners, setBanners] = useState()

  const fetchBanner = async () => {
    const response = await axios.get(`${baseurl}/banner`)
    const data = await response.data;
    if (data.success) {
      setBanners(data.banners)
    }
  }

  useEffect(() => {
    fetchBanner()
  }, [])

  return (
    <>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="mySwiper relative"
      >
        {banners?.map((elm, index) => (
          <SwiperSlide key={index}>
            <div className="h-[133px] md:h-[450px] lg:h-[600px] w-full relative mx-auto">

              <img
                src={`${imageurl}/${elm.image}`}
                alt="banner"
                className="w-full h-full object-cover md:object-fill"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>



    </>
  );
}
