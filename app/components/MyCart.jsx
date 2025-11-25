import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import AyutramartData from "../AyutramartData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { decareseQunty, increQunty, removeCart, setCartItems } from "../store/cartSlice";
import axios from "axios";
import { baseurl, imageurl } from "./utlis/apis";
import { useRouter } from "next/navigation";

export default function MyCart({ cart, setCart }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState();
  const [subTotal, setsubTotal] = useState()

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/cart/cartallcart`);
      const data = await response.data;
      if (data.success) {
        setCartData(data.carts)
        const totalamount = data.carts.reduce((acc, item) => acc + parseInt(item.total_price), 0);
        setsubTotal(totalamount)
      } else {
        setCartData("")
      }

      // setCartData({
      //   data,
      //   total
      // });

      // Update Redux store if needed
      // dispatch(setCartItems(data));
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };


  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`${baseurl}/cart/deletecart/${itemId}`);
      const data = await response.data;
      if (data.success) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {

    fetchCart();

  }, []);

  const handelcartquentity = async (bool, id) => {

    const response = await axios.put(`${baseurl}/cart/updatecart/${id}`, { increment: bool });
    const data = await response.data;
    if (data.success) {

      fetchCart();

    }

  }

  if (loading) {
    return (
      <div className={`${cart ? "translate-x-0" : "translate-x-full"} duration-400 transition-transform fixed inset-0 bg-black/50 z-[9999] flex justify-end`}>
        <div className="bg-white overflow-y-auto h-full w-full md:w-[60%] lg:w-[50%] xl:w-[30%] p-5">
          <div className="flex justify-center items-center h-full">
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cartData) {
    return (
      <div className={`${cart ? "translate-x-0" : "translate-x-full"} duration-400 transition-transform fixed inset-0 bg-black/50 z-[9999] flex justify-end`}>
        <div className="bg-white overflow-y-auto h-full w-full md:w-[60%] lg:w-[50%] xl:w-[30%] ">
          <div className="flex items-center justify-between p-5 text-lg xl:text-xl">
            <h6 className="font-bold">Your Cart</h6>
            <button onClick={() => setCart(false)} className="text-black cursor-pointer">
              <RxCross2 />
            </button>
          </div>

          <div className="text-center flex flex-col items-center py-10">
            <h2 className="text-xl font-semibold">Cart is Empty</h2>
            <p className="text-sm text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
            {/* <img src="https://cdn-icons-png.flaticon.com/128/4290/4290854.webp" alt="empty Cart" className="h-16 w-16 mt-4 lg:w-24 lg:h-24" /> */}
            <div className="py-5">
              <Link
                href="/product?name=all"
                onClick={() => setCart(false)}
                className="mt-4 animate-bounce uppercase font-medium text-sm md:text-base text-white px-5 py-2.5 rounded-md bg-[#62371f] hover:bg-[#4a9347] transition-all duration-300 shadow-md" >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }





  return (
    <div className={`${cart ? "translate-x-0" : "translate-x-full"} duration-400 transition-transform fixed inset-0 bg-black/50 z-[9999] flex justify-end`}>
      <div className="bg-white overflow-y-auto h-full w-full md:w-[60%] lg:w-[50%] xl:w-[30%] ">
        <div className="flex items-center justify-between p-5 text-lg xl:text-xl">
          <h6 className="font-bold">Your Cart</h6>
          <button onClick={() => setCart(false)} className="text-black cursor-pointer">
            <RxCross2 />
          </button>
        </div>

        <div className="text-center py-2 bg-[#89eb7c2c]">
          <h6>⏰ Hurry, Your cart is reserved for 05:17 minutes!</h6>
        </div>

        <div className="mt-4 flex items-center justify-center py-2 gap-x-2 text-wrap text-center bg-[#ebede57c] border-gray-400 border-t border-b">
          Earn{" "}
          <img src="/img/product/coin.webp" alt="coin" className="w-4 h-4" />
          <span className="font-semibold text-base md:text-lg">50</span>
          Gaualla Milk Dairy Coins on this order
        </div>

        {cartData?.map((item, index) => (
          <div key={index} className="content-section px-2">
            <div className="mt-4 lg:mt-6 border border-gray-300 bg-[#ebede57c] p-4 rounded-lg shadow-sm flex flex-row md:flex-row items-start md:items-center justify-between gap-4">
              <div className="">
                <img
                  src={`${imageurl}/${JSON.parse(item?.images)[0]}` || "/img/product/default-product.webp"}
                  alt={item?.name}
                  className="h-20 w-20 md:h-24 md:w-24 rounded object-cover"
                />
              </div>

              <div className="flex-1">
                <h5 className="text-lg md:text-xl font-semibold text-gray-800">
                  {item?.name}
                </h5>
                <p className="text-sm text-gray-600 mt-1">
                  {/* {item.product.description.substring(0, 50)}... */}
                </p>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">₹{item?.total_price}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-2 rounded-2xl">
                    <button
                      onClick={() => handelcartquentity(false, item.cart_id)}
                      className="rounded-2xl bg-[#e6f3eb76] text-gray-600 hover:text-green-500 transition border border-gray-400 p-1"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="text-lg font-medium">{item?.quantity}</span>
                    <button
                      onClick={() => handelcartquentity(true, item.cart_id)}
                      className="rounded-2xl bg-[#e6f3eb76] text-gray-600 hover:text-green-500 transition border border-gray-400 p-1"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>
                <div className=" flex my-2 justify-between">
                  <button
                    onClick={() => removeItem(item.cart_id)}
                    className="mt-2 text-red-500 text-sm flex items-center cursor-pointer"
                  >
                    <RxCross2 className="mr-1" /> Remove
                  </button>
                  <button onClick={() => {
                    localStorage.setItem("buyitem", item?.cart_id),
                      router.push("/checkout"), setCart(false)
                  }} className="p-1 cursor-pointer  px-3 font-semibold rounded-2xl bg-green-300 text-green-700">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* For better result section */}
        {/* <div className="p-5 bg-[#ebede57c] mt-4 rounded">
          <h5 className="text-lg capitalize md:text-lg xl:text-xl font-semibold">
            Add for Better Benefits
          </h5>
          <p className="text-base md:text-lg">
            Combine with this item to achieve better results faster.
          </p>

          <div className="products mt-2 gap-x-2">
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay]}
              className="mySwiper"
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 2, spaceBetween: 20 },
                1280: { slidesPerView: 2, spaceBetween: 20 },
              }}
            >
              {AyutramartData.map((product, index) => {
                const {
                  img,
                  title,
                  imgHover,
                  heading,
                  description,
                  price,
                  rating,
                  discount,
                } = product;
                return (
                  <SwiperSlide key={index}>
                    <div className="card shadow-md hover:shadow-lg transition-shadow h-[270px] duration-300 rounded-md overflow-hidden bg-white">
                      <div className="relative">
                        <span className="absolute top-3 left-3 z-10 bg-green-500 text-white text-[10px] font-semibold py-[2px] px-2 rounded-full">
                          -{discount}%
                        </span>
                        <img
                          src={img}
                          alt={heading}
                          className="w-full h-[130px] object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                      </div>
                      <div className="p-3 space-y-1">
                        <p className="font-medium text-lg lg:text-xl text-gray-800">
                          {heading}
                        </p>
                        <hr className="text-gray-200" />
                        <div className="flex justify-between items-center">
                          <div className="flex text-nowrap items-center gap-x-1 text-sm font-semibold text-gray-700">
                            <span>₹ {price}</span>
                            <span className="line-through font-normal text-xs text-gray-500">
                              ₹ {parseInt(price) + 50}
                            </span>
                          </div>
                          <div className="flex lg:hidden text-yellow-400 text-xs gap-x-[2px]">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </div>
                        </div>
                        <Link
                          href={`/product/${title
                            .toLowerCase()
                            .replace(/,/g, "")
                            .split(" ")
                            .join("-")}`}
                          className="text-white text-xs w-full py-1.5 text-center flex items-center justify-center rounded-md bg-[#62371f] hover:bg-[#69a14fe7] transition duration-300"
                        >
                          <IoMdCart className="mr-1 text-sm" />
                          <span>Added</span>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div> */}

        <div className="bg-white p-4 rounded-md shadow-sm">
          {/* Subtotal Section */}
          <div className="flex items-center justify-between bg-[#f4f6e8] border-y border-gray-300 px-3 py-3 rounded-md">
            <h5 className="font-semibold text-base md:text-lg text-gray-800">
              Sub Total
            </h5>
            <h6 className="font-bold text-lg md:text-xl text-gray-900">
              ₹{subTotal}
            </h6>
          </div>


        </div>
      </div>
    </div>
  );
}