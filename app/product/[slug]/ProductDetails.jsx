"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaPlus } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { ShoppingBag, Truck, DollarSign, ChevronRight, Star, Edit3, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";

// Swiper removed in favor of grid view

import { setCartItems, openCartDrawer } from "@/app/store/cartSlice";
import { baseurl, imageurl } from "@/app/components/utlis/apis";

import Description from "./Description ";
import RichTextHtmlRenderer from "@/app/components/RichTextHtmlRenderer";
import ProductAyurvedCard from "@/app/components/ProductAyurvedCard";
import FAQSection from "@/app/components/Faq";
import BenefitsTable from "@/app/components/Benefits";

import "./product-premium.css";

const getPricePerLiter = (name, price) => {
  if (!name || !price) return null;
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return null;

  const clean = name.toLowerCase();

  // Liters match
  const literMatch = clean.match(/(\d+(\.\d+)?)\s*(l|liter|litre|ltr)/);
  if (literMatch) {
    const vol = parseFloat(literMatch[1]);
    if (vol > 0) {
      return (numPrice / vol).toFixed(1);
    }
  }

  // Milliliters match
  const mlMatch = clean.match(/(\d+(\.\d+)?)\s*(ml|milliliter|millilitre)/);
  if (mlMatch) {
    const volMl = parseFloat(mlMatch[1]);
    if (volMl > 0) {
      return (numPrice / (volMl / 1000)).toFixed(1);
    }
  }

  // Kilograms match
  const kgMatch = clean.match(/(\d+(\.\d+)?)\s*(kg|kilogram)/);
  if (kgMatch) {
    const vol = parseFloat(kgMatch[1]);
    if (vol > 0) {
      return (numPrice / vol).toFixed(1);
    }
  }

  // Grams match
  const gMatch = clean.match(/(\d+(\.\d+)?)\s*(g|gram)/);
  if (gMatch) {
    const volG = parseFloat(gMatch[1]);
    if (volG > 0) {
      return (numPrice / (volG / 1000)).toFixed(1);
    }
  }

  return null;
};

const renderPerUnitRate = (name, price) => {
  if (!name || !price) return null;
  const rate = getPricePerLiter(name, price);
  if (!rate) return null;

  const clean = name.toLowerCase();
  let unit = "L";
  if ((clean.includes("g") && !clean.includes("l")) || clean.includes("kg") || clean.includes("gram")) {
    unit = "kg";
  }

  const formattedRate = parseFloat(rate).toString();
  return `₹${formattedRate}/${unit}`;
};

