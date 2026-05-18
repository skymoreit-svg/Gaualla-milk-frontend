// "use client";
// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination, Autoplay } from "swiper/modules";
// import axios from "axios";
// import { baseurl, imageurl } from "./utlis/apis";

// export default function HeroSection() {

//   const [banners, setBanners] = useState()

//   const fetchBanner = async () => {
//     const response = await axios.get(`${baseurl}/banner`)
//     const data = await response.data;
//     if (data.success) {
//       setBanners(data.banners)
//     }
//   }

//   useEffect(() => {
//     fetchBanner()
//   }, [])

//   return (
//     <>
//       <Swiper
//         loop={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         pagination={{ clickable: true }}
//         modules={[Pagination, Autoplay]}
//         className="mySwiper relative"
//       >
//         {banners?.map((elm, index) => (
//           <SwiperSlide key={index}>
//             <div className="h-[133px] md:h-[450px] lg:h-[600px] w-full relative mx-auto">

//               <img
//                 src={`${imageurl}/${elm.image}`}
//                 alt="banner"
//                 className="w-full h-full object-cover md:object-fill"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>



//     </>
//   );
// }





"use client";
import React, { useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div className="w-full h-[500px] md:h-[650px] lg:h-[800px] xl:h-[90vh] relative overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="auto"
      >
        <source src="/Home-bg-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl font-serif tracking-tight"
        >
          Purely Fresh. <br />
          <span className="text-[var(--primary)]">Purely Gaualla.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-white/90 max-w-2xl mb-10 font-medium drop-shadow-md italic"
        >
          "Straight from our farm to your table. Experience the richness of 100% pure dairy products every single day."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/product?name=all"
            className="px-12 py-5 bg-[var(--primary)] text-white rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-[#4a2917] hover:scale-105 transition-all duration-300"
          >
            Shop The Purity
          </Link>
        </motion.div>
      </div>

      {/* Mute / Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-10 right-10 z-20 bg-background/20 backdrop-blur-md text-white p-4 rounded-full border border-white/30 hover:bg-background/40 transition-all shadow-xl"
      >
        {muted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
      </button>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full"></div>
      </motion.div>
    </div>
  );
}
