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
    <div className="w-full h-[300px] md:h-[450px] lg:h-[700px] xl:h-[800px] relative overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="auto"
      >
        <source src="/Home-bg-video.mp4" type="video/mp4" />
      </video>

      {/* Mute / Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-10 bg-black/60 text-white p-2 rounded-full"
      >
        {muted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
      </button>
    </div>
  );
}