const ProductDetails = ({ slug }) => {
  const route = useRouter();
  const dispatch = useDispatch();

  // USER STATE
  const { info, isLoading } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.cartItem);

  const [loader, setLoader] = useState(true);
  const [userLogin, setUserLogin] = useState(false);
  const [activeImg, setActiveImg] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const [productData, setProductData] = useState();
  const [AyutramartProduct, setAyutramartProduct] = useState();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // DERIVED STATE
  const productImages = useMemo(() => {
    if (!productData?.images) return [];
    try {
      return typeof productData.images === 'string' 
        ? JSON.parse(productData.images) 
        : productData.images;
    } catch (e) {
      console.error("Failed to parse product images", e);
      return [];
    }
  }, [productData?.images]);

  const productVariants = useMemo(() => {
    if (!productData?.variants) return [];
    try {
      const parsed = typeof productData.variants === 'string'
        ? JSON.parse(productData.variants)
        : productData.variants;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to parse product variants", e);
      return [];
    }
  }, [productData?.variants]);

  useEffect(() => {
    if (productData) {
      const parsed = productData.variants ? (typeof productData.variants === 'string' ? JSON.parse(productData.variants) : productData.variants) : [];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setSelectedVariant(parsed[0]);
      } else {
        setSelectedVariant(null);
      }
    }
  }, [productData]);

  const discount = useMemo(() => {
    const price = selectedVariant ? parseFloat(selectedVariant.price) : (productData?.price ? parseFloat(productData.price) : 0);
    const oldPrice = selectedVariant ? parseFloat(selectedVariant.old_price) : (productData?.old_price ? parseFloat(productData.old_price) : 0);
    if (price && oldPrice && oldPrice > price) {
      return Math.round(((oldPrice - price) / oldPrice) * 100);
    }
    return 0;
  }, [productData?.price, productData?.old_price, selectedVariant]);

  const inCart = useMemo(() => {
    return cartItems.some(
      (item) =>
        item.id === productData?.id &&
        (selectedVariant
          ? item.variant_name === selectedVariant.name
          : !item.variant_name)
    );
  }, [cartItems, productData?.id, selectedVariant]);

  const fetchallProduct = async () => {
    const response = await axios.get(`${baseurl}/getproduct/all`);
    const data = await response.data;
    if (data.success) {
      setAyutramartProduct(data.product);
    }
  };

  const fetchproduct = async () => {
    setLoader(true);
    try {
      const cleanSlug = slug?.replace(/\/$/, "");
      const response = await axios.get(`${baseurl}/getproduct/product/${cleanSlug}`);
      const data = await response.data;
      if (data.success && data.product) {
        setProductData(data.product);
        try {
          const images = typeof data.product.images === 'string' 
            ? JSON.parse(data.product.images) 
            : data.product.images;
          
          if (Array.isArray(images) && images.length > 0) {
            setActiveImg(images[0]);
          }
        } catch (parseError) {
          console.error("Error parsing product images:", parseError);
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoader(false);
    }
  };

  const handeladdtocart = async (product_id, price) => {
    const isAuthenticated = userLogin || (info?.success === true);
    if (!isAuthenticated) {
      route.push("/login");
      return;
    }

    const priceToSend = selectedVariant ? selectedVariant.price : price;
    const variantNameToSend = selectedVariant ? selectedVariant.name : null;

    const response = await axios.post(`${baseurl}/cart/addtocart`, {
      product_id,
      price: priceToSend,
      variant_name: variantNameToSend,
      quantity: quantity // Assuming API might support it or for future use
    });

    const data = await response.data;
    if (data.success) {
      Swal.fire({
        title: data.message,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(async () => {
        try {
          const cartResponse = await axios.get(`${baseurl}/cart/cartallcart`);
          const cartData = await cartResponse.data;
          dispatch(setCartItems(cartData.carts || []));
        } catch (error) {
          console.error("Error fetching cart:", error);
          dispatch(setCartItems([]));
        }
      }, 300);
    }
  };

  useEffect(() => {
    fetchproduct();
    fetchallProduct();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUserLogin(true);
    } else if (!isLoading) {
      if (info?.success) {
        setUserLogin(true);
      } else {
        setUserLogin(false);
      }
    }
  }, [isLoading, info]);

  const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse rounded-md bg-background00/80 ${className}`} />
  );

  if (loader) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[84px_minmax(0,1fr)] lg:grid-cols-[96px_minmax(0,1fr)_minmax(320px,400px)]">
          <div className="hidden md:flex md:flex-col md:gap-4">
            <Skeleton className="h-24 w-20" />
            <Skeleton className="h-24 w-20" />
            <Skeleton className="h-24 w-20" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-highlight p-2">
            <div className="aspect-square w-full">
              <Skeleton className="h-full w-full rounded-xl" />
            </div>
          </div>
          <div className="mt-2 space-y-5 lg:mt-0">
            <div className="space-y-2">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-text mb-4 font-serif">Product Not Found</h2>
        <button 
          onClick={() => route.push('/product?name=all')}
          className="bg-[var(--primary)] text-white px-8 py-3 rounded-lg hover:bg-[#87c243] transition-colors font-bold uppercase tracking-widest"
        >
          Explore All Products
        </button>
      </div>
    );
  }

  const displayPrice = selectedVariant ? selectedVariant.price : productData?.price;
  const displayOldPrice = selectedVariant ? selectedVariant.old_price : productData?.old_price;
  const displayUnit = selectedVariant ? selectedVariant.name : productData?.unit_quantity;
  const displayStock = selectedVariant ? selectedVariant.stock : productData?.stock;

  return (
    <div className="product-premium-story bg-[var(--background)] min-h-screen">
      
      {/* SECTION 1: PROFESSIONAL HERO */}
      <section className="relative pt-12 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: CLEAN GALLERY */}
          <div className="flex flex-col-reverse md:flex-row gap-6 lg:sticky lg:top-32 self-start">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-background ${activeImg === img ? "border-[var(--primary)] shadow-md" : "border-highlight opacity-60 hover:opacity-100"}`}
                >
                  <img src={`${imageurl}/${img}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            
            <div className="flex-1 relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-background shadow-sm border border-highlight">
                <img
                  src={`${imageurl}/${activeImg}`}
                  alt={productData?.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[10px] font-bold px-3 py-1 rounded shadow-lg">
                  {discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: PROFESSIONAL INFO */}
          <div className="space-y-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-wider">Premium A2 Collection</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-gray-[#252729b8] text-xs font-medium uppercase tracking-wider">Farm Fresh</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight">
                {productData?.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex text-highlight gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm font-medium text-gray-[#252729b8]">120+ Verified Reviews</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="oswald text-4xl font-bold text-text">₹{displayPrice}</span>
                {displayOldPrice && (
                  <span className="text-xl text-gray-[#252729b8] line-through">₹{displayOldPrice}</span>
                )}
                {displayUnit && (
                  <span className="oswald text-sm font-bold text-[var(--primary)] bg-[var(--background)] px-3 py-1 rounded">
                    {displayUnit}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-[#252729b8] font-medium">*Prices are inclusive of all taxes</p>
            </div>

            {/* Variants Selector */}
            {productVariants.length > 0 && (
              <div className="space-y-3">
                <span className="text-base font-semibold text-gray-700 block">Select Variant</span>
                <div className="flex flex-wrap gap-3">
                  {productVariants.map((v, i) => {
                    const priceVal = parseFloat(v.price) || 0;
                    const oldPriceVal = parseFloat(v.old_price) || 0;
                    const disc = (priceVal && oldPriceVal && oldPriceVal > priceVal)
                      ? Math.round(((oldPriceVal - priceVal) / oldPriceVal) * 100)
                      : 0;
                    const perUnitRate = renderPerUnitRate(v.name, v.price);
                    const isSelected = selectedVariant?.name === v.name;

                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedVariant(v)}
                        className={`min-w-[140px] sm:min-w-[160px] flex-1 md:flex-initial rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                          isSelected
                            ? "border-[var(--primary)] shadow-md scale-[1.02]"
                            : "border-[var(--primary)]/20 hover:border-[var(--primary)]/40"
                        }`}
                      >
                        {/* Header */}
                        <div
                          className={`px-3 py-2 text-center text-sm font-bold tracking-wide transition-colors ${
                            isSelected
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--primary)]/5 text-[var(--text)]"
                          }`}
                        >
                          {v.name}
                        </div>
                        {/* Body */}
                        <div className="p-3 bg-white space-y-1">
                          <div className="flex items-baseline flex-wrap gap-1">
                            <span className="text-xl font-black text-[var(--text)]">₹{v.price}</span>
                            {disc > 0 && (
                              <>
                                <span className="text-xs text-[var(--text)]/50 line-through">₹{v.old_price}</span>
                                <span className="text-[11px] font-bold text-red-600">{disc}% off</span>
                              </>
                            )}
                          </div>
                          {perUnitRate && (
                            <div className="text-xs font-semibold text-[var(--accent)]">
                              {perUnitRate}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="p-6 bg-background rounded-2xl border border-highlight space-y-4">
              <h4 className="text-sm font-bold text-text uppercase tracking-widest">Key Highlights</h4>
              <RichTextHtmlRenderer
                className="text-sm text-gray-700 leading-relaxed font-medium"
                html={productData?.description2 || "Pure, preservative-free, and made from the goodness of A2 milk."}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center bg-background border border-highlight rounded-xl px-4 py-2 sm:w-32">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-[#252729b8] hover:text-text text-xl font-medium">-</button>
                <div className="flex-1 text-center font-bold text-text">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-[#252729b8] hover:text-text text-xl font-medium">+</button>
              </div>

              {displayStock <= 0 ? (
                <button disabled className="flex-1 py-5 rounded-xl bg-gray-300 text-gray-500 font-bold uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-3">
                  Out of Stock
                </button>
              ) : inCart ? (
                <button onClick={() => dispatch(openCartDrawer())} className="flex-1 py-5 rounded-xl bg-text text-white font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3">
                  <ShoppingBag size={20} /> View in Cart
                </button>
              ) : (
                <button 
                  onClick={() => handeladdtocart(productData?.id, displayPrice)} 
                  className="flex-1 py-5 rounded-xl bg-[var(--primary)] text-white font-bold uppercase tracking-widest hover:bg-[#4a2917] transition-all shadow-lg shadow-[var(--primary)]/10 flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={20} /> Add to Basket
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-highlight">
              {[
                { icon: <Truck size={20} />, label: "Express Delivery" },
                { icon: <DollarSign size={20} />, label: "Secure Payment" },
                { icon: <Star size={20} />, label: "Pure Quality" },
                { icon: <ShieldCheck size={20} />, label: "70+ Quality Checks" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <div className="text-[var(--primary)]">{item.icon}</div>
                  <span className="text-[10px] font-bold text-gray-[#252729b8] uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CLEAN STORYTELLING */}
      <section className="bg-background py-24 border-y border-highlight">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">Our Story</span>
              <h2 className="text-4xl font-bold text-text leading-tight">The Gaualla Purity Standard</h2>
            </div>
            <RichTextHtmlRenderer
              className="prose prose-lg text-text leading-relaxed font-medium"
              html={productData?.description}
            />
            <blockquote className="border-l-4 border-[var(--primary)] pl-6 py-2 text-text italic font-medium">
              "We believe that the best dairy products come from happy cows and traditional, ethical farming practices."
            </blockquote>
          </div>
        </div>
      </section>

      {/* SECTION 3: REVIEWS */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-text">Customer Testimonials</h2>
            <p className="text-gray-700 font-medium">Hear from our family of happy, healthy customers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Rohit Sharma", text: "The texture is soft and creamy. A noticeable difference in quality compared to other brands." },
              { name: "Anjali Mehta", text: "Freshness you can trust. My family has switched entirely to Gaualla products." }
            ].map((rev, i) => (
              <div key={i} className="p-10 bg-background rounded-2xl shadow-sm border border-highlight">
                <div className="flex text-highlight mb-6 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-text italic leading-relaxed mb-8">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text">{rev.name}</div>
                    <div className="text-[10px] font-bold text-gray-[#252729b8] uppercase tracking-widest">Verified Buyer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: RECOMMENDATIONS */}
      <section className="py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-text">Recommended for You</h2>
            <Link href="/product?name=all" className="text-[var(--primary)] font-bold text-sm uppercase tracking-widest hover:underline">
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 justify-items-center">
            {AyutramartProduct?.slice(0, 4).map((elm, index) => (
              <ProductAyurvedCard key={index} product={elm} />
            ))}
          </div>
          
          <div className="mt-32">
            <FAQSection />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductDetails;
