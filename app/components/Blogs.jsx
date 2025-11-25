
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaComments } from "react-icons/fa6";

export default function Blogs() {
  const blogData1 = [
    {
      image: "/img1.webp",
      title: "Health Benefits of Drinking Milk Daily",
      shape: "/img#/shape.webp",
      author: "By admin",
      comments: "2 comments",
      description:
        "Milk is often called a “complete food” because it contains calcium, protein, vitamins, and minerals essential for our body. ",
    },
    {
      image: "/img2.webp",
      title: "Why Milk is Called a Superfood",
      shape: "/img#/shape.webp",
      author: "By admin",
      comments: "2 comments",
      description:
        "Milk is not just a beverage – it’s a powerhouse of nutrients. From calcium and vitamin D for strong bones to protein for energy and muscle repair.",
    },
  ];

  const blogData2 = [
    {
      image: "/img3.webp",
      title: "Best Times to Drink Milk – Morning or Night?",
      shape: "/img#/shape.webp",
      author: "By admin",
      comments: "2 comments",
      description:
        "Many people wonder when it’s best to drink milk. Morning milk gives energy to start the day, while warm milk at night helps in relaxation and better sleep.",
    },
    {
      image: "/img4.webp",
      title: "Milk for Fitness & Bodybuilding",
      shape: "/img#/shape.webp",
      author: "By admin",
      comments: "2 comments",
      description:
        "Milk is one of the best natural protein drinks. It helps in muscle recovery, provides energy after workouts, and is cheaper than artificial supplements.",
    },
  ];

  return (
    <div className="latest-blogs relative z-10 pt-10 md:pt-10">
      <div className="text-center  px-5 md:px-12 xl:px-32 w-full lg:w-[70%] mx-auto">
        <h2 className="text-2xl  text-black md:text-3xl lg:text-4xl italic font-bold">
          Our Blogs
        </h2>
        <p className="text-base md:text-lg mt-2">
          {/* Stay updated with our latest insights, tips, and stories about the world of dairy, healthy living, and more. Our blogs bring you informative and engaging content directly from experts. */}
        </p>
      </div>

      <div className="mt-5  md:mt-12 grid grid-cols-1 md:grid-cols-2 md:gap-y-5 lg:gap-y-0 lg:grid-cols-4 relative">
        {blogData1.map((item, index) => (
          <div key={index} className="contents">
            <div className="">
              <img src={item.image} alt="" className=" object-cover w-auto md:h-full md:w-full" />
            </div>
            <div className="p-4 lg:p-6 space-y-4 flex flex-col items-center text-center">

              <h5 className="font-bold font-serif text-2xl">{item.title}</h5>
              <img src={item.shape} alt="" />
              <div className="text-xs flex items-center gap-x-4">
                <p className="flex items-center gap-x-2">
                  <FaCalendarAlt className="text-[#62371f]" />
                  <span className="text-gray-400">{item.author}</span>
                </p>
                <p className="flex items-center gap-x-2">
                  <FaComments className="text-[#62371f]" />
                  <span className="text-gray-400">{item.comments}</span>
                </p>
              </div>
              <p className="text-center text-base text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        {blogData2.map((item, index) => (
          <div key={index} className=" flex  flex-col-reverse md:contents mt-5  md:mt-10 lg:mt-0 lg:space-y-0">
            <div className="p-4 lg:p-6 space-y-4 flex flex-col items-center text-center">

              <h5 className="font-bold font-serif text-2xl">{item.title}</h5>
              <img src={item.shape} alt="" />
              <div className="text-xs flex items-center gap-x-4">
                <p className="flex items-center gap-x-2">
                  <FaCalendarAlt className="text-[#62371f]" />
                  <span className="text-gray-400">{item.author}</span>
                </p>
                <p className="flex items-center gap-x-2">
                  <FaComments className="text-[#62371f]" />
                  <span className="text-gray-400">{item.comments}</span>
                </p>
              </div>
              <p className="text-center text-base text-gray-500">
                {item.description}
              </p>
            </div>
            <div className="">
              <img src={item.image} alt="" className="h-auto w-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
