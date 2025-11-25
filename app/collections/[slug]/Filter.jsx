"use client";
import React, { useState } from "react";
import ProductType from "./ProductType";
import PriceFilter from "./PriceFilter";
import DiscountFilter from "./DiscountFilter";

export default function Filter({ setSortedProducts, productData }) {
  return (
    <>
      <div className="flex items-center justify-between    ">
        <h6 className="font-semibold uppercase text-xl ">filters</h6>
        <button>Clear All</button>
      </div>

      <hr />


      {/* PriceFilter */}
      <div>
        <h6 className="text-xl font-semibold">Price</h6>
        <PriceFilter setSortedProducts={setSortedProducts} productData={productData} />
      </div>
      <hr />

      {/* DiscountFilter */}
      <div>
        <h6 className="text-xl font-semibold">Discount</h6>
        <DiscountFilter setSortedProducts={setSortedProducts} />
      </div>
      <hr />
      {/* productType  */}
      <div>
        <h6 className="text-xl font-semibold">Product Type</h6>
        <div className="space-y-2 py-4  ">
          <ProductType />

        </div>
      </div>
      <hr />


    </>
  );
}
