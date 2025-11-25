"use client";

import { useState } from "react";
import { FaImage, FaYoutube, FaPen } from "react-icons/fa";
import axios from "axios";
import { adminurl } from "../../adminCompo/adminapis";

export default function CreateBlog() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    writer: "",
    short_description: "",
    full_description: "",
    yt_link: "",
    type: "img",
  });

  const [imgFile, setImgFile] = useState(null);

  // Auto-generate slug when typing title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setForm({ ...form, title, slug });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImgFile(e.target.files[0]);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("writer", form.writer);
    formData.append("short_description", form.short_description);
    formData.append("full_description", form.full_description);
    formData.append("yt_link", form.yt_link);
    formData.append("type", form.type);

    // attach file if selected
    if (imgFile) {
      formData.append("image", imgFile);
    }

    await axios.post(`${adminurl}/blog/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Blog created successfully!");
  } catch (error) {
    console.error(error);
    alert("Error creating blog!");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <FaPen className="text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Blog</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={form.title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Writer */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Writer</label>
            <input
              type="text"
              name="writer"
              placeholder="Author name"
              value={form.writer}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Short description */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Short Description
            </label>
            <textarea
              name="short_description"
              placeholder="Write a short summary..."
              value={form.short_description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Full description */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Full Description
            </label>
            <textarea
              name="full_description"
              placeholder="Write the full content..."
              value={form.full_description}
              onChange={handleChange}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* File upload + YouTube link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 mb-1 font-medium text-gray-700">
                <FaImage className="text-blue-500" /> Upload Image
              </label>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              {imgFile && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected: {imgFile.name}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 mb-1 font-medium text-gray-700">
                <FaYoutube className="text-red-500" /> YouTube Link
              </label>
              <input
                type="text"
                name="yt_link"
                placeholder="https://youtu.be/xxxx"
                value={form.yt_link}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Blog Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="img">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-600 transition"
          >
            🚀 Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
}
