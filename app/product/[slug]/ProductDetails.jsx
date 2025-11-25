"use client";
import React, { useState, useEffect } from "react";

import { FaPlus } from "react-icons/fa6";

import Description from "./Description ";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import AyutramartProduct from "../../AyutramartData";
import ProductAyurvedCard from "@/app/components/ProductAyurvedCard";
import { FaStar } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { FaMinus } from "react-icons/fa";




import { addCart } from "@/app/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import SecurePayments from "@/app/components/Payments";
import FAQSection from "@/app/components/Faq";
import BenefitsTable from "@/app/components/Benefits";
import axios from "axios";
import { baseurl, imageurl } from "@/app/components/utlis/apis";
import { useRouter } from "next/navigation";
import Coundown from "./Coundown";
import Swal from "sweetalert2";

const ProductDetails = ({ slug }) => {
  const route = useRouter()
  const { info, isLoading, isError, errorMessage } = useSelector(
    (state) => state.user
  );
  const [loader, setLoader] = useState(true)
  const [userLogin, setUserLogin] = useState(false)
  const [activeImg, setActiveImg] = useState(null);
  const [inCart, setIncart] = useState(false)
  const [readMore, setReadMore] = useState(false);
  // const items = [
  //   {
  //     img: "/img/truck.svg",
  //     text: "Free shipping",
  //   },
  //   {
  //     img: "/img/delivery.svg",
  //     text: "Delivery ",
  //   },
  //   {
  //     img: "/img/exchange.svg",
  //     text: "7-days exchange",
  //   },
  //   {
  //     img: "/img/life.svg",
  //     text: "life time warranty",
  //   },
  // ];
  const [productData, setProductData] = useState()
  const [AyutramartProduct, setAyutramartProduct] = useState()

  const fetchallProduct = async () => {
    const response = await axios.get(`${baseurl}/getproduct/all`)
    const data = await response.data;
    if (data.success) {

      setAyutramartProduct(data.product)


    }

  }


  const fetchproduct = async () => {
    setLoader(true)
    const response = await axios.get(`${baseurl}/getproduct/product/${slug}`)
    const data = await response.data;
    if (data.success) {
      setProductData(data.product)
      setActiveImg(data.product.images[0])
      fetchAllreadyincart(data.product?.id)



    }
    setLoader(false)
  }
  const fetchAllreadyincart = async (productid) => {
    const response = await axios.get(`${baseurl}/cart/cart/${productid}`)
    const data = response.data;
    if (data.success) {
      setIncart(true)
    }

  }

  const handeladdtocart = async (product_id, price) => {

    if (!userLogin) {
      route.push("/login");
    }

    const response = await axios.post(`${baseurl}/cart/addtocart`, { product_id, price })
    const data = await response.data;
    if (data.success) {
      Swal.fire({
        title: data.message,
        icon: "success",
        draggable: true
      });
      setIncart(true)
      location.reload()

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login for Add to Product",

      });
    }

  }


  useEffect(() => {



    fetchproduct()
    fetchallProduct()


  }, [])



  useEffect(() => {

    if (!isLoading) {
      if (info?.success) {
        setUserLogin(true)

      }


    }


  }, [isLoading])
















  const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
  );


  if (loader) {
    return (<div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[84px_minmax(0,1fr)] lg:grid-cols-[96px_minmax(0,1fr)_minmax(320px,400px)]">
        {/* Left: vertical thumbnails */}
        <div className="hidden md:flex md:flex-col md:gap-4">
          <Skeleton className="h-24 w-20" />
          <Skeleton className="h-24 w-20" />
          <Skeleton className="h-24 w-20" />
        </div>

        {/* Center: main image */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 p-2">
          <div className="aspect-square w-full">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        </div>

        {/* Right: product info */}
        <div className="mt-2 space-y-5 lg:mt-0">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-6 w-40" />
          </div>

          {/* Rating row */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-12" />
          </div>

          {/* Trust badge / line */}
          <Skeleton className="h-4 w-80" />

          {/* Description preview */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Price card */}
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="flex items-end gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-7 w-24" />
              </div>
              <Skeleton className="ml-auto h-4 w-48" />
            </div>
            <div className="mt-3">
              <Skeleton className="h-5 w-24" />
            </div>
          </div>

          {/* Rewards / offer stripe */}
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          {/* Size selector */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-10" />
            <div className="flex gap-3">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>

          {/* Quantity + CTA */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-14" />
              <Skeleton className="h-10 w-10" />
            </div>
            <Skeleton className="h-12 flex-1" />
          </div>

          {/* Meta rows */}
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-44" />
          </div>
        </div>
      </div>

      {/* Mobile-only thumb strip */}
      <div className="mt-6 flex gap-3 md:hidden">
        <Skeleton className="h-20 w-20" />
        <Skeleton className="h-20 w-20" />
        <Skeleton className="h-20 w-20" />
        <Skeleton className="h-20 w-20" />
      </div>
    </div>)
  }


  return (
    <>
      <div className="bg-[#f3f1ec76]">
        <div className="container mx-auto overflow-hidden">
          <div className=" w-full py-10 lg:py-16 px-5 md:px-12 xl:px-32 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start  gap-8 ">
            <div className="leftside flex flex-col-reverse xl:flex-row gap-5 items-center justify-center relative lg:sticky top-0 lg:top-20 h-full">

              <div className="sideimages scrollbar-hide hidden lg:flex flex-wrap justify-center gap-2 xl:block w-full xl:w-auto  lg:h-[500px] overflow-auto">
                {JSON.parse(productData?.images)?.map((elm, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImg(elm)}
                    className={`lg:w-[150px]  md:w-[23%] h-[80px] sm:h-[150px] border border-green-500 cursor-pointer ${index !== 0 ? 'mt-0 lg:mt-2' : ''
                      }`}
                  >
                    <img src={`${imageurl}/${elm}`} className="w-full h-full " />
                  </div>
                ))}
              </div>

              <div className="mainimage max-w-md mx-auto relative ">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  autoplay={{
                    delay: 3000, // slide every 3 seconds
                    disableOnInteraction: false, // keep autoplay after swipe
                  }}
                  pagination={{ clickable: true }}
                  loop={true} // infinite loop
                  className="w-[86%] lg:w-full h-auto md:h-[500px] overflow-hidden"
                >
                  {JSON.parse(productData?.images || "[]").map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={`${imageurl}/${img}`}
                        alt={`Image ${i}`}
                        className="w-full h-full p-5 lg:p-0"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>




            <div className="rightside w-full lg:w-[70%] flex justify-center h-full mt-5 md:mt-0  ">
              <div className="max-w-2xl w-full space-y-4">
                <h5 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  {productData?.name}                </h5>

                <div className="flex items-center gap-x-2 text-sm text-gray-600">
                  <FaStar className="text-yellow-400 text-lg" />
                  <span>4.52/5 (4785)</span>
                </div>

                <p className="text-green-500 text-base">
                  {productData?.name}
                  <strong className="font-bold">
                    {" "}trusted by 200+  home
                  </strong>
                </p>


                {readMore ? (<>
                  <div className="space-y-4 border-b pb-4 text-gray-700 text-base md:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: productData?.description2 ? productData?.description2 : "" }}>




                  </div>

                  <p
                    className="mt-2 text-green-600 hover:text-green-800 transition font-medium flex items-center gap-x-1"
                    onClick={() => setReadMore(false)}
                  >
                    Read Less <IoIosArrowUp />
                  </p>
                </>

                ) : (
                  <>
                    <div className="border-b pb-2 text-base text-gray-700 flex gap-2 items-center">
                      <p>
                        {productData?.description2
                          ? productData.description2.replace(/<[^>]+>/g, "").slice(0, 75) + "..."
                          : ""}
                      </p>                      <span
                        className=" text-green-600 font-semibold hover:text-green-800 transition flex items-center gap-x-1"
                        onClick={() => setReadMore(true)}
                      >
                        Read More <IoIosArrowUp className="rotate-180" />
                      </span>
                    </div>
                  </>
                )}

                <div className="bg-[#f0f5e0] px-5 py-4 rounded-md mt-4 shadow-sm  bloxk lg:flex gap-2  ">
                  <div className="flex items-center justify-between w-full gap-4 text-lg md:text-xl font-medium">
                    <div>
                      <span className="text-gray-400 line-through">₹{productData?.old_price}</span>
                      <span className="text-black font-semibold ms-3">₹{productData?.price}</span>


                      <p className="text-green-600 font-semibold ">
                        {(((productData?.old_price - productData?.price) / productData?.old_price) * 100).toFixed(2)}% OFF                    </p>

                    </div>  </div>
                  <p className="text-center md:text-start text-lg font-semibold">
                    MRP (incl. of all taxes)
                  </p>
                </div>
                <div className="  flex flex-col sm:flex-row items-center  justify-center md:justify-start px-4 py-2 gap-x-2  text-center bg-[#ebede57c]  ">
                  <div className="flex items-center gap-x-1" >
                    Earn{" "}
                    <img
                      src="/img/product/coin.webp"
                      alt="coin"
                      className="w-4 h-4"
                    />
                    <span className="font-semibold text-base md:text-lg">50</span>
                  </div>
                  {productData?.name}   Coins on this order
                </div>



                <div className="mt-6 flex flex-col gap-4">


                  <div className="variant-wrapper size flex gap-5">
                    <label htmlFor="size-1.5L" className="block text-sm font-medium mb-2">
                      Size:
                    </label>

                    <span


                      htmlFor="size-1.5L"
                      className={`variant__button-label  cursor-pointer border  px-4 py-2 rounded peer-checked:bg-[#62371f] peer-checked:text-white transition *
                            
                             border-green-800 text-green-800 font-semibold
                            `}
                    >
                      <span>{productData?.unit_quantity}</span>
                    </span>





                  </div>

                  <div className="flex gap-3 lg:gap-6">
                    {/* <div className="flex items-center border border-gray-400 overflow-hidden rounded-lg w-max ">
                      <button
                        onClick={() => (qnty > 1 ? setQnty(qnty - 1) : null)}

                        className="px-2 lg:px-3 py-1 lg:py-2 hover:bg-[#eee]"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-4  border-x">{qnty}</span>

                      <button onClick={() => setQnty(qnty + 1)} className="px-3 py-2 hover:bg-[#eee]">
                        <FaPlus />
                      </button>
                    </div> */}
                    <div className="flex gap-3 text-xl">
                      {inCart ? <button
                        // onClick={() => {
                        //  handeladdtocart(productData?.id)
                        // }
                        // }
                        className="px-2  p-2 lg:px-4 text-center bg-[#62371f] text-white text-xs lg:text-sm rounded-lg hover:bg-[#87c243]"
                      >
                        Go to Cart
                      </button> :
                        <button
                          onClick={() => {
                            handeladdtocart(productData?.id, productData?.price)
                          }
                          }
                          className="px-2  p-2 lg:px-4 text-center bg-[#62371f] text-white text-xs lg:text-sm rounded-lg hover:bg-[#87c243]"
                        >
                          ADD TO CART
                        </button>
                      }


                      <button className="hidden  p-2 lg:px-4 border border-gray-400 text-xs lg:text-sm  rounded-lg hover:bg-[#073439] hover:text-white">
                        BUY NOW
                      </button>
                    </div>
                    {/* <Coundown /> */}
                  </div>


                  {/* <div className="flex flex-wrap justify-start gap-2 lg:gap-6 py-3 border-y mt-2 ">
                    {items?.map((item, index) => (
                      <div key={index} className="flex flex-col items-center text-center max-w-[120px]">
                        <div className="mb-2">
                          <img src={item.img} alt={item.text} className="w-10 h-10" />
                        </div>
                        <p className="text-sm text-gray-800 font-medium">{item.text}</p>
                      </div>
                    ))}
                  </div> */}

                  <SecurePayments />


                </div>
              </div>
            </div>
          </div>

          <div className="product-Description">
            <Description data={productData?.description} />
          </div>


          <BenefitsTable />


          <div className="related-product py-10  px-5 md:px-12 xl:px-32">
            <h5 className="text-2xl md:text-3xl lg:text-4xl text-center ">
              Things you’ll love
            </h5>

            <div className=" mt-5 md:mt-10 gap-x-4 gap-y-4 lg:gap-y-8">
              <Swiper
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
                className="mySwiper"
              >
                {AyutramartProduct?.map((elm, index) => (
                  <SwiperSlide key={index}>
                    <ProductAyurvedCard product={elm} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <FAQSection />


        </div>
      </div>
    </>
  );
};

export default ProductDetails;
