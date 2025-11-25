"use client";
import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoSearch } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { BsCartPlus } from "react-icons/bs";
import Link from "next/link";
import { HiMenu, HiOutlineMail } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import MyCart from "./MyCart";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { baseurl, imageurl } from "./utlis/apis";
import { GetUser } from "../store/userSlice";
import { MdOutlineLocalPhone } from "react-icons/md";




export default function MyNav() {
  const [sideBar, setSideBar] = useState(false);
  const dispatch = useDispatch()
  const { info, isLoading, isError, errorMessage } = useSelector(
    (state) => state.user
  );
  const [productSearch, setProductSearch] = useState("");

const cartCount = useSelector((state) =>
    state.cart.cartItem.reduce((total, item) => total + item.qnty, 0)
  );


  const [cart, setCart] = useState(false);

  const MobileLinks = [
    {
      "title": "Home",
      "link": "/"
    },
    {
      "title": "About us",
      "link": "/about"
    },
    {
      "title": "Blogs",
      "link": "#"
    },

    {
      "title": "WishList",
      "link": "/wishlist"
    },
    {
      "title": "Products",
      "link": "/product?name=all"
    },

    {
      "title": "Contact us",
      "link": "/contact-us"
    },

  ]

  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [userLogin, setUserLogin] = useState(false)


  useEffect(() => {

    if (!isLoading) {
      if (info?.success) {
        setUserLogin(true)
      }


    }


  }, [isLoading])


  const SideBarComp = () => {
    return (
      <div
        className={`  ${sideBar ? "translate-x-0" : "-translate-x-full"
          } duration-400 transition-transform fixed bg-black/40 inset-0 z-[9999] flex  xl:hidden justify-start  `}
      >
        <div className="w-full md:w-[50%] bg-white h-full p-6">
          <div className="flex justify-between">
            <Link href="/" className="cursor-pointer">
              <img
                src="/img/logo.webp"
                alt="Gaualla Milk Dairy Logo"
                className="w-32 lg:w-64"
              />


            </Link>
            <button onClick={() => setSideBar(false)} className="text-black">
              <RxCross2 />
            </button>
          </div>
          <div>
            <ul className="flex flex-col gap-y-3 mt-4 ">
              {MobileLinks.map((elm, index) => (
                <li key={index} className="border-b border-gray-300 py-2">
                  <Link href={elm.link} onClick={() => setSideBar(false)}>{elm.title}</Link>
                </li>
              ))}



              <div className=" mt-4 flex flex-col gap-y-2 text-lg text-gray-800 hover:text-gray-800 transition-colors duration-200 ">
                <a
                  href="tel: +91-8378-000052"
                  className="flex items-center gap-x-2  hover:text-gray-800"
                >
                  <MdOutlineLocalPhone className="text-lg" />
                  +91-8378-000052
                </a>
                <a
                  href="mailto:gauallamilkpvtltd@gmail.com"
                  className="flex items-center gap-x-2  hover:text-gray-800"
                >
                  <HiOutlineMail />
                  gauallamilkpvtltd@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-x-2  text-lg text-gray-800 hover:text-gray-800 transition-colors duration-200">
                <IoLocationOutline className="mt-2 text-lg" />
                <p className="xl:text-nowrap">
                  Booth No 7, Pocket C, Wave Estate, <br />
                  Sector 85, Mohali, 140306, India
                </p>
              </div>


            </ul>
          </div>
        </div>
      </div>
    );
  };



  const cartItems = useSelector((state) => state.cart.cartItem)

  const cartLengthTotal = cartItems.reduce((accum, curntVal) => accum + curntVal.qnty, 0)

  const [searchProducts, setSearchProducts] = useState()

  const getProduct = async () => {
    if (productSearch.trim().length >= 2) {
      const response = await axios.get(`${baseurl}/getproduct/product/search/${productSearch}`)
      const data = await response.data;
      if (data.success) {
        setSearchProducts(data.data)
      }

    }

    else {
      return
    }
  }

  useEffect(() => {
    const inter = setTimeout(() => {
      getProduct()
    }, 500);

    return () => clearTimeout(inter)

  }, [productSearch])



  useEffect(() => {
    dispatch(GetUser())

  }, [])



  return (
    <>
      <div className="px-2 py-2 md:px-12 xl:px-32 lg:py-2 flex gap-3 justify-between items-center sticky bg-white z-[99] top-0">
        <Link href="/">
          <img
            src="/img/logo.webp"
            alt="Gaualla Milk Dairy Logo"
            className="w-auto h-14 lg:h-20 cursor-pointer"
          />

        </Link>
        <div
          className="relative"
          onMouseEnter={() => setIsProductDropdownOpen(true)}

        >
          <div className="hidden lg:flex items-center gap-[10px] h-[50px] rounded-[5px] bg-gray-100 px-[16px] py-[15px] cursor-pointer font-semibold text-[#2C3C28]">
            <Image
              className="parent h-2 w-auto"
              src="/img/bar-1.svg"
              alt="icons"
              width={20}
              height={20}
            />
            <Link href={"/product?name=all"} className="text-base">Products</Link>
          </div>


        </div>









        <div className="relative hidden xl:block md:w-[46%] lg:w-[40%] xl:w-[40%] py-4 bg-[#F3F4F7] rounded-lg">
          <input
            type="text"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            placeholder="Search for items..."
            className="w-full border-0 px-4  rounded-2xl outline-none bg-transparent placeholder:text-gray-400"
          />
          <IoSearch className="absolute right-5 top-[22px] text-gray-600" />

          {searchProducts && productSearch && (
            <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-md shadow-lg max-h-[220px] overflow-y-auto z-50">
              <ul className="divide-y divide-gray-200">
                {searchProducts?.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <Link href={`/product/${item.slug}`} onClick={() => productSearch("")} className="flex justify-between items-center"> <span className="text-[19px]">{item.name}</span>

                      <img src={`${imageurl}/${(JSON.parse(item?.images))[0]}`} alt={item.name} className="h-15 w-15 rounded-full" />

                    </Link>

                  </li>
                ))}
              </ul>
            </div>
          )}

          {!searchProducts && productSearch && (
            <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-md shadow-lg p-4 text-gray-500 text-sm z-50">
              No products found.
            </div>
          )}
        </div>



        <ul className="hidden lg:flex items-center gap-x-6 text-base">



          <li>
            <Link href="#" className="text-gray-700 hover:text-[#23955c]">
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className="text-gray-700 hover:text-[#23955c]"
            >
              Contact us
            </Link>
          </li>
        </ul>

        <ul className="flex items-center gap-x-2 lg:gap-x-6">
          {!userLogin ? <li className="hidden md:block">
            <Link href={"/signup"} className="w-8 h-8 flex justify-center items-center rounded-full border border-gray-400 hover:bg-[#F3F4F7] cursor-pointer">
              <RiUserLine className="text-gray-600" />
            </Link>
          </li>

            : <li className="">
              <button
      onClick={() => setCart(true)}
      className="w-8 h-8 relative flex justify-center items-center rounded-full bg-[#b2e18c30] border border-[#62371f] cursor-pointer"
    >
      <BsCartPlus className="text-[#62371f]" />

      {/* {cartCount > 0 && ( */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      {/* )} */}
    </button>
            </li>}
          <li className="xl:hidden">
            <button onClick={() => setSideBar(!sideBar)} className="text-xl mt-2">
              <HiMenu />
            </button>
          </li>
        </ul>
      </div>

      <SideBarComp />

      <MyCart cart={cart} setCart={setCart} />

      {/* {searchtoggle &&  <ItemSearch setSearchToogle={setSearchToogle}/> }  */}
    </>
  );
}
