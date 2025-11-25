"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { adminimg, adminurl } from '../adminCompo/adminapis'

const page = () => {
    const [blogs, setBlogs] = useState();


    const fetchAllBlog = async () => {
        const response = await axios.get(`${adminurl}/blog/getall`)
        const data = await response.data;

        if (data.success) {
            setBlogs(data.blogs)
        }
    }



  const handelDelete=async(id)=>{
    const response = await axios.delete(`${adminurl}/blog/delete/${id}`);
    const data = response.data;
    if(data.success){
       fetchAllBlog() 
    }
  }








    useEffect(() => {
        fetchAllBlog()
    }, [])


    return (
       <div>
  {/* Header Section */}
  <div className="flex justify-between items-center px-6 py-4 bg-white shadow rounded-lg mb-6">
    <p className="text-2xl font-bold text-gray-800">📚 Blogs</p>
    <Link
      href="/admin#/create"
      className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-4 py-2 rounded-lg font-semibold shadow transition"
    >
      + Create Blog
    </Link>
  </div>

  {/* Table Section */}
  <div className="p-6 bg-gray-100 min-h-screen">
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-700">All Blogs</h2>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Title</th>
            <th className="p-4">Writer</th>
            <th className="p-4">Media</th>
            <th className="p-4">Type</th>
            <th className="p-4">Created At</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.length > 0 ? (
            blogs.map((blog, idx) => (
              <tr
                key={blog.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">{idx + 1}</td>
                <td className="p-4 font-semibold text-gray-800">
                  {blog.title}
                </td>
                <td className="p-4 text-gray-600">{blog.writer}</td>
                <td className="p-4">
                  {blog.type === "img" && blog.img ? (
                    <img
                      src={`${adminimg}/uploads/${blog.img}`}
                      alt={blog.title}
                      className="h-16 w-28 object-cover rounded shadow-sm"
                    />
                  ) : blog.type === "video" && blog.yt_link ? (
                    <iframe
                      width="200"
                      height="110"
                      src={blog.yt_link.replace("watch?v=", "embed/")}
                      title="YouTube video player"
                      className="rounded shadow-sm"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Media</span>
                  )}
                </td>
                <td className="p-4 capitalize text-gray-700">{blog.type}</td>
                <td className="p-4 text-gray-600">
                  {new Date(blog.created_at).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  <button onClick={()=>handelDelete(blog.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-medium shadow transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-6 text-center text-gray-500" colSpan="7">
                No blogs found 🚫
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

  )
}

export default page