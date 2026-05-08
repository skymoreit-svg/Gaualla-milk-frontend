"use client";
import React from "react";
import { motion } from "framer-motion";

const LogoLoader = ({ text = "Loading Pure Goodness..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full min-h-[400px] bg-white">
      <div className="relative">
        {/* Animated Rings - Pure CSS/SVG style */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -m-6 rounded-full border-2 border-[#62371f]/20"
        />
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 -m-10 rounded-full border-t-2 border-[#62371f]/40 border-b-2 border-transparent"
        />

        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white p-6 rounded-full shadow-[0_20px_50px_rgba(98,55,31,0.12)] z-10 border border-gray-50"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center justify-center"
          >
            {/* The actual brand logo */}
            <img 
              src="/img/logo.webp" 
              alt="Gaualla Logo" 
              className="w-32 h-auto"
            />
          </motion.div>
        </motion.div>

        {/* Cow Silhouette SVG Overlay (Subtle) */}
        <div className="absolute -bottom-2 -right-2 opacity-10">
            {/* Minimalist cow SVG can go here if needed, but keeping it clean for now */}
        </div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 text-center"
      >
        <p className="text-[#62371f] font-serif font-bold text-xs uppercase tracking-[0.4em] mb-4">
          {text}
        </p>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-[#62371f]"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LogoLoader;
