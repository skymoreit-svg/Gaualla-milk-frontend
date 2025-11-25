

import Link from "next/link";
import React from "react";
// import BlogLeft from "../Components/BlogLeft";
import BlogLeft from "./BlogLeft";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { FaGreaterThan } from "react-icons/fa6";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import OtherBanner from "./OtherBanner";

const BlogPage = ({ blogs }) => {


  return (
    <>
      <OtherBanner  text={"Blogs"}/>

      <div className="flex flex-wrap gap-10 lg:gap-0 px-0 md:px-12 xl:px-32 my-20">
        <div className="widget-area widget-area-left relative top-0 lg:sticky lg:top-10 h-full w-full lg:w-[28%] px-3 lg:order-1 order-2">
          <BlogLeft />
        </div>
        <div className="blog-details-desc w-full lg:w-[70%] px-3 lg:order-2 order-1">
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((blog, index) => (
              <div key={index} className="card-second ">
                <Link
                  href={`#/${blog.title
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "")
                    .trim()
                    .split(/\s+/)
                    .join("-")}`}
                >
                  {" "}
                  <Image
                    src={blog.imageUrl.toLowerCase()}
                    alt={blog.title}
                    width={900}
                    height={800}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                </Link>
                <div className="bg-white rounded-md py-2  shadow-lg text-black h-max lg:h-max mx-[5px] p-5 relative top-[-10px] transition-all duration-500 z-50">
                  <p className="text-lg text-left text-[#7a7e9a]">
                    <span className="text-[#62371f] "> By: {blog.author} </span>
                    / {blog.category} / {blog.date}
                  </p>
                  <Link
                    href={`#/${blog.title
                      .toLowerCase()
                      .replace(/[^a-z0-9\s]/g, "")
                      .trim()
                      .split(/\s+/)
                      .join("-")}`}
                  >
                    <h3 className="text-md text-[#24416b] sm:text-lg lg:text-xl font-semibold my-2 text-left">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-base  lg:text-lg leading-7">
                    {blog.para}{" "}
                  </p>
                  <Link
                    href={`#/${blog.title
                      .toLowerCase()
                      .replace(/[^a-z0-9\s]/g, "")
                      .trim()
                      .split(/\s+/)
                      .join("-")}`}
                    className="text-[#62371f] text-lg mt-2 flex items-center"
                  >
                    Read More{" "}
                    <span className="ml-2 border border-[#62371f] hover:bg-[#62371f] hover:text-white rounded-full p-1">
                      <FaArrowRight />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="page-navigation-area flex justify-center mt-12">
            <nav aria-label="Page navigation example">
              <ul className="pagination flex gap-2">
                <li className="page-item">
                  <Link
                    href="#"
                    className="page-link page-links flex items-center justify-center w-10 h-10  bg-white custom-shadow hover:bg-[#62371f] hover:text-white"
                  >
                    <MdKeyboardDoubleArrowLeft />
                  </Link>
                </li>
                <li className="page-item">
                  <Link
                    href="#"
                    className="page-link flex items-center justify-center custom-shadow w-10 h-10  bg-[#62371f] text-white"
                  >
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link
                    href="#"
                    className="page-link flex items-center justify-center w-10 h-10  bg-white custom-shadow hover:bg-[#62371f] hover:text-white"
                  >
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link
                    href="#"
                    className="page-link flex items-center justify-center w-10 h-10  bg-white custom-shadow hover:bg-[#62371f] hover:text-white"
                  >
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link
                    href="#"
                    className="page-link page-links flex items-center justify-center w-10 h-10  bg-white custom-shadow hover:bg-[#62371f] hover:text-white"
                  >
                    <MdKeyboardDoubleArrowLeft className="rotate-180" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
