"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import slugify from "slugify";
import Link from "next/link";
import { adminurl } from "../../../adminCompo/adminapis";
import { FaPlus, FaPlusCircle, FaTag, FaSignature, FaLink, FaAlignLeft, FaDollarSign, FaRegMoneyBillAlt, FaBoxes, FaWeight, FaInfoCircle, FaExclamationCircle, FaImages, FaUpload } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import toast from "react-hot-toast";

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    category_id: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    old_price: "",
    stock: "",
    unit_quantity: "",
    details: "",
    images: null, // file
    one_time: false,
  });

  // Fetch categories
  const getCategories = async () => {
    try {
      const response = await axios.get(`${adminurl}/category`);
      const data = response.data;
      if (data.success) setCategories(data.category);
    } catch (e) {
      console.error("Category fetch failed:", e.message);
    }
  };

  // Fetch single product
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${adminurl}/product/product/${productId}`);
      const data = response.data;
      if (data.success) {
        const product = data.product;
        setForm({
          category_id: product.category_id || "",
          name: product.name || "",
          slug: product.slug || "",
          description: product.description || "",
          price: product.price || "",
          old_price: product.old_price || "",
          stock: product.stock || "",
          unit_quantity: product.unit_quantity || "",
          details: product.details || "",
          images: null, // Will be handled separately for editing
          one_time: product.one_time === 1,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    fetchProduct();
  }, []);

  // Auto-slugify when name changes
  useEffect(() => {
    if (form.name) {
      setForm((prev) => ({
        ...prev,
        slug: slugify(prev.name, { lower: true, strict: true, trim: true }),
      }));
    }
  }, [form.name]);

  // Handle change for inputs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, images: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!form.category_id) {
  toast.error("Please select a category");
  return;
}
if (!form.name.trim()) {
  toast.error("Please enter product name");
  return;
}
if (!form.price) {
  toast.error("Please enter price");
  return;
}
if (!form.stock) {
  toast.error("Please enter stock quantity");
  return;
}

    setSaving(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "images" && value) {
          for (let i = 0; i < value.length; i++) {
            formData.append("images", value[i]);
          }
        } else if (key === "one_time") {
          formData.append(key, value ? "1" : "0");
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.put(
        `${adminurl}/product/${productId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const data = response.data;
      if (data.success) {
  toast.success("✅ Product updated successfully!");
  router.push("/admin/products");
} else {
  toast.error("❌ Failed to update product");
}
    }catch (error) {
  console.error("Error updating product:", error.response?.data || error.message);
  toast.error("❌ Failed to update product. Please try again.");
} finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/admin/products"
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
            >
              <ArrowLeft size={20} />
              Back to Products
            </Link>
            <h2 className="text-3xl font-bold text-gray-800">Edit Product</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaTag className="text-blue-600" /> Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Name */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaSignature className="text-blue-600" /> Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Slug */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaLink className="text-blue-600" /> Slug (URL)
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-gray-50"
                placeholder="auto-generated-slug"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Auto-generated from product name</p>
            </div>

            {/* Description */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaAlignLeft className="text-blue-600" /> Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full border p-3 rounded-lg"
                placeholder="Product description"
              />
            </div>

            {/* Price and Old Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FaDollarSign className="text-blue-600" /> Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full border p-3 rounded-lg"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FaRegMoneyBillAlt className="text-blue-600" /> Old Price
                </label>
                <input
                  type="number"
                  name="old_price"
                  value={form.old_price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full border p-3 rounded-lg"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Stock and Unit Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FaBoxes className="text-blue-600" /> Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full border p-3 rounded-lg"
                  placeholder="0"
                  required
                />
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FaWeight className="text-blue-600" /> Unit Quantity
                </label>
                <input
                  type="text"
                  name="unit_quantity"
                  value={form.unit_quantity}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  placeholder="e.g., 1L, 500g, 12pcs"
                />
              </div>
            </div>

            {/* Details */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaInfoCircle className="text-blue-600" /> Additional Details
              </label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                rows={3}
                className="w-full border p-3 rounded-lg"
                placeholder="Additional product details"
              />
            </div>

            {/* One Time Product Checkbox */}
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="one_time"
                  checked={form.one_time}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaExclamationCircle className="text-blue-600" />
                <label className="text-sm font-medium text-gray-700">One Time Product</label>
              </div>
              <span className="text-xs text-blue-600 ml-auto bg-blue-100 px-2 py-1 rounded-full">Optional</span>
            </div>

            {/* Images */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <label className="block text-sm font-medium text-gray-700 flex items-center justify-center gap-2 mb-2">
                <FaImages className="text-blue-600 text-lg" /> Product Images
              </label>
              <p className="text-xs text-gray-500 mb-4">Upload new images to replace existing ones (optional)</p>
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                <FaUpload className="inline" /> Choose Files
                <input
                  type="file"
                  name="images"
                  onChange={handleChange}
                  multiple
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-3">PNG, JPG, GIF up to 10MB each</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaPlus className="inline" /> Update Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
