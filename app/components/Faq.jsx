"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    number: "01",
    question: "How is A2 desi cow milk special, compared to the milk we normally buy?",
    answer:
      "The milk from a desi cow contains A2 beta-casein. It is easily digested and gentler on the stomach compared to regular A1 milk from crossbred cows.",
  },
  {
    number: "02",
    question: "How fresh is the milk delivered by Gaualla?",
    answer:
      "You receive milk within 12 hours of milking, ensuring maximum freshness with no artificial additives or preservatives.",
  },
  {
    number: "03",
    question: "How can I get fresh dairy products delivered to my home?",
    answer:
      "Simply download the Gaualla mobile app, place your order, and enjoy doorstep delivery of pure dairy products.",
  },
  {
    number: "04",
    question: "Do you add preservatives or chemicals to the milk?",
    answer:
      "No, our milk is 100% natural and chemical-free. We never use preservatives, artificial flavors, or additives.",
  },
  {
    number: "05",
    question: "How should I store Gaualla milk at home?",
    answer:
      "Refrigerate immediately at 4–5°C and consume within 24–36 hours for best taste and freshness.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full bg-[var(--background)] py-12 md:py-24 lg:py-14 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
          
          {/* Left Side: Header & Visual */}
          <div className="lg:w-2/5 space-y-6 md:space-y-8 lg:sticky lg:top-32 w-full">
            <div className="space-y-4 text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <span className="w-10 h-px bg-[var(--primary)]" />
                <span className="text-[var(--primary)] text-xs font-black uppercase tracking-[0.3em]">Common Queries</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text leading-tight font-serif">
                Purity <br className="hidden lg:block" />
                <span className="text-[var(--primary)]">Explained.</span>
              </h2>
              <p className="text-gray-700 text-sm md:text-base lg:text-lg font-medium max-w-md mx-auto lg:mx-0">
                Everything you need to know about our farm-fresh A2 dairy products and delivery process.
              </p>
            </div>

            <div className="relative group hidden lg:block">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/img/fa1.webp"
                  alt="Gaualla Milk"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-background p-8 rounded-3xl shadow-xl border border-gray-50 max-w-[200px] animate-bounce-slow">
                <MessageCircle className="text-[var(--primary)] mb-3" size={32} />
                <p className="text-xs font-bold text-text leading-relaxed">
                  Have more questions? <br />
                  <span className="text-[var(--primary)] cursor-pointer hover:underline">Contact Support</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: FAQ Accordion */}
          <div className="lg:w-3/5 w-full space-y-3 md:space-y-4">
            {faqs.map((elm, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className={`group rounded-2xl md:rounded-[2rem] transition-all duration-500 overflow-hidden ${
                  openIndex === index 
                    ? "bg-background shadow-2xl shadow-[var(--primary)]/5 border border-[var(--primary)]/10" 
                    : "bg-background/50 hover:bg-background border border-transparent"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-4 py-5 md:px-8 md:py-8 text-left flex items-start gap-4 md:gap-6"
                >
                  <span className={`text-lg md:text-2xl font-black transition-colors duration-300 ${
                    openIndex === index ? "text-[var(--primary)]" : "text-gray-600"
                  }`}>
                    {elm.number}
                  </span>
                  
                  <div className="flex-1">
                    <h6 className={`text-base md:text-xl font-bold transition-colors duration-300 ${
                      openIndex === index ? "text-text" : "text-text"
                    }`}>
                      {elm.question}
                    </h6>
                    
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "circOut" }}
                        >
                          <div className="pt-4 border-t border-highlight mt-4 md:pt-6 md:mt-6">
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                              {elm.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={`mt-0.5 p-1.5 md:p-2 rounded-full transition-all duration-500 ${
                    openIndex === index ? "bg-[var(--primary)] text-white rotate-180" : "bg-background00 text-gray-[#252729b8] group-hover:bg-background00"
                  }`}>
                    <ChevronDown size={16} className="md:w-5 md:h-5" />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}

