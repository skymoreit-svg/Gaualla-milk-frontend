"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { API_ENDPOINTS } from "@/app/config/constants";
import Image from "next/image";

export default function BlogCardsGrid() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const BLOGS_LIMIT = 6;
    const [visibleCount, setVisibleCount] = useState(BLOGS_LIMIT);

    useEffect(() => {
        const url = `${API_ENDPOINTS.ADMIN_BASE}/blog/getall`;

        (async () => {
            try {
                const res = await fetch(url, { cache: "no-store" });
                const data = await res.json();

                if (data?.success && Array.isArray(data.blogs)) {
                    setBlogs(data.blogs);
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading)
        return <div className="py-20 text-center text-lg font-serif animate-pulse">Curating fresh stories for you...</div>;
    
    if (!blogs.length)
        return <div className="py-20 text-center text-lg text-gray-500">Our storytellers are busy at work. Check back soon!</div>;

    const visibleBlogs = blogs.slice(0, visibleCount);

    const toggleBlogs = () => {
        const blogSection = document.getElementById("blog-section");

        if (visibleCount === BLOGS_LIMIT) {
            setVisibleCount(blogs.length);
        } else {
            setVisibleCount(BLOGS_LIMIT);
            blogSection?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "Unknown Date";
        const date = new Date(dateStr);
        return isNaN(date) ? "Unknown Date" : date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <section
            id="blog-section"
            className="py-20 px-5 md:px-16 xl:px-32 bg-gradient-to-b from-white to-[#f9f5f2]"
        >
            {/* HEADING */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2d3436] mb-4">
                    Gaualla Stories
                </h2>
                <div className="w-24 h-1 bg-[#62371f] mx-auto rounded-full"></div>
                <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
                    Discover the science of dairy, wellness rituals, and the journey of our pure milk from farm to your table.
                </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {visibleBlogs.map((blog) => (
                    <article
                        key={blog.id}
                        className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col p-8"
                    >
                        {/* CONTENT SECTION */}
                        <div className="flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <span className="bg-[#f9f5f2] text-[#62371f] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                                    {blog.category || blog.tag || "Dairy"}
                                </span>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1">
                                        <FaRegCalendarAlt className="text-[#62371f]" />
                                        {formatDate(blog.createdAt || blog.created_at || blog.date)}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-[#62371f] transition-colors">
                                {blog.title}
                            </h3>

                            <div
                                className="text-gray-600 line-clamp-3 leading-relaxed mb-8 flex-1"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        blog.short_description ||
                                        blog.full_description ||
                                        blog.content ||
                                        "",
                                }}
                            />

                            <div className="flex items-center justify-between mt-auto">
                                <Link
                                    href={`/blogs/${blog.id}`}
                                    className="inline-flex items-center gap-2 font-bold text-[#62371f] group-hover:gap-4 transition-all"
                                >
                                    READ STORY <span className="text-lg">→</span>
                                </Link>

                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#62371f] to-[#a1887f] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                        {(blog.writer || blog.author || "V").charAt(0)}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Written By</p>
                                        <p className="text-xs font-bold text-gray-700">{blog.writer || blog.author || "Vivek Sharma"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* LOAD MORE */}
            {blogs.length > BLOGS_LIMIT && (
                <div className="text-center mt-16">
                    <button
                        onClick={toggleBlogs}
                        className="px-10 py-4 bg-[#62371f] text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                        {visibleCount === BLOGS_LIMIT ? "Discover More Stories" : "Show Less"}
                    </button>
                </div>
            )}
        </section>
    );
}

