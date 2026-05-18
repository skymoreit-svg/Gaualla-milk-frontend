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
    id,
    img,
    heading,
    title,
    discount: propDiscount,
  } = product;

  const wishList = useSelector((state) => state.wish.wishlist);
  const dispatch = useDispatch();

  const isWishList = (productId) => wishList.some((elm) => elm.id == productId);
  const added = isWishList(id);

  const productPrice = price || product.price;
  const productOldPrice = old_price || (product.price ? product.price + 50 : null);
  const productName = name || heading || title;
  const productDesc = description || product.description || "";
  const productSlug = slug || (title ? title.toLowerCase().replace(/,/g, "").split(" ").join("-") : "");
  const imageSrc = img?.startsWith('/') ? img : `${imageurl}/${images?.[0]}`;

  const discount = useMemo(() => {
    if (propDiscount) return propDiscount;
    if (productPrice && productOldPrice) {
      const p = parseFloat(productPrice);
      const op = parseFloat(productOldPrice);
      if (op > p) return Math.round(((op - p) / op) * 100);
    }
    return 0;
  }, [productPrice, productOldPrice, propDiscount]);

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
      href={`/product/${productSlug}`}
      className="group relative max-w-[220px] sm:max-w-[260px] lg:max-w-[310px] w-full mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-[var(--primary)] hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-white p-6 border-b border-gray-100 flex items-center justify-center">
        {discount > 0 && (
          <div className="absolute top-0 left-0 z-10 bg-[#E6532D] text-white text-[11px] font-bold px-2.5 py-1 rounded-br-xl shadow-sm">
            {discount}% OFF
          </div>
        )}
        
        <button 
          onClick={handleWishListToggle}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all group/wish"
        >
          {added ? (
            <FaHeart className="text-red-500 scale-110" />
          ) : (
            <FaRegHeart className="text-gray-[#252729b8] group-hover/wish:text-[var(--primary)]" />
          )}
        </button>

        <img
          src={imageSrc}
          alt={productName}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Unit Quantity Badge */}
        {unit_quantity && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[var(--primary)] text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--primary)]/10 shadow-sm">
            {unit_quantity}
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="p-2 sm:p-4 flex flex-col flex-grow bg-white justify-between">
        <div className="space-y-2">
          <h3 className="text-sm sm:text-base font-bold text-text leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-1">
            {productName}
          </h3>

          <div className="flex items-center gap-1 text-highlight">
            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" className="text-highlight" />)}
            <span className="text-[11px] text-gray-700 font-bold ml-1">3+ Reviews</span>
          </div>
          
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-lg sm:text-xl font-black text-text">₹{productPrice}</span>
            {productOldPrice && (
              <span className="text-xs text-gray-[#252729b8] line-through font-medium">₹{productOldPrice}</span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className=" pt-2">
          <div className="w-full py-2 sm:py-2.5 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-bold text-xs sm:text-sm text-center uppercase tracking-wider group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300 shadow-sm">
            Add to Cart
          </div>
        </div>
      </div>
    </Link>
  );
}


