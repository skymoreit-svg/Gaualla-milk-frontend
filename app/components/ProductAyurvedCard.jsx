"use client";
import React, { useMemo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addWish, removeWish } from "../store/wishListSlice";
import { imageurl } from "./utlis/apis";

export default function ProductAyurvedCard({ product }) {
  const {
    images,
    name,
    description,
    price,
    old_price,
    unit_quantity,
    slug,
    id
  } = product;

  const wishList = useSelector((state) => state.wish.wishlist);
  const dispatch = useDispatch();

  const isWishList = (productId) => wishList.some((elm) => elm.id == productId);
  const added = isWishList(id);

  const discount = useMemo(() => {
    if (price && old_price) {
      const p = parseFloat(price);
      const op = parseFloat(old_price);
      if (op > p) return Math.round(((op - p) / op) * 100);
    }
    return 0;
  }, [price, old_price]);

  const handleWishListToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) {
      dispatch(removeWish(product));
    } else {
      dispatch(addWish(product));
    }
  };

  return (
    <Link 
      href={`/product/${slug}`}
      className="group relative bg-white rounded-2xl border-2 border-gray-50 hover:border-[#62371f]/20 hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-[#fdfaf7] p-6">
        {discount > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-[#62371f] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
            {discount}% OFF
          </div>
        )}
        
        <button 
          onClick={handleWishListToggle}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all group/wish"
        >
          {added ? (
            <FaHeart className="text-red-500 scale-110" />
          ) : (
            <FaRegHeart className="text-gray-400 group-hover/wish:text-[#62371f]" />
          )}
        </button>

        <img
          src={`${imageurl}/${images?.[0]}`}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Unit Quantity Badge */}
        {unit_quantity && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#62371f] text-[9px] font-bold px-2 py-0.5 rounded border border-[#62371f]/10">
            {unit_quantity}
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        <div className="flex-grow space-y-1.5">
          <div className="flex items-center gap-1 text-yellow-400 mb-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
            <span className="text-[10px] text-gray-400 font-bold ml-1">4.8</span>
          </div>
          
          <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#62371f] transition-colors line-clamp-1">
            {name}
          </h3>
          
          <div 
            className="text-xs text-gray-400 font-medium line-clamp-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* Price & Action Area */}
        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-[#62371f]">₹{price}</span>
              {old_price && (
                <span className="text-xs text-gray-300 line-through font-medium">₹{old_price}</span>
              )}
            </div>
            <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">In Stock</span>
          </div>
          
          <div className="flex items-center gap-2 bg-[#62371f] text-white px-4 py-2.5 rounded-xl hover:bg-[#4a2917] transition-all shadow-lg shadow-[#62371f]/20 group/btn">
            <span className="text-[10px] font-black uppercase tracking-widest">Buy</span>
            <ShoppingCart size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

