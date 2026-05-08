"use client";
import React, { useState } from "react";
import { Info, Truck, Star, Edit3, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Description = ({ data }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Product Description", icon: <Info size={18} /> },
    { id: "additional-info", label: "Delivery & Shipping", icon: <Truck size={18} /> },
    { id: "reviews", label: "Customer Reviews", icon: <Star size={18} /> },
  ];

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-12 xl:px-32 py-12">
      {/* Premium Tab Navigation */}
      <div className="flex items-center justify-center mb-12">
        <div className="inline-flex p-1 bg-gray-100 rounded-2xl overflow-x-auto scrollbar-hide max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-[#62371f] shadow-md scale-105"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section with Animation */}
      <div className="min-h-[300px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            {activeTab === "description" && (
              <div className="max-w-4xl mx-auto">
                <div 
                  className="prose prose-lg text-gray-600 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: data }}
                />
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-[#62371f]/5 rounded-2xl border border-[#62371f]/10">
                    <h4 className="font-bold text-[#62371f] mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#62371f]" /> Why Choose Gaualla?
                    </h4>
                    <p className="text-sm text-gray-600">Our products are 100% natural, ethically sourced, and delivered fresh to maintain peak nutritional value.</p>
                  </div>
                  <div className="p-6 bg-[#62371f]/5 rounded-2xl border border-[#62371f]/10">
                    <h4 className="font-bold text-[#62371f] mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#62371f]" /> Sustainable Quality
                    </h4>
                    <p className="text-sm text-gray-600">We prioritize eco-friendly packaging and traditional processes that preserve the soul of our dairy.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "additional-info" && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Shipping & Delivery Policies</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We take immense pride in the freshness of our dairy products. To ensure you receive the highest quality, we employ specialized cold-chain logistics for regional deliveries.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Standard Delivery", time: "24-48 Hours", desc: "For fresh milk and dairy items in metro areas." },
                    { title: "Bulk Orders", time: "3-5 Days", desc: "Optimized shipping for ghee and long-life products." },
                    { title: "Global Shipping", time: "Varies", desc: "Available for non-perishable items like Ghee." }
                  ].map((item, i) => (
                    <div key={i} className="p-6 border border-gray-100 rounded-2xl hover:border-[#62371f] transition-colors">
                      <h5 className="font-bold text-gray-800 mb-1">{item.title}</h5>
                      <span className="text-[#62371f] text-xs font-black uppercase tracking-wider">{item.time}</span>
                      <p className="mt-3 text-sm text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                  {/* Review Summary */}
                  <div className="lg:col-span-1 bg-gray-50 p-8 rounded-3xl text-center">
                    <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Total Rating</h4>
                    <div className="text-6xl font-black text-gray-800 mb-4">4.8</div>
                    <div className="flex justify-center text-yellow-400 gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-500 text-sm">Based on 1,248 reviews</p>
                     <button className="mt-8 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#62371f] transition-all">
                      <Edit3 size={18} /> Write A Review
                    </button>
                  </div>

                  {/* Reviews List */}
                  <div className="lg:col-span-2 space-y-8">
                    {[
                      { name: "Rohit S.", rating: 5, date: "2 days ago", title: "Incredible Freshness!", comment: "The quality of this milk is miles ahead of anything else available in the market. You can actually feel the richness." },
                      { name: "Anjali M.", rating: 4, date: "1 week ago", title: "Great Taste", comment: "Perfect for making homemade curd. The consistency is just perfect every time. Highly recommended for families." }
                    ].map((rev, i) => (
                      <div key={i} className="pb-8 border-b border-gray-100 last:border-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex text-yellow-400 gap-0.5">
                            {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={j < rev.rating ? "currentColor" : "none"} />)}
                          </div>
                          <span className="text-xs text-gray-400 font-medium">{rev.date}</span>
                        </div>
                        <h5 className="font-bold text-gray-800 mb-2">{rev.title}</h5>
                        <p className="text-gray-500 text-sm italic leading-relaxed mb-4">"{rev.comment}"</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#62371f] flex items-center justify-center text-white text-[10px] font-bold">
                            {rev.name.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-gray-700">{rev.name}</span>
                        </div>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 text-[#62371f] font-bold hover:gap-4 transition-all uppercase tracking-widest text-xs mt-4">
                      Load All Reviews <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Description;
