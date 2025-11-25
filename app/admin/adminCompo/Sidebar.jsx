"use client"; // if you are using Next.js App Router

import { useState } from "react";
import Link from "next/link";
import { FaHome, FaShoppingCart, FaUser, FaBars ,FaBlogger} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { PiFlagBannerFill } from "react-icons/pi";



export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-gray-900 h-screen p-5 pt-8 relative duration-300`}
      >
        {/* Toggle Button */}
        <FaBars
          className="absolute cursor-pointer -right-3 top-9 w-7 h-7 
          bg-white rounded-full border border-gray-300"
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <FaShoppingCart className="text-white text-2xl" />
          {open && <h1 className="text-white font-bold text-xl">MyShop</h1>}
        </div>

        {/* Menu */}
        <ul className="pt-6">
          <li className="flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md text-white">
            <FaHome />
            {open && <Link href="/admin">Dashboard</Link>}
          </li>
         <li className="flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md text-white">
            <BiCategory />
            {open && <Link href="/admin/category">Categories</Link>}
          </li>

          <li className="flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md text-white">
            <FaShoppingCart />
            {open && <Link href="/admin/products">Products</Link>}
          </li>
          <li className="flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md text-white">
            <PiFlagBannerFill />
            {open && <Link href="/admin/bannners">Bannners</Link>}
          </li>

<li className="flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md text-white">
            <FaBlogger />
            {open && <Link href="/admin#">Blog</Link>}
          </li>

          <li className="flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md text-white">
            <FaUser />
            {open && <Link href="/admin/users">Users</Link>}
          </li>
        </ul>
      </div>

     
    </div>
  );
}
