"use client";
import React from "react";
import { Leaf, ShieldCheck, Zap, Heart, Users, Droplet } from "lucide-react";

const features = [
  {
    icon: <Leaf size={20} />,
    title: "Pure A2 Heritage",
    description: "Sourced from indigenous cows raised with traditional care."
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Zero Compromise",
    description: "100% antibiotic-free and chemical-free purity guaranteed."
  },
  {
    icon: <Zap size={20} />,
    title: "Farm Fresh",
    description: "Delivered within 24 hours of milking for peak nutrition."
  },
  {
    icon: <Heart size={20} />,
    title: "Ethical Farming",
    description: "Our cows are treated as family in a stress-free environment."
  }
];

const farmerBenefits = [
  {
    icon: <Users size={20} />,
    title: "Fair Trade & Direct Support",
    description: "We pay premium prices directly to our farming partners, ensuring they receive fair compensation for their dedication and quality care."
  },
  {
    icon: <Heart size={20} />,
    title: "Community Care",
    description: "We provide healthcare, education support, and livelihood assistance to farming families, treating them as true partners in our mission."
  },
  {
    icon: <Leaf size={20} />,
    title: "Sustainable Practices",
    description: "We train farmers in organic, sustainable methods that enhance soil health and ensure long-term prosperity for their lands."
  },
  {
    icon: <Droplet size={20} />,
    title: "Resources & Infrastructure",
    description: "We invest in modern infrastructure, equipment, and water management systems to make farming easier and more profitable."
  }
];

const AboutSection = () => {
  return (
    <>
      <section className="py-10 sm:py-12 md:py-16 lg:py-14 bg-background overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Professional Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/img1.webp"
                  alt="Gaualla Farm"
                  className="w-full h-auto object-contain"
                />
              </div>
              {/* Subtle Accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--primary)] rounded-2xl -z-10 hidden md:block" />
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2 space-y-10 md:space-y-5">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-px bg-[var(--primary)]" />
                  <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">About Gaualla</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-text leading-tight">
                  Bringing You the <br />
                  <span className="text-[var(--primary)]">Purity of Nature.</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  Our journey started with a simple goal: to provide families with the same pure, unadulterated A2 milk that our grandparents enjoyed. Today, we stand as a symbol of trust, quality, and ethical farming.
                </p>
              </div>

              {/* Features Grid (2x2 on mobile & desktop) */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-4 md:pt-2">
                {features.map((item, index) => (
                  <div key={index} className="space-y-2 sm:space-y-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--background)] text-[var(--primary)] flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-text mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Support Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-14 bg-background overflow-hidden border-t border-[var(--primary)]/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-12">
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-px bg-[var(--primary)]" />
                <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">Farmer Support</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-text leading-tight">
                Empowering Our <br />
                <span className="text-[var(--primary)]">Farming Partners</span>
              </h2>
            </div>
            <div className="w-full lg:w-1/2 lg:pt-8">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Behind every bottle of Gaualla milk is a farmer whose dedication and care make it all possible. We are deeply committed to their welfare, providing fair trade pricing, resources, and community support.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
            {farmerBenefits.map((item, index) => (
              <div 
                key={index} 
                className="space-y-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;


