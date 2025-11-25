

"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import LanguagePop from "./LanguagePop";
import { LuMessageCircleHeart } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function TopBar() {
  const [langPop, setLangPop] = useState(false);

  const wishList = useSelector((state) => state.wish.wishlist);

  return (
    <>
      {langPop && <LanguagePop langPop={langPop} setLangPop={setLangPop} />}

      <div>
        <div className="bg-[#62371f] text-center text-sm text-white py-2">
          Gaualla Milk - Purity At It's Best
        </div>

        <div className="px-5 md:px-12 xl:px-32 hidden xl:flex justify-between border-b py-2 border-gray-200">
          <ul className="flex items-center gap-x-4 text-sm">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            {/* <li><Link href="#compare">Compare</Link></li> */}
            <li className="relative">
              <Link href="/wishlist">Wishlist</Link>
              <span className="absolute -top-2">
                {/* <LuMessageCircleHeart  className="text-[#62371f] text-lg lg:text-xl"  /> */}
                <span className="bg-[#62371f] text-white text-xs absolute -right-5 top-2 rounded-full w-4 h-4 flex items-center justify-center ">
                  {wishList.length}
                </span>
              </span>
            </li>
          </ul>
           <p className="flex items-center gap-x-2">
              <AiFillSafetyCertificate />
              <span>100% Secure delivery without contacting the courier</span>
            </p>

          <ul className="flex items-center gap-x-4 text-sm">
           

            <li>
              <span className="border-l-2 h-6 mx-3 border-gray-200"></span>
            </li>

            <li>
              <a href="tel:+91-8378-000052" className="text-[#62371f]">
             Contact us today ! : <span>+91-8378-000052</span>
              </a>
            </li>

            <li>
              <span className="border-l-2 h-6 mx-3 border-gray-200"></span>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
}
