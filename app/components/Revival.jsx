"use client";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShieldCheck, Smartphone } from "lucide-react";

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
                    <div className="w-full lg:w-[50%] space-y-6">
                        <div className="flex justify-center lg:justify-start items-center gap-x-2">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div key={i} className="rounded-full h-2 w-2 bg-[var(--primary)]/30"></div>
                            ))}
                            <span className="uppercase text-[var(--primary)] font-bold text-xs tracking-wider">
                                Order Now and Savor the Purity
                            </span>
                        </div>

                        <h5 className="text-text font-bold text-2xl lg:text-4xl xl:text-5xl font-serif">
                            Bring Home the Goodness of <span className="text-[var(--primary)]">Gaualla</span>
                        </h5>

                        <p className="text-base md:text-lg text-gray-700 font-medium">
                            Treat yourself to the real taste, simplicity, and tradition of our premium dairy items.
                            Made with thoughtfulness, love, and meant to keep your family healthy.
                        </p>

                        {/* Structured Highlights */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-start gap-4 text-left">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-[var(--primary)] shrink-0">
                                    <Sparkles className="w-5 h-5 animate-pulse" />
                                </div>
                                <div>
                                    <h6 className="text-text font-bold text-base">Pure A2 Tradition</h6>
                                    <p className="text-sm text-gray-600">From farm-fresh A2 cow milk to traditional Bilona A2 ghee, experience unadulterated goodness.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-left">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-[var(--primary)] shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h6 className="text-text font-bold text-base">Unbeatable Quality</h6>
                                    <p className="text-sm text-gray-600">Our dairy is hygienically processed and strictly chemical-free, ensuring complete trust in every drop.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-left">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-[var(--primary)] shrink-0">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h6 className="text-text font-bold text-base">Seamless App Ordering</h6>
                                    <p className="text-sm text-gray-600">Subscribe or order fresh milk and milk products daily with just a few taps using our mobile app.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/product?name=all"
                                className="flex mx-auto lg:mx-0 group items-center gap-x-2 px-8 py-3 bg-[var(--primary)] hover:bg-[#4a2917] text-white font-bold rounded-full w-fit transition-all duration-300 transform hover:scale-105"
                            >
                                Order Now
                                <FaLongArrowAltRight className="group-hover:translate-x-2 duration-200 ease-in transition-transform" />
                            </Link>
                        </div>
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
