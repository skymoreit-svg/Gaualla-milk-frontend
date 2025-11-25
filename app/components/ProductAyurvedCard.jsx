"use client";
import React, { useRef, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { IoMdCart, IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addWish, removeWish } from "../store/wishListSlice";
import { useSelector } from "react-redux";
import { imageurl } from "./utlis/apis";

export default function ProductAyurvedCard({ product }) {
  const {
    images,
    name,
    description,
    price,
    old_price,
    stock,
    unit_quantity,
    id,
    slug
  } = product;





  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const wishList = useSelector((state) => state.wish.wishlist);
  const dispatch = useDispatch();
  const [quickView, setQuickView] = useState(false);
  const [activeImg, setActiveImg] = useState(images?.[0]);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const isWishList = (productId) => {
    return wishList.find((elm) => elm.id == productId);
  };

  const handleWishListToogle = (product) => {
    if (isWishList(product.id)) {
      dispatch(removeWish(product));
    } else {
      dispatch(addWish(product));
    }
  };

  const handleMouseMove = (e) => {
    if (imgRef.current) {
      const { left, top, width, height } = imgRef.current.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setPosition({ x, y });
    }
  };

  const QuickView = () => {
    return (
      <div className="fixed inset-0 bg-black/50 z-[99999] flex justify-center items-center px-2 md:px-6 overflow-auto">
        <div className="w-full max-w-6xl bg-white rounded-md shadow-lg relative overflow-hidden my-4">
          <button
            onClick={() => setQuickView(false)}
            className="absolute z-10 top-3 right-3 cursor-pointer text-2xl sm:text-3xl text-gray-700 hover:text-green-500 transition"
          >
            <IoMdClose />
          </button>

          <div className="grid md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-10">
            <div className="leftside md:col-span-2 w-full flex flex-col-reverse md:flex-col-reverse lg:flex-row gap-3 sm:gap-4 items-center">
              <div className="flex lg:flex sideimages lg:flex-col gap-2">
                {images?.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImg(img)}
                    className="w-[70px] h-[70px] sm:h-[90px] sm:w-[90px] lg:w-[100px] lg:h-[110px] xl:h-[100px] border border-green-500 cursor-pointer"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${img}`}
                      className="w-full h-full object-cover"
                      alt={`Product ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div
                className="relative h-[250px] sm:h-[300px] md:h-[350px] xl:h-[330px] magnifyImg w-full lg:max-w-md border border-green-500 overflow-hidden"
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  ref={imgRef}
                  className="w-full h-full object-cover"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${activeImg}`}
                  alt={name}
                />
                {zoom && (
                  <div
                    className="absolute inset-0 bg-no-repeat rounded-md"
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/storage/${activeImg})`,
                      backgroundSize: "200%",
                      backgroundPosition: `${position.x}% ${position.y}%`,
                    }}
                  ></div>
                )}
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col justify-between space-y-3 sm:space-y-4 max-h-[75vh] overflow-y-auto pr-1 sm:pr-2">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                  {description}
                </p>

                <ul className="text-sm sm:text-base md:text-lg text-gray-700 space-y-1 pt-2">
                  <li>
                    <span className="font-semibold">Availability:</span>{" "}
                    {stock > 0 ? "In stock" : "Out of stock"}
                  </li>
                  <li>
                    <span className="font-semibold">Quantity:</span> {unit_quantity}
                  </li>
                  <li>
                    <span className="font-semibold text-green-600">
                      Free Shipping
                    </span>{" "}
                    on all orders above ₹999
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">
                    ₹{price}
                  </span>
                  {old_price && (
                    <span className="line-through text-gray-400 text-base sm:text-lg">
                      ₹{old_price}
                    </span>
                  )}
                </div>

                <div className="flex gap-1 text-yellow-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <button className="w-full bg-[#62371f] hover:bg-[#4a9347] transition text-white font-semibold py-2.5 sm:py-3 rounded-md flex items-center justify-center gap-2 text-base sm:text-lg">
                  <IoMdCart />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const added = isWishList(product.id);

  return (
    <>
      <Link
        href={`/product/${slug}`}
        className="card group shadow-lg relative hover:shadow-xl transition-shadow bg-white duration-300 rounded-lg overflow-hidden  h-full min-h-[150px] lg:min-h-[520px] flex flex-col"
      >
        {/* Image Section */}
        <div className="relative ">
          {old_price && (
            <span className="absolute hidden lg:block top-2 lg:top-5 left-2 lg:left-5 z-10 bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
              {Math.round(((old_price - price) / old_price) * 100)}% OFF
            </span>
          )}
          <img
            src={`${imageurl}/${images?.[0]}`}
            alt={name}
            className="w-full hover:scale-105 h-[120px] lg:h-[250px] object-contain transition-opacity duration-600 pt-2"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2 bg-white flex flex-col flex-grow">
          <div className="flex justify-between">
            <p className="font-semibold text-sm lg:text-lg text-gray-800">{name}</p>
          </div>

          <div className="text-gray-600 text-base leading-relaxed hidden lg:block">
            <div
              dangerouslySetInnerHTML={{
                __html: isDescriptionExpanded
                  ? description
                  : `${description?.slice(0, 50)}...`,
              }}
            />
            {description?.length > 50 && (
              <button
                className="text-blue-500 ml-1"
                onClick={() => setDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          <hr className="text-gray-300" />

          {/* Price + Rating */}
          <div className="block lg:flex justify-between mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-1 text-lg font-semibold text-gray-700">
                <span className="text-xl">₹{price}</span>
                {old_price && (
                  <span className="line-through font-normal text-base text-gray-700">
                    ₹{old_price}
                  </span>
                )}
              </div>
            </div>
            <div className="flex text-yellow-400 items-center gap-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-x-4 items-center mt-3">
            <button
              onClick={() => handleWishListToogle(product)}
              className="cursor-pointer border p-1 lg:p-1.5 font-bold rounded lg:relative absolute lg:top-0 top-2 lg:right-0 right-2 bg-white"
            >
              {added ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>

            <p className="font-semibold text-xs lg:text:base text-white w-full py-2 text-center flex items-center justify-center rounded-md border border-gray-200 bg-[#62371f] hover:bg-[#69a14fe7] transition duration-300">
              <IoMdCart className="mr-1" />
              <span>View product</span>
            </p>
          </div>
        </div>
      </Link>


      {quickView && <QuickView />}
    </>
  );
}