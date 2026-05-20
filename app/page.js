// "use client"; 
import React from "react";

import HeroSection from "./components/HeroSection";
import MarqueeText from "./components/MarqueeText";

import Testmonails from "./components/Testmonails";
import Faq from "./components/Faq";
import OfferPorductValid from "./components/OfferPorductValid";
import CategoriesSlider from "./components/Shop";
import Revival from "./components/Revival";
import ProductAyurved from "./components/ProductAyurved";
import AboutSection from "./components/Aboutus";
import Image from "next/image";
// import Blogs from "./components/Blogs";

export const metadata = {
  title: " Gaualla Purity At It's Best",
  description: "",
};

export default function page() {
  return (
    <>
      <HeroSection />

      <CategoriesSlider />
      <AboutSection need={false} />


      <div className="w-full flex flex-col">
        <div className="brand-striped-border" />
        <img
          src="/range.webp"
          alt="Header Background"
          className="w-full h-auto"
        />
        <div className="brand-striped-border" />
      </div>
      <ProductAyurved />
      <div className="w-full flex flex-col overflow-hidden">
        <div className="brand-striped-border" />
        <img
          src="/process.png"
          alt="Process Flow mobile"
          className="w-[135%] max-w-none -translate-x-[17.5%] h-auto md:hidden"
        />
        <img
          src="/processs.webp"
          alt="Process Flow desktop"
          className="w-full h-auto hidden md:block"
        />
        <div className="brand-striped-border" />
      </div>
      <OfferPorductValid />
      <Testmonails />
      <Revival />
      {/* <Blogs /> */}
      <MarqueeText />
      <Faq />
    </>
  );
}
