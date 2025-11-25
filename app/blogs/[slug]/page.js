import Link from "next/link";
import React from "react";
import BlogInner from "@/app/components/BlogInner";
import blogs from "../blogData"
export const metadata = {
  title: "Gaualla Milk Dairy Blog – Traditional Wisdom for Modern Kitchens",
  description:
    "Explore the world of Indian brass cookware, tips on Ayurvedic cooking, care guides, health benefits, and traditional recipes that bring timeless value to your kitchen.",
};



export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .split(/\s+/)
      .join("-"),
  }));
}

const page = ({ params: { slug } }) => {
  const currentBlog = blogs.find(
    (blog, indx) =>
      blog.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .split(/\s+/)
        .join("-") == slug
  );

  return (
    <>
      <BlogInner currentBlog={currentBlog} />
    </>
  );
};

export default page;
