

"use client";

import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

import AOS from "aos";
import "aos/dist/aos.css";
import { BiCategory } from "react-icons/bi";
import { MdSort } from "react-icons/md";
import { IoColorFilterSharp, IoArrowBack } from "react-icons/io5";

const filterCategories = [
  { name: "Ring Size", options: ["11 (934)"] },
  { name: "Price", options: ["12 (1365)"] },
  { name: "Discounts", options: ["13 (995)"] },
  { name: "Product Type", options: ["5 (53)"] },
  { name: "Weight Ranges", options: ["6 (449)"] },
  { name: "Material", options: ["7 (639)"] },
  { name: "Metal", options: ["8 (935)"] },
  { name: "Shop For", options: ["9 (911)"] },
  { name: "Occasion", options: ["10 (1114)"] },
];

const filterOptionsData = {
  "Ring Size": ["10 (500)", "11 (934)", "12 (1200)"],
  Price: ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"],
  Discounts: ["10% Off", "20% Off", "30% Off", "50% Off"],
  "Product Type": [
    "Necklace (200)",
    "Earrings (350)",
    "Bracelet (100)",
    "Rings (400)",
  ],
  "Weight Ranges": ["1-2g", "2-5g", "5-10g", "Above 10g"],
  Material: ["Gold", "Silver", "Platinum", "Diamond"],
  Metal: ["Copper", "Brass", "Titanium", "Stainless Steel"],
  "Shop For": ["Men", "Women", "Kids"],
  Occasion: ["Casual", "Formal", "Wedding", "Party"],
};



const categoriesData = [
  { title: "Rings", link: "/collections/rings", image: "https://www.forevermark.com/globalassets/images/2017-product-detail-page-updates/new-product-images/india-collections/icon-collection/fer029/icon_halo_engagement_ring_pave_diamonds_image4.webp?format=webp" },
  { title: "Earrings", link: "/collections/earrings", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt9IvS6BH5w3jyJjPzd5BtkrD0_wbo_uIatg&s" },
  { title: "Necklaces", link: "/collections/necklaces", image: "https://www.orra.co.in/media/catalog/product/cache/8706a87b250cd4797f5bf599698c5c7a/o/s/osn23024_1_b0c2jti3rvtvgsgb.webp" },
  { title: "Bracelets", link: "/collections/bracelets", image: "https://www.ambery.in/live/img/business_product/xnJmHbH6AV_20230607181735.webp" },

];

const Superdropdown = () => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-in-out" });
  }, []);

  const toggleDropdown = (dropdown) => {
    setShowSortDropdown(dropdown === "sort" ? !showSortDropdown : false);
    setShowFilterDropdown(dropdown === "filter" ? !showFilterDropdown : false);
    setShowCategoriesDropdown(
      dropdown === "categories" ? !showCategoriesDropdown : false
    );
  };

  return (
    <>
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-[99999999] bg-[#0c2e39] text-white px-5 md:px-12 py-6 md:py-4  flex justify-between items-center shadow-md">
        <button
          className="flex items-center gap-2 text-base font-medium hover:text-gray-300 transition"
          onClick={() => toggleDropdown("categories")}
        >
          <BiCategory className="text-lg" />
          <span>Categories</span>
        </button>

        <button
          className="flex items-center gap-2 text-base font-medium hover:text-gray-300 transition"
          onClick={() => toggleDropdown("sort")}
        >
          <MdSort className="text-lg" />
          <span>Sort</span>
        </button>

        <button
          className="flex items-center gap-2 text-base font-medium hover:text-gray-300 transition"
          onClick={() => toggleDropdown("filter")}
        >
          <IoColorFilterSharp className="text-lg" />
          <span>Filters</span>
        </button>
      </div>

      {showSortDropdown && (
        <div className="inset-0 fixed bg-black/50  z-[9999]">
          <div
            data-aos="fade-up"
            className="lg:hidden fixed z-[10000] bottom-0 inset-x-0  shadow-md rounded-t-2xl bg-white pb-20"
          >
            <h3 className="text-center bg-gray-100 text-gray-700 font-semibold rounded-t-[20px] p-4">
              Sort Designs By
            </h3>
            <button onClick={() => toggleDropdown("sort")} className="absolute right-5 top-5 font-bold">
              <RxCross2 />

            </button>
            <ul className="mt-2 text-gray-800">
              {[
                "Latest",
                "Discount",
                "Featured",
                "Price: Low to High",
                "Price: High to Low",
                "Customer Rating",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-2 px-4 text-base hover:bg-gray-100 cursor-pointer opacity-90 transition-opacity duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showCategoriesDropdown && (
        <div className=" fixed inset-0  z-[9999]  bg-black/50">
          <div
            data-aos="fade-up"
            className="lg:hidden fixed inset-x-0 bottom-0 z-[10000] shadow-md rounded-t-2xl bg-white pb-20 "
          >
            <h3 className="text-center bg-gray-100 text-gray-700 font-semibold rounded-t-[20px] p-4">
              Select Category
            </h3>

            <button onClick={() => toggleDropdown("categories")} className="absolute right-5 top-5 font-bold">
              <RxCross2 />


            </button>            <div className="grid grid-cols-2 gap-4 p-4">
              {categoriesData.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-2 shadow-md cursor-pointer hover:shadow-lg transition"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <p className="text-center mt-2 font-medium text-gray-700">
                    {category.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showFilterDropdown && (
        <div className="fixed inset-0 bg-black/15  z-[9999]">
          <div
            data-aos="fade-in"
            className="lg:hidden fixed inset-x-0 bottom-16  bg-white flex flex-col p-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center pb-4 border-b">
              {selectedCategory ? (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-600 text-xl flex items-center gap-2"
                >
                  <IoArrowBack /> Back
                </button>
              ) : (
                <h3 className="text-lg font-semibold">Filters</h3>
              )}
              <button onClick={() => setShowFilterDropdown(false)} className="absolute right-5 top-5 font-bold">
                <RxCross2 />


              </button>
            </div>

            <div className="flex-1 mt-4">
              {selectedCategory ? (
                <ul className="text-gray-800">
                  {filterOptionsData[selectedCategory]?.map((option, index) => (
                    <li
                      key={index}
                      className="py-2 border-b flex items-center justify-between cursor-pointer opacity-90 transition-opacity duration-300"
                    >
                      <span>{option}</span>
                      <input type="checkbox" className="accent-black" />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="text-gray-800">
                  {filterCategories.map((category, index) => (
                    <li
                      key={index}
                      className="py-2 border-b flex justify-between items-center cursor-pointer opacity-90 transition-opacity duration-300"
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-500">{category.options[0]}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button className="w-1/2 py-2 text-white bg-black font-medium rounded">
                Clear All
              </button>
              <button className="w-1/2 py-2 bg-gradient-to-r bg-black text-white font-medium rounded">
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Superdropdown;
