"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUpload, FiImage, FiCheck, FiX } from "react-icons/fi";
import { adminurl, adminimg } from "../../../adminCompo/adminapis";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

const EditCategoryPage = () => {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id;

  const [selectedFile, setSelectedFile] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Single Category
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${adminurl}/category/${categoryId}`);
      const data = response.data;

      if (data.success) {
        setCategory(data.category.name);
        setOldImage(data.category.image);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  // Submit Updated Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    formData.append("category", category);

    try {
      const response = await axios.put(
        `${adminurl}/category/${categoryId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );


      const data = response.data;
      if (data.success) {
        toast.success("Category Updated Successfully! 🎉"); // <-- toast here
        router.push("/admin/category"); // Redirect back
      } else {
        toast.error(data.message || "Failed to update category"); // <-- toast for error
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      toast.error("Failed to update category!"); // <-- toast for error
    }
  };
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen w-full bg-primary flex justify-center p-4">
      <div className="bg-background rounded-2xl shadow-xl p-8 md:w-lg">
        <h2 className="text-3xl font-bold text-text mb-6 text-center">
          Edit Category
        </h2>

        {/* Old Image */}
        <div className="mb-6">
          <p className="text-sm font-medium text-text mb-1">Current Image</p>
          <img
            src={`${adminimg}/uploads/${oldImage}`}
            alt="Category"
            className="w-40 h-40 rounded-lg object-cover border"
          />
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="border border-dashed p-4 rounded-lg text-center">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              {selectedFile ? (
                <div className="space-y-2">
                  <p className="text-accent font-medium">New File Selected</p>
                  <p className="text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-gray-700">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-text">
                  <FiUpload className="text-primary w-8 h-8 mb-2" />
                  <p>Click to upload new image</p>
                </div>
              )}
            </label>
          </div>

          {/* Category Name */}
          <div>
            <label className="text-sm font-medium">Category Name</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-3 rounded-lg mt-1"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-lg text-lg font-medium hover:bg-accent"
          >
            Save Changes
          </button>
        </form>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background00 hover:bg-gray-300 text-text transition mb-6 mt-7"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default EditCategoryPage;
