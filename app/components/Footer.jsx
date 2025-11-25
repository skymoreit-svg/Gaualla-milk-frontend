

"use client";
import Link from "next/link";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import BottomfixLinks from "./BottomfixLinks";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "./utlis/apis";

const Footer = () => {



  const [categoryData, setCategorydata] = useState()




  const fetchcategory = async () => {
    const response = await axios.get(`${baseurl}/category`)
    const data = await response.data;
    if (data.success) {
      setCategorydata(data.category)
    }

  }

  useEffect(() => {
    fetchcategory()
  }, []);


  const pathName = usePathname();

  const check = pathName == "/";


  return (
    <>
      {/* WhatsApp Button */}
     <a
  href="https://wa.me/+918378000052"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-8 right-2.5 z-50"
>
  <img
    src="/whatsapp.webp"
    alt="WhatsApp"
    className="w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce"
  />
</a>

<a
  href="tel:+918378000052"
  className="fixed bottom-[85px] right-3 z-50"
>
  <img
    src="/phone-call.webp"
    alt="Call Us"
    className="w-10 h-10 bg-white rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce"
  />
</a>


      <footer
        className="bg-[url('/footer.webp')] bg-cover bg-center bg-no-repeat mb-20 md:mb-0 text-white border-t border-[#eee] pt-10 px-5 md:px-12 xl:px-32 relative overflow-hidden"
      > <div className="absolute inset-0 bg-white/60"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-y-10  justify-between mb-8">
            <div className="space-y-4 lg:w-[30%]">
              <Link href="/" className="">
                <img
                  src="/img/logo.webp"
                  alt="logo"
                  className="w-32 md:w-28 lg:w-48"
                />


              </Link>
              <p className="mt-2  text-lg text-gray-800 hover:text-gray-800 transition-colors duration-200">
                Experience the essence of natural wellness with Gaualla Milk Dairy. Our dairy products are pure, chemical-free, and crafted with care to promote holistic health and nourishment.
              </p>
              <div className="flex items-center text-xl gap-x-2">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  className="w-10 h-10 bg-[#62371f] rounded-lg flex justify-center items-center"
                >
                  <RiInstagramFill className="text-2xl shadow-2xl " />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  className="w-10 h-10 bg-[#62371f] rounded-lg flex justify-center items-center"
                >
                  <FaFacebook className="text-2xl" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  className="w-10 h-10 bg-[#62371f] rounded-lg flex justify-center items-center"
                >
                  <FaTwitter className="text-2xl" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  className="w-10 h-10 bg-[#62371f] rounded-lg flex justify-center items-center"
                >
                  <FaYoutube className="text-2xl" />
                </a>
              </div>
            </div>

            <div className="space-y-2 hidden lg:block">
              <h2 className="text-xl text-gray-800 font-bold">Quick Links</h2>
              <ul className="space-y-2 text-gray-800  transition-colors duration-200 text-lg">
                <li className="hover:text-gray-800">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-gray-800">
                  <Link href="/about">About</Link>
                </li>
                <li className="hover:text-gray-800">
                  <Link href="/product/?name=all">Product</Link>
                </li>
                <li className="hover:text-gray-800">
                  <Link href="#">Blogs</Link>
                </li>

                <li className="hover:text-gray-800">
                  <Link href="/contact-us">Contact Us</Link>
                </li>

              </ul>
            </div>

            <div className="space-y-2 hidden lg:block">
              <h2 className="text-xl text-gray-800 font-bold ">Our Products</h2>

              <ul className="space-y-2 text-gray-800  transition-colors duration-200 text-lg  ">
                {categoryData?.slice(0, 5).map((elm, index) => (
                  <li key={index} className="hover:text-gray-800 capitalize">
                    <Link
                      href={`/product?name=${elm.name}`}
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth", // smooth scroll
                        });
                      }}
                    >
                      {elm.name}
                    </Link>
                  </li>

                ))}

              </ul>
            </div>

            <div className="grid grid-cols-2 lg:hidden pl-4 ">
              <div className="space-y-2 ">
                <h2 className="text-xl text-gray-800 font-bold ">Our Links</h2>
                <ul className="space-y-2 text-gray-800  transition-colors duration-200 text-lg">
                  <li className="hover:text-gray-800 ">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="hover:text-gray-800">
                    <Link href="#">Blogs</Link>
                  </li>
                  <li className="hover:text-gray-800">
                    <Link href="/about">About</Link>
                  </li>
                  <li className="hover:text-gray-800">
                    <Link href="/contact-us/">Contact Us</Link>
                  </li>
                  <li className="hover:text-gray-800">
                    <Link href="/contact-us/">Product</Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl text-gray-800 font-bold">Our Prodcuts</h2>

                <ul className="space-y-2 text-gray-800  transition-colors duration-200 text-lg ">
                  {categoryData?.slice(0, 5).map((item, index) =>
                    <li className="hover:text-gray-800" key={index}>
                      <Link href={`/product?name=${item.name}`} className="capitalize">{item.name}</Link>
                    </li>)

                  }

                </ul>
              </div>
            </div>

            <div className="space-y-2 lg:w-[35%] xl:w-[30%] flex flex-col items-start ">
              <h2 className="text-xl text-gray-800 font-bold ">Our Address</h2>

              {/* <h6 className="">Head Office</h6> */}
              <div className="flex items-start gap-x-2  text-lg text-gray-800 hover:text-gray-800 transition-colors duration-200">
                <IoLocationOutline className="mt-2 text-lg" />
                <p className="xl:text-nowrap">
                  Booth No 7, Pocket C, Wave Estate, <br />
                  Sector 85, Mohali, 140306, India
                </p>
              </div>
              <div className="flex flex-col gap-y-2 text-lg text-gray-800 hover:text-gray-800 transition-colors duration-200 ">
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


            </div>
          </div>
        </div>

        <hr className="text-gray-200" />
        <div className="py-5 container mx-auto  relative z-10">
          <div className="md:flex flex-wrap lg:justify-between items-center text-sm text-white justify-center md">
            <p className="text-center text-lg text-gray-800 hover:text-gray-800 transition-colors duration-200">
              © {new Date().getFullYear()} Gaualla Milk . All rights reserved.
            </p>
            <p className="text-lg text-gray-800 hover:text-gray-800 transition-colors duration-200">
              <span className="flex md justify-center md">
                Designed by&nbsp;
                <a
                  href="https://skymoreitsolutions.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Skymore It Solutions ❤️
                </a>
              </span>
            </p>
            <div className="space-x-4 mb-2 md:mb-0  flex md justify-center md">
              <Link
                className="text-sm lg:text-lg text-gray-800 hover:text-gray-800 transition-colors duration-200"
                href="/privacy-Policy"
              >
                Privacy Policy |
              </Link>
              <Link
                className="text-sm lg:text-lg text-gray-800 hover:text-gray-800 transition-colors duration-200"
                href="/terms-condition"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
      {check && <BottomfixLinks />}
    </>
  );
};

export default Footer;
