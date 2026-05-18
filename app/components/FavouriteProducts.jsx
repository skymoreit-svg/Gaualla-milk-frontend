"use client";
import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import Link from "next/link";

const products = [
  {
    id: 1,
    img: "/img/cowgee.webp",
    heading: "Green Tea Extract",
    title: "Green Tea Extract",
    discount: 25,
    description: "A refreshing and healthy tea rich in antioxidants.",
    price: 299,
    coins: 17,
    added: false,
    label: "BEST SELLERS",
  },
  {
    id: 2,
    img: "/img/p2.webp",
    heading: "New Launch Tea",
    title: "New Launch Tea",
    discount: 10,
    description: "Newly introduced premium tea for detox.",
    price: 349,
    coins: 20,
    added: false,
    label: "BEST SELLERS",
  },
  {
    id: 3,
    img: "/img/p3.webp",
    heading: "Combo Pack",
    title: "Combo Pack",
    discount: 30,
    description: "Save more with our best-selling tea combos.",
    price: 499,
    coins: 25,
    added: false,
    label: "BEST SELLERS",
  },
  {
    id: 4,
    img: "/img/p1.webp",
    heading: "Green Tea Extract",
    title: "Green Tea Extract",
    discount: 25,
    description: "A refreshing and healthy tea rich in antioxidants.",
    price: 299,
    coins: 17,
    added: false,
    label: "BEST SELLERS",
  },
  {
    id: 5,
    img: "/img/p2.webp",
    heading: "New Launch Tea",
    title: "New Launch Tea",
    discount: 10,
    description: "Newly introduced premium tea for detox.",
    price: 349,
    coins: 20,
    added: false,

    label: "Sets and combos",
  },
  {
    id: 6,
    img: "/img/p3.webp",
    heading: "Combo Pack",
    title: "Combo Pack",
    discount: 30,
    description: "Save more with our best-selling tea combos.",
    price: 499,
    coins: 25,
    added: false,
    label: "Sets and combos",
  },
  {
    id: 7,
    img: "/img/p1.webp",
    heading: "Green Tea Extract",
    title: "Green Tea Extract",
    discount: 25,
    description: "A refreshing and healthy tea rich in antioxidants.",
    price: 299,
    coins: 17,
    added: false,
    label: "Newly launched",
  },
  {
    id: 8,
    img: "/img/p2.webp",
    heading: "New Launch Tea",
    title: "New Launch Tea",
    discount: 10,
    description: "Newly introduced premium tea for detox.",
    price: 349,
    coins: 20,
    added: false,
    label: "Newly launched",
  },
  {
    id: 9,
    img: "/img/p3.webp",
    heading: "Combo Pack",
    title: "Combo Pack",
    discount: 30,
    description: "Save more with our best-selling tea combos.",
    price: 499,
    coins: 25,
    added: false,
    label: "Newly launched",
  },
  {
    id: 10,
    img: "/img/p1.webp",
    heading: "Green Tea Extract",
    title: "Green Tea Extract",
    discount: 25,
    description: "A refreshing and healthy tea rich in antioxidants.",
    price: 299,
    coins: 17,
    added: false,
    label: "Newly launched",
  },
  {
    id: 11,
    img: "/img/p2.webp",
    heading: "New Launch Tea",
    title: "New Launch Tea",
    discount: 10,
    description: "Newly introduced premium tea for detox.",
    price: 349,
    coins: 20,
    added: false,
    label: "Sets and combos",
  },
  {
    id: 12,
    img: "/img/p3.webp",
    heading: "Combo Pack",
    title: "Combo Pack",
    discount: 30,
    description: "Save more with our best-selling tea combos.",
    price: 499,
    coins: 25,
    added: false,
    label: "Sets and combos",
  },
  // Add more...
];

const tabs = ["BEST SELLERS", "Newly launched", "Sets and combos"];

import ProductAyurvedCard from "./ProductAyurvedCard";

const FavouriteProducts = () => {
  const [activeTab, setActiveTab] = useState("BEST SELLERS");

  const filteredProducts = products.filter(
    (product) => product.label.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="mt-16 lg:mt-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl">
        {/* Title & Tabs section matching Barosi screenshot */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-6 text-text">
            Our All Time Favourites
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b border-gray-200 pb-2 w-full max-w-3xl">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  activeTab.toLowerCase() === tab.toLowerCase()
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid matching 2 in a row phone, 4 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 justify-items-center">
          {filteredProducts.map((product) => (
            <ProductAyurvedCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouriteProducts;

