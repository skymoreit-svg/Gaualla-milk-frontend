"use client"
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { IoMdCart } from 'react-icons/io';
import ProductAyurvedCard from './ProductAyurvedCard';
import AyutramartProduct from '../AyutramartData';
import axios from 'axios';
import { baseurl } from './utlis/apis';

export default function ProductAyurved() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const tabs = ["BEST SELLERS", "Newly launched", "Sets and combos"];
    const [activeTab, setActiveTab] = useState("BEST SELLERS");

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


    if (loading) return <div className="text-center py-10">Loading products...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div className="relative categories bg-[#F3F1EC] py-10 lg:pt-16">
            <div className="w-full relative z-10 container mx-auto px-5 md:px-12 xl:px-32">
                <div className="block lg:flex justify-between items-center mb-6">
                    <h6 className="text-center text-xl lg:text-4xl">Our all time Favourites</h6>
                    <div className="flex justify-center space-x-2 lg:space-x-4 mt-2 lg:mt-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`cursor-pointer px-2 lg:px-3 py-2 border-2 text-[10px] lg:text-base rounded-full shadow-lg font-medium transition-colors ${
                                    activeTab === tab
                                        ? "border-green-600 text-green-700"
                                        : "border-black text-gray-500 hover:border-gray-600"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {productData.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-2 lg:gap-y-8">
                        {productData.map((product) => (
                            <ProductAyurvedCard 
                                key={product.id} 
                                product={product} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}