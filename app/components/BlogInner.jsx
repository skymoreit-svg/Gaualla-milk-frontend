

import Link from "next/link";

import React from "react";
import { FaGreaterThan } from "react-icons/fa6";
import Image from "next/image";
// import BlogLeft from "@/app/components/BlogLeft";
import BlogLeft from "./BlogLeft";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { FaPinterestP } from "react-icons/fa";
import { IoMdArrowRoundForward, IoMdShare } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";




export default function BlogInner({ currentBlog }) {
  const { author, category, date, para, title, imageUrl } = currentBlog;

  return (
    <>

      <div className="relative text-white">
        <div className="bg-cover bg-center bg-no-repeat relative bg-[url('/img/commonBanner/butter.webp')] h-[20vh] lg:h-[40vh] flex flex-col justify-center items-center">
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative text-center px-6 md:px-16 xl:px-40">
            <h1 className="text-2xl md:text-5xl lg:text-4xl uppercase">
              blogs / {title.split(" ").length > 3
                ? title.split(" ").slice(0, 3).join(" ") + "..."
                : title}
            </h1>


            <div className="flex items-center justify-center gap-x-2 mt-4 text-sm md:text-base">
              <Link href="/" className="hover:text-gray-300 transition">
                Home
              </Link>
              <FaGreaterThan className="text-xs opacity-70" />
              <span className="font-medium">blogs / {title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:flex px-0  md:px-12 xl:px-32  my-20">
        <div className="blog-details-desc w-full lg:w-2/3 px-3">
          <div className="blog-details-desc">
            <div className="article-image">
              <Image src={imageUrl.toLowerCase()} alt={title} width={1200} height={800} />
            </div>
            <div className="article-content mt-4">
              <div className="entry-meta">
                <ul className="block lg:flex gap-4 text-sm">
                  <li>
                    <span className="text-[#62371f]">Posted On:</span>
                    <Link href="" className="text-[#666666] ">
                      January 31 , 2021
                    </Link>
                  </li>
                  <li>
                    <span className="text-[#62371f]">Posted By:</span>
                    <Link href="" className="text-[#666666] ">
                      John Anderson
                    </Link>
                  </li>
                </ul>
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold my-4">
                {title}
              </h1>
              <p className="mb-4 text-base lg:text-lg text-justify text-[#212529] leading-[1.8]">
                Gaualla Milk Dairy hold a unique place in the cultural and culinary heritage of India. Known for their elegant golden-yellow sheen and long-lasting durability, brass have been used in Indian households for centuries. From royal kitchens and temples to rural homes, these are deeply rooted in tradition and spirituality. Cooking in brass is not just a cultural choice but a healthy one. Ayurveda, the ancient Indian system of medicine, recommends using brass because the alloy—made from copper and zinc—offers numerous health benefits.
              </p>

              <p className="mb-4 text-base lg:text-lg text-justify text-[#212529] leading-[1.8]">
                It is believed that brass helps balance the three doshas in the body (Vata, Pitta, and Kapha), improves digestion, and boosts immunity. Additionally, food stored or cooked in brass absorbs trace minerals, enhancing its nutritional value naturally.
              </p>

              <blockquote className="relative overflow-hidden bg-[#073439] p-12 text-center z-10 mb-5 mt-5">
                <p className="text-white leading-6 mb-0 italic font-medium text-base lg:text-lg">
                  <i
                    className="bx bxs-quote-left"
                    style={{
                      color: "#62371f",
                      fontSize: "100px",
                      position: "absolute",
                      left: "60px",
                      top: "20px",
                      zIndex: "-1",
                    }}
                  ></i>
                  In Indian spirituality, brass is considered a sacred metal. It is commonly used in rituals and religious ceremonies—brass lamps (deepams), pooja thalis, bells, and kalashas are believed to attract positive energy and purify the surroundings. The ringing of brass temple bells, for example, is not just symbolic but also said to clear the mind and space of negative energies. Beyond its spiritual value, brass is also a sustainable choice. Unlike modern cookware made from plastic or chemically-coated materials, brass is reusable, recyclable, and environmentally friendly. A single brass pot, when properly cared for, can last for generations—making it both an eco-conscious and economical investment.
                </p>
              </blockquote>

              <p className="mb-4 text-base lg:text-lg text-justify text-[#212529] leading-[1.8]">
                However, identifying and maintaining pure brass requires attention. Pure brass is non-magnetic, slightly heavy, and produces a deep sound when tapped. It should be cleaned regularly with natural ingredients like lemon, tamarind, or baking soda to retain its shine without damaging its surface. As modern kitchens evolve, brass is making a stylish comeback.
              </p>
            </div>

            <div className="article-footer mt-6 flex justify-between items-center">
              <div className="article-tags flex items-center">
                {/* <i className="bx bx-share-alt text-[#62371f] text-lg"></i> */}
                <IoMdShare className="text-[#62371f] text-lg" />

                <Link
                  href="#"
                  className="text-[#24416b] hover:text-[#62371f] font-semibold text-sm ml-2"
                >
                  Share
                </Link>
              </div>
              <div className="article-share">
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      className=" flex items-center justify-center w-8 h-8 leading-[33px] text-white text-center text-[14px] rounded-full bg-[#62371f] hover:bg-[#073439]"
                    >
                      <TiSocialFacebook className="text-2xl" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      className="flex items-center justify-center w-8 h-8 leading-[33px] text-white text-center text-[14px] rounded-full bg-[#62371f] hover:bg-[#073439]"
                    >
                      <FaTwitter className="text-2xl" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      className="flex items-center justify-center w-8 h-8 leading-[33px] text-white text-center text-[14px] rounded-full bg-[#62371f] hover:bg-[#073439]"
                    >
                      <RiLinkedinFill className="text-2xl" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      className="flex items-center justify-center w-8 h-8 leading-[33px] text-white text-center text-[14px] rounded-full bg-[#62371f] hover:bg-[#073439]"
                    >
                      <FaPinterestP className="text-2xl" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="post-navigation  mt-6 flex justify-between border-t border-b border-gray-200 py-5">
              <div className="nav-previous text-[#24416b] hover:text-[#62371f]">
                <Link
                  href="#"
                  className="flex gap-2 items-center font-semibold text-sm"
                >
                  <IoMdArrowRoundBack className="text-lg lg:text-xl" />
                  Prev Post
                </Link>
              </div>

              <div className="nav-next text-[#24416b] hover:text-[#62371f]">
                <Link
                  href="#"
                  className="flex gap-2 items-center font-semibold text-sm"
                >
                  Next Post
                  <IoMdArrowRoundForward className="text-lg lg:text-xl" />
                </Link>
              </div>
            </div>

            <div className="comments-area custom-shadow p-[25px] mt-8">
              <div className="relative">
                <h2 className="text-2xl font-semibold comments-title">
                  2 Comments:
                </h2>
                <span className="absolute h-6 w-[3px] bg-[#62371f] left-[-25px] top-1/2 transform -translate-y-1/2"></span>
              </div>
              <ol className="comment-list">
                <li className="comment mb-6">
                  <ol className="comment-list">
                    <li className="comment">
                      <div className="comment-body block lg:flex gap-4 items-start  py-4 px-0 lg:px-4 border-b border-gray-200">
                        <Image
                          src="/img#/cmt1.webp"
                          width={50}
                          height={50}
                          className="avatar rounded-full"
                          alt="Steven Smith"
                        />
                        <div>
                          <div className="comment-metadata mb-2 text-sm text-gray-500">
                            <h6 className="fn font-semibold mb-2 text-lg lg:text-xl">
                              John Jones
                            </h6>

                            <Link
                              href=""
                              className="uppercase text-[#666666] text-[11px] hover:text-[#62371f]"
                            >
                              January 24, 2021 at 10:59 am
                            </Link>
                          </div>

                          <div className="comment-content mb-2 text-justify text-sm text-[#212529] leading-[1.8]">
                            <p className="text-base lg:text-lg leading-[1.8] text-justify">
                              I recently started using Gaualla Milk Dairy in my daily cooking, and the difference has been remarkable. Not only do they add a beautiful, traditional aesthetic to my kitchen, but I also feel that the food tastes better—more wholesome and earthy. I've always heard from elders that cooking in brass has health benefits, and now I understand why.
                            </p>
                          </div>
                          <div className="reply">
                            <Link
                              href="#"
                              className="inline-block px-5 py-2 border border-[#ded9d9] hover:bg-[#62371f] hover:text-white text-[#24416b] rounded-full text-[13px] font-semibold uppercase relative z-10"
                            >
                              Reply
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Reply to First Comment */}
                      <ol className="children">
                        <li className="comment mt-4">
                          <div className="comment-body block lg:flex gap-4 items-start  py-4 px-0 lg:px-4 border-b border-gray-200">
                            <Image
                              src="/img#/cmt2.webp"
                              width={50}
                              height={50}
                              className="avatar rounded-full"
                              alt="Steven Smith"
                            />
                            <div>
                              <div className="comment-metadata mb-2 text-sm text-gray-500">
                                <h6 className="fn font-semibold mb-2 text-lg lg:text-xl">
                                  Steven Smith
                                </h6>

                                <Link
                                  href=""
                                  className="uppercase text-[#666666] text-[11px] hover:text-[#62371f]"
                                >
                                  January 24, 2021 at 10:59 am
                                </Link>
                              </div>

                              <div className="comment-content mb-2 text-justify text-sm text-[#212529] leading-[1.8]">
                                <p className="text-base lg:text-lg leading-[1.8] text-justify">
                                  Using brass has brought a sense of nostalgia and purpose to my cooking. I bought a brass handi and a serving bowl, both handmade by artisans from Rajasthan. The detailing is exquisite, and it feels amazing to use something crafted by hand rather than mass-produced. Brass takes a little extra care, but the natural cleaning methods work wonders.
                                </p>
                              </div>
                              <div className="reply">
                                <Link
                                  href="#"
                                  className="inline-block px-5 py-2 border border-[#ded9d9] hover:bg-[#62371f] hover:text-white text-[#24416b] rounded-full text-[13px] font-semibold uppercase relative z-10"
                                >
                                  Reply
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </li>

                    {/* Second Comment */}
                    <li className="comment mt-4">
                      <div className="comment-body block lg:flex gap-4 items-start  py-4 px-0 lg:px-4 border-b border-gray-200">
                        <Image
                          src="/img#/cmt3.webp"
                          width={50}
                          height={50}
                          className="avatar rounded-full"
                          alt="Steven Smith"
                        />
                        <div>
                          <div className="comment-metadata mb-2 text-sm text-gray-500">
                            <h6 className="fn font-semibold mb-2 text-lg lg:text-xl">
                              John Doe
                            </h6>

                            <Link
                              href=""
                              className="uppercase text-[#666666] text-[11px] hover:text-[#62371f]"
                            >
                              January 24, 2021 at 10:59 am
                            </Link>
                          </div>

                          <div className="comment-content mb-2 text-justify text-sm text-[#212529] leading-[1.8]">
                            <p className="text-base lg:text-lg leading-[1.8] text-justify">
                              My grandmother used to cook in brass utensils, and now I understand why she swore by them. After switching to brass for cooking and serving, I can honestly say there’s no going back. The food not only looks richer when served in brass, but also feels healthier. The retain heat well and are surprisingly versatile.
                            </p>
                          </div>
                          <div className="reply">
                            <Link
                              href="#"
                              className="inline-block px-5 py-2 border border-[#ded9d9] hover:bg-[#62371f] hover:text-white text-[#24416b] rounded-full text-[13px] font-semibold uppercase relative z-10"
                            >
                              Reply
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ol>
                </li>
              </ol>

              <div className="comment-respond mt-8">
                <div className="relative ">
                  <h2 className="text-[22px] font-semibold comments-title">
                    Leave a Reply
                  </h2>
                  <span className="absolute h-6 w-[3px] bg-[#62371f] left-[-25px] top-1/2 transform -translate-y-1/2"></span>
                </div>
                <p className="my-5 text-base lg:text-lg">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
                <form action="#" method="post" className="comment-form">
                  <div className="flex gap-8">
                    <div className="form-group w-full mb-4">
                      <label
                        htmlFor="name"
                        className="block  text-base lg:text-lg font-medium text-[#24416b] mb-2"
                      >
                        Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="block w-full bg-white border border-gray-200 p-2.5 outline-none transition duration-500"
                      />
                    </div>
                    <div className="form-group w-full mb-4">
                      <label
                        htmlFor="email"
                        className="block  text-base lg:text-lg font-medium text-[#24416b] mb-2"
                      >
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="block w-full bg-white border border-gray-200 p-2.5 outline-none transition duration-500"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label
                      htmlFor="email"
                      className="block  text-base lg:text-lg font-medium text-[#24416b] mb-2"
                    >
                      Website
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full bg-white border border-gray-200 p-2.5 outline-none transition duration-500"
                    />
                  </div>
                  <div className="comment-form-comment mb-4">
                    <label
                      htmlFor="comment"
                      className="block  text-base lg:text-lg font-medium text-[#24416b] mb-2"
                    >
                      Comment
                    </label>
                    <textarea
                      name="comment"
                      id="comment"
                      cols="45"
                      rows="5"
                      maxLength="65525"
                      required
                      className="block w-full bg-white border border-gray-200 p-2.5 focus:outline-none transition duration-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#62371f] text-white py-[14px] px-[30px] inline-block cursor-pointer outline-none rounded-none uppercase transition-all duration-500 font-medium  text-base lg:text-lg hover:bg-[#24416b] hover:text-white"
                  >
                    Post a Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="widget-area widget-area-left w-full lg:w-1/3 px-3  mt-10 lg:mt-0 ">
          <BlogLeft />
        </div>
      </div>
    </>
  );
}
