"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { baseurl, imageurl, adminurl } from "./utlis/apis";
import LogoLoader from "./LogoLoader";

const SkeletonCard = () => (
  <div className="animate-pulse bg-background p-6 rounded-2xl shadow-md">
    <div className="h-4 bg-background00 rounded w-1/4"></div>
    <div className="h-6 bg-background00 rounded w-3/4 mt-4"></div>
    <div className="h-4 bg-background00 rounded w-full mt-4"></div>
    <div className="h-4 bg-background00 rounded w-5/6 mt-2"></div>
    <div className="flex items-center mt-8">
      <div className="h-10 w-10 bg-background00 rounded-full"></div>
      <div className="ml-3">
        <div className="h-4 bg-background00 rounded w-24"></div>
      </div>
    </div>
  </div>
);

const stripHtml = (html) => {
  if (typeof window !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  // Basic fallback for server-side rendering
  return (html || "").replace(/<[^>]+>/g, '');
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Using common API endpoint structure
        const response = await axios.get(`${adminurl}/blog/getall`);
        if (response.data.success) {
          // Get the 3 most recent blogs
          setBlogs(response.data.blogs.slice(0, 3));
        } else {
          setError("Failed to fetch blogs.");
        }
      } catch (err) {
        setError("An error occurred while fetching blogs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="relative bg-[#fdfcfb] py-24 sm:py-32 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[#a1887f]/10 rounded-full blur-3xl translate-y-1/2"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <span className="text-[var(--primary)] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Knowledge & Wellness</span>
          <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-[#2d3436]">
            Gaualla Stories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mx-auto mt-8 rounded-full"></div>
          <p className="mt-8 text-lg leading-relaxed text-text font-serif italic">
            "Pure insights for a pure lifestyle. Discover the journey of wellness."
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-10 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-20">
              <LogoLoader text="Brewing Fresh Stories..." />
            </div>
          ) : error ? (
            <div className="col-span-full text-center p-12 bg-background/50 backdrop-blur-md rounded-3xl border border-red-100">
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          ) : (
            blogs.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col items-start justify-between rounded-[2.5rem] bg-background/40 backdrop-blur-xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(98,55,31,0.12)] hover:-translate-y-4"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[var(--primary)]/0 to-[var(--primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative w-full z-10">
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                        <time dateTime={post.created_at} className="font-black text-[var(--primary)]/40 uppercase tracking-[0.2em]">
                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                    </div>
                    {post.tag && (
                      <span className="rounded-full bg-background px-4 py-2 font-black text-[var(--primary)] uppercase tracking-tighter shadow-sm border border-gray-50">
                        {post.tag.split(',')[0].trim()}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-3xl font-serif font-bold leading-tight text-[#2d3436] group-hover:text-[var(--primary)] transition-colors duration-500">
                      <Link href={`/blogs/${post.id}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-6 line-clamp-3 text-base leading-relaxed text-gray-700 font-light italic">
                      {stripHtml(post.full_description)}
                    </p>
                  </div>
                </div>

                <div className="relative mt-12 flex items-center gap-x-5 w-full pt-8 border-t border-white/60 z-10">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[#8e5a3c] flex items-center justify-center text-white font-serif text-xl font-black shadow-lg transform group-hover:rotate-[360deg] transition-transform duration-1000">
                    {(post.writer || post.author || "V").charAt(0)}
                  </div>
                  <div className="text-sm">
                    <p className="font-black text-[#2d3436] tracking-tight">
                      {post.writer || 'Gaualla Milk'}
                    </p>
                    <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-[var(--primary)]/60">Wellness Expert</p>
                  </div>
                  <Link href={`/blogs/${post.id}`} className="ml-auto w-10 h-10 rounded-full bg-background border border-highlight flex items-center justify-center text-[var(--primary)] shadow-sm hover:bg-[var(--primary)] hover:text-white transition-all duration-500 hover:scale-110">
                    →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>

        {!loading && !error && (
          <div className="mt-24 text-center">
            <Link href="/blogs" className="group relative inline-flex items-center gap-3 px-12 py-5 bg-[var(--primary)] text-white rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-2xl overflow-hidden transition-all duration-500 hover:gap-6 hover:shadow-[var(--primary)]/40">
                <span className="relative z-10">Explore All Stories</span>
                <span className="relative z-10 text-xl">→</span>
                <div className="absolute inset-0 bg-background/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;

