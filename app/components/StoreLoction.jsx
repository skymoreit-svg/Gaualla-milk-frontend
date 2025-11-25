'use client';

import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css';


// import required modules
import {Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

const images = [
  { src: '/img/store/butter.webp', alt: 'New York' },
  { src: '/img/store/2.webp', alt: 'New York' },
  { src: '/img/store/3.webp', alt: 'New York' },
  { src: '/img/store/4.webp', alt: 'New York' },
  { src: '/img/store/5.webp', alt: 'New York' },
  { src: '/img/store/6.webp', alt: 'New York' },
  { src: '/img/store/7.webp', alt: 'New York' },
  { src: '/img/store/8.webp', alt: 'New York' },
  { src: '/img/store/9.webp', alt: 'New York' },
  { src: '/img/store/10.webp', alt: 'New York' },
  { src: '/img/store/11.webp', alt: 'New York' },
  { src: '/img/store/12.webp', alt: 'New York' },
 
];

export default function StoreLocation() {


  return (
    <div className='w-full lg:w-[800px] mx-auto mt-10'>
          <Swiper
        effect={'coverflow'}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[Autoplay,EffectCoverflow]}
        className="mySwiper"
      >
      {images.map((elm,index)=>(
        <SwiperSlide key={index} className='flex justify-center'>
          <img src={elm.src} className='h-[450px] w-full object-cover object-center' />
        </SwiperSlide>
      ))}
      
        
      </Swiper>
    </div>
  );
}
