"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import Filter from "../collections/[slug]/Filter";
import ProductsForm from "./ProductsForm";
import data from "../data";
import ProductCard from "./ProductCard";

import AyutramartProduct from "../AyutramartData"
import ProductAyurvedCard from "./ProductAyurvedCard";

export default function AllProducts() {
  const [sortBy, setSortBy] = useState("newest");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "price-low") return a.price - b.price;
      return 0;
    });
    setSortedProducts(sortedData);
  }, [sortBy]);

  // pagination
  const rowPerPage = 10;
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / rowPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const lastIndexOfItem = currentPage * rowPerPage;
  const startIndeOfItem = lastIndexOfItem - rowPerPage;
  const currentProducts = sortedProducts.slice(startIndeOfItem, lastIndexOfItem);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>


      <div className="relative text-white">
        <div className="bg-cover bg-center bg-no-repeat relative bg-[url('/img/commonBanner/butter.webp')] h-[20vh] lg:h-[40vh] flex flex-col justify-center items-center">
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative text-center px-6 md:px-16 xl:px-40">
            <h1 className="text-2xl md:text-5xl lg:text-6xl uppercase">
              All Products
            </h1>

            <div className="flex items-center justify-center gap-x-2 mt-4 text-sm md:text-base">
              <Link href="/" className="hover:text-gray-300 transition">
                Home
              </Link>
              <FaGreaterThan className="text-xs opacity-70" />
              <span className="font-medium"> All Products</span>
            </div>
          </div>
        </div>
      </div>











      <div className="allProducts ">
        <div className="container mx-auto">
          <div className="px-5 md:px-12 xl:px-32 py-10 lg:py-20">
            <div className="flex  lg:gap-x-8">
              <div className="lg:w-[23%] mt-5 lg:mt-0">
                <div className="sticky top-0 lg:px-4 lg:py-4 space-y-10 lg:space-y-8 hidden lg:block">
                  <Filter
                    setSortedProducts={setSortedProducts}
                    productData={data}
                  />


                </div>
              </div>
              <div className="lg:w-[75%]">
                <div className="flex flex-col sm:flex-row justify-between items-left lg:items-center p-4 rounded-lg">

                  <div className="flex items-center gap-2">
                    <p className="text-sm md:text-lg text-gray-400">Sort by:</p>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="newest">Newest to Oldest</option>
                      <option value="oldest">Oldest to Newest</option>
                      <option value="price-high">Price High to Low</option>
                      <option value="price-low">Price Low to High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5  md:gap-6 mt-6">
                  {AyutramartProduct.map((elm, index) => (
                    <ProductAyurvedCard key={index} product={elm} />

                  ))}
                </div>

                <div className="flex justify-center gap-x-4 mt-4 lg:mt-6">
                  <button onClick={() => handlePrev()} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 hover:-translate-y-1 transition">
                    Prev
                  </button>

                  <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 hover:-translate-y-1 transition">
                    {currentPage}
                  </button>

                  <button onClick={() => handleNext()} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 hover:-translate-y-1 transition">
                    Next
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


