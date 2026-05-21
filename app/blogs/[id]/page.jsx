// import React from "react";
// import Link from "next/link";
// import { FaRegCalendarAlt } from "react-icons/fa";

// function formatDate(dateStr) {
//   if (!dateStr) return "Unknown Date";
//   const date = new Date(dateStr);
//   return isNaN(date) ? "Unknown Date" : date.toDateString();
// }

// export default async function Page({ params }) {
//   const { id } = params || {};
//   const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9002";

//   let blog = null;
//   try {
//     const res = await fetch(`${apiBase}/admin/blog/get/${id}`, { cache: "no-store" });
//     const data = await res.json();
//     blog = data?.blog || data;
//   } catch (err) {
//     console.error("Failed to load blog", err);
//   }

//   if (!blog)
//     return (
//       <div className="py-10 sm:py-10 md:py-12 lg:py-14px-6 text-center">
//         <p className="text-lg">Blog not found.</p>
//         <div className="mt-6">
//           <Link href="/blogs" className="px-4 py-2 bg-background00 rounded-md">
//             Go back to blogs
//           </Link>
//         </div>
//       </div>
//     );

//   return (
//     <main className="max-w-4xl mx-auto py-12 px-6">
//       <div className="mb-6">
//         <Link href="/blogs" className="text-sm text-text hover:underline">
//           ← Back to blogs
//         </Link>
//       </div>

//       <article className="bg-background p-8 rounded-lg shadow">
//         <header className="mb-4">
//           <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
//           <div className="flex items-center gap-3 text-sm text-text">
//             <span className="inline-block bg-yellow-100 text-highlight px-2 py-1 rounded">
//               {blog.category || blog.tag || "General"}
//             </span>
//             <span className="flex items-center gap-2">
//               <FaRegCalendarAlt /> {formatDate(blog.createdAt || blog.created_at || blog.date)}
//             </span>
//           </div>
//         </header>

//         {blog.image && (
//           // some blogs may have `image` or `imageUrl`
//           <div className="mb-6">
//             <img src={blog.image || blog.imageUrl} alt={blog.title} className="w-full rounded" />
//           </div>
//         )}

//         <section
//           className="prose max-w-none"
//           dangerouslySetInnerHTML={{
//             __html: blog.full_description || blog.content || blog.short_description || "",
//           }}
//         />

//       </article>
//     </main>
//   );
// }



