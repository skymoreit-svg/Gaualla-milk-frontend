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

const tabs = ["Brst Sellers", "Newly launched", "Sets and combos"];

const FavouriteProducts = () => {

  const [activeTab, setActiveTab] = useState("BEST SELLERS");


  const filteredProducts = products.filter(
    (product) => product.label === activeTab
  );

  return (
    <div className="mt-20">
      <div className="mx-5 lg:mx-28">
        {/* Tabs */}
        <div className="flex justify-between">
          <h6 className="text-center text-lg lg:text-4xl mb-3">Our all time Favourites</h6>
          <div className="flex justify-center space-x-4  mb-6">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-3 py-2 border-2 border-black rounded-full shadow-lg font-medium ${activeTab === tab
                  ? "  border-green-600 text-green-700"
                  : "text-gray-500"
                  }`}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card shadow-lg relative hover:shadow-xl transition-shadow duration-300  overflow-hidden"
            >
              <div className="relative">
                <span className="absolute top-5 left-5 z-10 bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                  -{product.discount}%
                </span>
                <img
                  src={product.img}
                  alt={product.heading}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex justify-between">
                  <p className="font-semibold text-lg text-gray-800">{product.heading}</p>
                </div>


                <hr className="text-gray-300" />

                <div className="flex justify-between">
                  <div className="flex items-center gap-x-1 text-lg font-semibold text-gray-700">
                    <span className="text-xl">₹ {product.price}</span>
                    <span className="line-through font-normal text-base text-gray-700">
                      ₹ {product.price + 50}
                    </span>
                  </div>
                  <div className="flex text-yellow-400 items-center gap-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>

                <div className="flex gap-x-4 items-center">


                  <Link
                    href={`/product/${product.title.toLowerCase().replace(/,/g, "").split(" ").join("-")}`}
                    className="font-semibold text-white w-full py-2 text-center flex items-center justify-center  border border-gray-200 bg-[#62371f]  transition duration-300"
                  >
                    <IoMdCart className="mr-1" />
                    <span>View product</span>
                  </Link>
                </div>
              </div>

              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouriteProducts;
