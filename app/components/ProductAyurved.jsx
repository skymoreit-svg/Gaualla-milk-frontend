"use client"
import React, { useEffect, useState } from 'react';
import ProductAyurvedCard from './ProductAyurvedCard';
import axios from 'axios';
import { baseurl } from './utlis/apis';
import LogoLoader from './LogoLoader';

export default function ProductAyurved() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseurl}/getproduct/all`);
            if (response.data.success) {
                setProductData(response.data.product);
            }
        } catch (err) {
            setError(err.message);
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const bestSellers = productData.filter(
        (product) => product.is_best_seller == 1 || product.is_best_seller === true || product.is_best_seller === 'true'
    );

    if (loading) return (
        <div className="bg-[var(--background)] py-20">
            <LogoLoader text="Collecting the Best of Nature..." />
        </div>
    );

    if (error) return <div className="text-center py-10 sm:py-10 md:py-12 lg:py-14text-red-500 font-medium">Unable to load products. Please try again later.</div>;

    return (
        <section className="bg-[var(--background)] py-10 sm:py-10 md:py-12 lg:py-14">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col items-center justify-center mb-12 gap-4 w-full overflow-hidden">
                    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full overflow-hidden py-2">
                        <img
                            src="/design_cat.png"
                            alt="decorative design left"
                            className="w-full md:w-56 lg:w-72 object-contain shrink-0"
                        />
                        <h2 className="luxury-title-main text-3xl sm:text-4xl lg:text-5xl text-center tracking-wide whitespace-nowrap shrink-0">
                            Best Sellers
                        </h2>
                        <img
                            src="/design_cat.png"
                            alt="decorative design right"
                            className="w-full md:w-56 lg:w-72 object-contain shrink-0 scale-x-[-1]"
                        />
                    </div>
                    <p className="text-gray-700 max-w-2xl text-center text-sm md:text-base font-medium px-4">
                        Explore our range of premium A2 dairy products, sourced directly from our ethical farms and delivered fresh to your doorstep.
                    </p>
                </div>

                {bestSellers.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 justify-items-center">
                        {bestSellers.map((product) => (
                            <ProductAyurvedCard 
                                key={product.id} 
                                product={product} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 sm:py-10 md:py-12 lg:py-14bg-background rounded-3xl border border-dashed border-highlight text-gray-[#252729b8] font-medium">
                        No best sellers available at the moment.
                    </div>
                )}
            </div>
        </section>
    );
}