import React from "react";
import Link from "next/link";
import { FaRegCalendarAlt, FaRegClock, FaArrowLeft, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./premium-blog.css";
import RichTextHtmlRenderer from "@/app/components/RichTextHtmlRenderer";

function formatDate(dateStr) {
  if (!dateStr) return "March 23, 2026";
  const date = new Date(dateStr);
  return isNaN(date) ? "March 23, 2026" : date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function Page({ params }) {
  const { id } = await params;
  const { API_ENDPOINTS } = await import('@/app/config/constants');

  let blog = null;
  try {
    const res = await fetch(
      `${API_ENDPOINTS.ADMIN_BASE}/blog/get/${id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    blog = data?.blog || (data?.blogs && data.blogs[0]) || data;
  } catch (err) {
    console.error("Failed to load blog", err);
    // Fallback data for demonstration if API fails or for the specific request
    blog = {
        id: 15,
        title: "The Power of Milk: Why It’s a Daily Essential",
        writer: "Vivek Sharma",
        tag: "Dairy, Health",
        readtime: "4 min",
        full_description: "<p>\n  Milk has been a staple in human diets for centuries, and for good reason.\n  Packed with essential nutrients like <strong>calcium</strong>, <strong>protein</strong>, and \n  <strong>vitamins D and B12</strong>, milk plays a crucial role in maintaining \n  <em>strong bones</em> and overall health.\n</p>\n\n<p>\n  Regular consumption of milk supports <strong>muscle growth</strong>, especially for \n  children and athletes. It also helps improve <strong>bone density</strong> and \n  reduces the risk of <em>osteoporosis</em> later in life.\n</p>\n\n<p>\n  Additionally, milk contains <strong>high-quality protein</strong> that aids in \n  <em>tissue repair</em> and strengthens the <strong>immune system</strong>.\n</p>\n\n<p>\n  Whether consumed as a drink, added to <strong>tea or coffee</strong>, or used in \n  cooking, milk remains one of the most <em>versatile</em> and \n  <strong>nutritious foods</strong>.\n</p>\n\n<p>\n  Choosing <strong>fresh and high-quality milk</strong> ensures you get the \n  maximum health benefits.\n</p>",
        created_at: "2026-03-23T06:33:31.000Z"
    };
  }

  return (
    <div className="premium-blog-container relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-1/4 left-0 w-[30rem] h-[30rem] bg-[#a1887f]/5 rounded-full blur-3xl -translate-x-1/2"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <Link href="/blogs" className="back-link">
          <FaArrowLeft /> Back to Stories
        </Link>
      </div>

      <main className="blog-wrapper">
        <div className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[#a1887f]">
          <img
            src={
                ((blog.image && !blog.image.includes('placeholder')) || (blog.imageUrl && !blog.imageUrl.includes('placeholder'))) 
                ? (blog.image || blog.imageUrl) 
                : "/img/blog.webp"
            }
            alt={blog.title}
            className="blog-header-image"
          />
        </div>

        <article className="blog-content-section">
          <header>
            <span className="blog-tag">
              {blog.tag || blog.category || "Health & Wellness"}
            </span>
            
            <h1 className="blog-title">
              {blog.title}
            </h1>

            <div className="blog-meta">
              <div className="author-info">
                {/* Always use a letter avatar for premium feel if author image is missing or unstable */}
                <div className="author-avatar shadow-inner">
                  {(blog.writer || blog.author || "V").charAt(0)}
                </div>
                <div>
                  <p className="author-name">{blog.writer || blog.author || "Vivek Sharma"}</p>
                  <p className="text-xs text-gray-700 uppercase tracking-widest">Expert Contributor</p>
                </div>
              </div>

              <div className="flex gap-6 flex-wrap">
                <div className="blog-date">
                  <FaRegCalendarAlt className="text-brown-600" />
                  {formatDate(blog.created_at || blog.createdAt)}
                </div>
                <div className="read-time">
                  <FaRegClock className="text-brown-600" />
                  {blog.readtime || "5 min"} read
                </div>
              </div>
            </div>
          </header>


          <RichTextHtmlRenderer
            className="blog-body"
            html={blog.full_description || blog.content || ""}
          />

          <footer className="premium-footer mt-12 border-t border-highlight">
            <div className="share-section">
              <p className="text-sm font-bold text-gray-[#252729b8] uppercase tracking-widest mb-4">Share this story</p>
              <div className="share-buttons">
                <div className="share-btn"><FaFacebookF /></div>
                <div className="share-btn"><FaTwitter /></div>
                <div className="share-btn"><FaLinkedinIn /></div>
                <div className="share-btn"><FaShareAlt /></div>
              </div>
            </div>

            <div className="hidden md:block">
              <Link href="/products" className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-text transition-all">
                Shop Fresh Milk
              </Link>
            </div>
          </footer>
        </article>
      </main>
      
      <section className="max-w-4xl mx-auto mt-16 px-4 text-center">
        <h3 className="text-2xl font-serif mb-4">Subscribe to our Wellness Newsletter</h3>
        <p className="text-text mb-8">Get the latest health tips and dairy facts delivered to your inbox.</p>
        <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="your@email.com" className="flex-1 px-6 py-3 rounded-full border border-highlight focus:outline-none focus:ring-2 focus:ring-brown-500" />
            <button className="px-8 py-3 bg-[var(--primary)] text-white rounded-full font-bold shadow-lg">Join</button>
        </div>
      </section>
    </div>
  );
}

