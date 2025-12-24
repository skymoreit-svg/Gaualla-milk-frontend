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
//       <div className="py-20 px-6 text-center">
//         <p className="text-lg">Blog not found.</p>
//         <div className="mt-6">
//           <Link href="/blogs" className="px-4 py-2 bg-gray-100 rounded-md">
//             Go back to blogs
//           </Link>
//         </div>
//       </div>
//     );

//   return (
//     <main className="max-w-4xl mx-auto py-12 px-6">
//       <div className="mb-6">
//         <Link href="/blogs" className="text-sm text-gray-700 hover:underline">
//           ← Back to blogs
//         </Link>
//       </div>

//       <article className="bg-white p-8 rounded-lg shadow">
//         <header className="mb-4">
//           <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
//           <div className="flex items-center gap-3 text-sm text-gray-600">
//             <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
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
import { FaRegCalendarAlt } from "react-icons/fa";

function formatDate(dateStr) {
  if (!dateStr) return "Unknown Date";
  const date = new Date(dateStr);
  return isNaN(date) ? "Unknown Date" : date.toDateString();
}

export default async function Page({ params }) {
  const { id } = params || {};
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:9002";

  let blog = null;
  try {
    const res = await fetch(
      `${apiBase}/admin/blog/get/${id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    blog = data?.blog || data;
  } catch (err) {
    console.error("Failed to load blog", err);
  }

  if (!blog)
    return (
      <div className="py-20 px-6 text-center">
        <p className="text-lg">Blog not found.</p>
        <div className="mt-6">
          <Link
            href="/blogs"
            className="px-4 py-2 bg-gray-100 rounded-md"
          >
            Go back to blogs
          </Link>
        </div>
      </div>
    );

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-6">
        <Link
          href="/blogs"
          className="text-sm text-gray-700 hover:underline"
        >
          ← Back to blogs
        </Link>
      </div>

      <article className="bg-white p-8 rounded-lg shadow">
        <header className="mb-6">
          
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              {blog.category || blog.tag || "General"}
            </span>

            <span className="flex items-center gap-2">
              <FaRegCalendarAlt />
              {formatDate(
                blog.createdAt || blog.created_at || blog.date
              )}
            </span>

            
            <span>
              {blog.readtime || "5"} min read
            </span>
          </div>

          
          <div className="flex items-center gap-3 mt-6">
            <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center font-semibold text-yellow-800">
              {(blog.author || blog.writer || "A").charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {blog.author || blog.writer || "Admin"}
              </p>
              <p className="text-xs text-gray-500">
                Content Writer
              </p>
            </div>
          </div>
        </header>

        {blog.image && (
          <div className="mb-6">
            <img
              src={blog.image || blog.imageUrl}
              alt={blog.title}
              className="w-full rounded"
            />
          </div>
        )}

        <section
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html:
              blog.full_description ||
              blog.content ||
              blog.short_description ||
              "",
          }}
        />
      </article>
    </main>
  );
}
