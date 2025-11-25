"use client"
import React, { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    // Get current year
    const currentYear = new Date().getFullYear();
    
    // Set target date to September 15th of current year
    const targetDate = new Date(currentYear, 8, 15); // Month is 0-indexed (8 = September)
    
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;
    
    return difference > 0 ? difference : 0;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const two = (n) => String(n).padStart(2, "0");
  
  // Format the target date for display
  const currentYear = new Date().getFullYear();
  const targetDate = new Date(currentYear, 8, 15);
  const formattedDate = targetDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {timeLeft > 0 ? (
        <>
          <div className="text-sm text-gray-600 mb-2 font-medium"> SEPTEMBER 15TH</div>
          <div className="flex gap-2 mb-4">
            <TimeUnit value={two(days)} label="DAYS" />
            <TimeUnit value={two(hours)} label="HOURS" />
            <TimeUnit value={two(minutes)} label="MINS" />
            <TimeUnit value={two(seconds)} label="SECS" />
          </div>
        </>
      ) : (
        <div className="text-lg font-semibold text-red-600 mb-4">
          The offer has expired on {formattedDate}
        </div>
      )}
      
      {/* <button
        disabled={timeLeft === 0}
        className={`
          group relative overflow-hidden w-full max-w-xs
          px-8 py-4 rounded-xl font-bold text-lg
          transition-all duration-300 transform
          ${timeLeft === 0 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed scale-95" 
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
          }
        `}
      >
        {timeLeft === 0 ? "OFFER EXPIRED" : "BUY NOW"}
        
        {timeLeft > 0 && (
          <span className="absolute inset-0 bg-white bg-opacity-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}
      </button> */}
      
      {timeLeft > 0 && (
        <p className="text-xs text-gray-500 mt-3">
         Start on {formattedDate}
        </p>
      )}
    </div>
  );
}

// Separate component for time units
function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 text-white rounded-lg w-14 h-14 flex items-center justify-center shadow-md">
        <span className="text-xl font-mono font-bold">{value}</span>
      </div>
      <span className="text-xs text-gray-600 mt-1">{label}</span>
    </div>
  );
}