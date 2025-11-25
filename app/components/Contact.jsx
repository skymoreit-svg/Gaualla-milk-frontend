// "use client"
import React from "react";

import {
  FaMapLocationDot,
  FaPhoneVolume,
  FaEnvelopeCircleCheck,
} from "react-icons/fa6";
import CommonForm from "./CommonForm";
import OtherBanner from "./OtherBanner";
import Link from "next/link";

export default function Contact() {
  const contactInfo = [
    {
      icon: <FaMapLocationDot />,
      link: "#",
      title: "Our Address",
      text: "Booth No 7, Pocket C, Wave Estate,",
      text1: "Sector 85, Mohali, 140306, India"

    },

    {
      icon: <FaEnvelopeCircleCheck />,
      link: "mailto:gauallamilkpvtltd@gmail.com",
      title: "Email Us",
      text: "gauallamilkpvtltd@gmail.com",

    },
    {
      icon: <FaPhoneVolume />,
      link: "tel:+91-8378-000052",
      title: "Call Us",
      text: "+91-8378-000052",


    },
  ];
  return (
    <>
      <div className="">
        <OtherBanner text={"Contact Us"} />

        <div className="relative px-5 md:px-12 xl:px-32 py-5 md:py-10 bg-[url('/cta-bg.webp')] bg-cover bg-center bg-no-repeat">
          <img
            src="/img/anime/anime1.webp"
            alt="anime"
            className="float-left hidden lg:block w-md -z-10 absolute -left-10 top-0 opacity-40"
          />
          <img
            src="/img/anime/anime2.webp"
            alt="anime"
            className="float-right hidden  w-md -z-10 absolute right-0 bottom-0 opacity-40"
          />

          <div>
            <div className="flex flex-col items-center justify-center gap-y-4 text-center">
              <img src="/img/contact-us/1.webp" alt="" />
              <h6 className="text-gray-400 text-lg lg:text-xl">
                Get in Touch With Us
              </h6>
              <h5 className="font-semibold text-slate-700 text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                Do You’ve Any Question? <br />
                Write us a Message
              </h5>
              <p>Have any queries about our A2 cow milk? Or about our farm-to-home delivery? We are here to help you in your healthy way of life journey. At Gaualla, we deliver you pure, natural A2 milk from indigenous cows and make sure every drop is fresh as can be.

                If you have any queries, please complete the form below and one of the team will be in touch shortly.
              </p>
            </div>
            <div className=" flex  lg:mt-12 relative z-10 items-center flex-col lg:flex-row gap-x-10">
              <div className="left w-full lg:w-[70%]">
                <div className="form-container mt-4 lg:mt-8">
                  <form>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="bg-white px-5 py-3 text-lg md:text-xl font-serif rounded outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Email Address"
                        className="bg-white px-5 py-3 text-lg lg:text-xl font-serif rounded outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        className="bg-white px-5 py-3 text-lg md:text-xl font-serif rounded outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Products"
                        className="bg-white px-5 py-3 text-lg md:text-xl font-serif rounded outline-none"
                      />
                    </div>

                    <textarea
                      placeholder="Write your message"
                      className="bg-white px-5 py-3 text-lg md:text-xl rounded h-40 lg:h-60 w-full mt-4 outline-none"
                    ></textarea>


                    <button className="bg-[#60BE74] mt-3 px-6 lg:px-8 py-1  md:py-2 lg:py-3 rounded text-white text-lg lg:text-xl font-semibold">
                      Send A Message
                    </button>


                  </form>
                </div>
              </div>

              <div className="right mt-4 md:mt-6 lg:mt-0 w-full lg:w-[30%]    ">
                <div className="grid w-full  grid-col s-1 md:grid-cols-3 lg:grid-cols-1 gap-6 relative">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="contact-info  p-4 flex flex-col  lg:flex-row  gap-x-4 items-center text-center"
                    >
                      <div>
                        <div className="icon text-green-600 h-20 w-20 lg:h-16 lg:w-16 bg-white rounded-full text-4xl flex items-center justify-center">
                          {info.icon}
                        </div>
                      </div>
                      <div className="content text-center lg:text-left">
                        <h5 className="text-lg md:text-2xl font-semibold text-black mb-1">
                          {info.title}
                        </h5>
                        <div className="text-xl font-light text-gray-800 md:text-nowrap">
                          <Link href={info.link}>{info.text}</Link>
                          <p>{info.text1}</p>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form  ">
          <div className="container mx-auto px-5 md:px-12 xl:px-32 flex flex-col gap-y-10 lg:gap-y-24 justify-between "></div>

          <section className="mt-[30px] lg:mt-0">
            <div className="w-[100%] h-[250px] lg:h-[450px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3431.949909793116!2d76.70687087537019!3d30.66353897461764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%20Booth%20No%207%2C%20Pocket%20C%2C%20Wave%20Estate%2C%20Sector%2085%2C%20Mohali%2C%20140306%2C%20India!5e0!3m2!1sen!2sin!4v1752699465240!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
