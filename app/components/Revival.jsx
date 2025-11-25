"use client";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Revival() {
    const calculateTimeLeft = () => {
        const targetDate = new Date("2025-05-01T00:00:00");
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            return {
                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",
            };
        }

        return {
            days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
            hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
            minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
            seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="lg:pr-10 ">
            <div className="relative bg-[#F8FDE6] lg:rounded-r-full xl:min-h-[80vh] mt-10 mb-10 lg:mb-20 overflow-hidden">
                <div className="h-full flex flex-col lg:flex-row text-center lg:text-start items-start lg:items-center gap-4 lg:gap-x-10 justify-center py-5 lg:py-16 px-5 md:px-12 lg:px-0 xl:pl-0 transition-opacity duration-1000 ease-in-out ">

                    {/* LEFT SIDE TEXT */}
                    <div className="w-full lg:w-[50%] space-y-5">
                        <div className="flex justify-center lg:justify-start items-center gap-x-2">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div key={i} className="rounded-full h-2 w-2 border border-[#62371f]"></div>
                            ))}
                            <span className="uppercase text-[#62371f]">
                                Order Now and Savor the Purity
                            </span>
                        </div>

                        <h5 className="text-black font-bold text-2xl lg:text-4xl xl:text-5xl font-serif">
                            Bring Home the Goodness of Gaualla
                        </h5>

                        <p className="text-base md:text-lg xl:text-xl text-gray-500">
                            Treat yourself to the real taste, simplicity, and tradition of our premium dairy items. 
                            All of our products, from the A2 desi cow milk to the bilona A2 ghee and desi cow paneer, 
                            are made with thoughtfulness, love, and are meant to keep your family healthy. 
                            Order now and feel what Gaualla is all about.
                        </p>

                        <p className="text-gray-600">
                            The purity of milk is blended with tradition at Gaualla, Thata. Buy premium quality fresh cow milk 
                            from us because we sell dairy products that are refreshed, wholesome, and carefully made—
                            full of healthy nutrients, based on traditions, and unbeatable in quality.
                        </p>

                        <p className="text-gray-600">
                            You can buy standardized milk online—farm-fresh dairy right at your home. Give your family 
                            nutrient-rich A2 desi cow ghee, milk, and many more healthy dairy items. 
                            Feel free to buy hygienic processed goods that are made with care and attention.
                        </p>

                        <p className="text-gray-600">
                            Order your fresh milk with the Gaualla App; it only takes a few taps.
                        </p>

                        <button className="flex mx-auto lg:mx-0 group items-center gap-x-2 px-5 py-2 lg:px-8 bg-[#62371f] text-white font-bold rounded-3xl">
                            Order Now
                            <FaLongArrowAltRight className="group-hover:translate-x-2 duration-200 ease-in transition-transform" />
                        </button>
                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    {/* <div className="rounded-full p-10"> */}
                    <div
                        className="mx-auto lg:mx-0 h-[250px] w-[250px] xl:h-[550px] md:h-[170px] md:w-[170px] lg:w-[300px] lg:h-[300px] xl:w-[38%]    "
                       
                    >

                        <img src="/img4.webp" alt="" className="w-full h-full" />
                    </div>

                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}
