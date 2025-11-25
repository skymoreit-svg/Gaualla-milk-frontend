
import Link from 'next/link';
import React from 'react'
import { FaChevronRight } from "react-icons/fa";


const OtherBanner = ({ text }) => {
  return (
    <div className="relative w-full text-white">
      {/* Background image */}
      <img
        src="/range.webp"
        alt="Header Background"
        className="absolute inset-0 w-full h-full object-fill -z-20"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* Content */}
      <div className="relative h-[25vh] md:h-[40vh] lg:h-[55vh] flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide drop-shadow-lg">
          {text}
        </h1>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-x-2 mt-6 text-sm md:text-base font-medium text-gray-200">
          <Link href="/" className="hover:text-white/80 transition">
            Home
          </Link>
          <FaChevronRight className="text-xs opacity-60" />
          <span className="text-white">{text}</span>
        </div>
      </div>
    </div>
  )
}

export default OtherBanner