"use client";
import React, { useState, useRef, useEffect } from "react";
import { Leaf, ShieldCheck, Zap, Heart, Droplet, Users, Award } from "lucide-react";
import OtherBanner from "../components/OtherBanner";
import SuccessStory from "../components/Testmonails";

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

// Hero Section with Video Background
const HeroVideoSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/home-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      {/* <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Our Story
        </h1>
        <p className="text-lg md:text-2xl font-light opacity-95">
          From our hearts to your table — pure, ethical, and organic
        </p>
      </div> */}
    </section>
  );
};

// Our Story Section
const OurStorySection = () => {
  return (
    <section className="sm:py-10 md:py-12 lg:py-14 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Story Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-[var(--primary)]" />
            <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">Gaualla's Journey</span>
            <span className="w-10 h-px bg-[var(--primary)]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6">
            At Gaualla, It All Begins With <span className="text-[var(--primary)]">Care</span>
          </h2>
        </div>

        {/* Main Story Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Image */}
          <div className="md:sticky md:top-32 md:h-fit rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/ourstory2.png"
              alt="Gaualla Cows"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-text">
              Our Journey Began With a Simple Belief
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Gaualla's story is rooted in tradition, passion, and a deep commitment to quality. What started as a vision to preserve the purity of indigenous cow milk has grown into a mission to transform family nutrition and wellness.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We source our milk from heritage breeds raised with unconditional love and respect. Every drop carries the promise of nature's purest gift — unaltered, untainted, and brimming with life-giving nutrients.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From our humble beginnings in Punjab to reaching families across the nation, Gaualla has remained steadfast in one principle: <span className="font-bold text-[var(--primary)]">quality without compromise</span>. We believe that good food has the power to heal, strengthen, and bring joy to every household.
            </p>
            <div className="mt-8 p-6 bg-[var(--primary)]/10 rounded-2xl border-l-4 border-[var(--primary)]">
              <p className="text-lg font-semibold text-text italic">
                "For us, milk isn't just a product — it's a responsibility, a legacy, and an act of love toward our families and the planet."
              </p>
            </div>
          </div>
        </div>

        {/* Organic & Wholesome Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="bg-gradient-to-r from-[var(--primary)]/20 to-transparent rounded-3xl p-12 md:p-16">
            <h3 className="text-3xl md:text-4xl font-bold text-text mb-6">
              We Are Proudly And Passionately Obsessed With Everything <span className="text-[var(--primary)]">Organic!</span>
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              In our daily routines, we often forget to take stock of what we're eating and how it affects our bodies. The choices we make about food shape not only our health but also our family's immunity and wellbeing.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              That's why we must consciously invest energy in finding the right kinds of foods. At Gaualla, we believe that every sip of our A2 milk is an investment in your family's health, immunity, and a better future. No antibiotics. No hormones. No compromise.
            </p>
            <p className="text-lg font-semibold text-text">
              Just pure, organic goodness — the way nature intended.
            </p>
          </div>

          {/* Right Image */}
          <div className="md:sticky md:top-32 md:h-fit rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/ourstory.png"
              alt="Organic & Wholesome"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Farmer Benefits Section
const FarmerBenefitsSection = () => {
  const benefits = [
    {
      icon: <Users size={32} />,
      title: "Fair Trade & Direct Support",
      description: "We pay premium prices directly to our farming partners, ensuring they receive fair compensation for their dedication and quality care."
    },
    {
      icon: <Heart size={32} />,
      title: "Community Care",
      description: "We provide healthcare, education support, and livelihood assistance to farming families, treating them as true partners in our mission."
    },
    {
      icon: <Leaf size={32} />,
      title: "Sustainable Practices",
      description: "We train farmers in organic, sustainable methods that enhance soil health and ensure long-term prosperity for their lands."
    },
    {
      icon: <Droplet size={32} />,
      title: "Resources & Infrastructure",
      description: "We invest in modern infrastructure, equipment, and water management systems to make farming easier and more profitable."
    }
  ];

  return (
    <section className="sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-background to-gray-50">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
            Empowering Our <span className="text-[var(--primary)]">Farming Partners</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Behind every bottle of Gaualla milk is a farmer whose dedication and care make it all possible. We're committed to their welfare and prosperity.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-text mb-4">{benefit.title}</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        {/* <div className="bg-[var(--primary)] text-white rounded-3xl p-12 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-3">500+</div>
            <p className="text-lg opacity-90">Farming Families Supported</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-3">₹5Cr+</div>
            <p className="text-lg opacity-90">Direct Income Generated</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-3">100%</div>
            <p className="text-lg opacity-90">Fair Trade Certified</p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

// Cow Care & Sustainability Section
const CowCareSection = () => {
  const carePoints = [
    {
      icon: <Award size={32} />,
      title: "Heritage Breed Excellence",
      description: "We exclusively work with indigenous breeds like Gir, Sahiwal, and Red Sindhi, which produce nutritionally superior A2 milk rich in beta-casein."
    },
    {
      icon: <Leaf size={32} />,
      title: "Stress-Free Environment",
      description: "Our cows are raised in spacious, open pastures with access to natural grazing, ensuring psychological well-being and superior milk quality."
    },
    {
      icon: <Heart size={32} />,
      title: "Holistic Health Care",
      description: "Regular veterinary care, vaccination programs, and 24/7 health monitoring ensure our cows live long, healthy, productive lives."
    },
    {
      icon: <Droplet size={32} />,
      title: "Natural Nutrition",
      description: "Organic, pesticide-free fodder and feed with zero antibiotics or artificial growth hormones — just natural nutrition as nature intended."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Ethical Treatment",
      description: "We follow strict ethical guidelines ensuring humane treatment, no forced lactation, and respecting the natural lifecycle of every cow."
    },
    {
      icon: <Zap size={32} />,
      title: "Regenerative Farming",
      description: "Our farming practices actively improve soil health, sequester carbon, and support biodiversity — healing the earth with every harvest."
    }
  ];

  return (
    <section className="sm:py-10 md:py-12 lg:py-14 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/cows.png"
              alt="Sustainable Farming"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[var(--primary)]" />
              <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">Animal Care</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
              Our Cows Are <span className="text-[var(--primary)]">Family</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Gaualla, we believe that healthy, happy cows produce superior milk. Every cow in our care receives love, respect, and the finest living conditions. They're not just dairy animals — they're part of our extended family.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Their welfare directly impacts the quality and nutritional value of the milk you bring to your family's table. That's why we spare no effort in ensuring their happiness and health.
            </p>
          </div>
        </div>

        {/* Care Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carePoints.map((point, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center mb-6">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-text mb-3">{point.title}</h3>
              <p className="text-gray-700 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Certification Banner */}
        <div className="mt-20 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-3xl p-12 text-center">
          <p className="text-lg md:text-2xl font-semibold text-text mb-4">
            ✓ Certified Humane • ✓ Organic Verified • ✓ Animal Wellness Assured
          </p>
          <p className="text-gray-700 text-lg">
            Every step of our process is audited and verified to ensure we meet and exceed international standards for animal care and welfare.
          </p>
        </div>
      </div>
    </section>
  );
};

// Sustainability Section
const SustainabilitySection = () => {
  return (
    <section className="sm:py-10 md:py-12 lg:py-14 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[var(--primary)]" />
              <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">Sustainability</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-8">
              Nourishing People, <span className="text-[var(--primary)]">Healing</span> the Planet
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Gaualla products are minimally processed from consciously and sustainably sourced ingredients. We work closely with our farming families to ensure practices that regenerate rather than deplete.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe the healthy choices we make for our bodies should also be healthy for our planet. Every decision — from packaging to production — is guided by our commitment to environmental stewardship.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-text text-lg">Zero Waste Practices</h4>
                    <p className="text-gray-700">Composting, recycling, and minimal packaging to reduce our environmental footprint.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-text text-lg">Regenerative Agriculture</h4>
                    <p className="text-gray-700">Practices that restore soil health, increase biodiversity, and sequester carbon.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-text text-lg">Water Conservation</h4>
                    <p className="text-gray-700">Efficient irrigation and management systems protecting this precious resource.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl h-96 md:h-full">
            <img
              src="/ourstory2.png"
              alt="Sustainability at Gaualla"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
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
  );
};

// Full Screen Video Section at Bottom
const FullScreenVideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
      setIsPlaying(true);
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  return ( 
    <section className="relative w-full mb-12 h-screen flex items-center justify-center overflow-hidden bg-black group">
      {/* Full Screen Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        controls={false}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/home-bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional: Subtle overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className={`relative z-10 w-20 h-20 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-300 ${
          isPlaying ? "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto" : "opacity-100"
        }`}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </section>
  );
};

// Export all components
export default function AboutPage() {
  return (
    <>
      <OtherBanner text="Our Story" />
      {/* <HeroVideoSection /> */}
      <OurStorySection />
      <FarmerBenefitsSection />
      <CowCareSection />
      <SustainabilitySection />
      <AboutSection />
      <FullScreenVideoSection />
      <SuccessStory />
    </>
  );
}

// Also export individual sections for flexibility
export { AboutSection, HeroVideoSection, OurStorySection, FarmerBenefitsSection, CowCareSection, SustainabilitySection, FullScreenVideoSection };
