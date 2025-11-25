"use client"
import Link from 'next/link';
import React from 'react';
import { FaHeartBroken } from 'react-icons/fa';
import { FaGreaterThan } from 'react-icons/fa6';
import { RxCross1 } from "react-icons/rx";
import ProductAyurvedCard from './ProductAyurvedCard';
import { useSelector, useDispatch } from 'react-redux';

// export const {addWish,removeWish}=WishListSlice.actions;
import { clearWishlist, removeWish } from '../store/wishListSlice';
import OtherBanner from './OtherBanner';


export default function WishList() {

  const dispatch = useDispatch()
  const wishList = useSelector((state) => state.wish.wishlist)

  
  return (
    <>
      <div className="relative text-white">
      <OtherBanner  text="Wishlist"/>
      </div>
      <div className=" p-5 md:px-12 xl:px-32 bg-gray-50">

        {wishList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-xl shadow-sm">
            <FaHeartBroken className="text-5xl text-red-400 mb-4 space-y-4 lg:space-y-6" />
            <p className="text-gray-500 text-lg">Your wishlist is empty!</p>
            <p className="text-sm text-gray-400">Start adding items you love.</p>
            <Link href="/product?name=all" className="bg-[#60BE74] mt-4 lg:mt-8 px-6 lg:px-8 py-1   md:py-2 lg:py-3 rounded text-white text-base lg:text-lg font-semibold">  Continue Shopping</Link>
          </div>
        ) : (
          <>
            <button
              onClick={() => dispatch(clearWishlist())}
              className=" font-semibold text-white  w-fit px-5 py-2 text-center flex items-center justify-center rounded-md border border-gray-200 bg-[#62371f] hover:bg-[#69a14fe7] transition duration-300"
            >
              Remove All from Wishlist
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 mt-5 md:mt-10 gap-x-4 gap-y-4 lg:gap-y-8">
              {wishList.map((elm, index) => (
                <ProductAyurvedCard key={index} product={elm} />

              ))}
            </div>

            {/* <div className="overflow-x-auto">
      <table className="w-full text-nowrap border-collapse bg-white shadow-md rounded-md">
        <thead className="bg-[#60BE74] text-white">
          <tr>
            <th className="text-left px-4 py-3">Image</th>
            <th className="text-left px-4 py-3">Product</th>
            <th className="text-left px-4 py-3">Unit Price</th>
            <th className="text-left px-4 py-3">Add to Cart</th>
            <th className="text-left px-4 py-3">Remove</th>
          </tr>
        </thead>

        <tbody>
          {wishlistItems.map((item, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition duration-200"
            >
              <td className="px-4 py-3">
                <img
                  src={item.img}
                  alt={item.heading}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-3">
                <h5 className="text-sm font-medium text-gray-700">
                  {item.heading}
                </h5>
              </td>
              <td className="px-4 py-3 text-gray-600">
                <h5 className="text-sm">{item.price}</h5>
              </td>
              <td className="px-4 py-3">
                <button className="bg-[#60BE74] px-4 py-2 rounded text-white text-sm font-medium hover:bg-green-700 transition">
                  Add to Cart
                </button>
              </td>
              <td className="px-4 py-3">
                <button className="text-red-500 hover:text-red-700">
                  <RxCross1 className="text-lg" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}

          </>
        )}
      </div>
    </>
  );
}
