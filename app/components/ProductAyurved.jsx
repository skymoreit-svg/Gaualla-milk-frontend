"use client"
import React, { useEffect, useState } from 'react';
import ProductAyurvedCard from './ProductAyurvedCard';
import axios from 'axios';
import { baseurl } from './utlis/apis';

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

    if (loading) return (
        <div className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-64 bg-gray-200 rounded mb-10"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-gray-100 rounded-xl"></div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (error) return <div className="text-center py-20 text-red-500 font-medium">Unable to load products. Please try again later.</div>;

    return (
        <section className="bg-[#fdfaf7] py-20 lg:py-28">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-px bg-[#62371f]"></span>
                            <span className="text-[#62371f] text-xs font-bold uppercase tracking-widest">Our Collection</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 font-serif">
                            Best Sellers
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-md text-sm md:text-right font-medium">
                        Explore our range of premium A2 dairy products, sourced directly from our ethical farms and delivered fresh to your doorstep.
                    </p>
                </div>

                {productData.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                        {productData.map((product) => (
                            <ProductAyurvedCard 
                                key={product.id} 
                                product={product} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400 font-medium">
                        No products available at the moment.
                    </div>
                )}
            </div>
        </section>
    );
}