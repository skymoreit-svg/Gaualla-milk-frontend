"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function BlogCardsGrid() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const BLOGS_LIMIT = 6;
    const [visibleCount, setVisibleCount] = useState(BLOGS_LIMIT);

    useEffect(() => {
        const apiBase =
            process.env.NEXT_PUBLIC_API_URL || "https://api.gauallamilk.com";
        const url = `${apiBase}/admin/blog/getall`;

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
        return <div className="py-10 text-center">Loading blogs...</div>;
    if (!blogs.length)
        return <div className="py-10 text-center">No blogs found.</div>;

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
        return isNaN(date) ? "Unknown Date" : date.toDateString();
    };

    return (
        <section
            id="blog-section"
            className="py-12 px-5 md:px-16 xl:px-32 bg-[#FAFAFA]"
        >
            {/* HEADING */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    Our Blogs
                </h2>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleBlogs.map((blog) => (
                    <article
                        key={blog.id}
                        className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        {/* CATEGORY + READ TIME */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md">
                                {blog.category || blog.tag || "General"}
                            </span>


                            {blog.readtime ? (
                                <span className="flex items-center gap-1 text-sm text-gray-600">
                                    <FaRegClock size={12} />
                                    {blog.readtime} read
                                </span>
                            ) : null}
                        </div>

                        {/* TITLE */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                            {blog.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <div
                            className="prose prose-sm text-gray-700 max-h-[100px] overflow-hidden leading-relaxed mb-4"
                            dangerouslySetInnerHTML={{
                                __html:
                                    blog.short_description ||
                                    blog.full_description ||
                                    blog.content ||
                                    "",
                            }}
                        />

                        {/* FOOTER */}
                        <div className="flex items-center justify-between pt-4 border-t">
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                                <FaRegCalendarAlt />
                                {formatDate(
                                    blog.createdAt || blog.created_at || blog.date
                                )}
                            </span>


                            <a
                                href={`/blogs/${blog.id}`}
                                className="flex items-center gap-1 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 shadow-sm hover:shadow-md rounded-md px-2 py-1"
                            >
                                Read More →
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            {/* LOAD MORE */}
            <div className="text-center mt-10">
                <button
                    onClick={toggleBlogs}
                    className="px-8 py-3 bg-white text-black font-semibold rounded-xl shadow-md border border-gray-300 transition-all duration-300 hover:shadow-lg hover:scale-[1.03]"
                >
                    {visibleCount === BLOGS_LIMIT ? "Load More Blogs" : "Show Less"}
                </button>
            </div>
        </section>
    );
}
