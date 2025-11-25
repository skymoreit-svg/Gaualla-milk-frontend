"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AiFillProduct } from "react-icons/ai";
import { FaHome, FaUserAlt, FaBoxOpen } from "react-icons/fa";
import { FaCartPlus, FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import MyCart from "./MyCart";

export default function BottomfixLinks() {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const cartLengthTotal = cartItems.reduce((accum, curntVal) => accum + curntVal.qnty, 0);
  const [cart, setCart] = useState(false);

  // ❌ Do not show on /product?name=all page



  return (
    <div className="">
      <div className="mobile-links fixed z-10 bottom-0 inset-x-0 md:hidden bg-[#62371f]">
        <div className="flex items-center px-5 justify-between text-white h-14 text-sm">
          <Link href="/" className="w-1/4 flex flex-col items-center">
            <FaHome size={24} />
          </Link>

          <Link href="/categories" className="w-1/4 flex flex-col items-center">
            <AiFillProduct size={24} />
          </Link>

          <button
            onClick={() => setCart(true)}
            className="w-[18%] flex flex-col items-center justify-center relative -top-6 bg-[#62371f] rounded-full p-[18px] scale-110 shadow-md border-[3px] border-white"
          >

            <FaCartPlus size={20} className="" />
          </button>

          <Link href="/product?name=all" className="w-1/4 flex flex-col items-center">
            <FaBoxOpen size={24} />
          </Link>

          <Link href="/user/profile" className="w-1/4 flex flex-col items-center">
            <FaUserAlt size={24} />
          </Link>
        </div>
      </div>

      <MyCart cart={cart} setCart={setCart} />
    </div>
  );
}
