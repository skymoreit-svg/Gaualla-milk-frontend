"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function OrderSuccessModal({ open, orderId, onClose, onViewOrders }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 transition-all duration-300 scale-100">
        <div className="w-20 h-20 bg-[#62371f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#62371f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Order Successful!</h2>
        <p className="text-center text-gray-600 mb-6 text-lg">Your order has been placed successfully.</p>
        
        {orderId && (
          <div className="bg-[#62371f]/5 rounded-xl p-4 mb-8 border border-[#62371f]/10">
            <p className="text-sm text-[#62371f] text-center flex flex-col">
              <span className="text-[#62371f]/60 font-medium mb-1">Order ID</span>
              <span className="font-mono font-bold text-lg text-[#62371f]">{orderId}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              // Forced redirect first
              window.location.href = '/orders/';
              // Then cleanup state if prop exists
              if (onViewOrders) {
                onViewOrders();
              }
            }}
            className="w-full py-4 rounded-xl bg-[#62371f] text-white text-lg font-bold hover:bg-[#4a2917] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gray-200"
          >
            View My Orders
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border-2 border-gray-100 text-gray-500 font-semibold hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

