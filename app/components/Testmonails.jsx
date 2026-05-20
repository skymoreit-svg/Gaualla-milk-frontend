"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import Stack from "./Stack";

export default function SuccessStory() {
  const testimonials = [
    {
      heading: "Freshness you can taste in every sip!",
      rating: 5,
      desc: "I’ve tried many brands, but this milk truly reminds me of the freshness I enjoyed growing up in my village. Creamy, rich, and pure – my family loves it every morning.",
      img: "/admin.avif",
      name: "Ravi Kumar",
      position: "School Teacher",
    },
    {
      heading: "The best paneer I’ve ever had!",
      rating: 5,
      desc: "Soft, fresh, and absolutely delicious. The paneer doesn’t crumble like store-bought ones – it cooks perfectly and enhances the taste of every dish.",
      img: "/admin.avif",
      name: "Priya Mehta",
      position: "Nutritionist",
    },
    {
      heading: "Yogurt that feels homemade.",
      rating: 5,
      desc: "The curd is so thick and creamy that my kids finish it within minutes. It tastes just like the dahi my grandmother used to set at home. Truly authentic!",
      img: "/admin.avif",
      name: "Anjali Sharma",
      position: "Dairy Farm Manager",
    },
    {
      heading: "Perfect for health-conscious families!",
      rating: 4,
      desc: "Their ghee has an aroma that fills the whole kitchen. Knowing it’s pure and free from additives makes me confident I’m giving my family the best.",
      img: "/admin.avif",
      name: "Vishal Thakur",
      position: "Pastry Chef",
    },
    {
      heading: "Cheese that melts hearts.",
      rating: 5,
      desc: "The cheese is creamy, flavorful, and melts beautifully. My kids enjoy it on sandwiches, while I love adding it to homemade pasta. Absolutely premium quality!",
      img: "/admin.avif",
      name: "Arjun Verma",
      position: "Café Owner",
    },
  ];

  return (
    <div className="relative mt-5 lg:mt-10 overflow-hidden py-12 md:py-20 lg:py-24 bg-[url('/test-bg.webp')]">
      <img
        src="/test-bg.webp"
        alt="client-review background"
        className="absolute left-0 top-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          {/* Left Section - Clean heading & info */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
              Testimonials
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black font-serif text-text leading-tight uppercase">
              What Our <br />
              <span className="text-[var(--primary)]">Clients Say</span>
            </h3>
            
            <div className="h-[2px] w-20 bg-[var(--primary)]"></div>
            
            <p className="text-sm md:text-base text-text/80 leading-relaxed font-medium">
              We take pride in providing 100% pure, farm-fresh organic dairy products. Read through our clients' real experiences with our milk, paneer, curd, and ghee.
            </p>

            <div className="pt-2 flex items-center gap-3 text-text/60 text-xs font-bold uppercase tracking-wider">
              <span className="animate-pulse w-2.5 h-2.5 rounded-full bg-[var(--primary)]"></span>
              Drag or click the cards to explore
            </div>
          </div>

          {/* Right Section - Interactive Stack Card Slider */}
          <div className="lg:col-span-3 flex items-center justify-center">
            <div className="w-full max-w-[450px] h-[340px] md:h-[365px] relative px-4">
              <Stack
                randomRotation={true}
                sensitivity={140}
                sendToBackOnClick={true}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
                cards={testimonials.map((member, index) => (
                  <div 
                    key={index} 
                    className="w-full h-full bg-white shadow-xl text-text border border-[var(--primary)]/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between select-none"
                  >
                    <div>
                      {/* Star ratings */}
                      <div className="flex items-center justify-center gap-x-1.5 text-amber-500 mb-4">
                        {Array.from({ length: member.rating }).map((_, i) => (
                          <FaStar key={i} size={16} />
                        ))}
                      </div>
                      
                      <h5 className="font-oswald uppercase tracking-wide font-black text-lg md:text-xl text-text mb-3 leading-tight text-center">
                        "{member.heading}"
                      </h5>

                      <p className="text-text/80 text-sm md:text-base leading-relaxed italic text-center">
                        "{member.desc}"
                      </p>
                    </div>

                    <div>
                      <hr className="border-[var(--primary)]/10 my-4" />

                      <div className="flex flex-col items-center justify-center text-center">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="h-12 w-12 rounded-full object-cover border border-[var(--primary)]/20 shadow-md mb-2"
                        />
                        <div>
                          <h6 className="font-black text-sm md:text-base text-text uppercase tracking-wide">
                            {member.name}
                          </h6>
                          <p className="text-xs text-text/60 font-semibold">
                            {member.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
