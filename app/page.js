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
import Blogs from "./components/Blogs";

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


      <div className="">
        <img
          src="/range.webp"
          alt="Header Background"
          className="w-full h-full object-fill "
        />
      </div>
      <ProductAyurved />
      <div className="">
        <img
          src="/processs.webp"
          alt="Header Background"
          className="w-full h-full object-fill "
        />
      </div>
      <OfferPorductValid />
      <Testmonails />
      <Revival />
      <Blogs />
      <MarqueeText />
      <Faq />
    </>
  );
}
