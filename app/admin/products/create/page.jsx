"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import slugify from "slugify";
import Link from "next/link";
import { adminurl } from "../../adminCompo/adminapis";

// Enable credentials for all admin requests
axios.defaults.withCredentials = true;
import { FaPlus, FaPlusCircle,FaTag,FaSignature,FaLink,FaAlignLeft,FaDollarSign,FaRegMoneyBillAlt,FaBoxes,FaWeight,FaInfoCircle,FaExclamationCircle ,FaImages,FaUpload} from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

import toast from "react-hot-toast";



const ProductCreatePage = () => {
  const [categories, setCategories] = useState([]);
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

  // fetch categories
  const getCategories = async () => {
    try {
      const response = await axios.get(`${adminurl}/category`);
          console.log("CATEGORY API RESPONSE =", response.data);
      const data = response.data;
      if (data.success) setCategories(data.category);
    } catch (e) {
      console.error("Category fetch failed:", e.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // auto-slugify when name changes
  useEffect(() => {
    if (form.name) {
      setForm((prev) => ({
        ...prev,
        slug: slugify(prev.name, { lower: true, strict: true, trim: true }),
      }));
    }
  }, [form.name]);

  // handle change for inputs
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
    
    // ✅ Client-side validation
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

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "images" && value) {
          for (let i = 0; i < value.length; i++) {
            formData.append("images", value[i]);
          }
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const res = await axios.post(`${adminurl}/product/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      if (res.data.success) {
  toast.success("✅ Product created successfully!");
  setForm({
    category_id: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    old_price: "",
    stock: "",
    unit_quantity: "",
    details: "",
    images: null,
    one_time: false,
  });
} else {
  toast.error(`❌ Error: ${res.data.message || "Product creation failed"}`);
}
    } catch (err) {
  console.error(err);
  const errorMsg = err.response?.data?.message || err.message || "Product creation failed";
  toast.error(`❌ ${errorMsg}`);
}
  };




  return (
 <div className="min-h-screen bg-gradient-to-br from-primary to-primary p-4 md:p-8">
  <div className="max-w-3xl mx-auto bg-background shadow-xl rounded-2xl overflow-hidden">
    {/* Header */}
    <div className="bg-gradient-to-r from-primary to-primary p-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <FaPlusCircle className="inline" /> Create New Product
        </h1>

      </div>
      <p className="text-primary mt-1">Add a new product to your inventory</p>
    </div>

    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Category */}
      <div className="bg-primary p-4 rounded-lg border border-primary">
        <label className="block text-sm font-medium text-primary flex items-center gap-2 mb-1">
          <FaTag className="text-primary" /> Category
        </label>
        <select
  name="category_id"
  value={form.category_id}
  onChange={handleChange}
  required
  className="w-full border border-primary rounded-lg p-3 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={String(cat.id)}>
      {cat.name}
    </option>
  ))}
</select>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-text flex items-center gap-2 mb-1">
          <FaSignature className="text-primary" /> Product Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-highlight rounded-lg p-3 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="Enter product name"
        />
      </div>

      {/* Slug (auto-generated) */}
      <div className="bg-background p-4 rounded-lg border border-highlight">
        <label className="block text-sm font-medium text-text flex items-center gap-2 mb-1">
          <FaLink className="text-gray-700" /> Slug
        </label>
        <input
          type="text"
          name="slug"
          value={form.slug}
          readOnly
          className="w-full border border-highlight rounded-lg p-3 mt-1 bg-background00 text-text"
        />
        <p className="text-xs text-gray-700 mt-1">Auto-generated from product name</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-text flex items-center gap-2 mb-1">
          <FaAlignLeft className="text-primary" /> Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full border border-highlight rounded-lg p-3 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="Describe your product..."
        />
      </div>

      {/* Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text flex items-center gap-2 mb-1">
            <FaDollarSign className="text-accent" /> Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-700">₹</span>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border border-highlight rounded-lg pl-8 p-3 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text flex items-center gap-2 mb-1">
            <FaRegMoneyBillAlt className="text-gray-700" /> Old Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-700">₹</span>
            <input
              type="number"
              step="0.01"
              name="old_price"
              value={form.old_price}
              onChange={handleChange}
              className="w-full border border-highlight rounded-lg pl-8 p-3 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Stock & Unit Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text flex items-center gap-2 mb-1">
            <FaBoxes className="text-primary" /> Stock
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full border border-highlight rounded-lg p-3 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Quantity in stock"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text flex items-center gap-2 mb-1">
            <FaWeight className="text-primary" /> Unit Quantity
          </label>
          <input
            type="text"
            name="unit_quantity"
            value={form.unit_quantity}
            onChange={handleChange}
            className="w-full border border-highlight rounded-lg p-3 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g., 500g, 1L, 12-pack"
          />
        </div>
      </div>

      {/* Details */}
      <div>
        <label className="block text-sm font-medium text-text flex items-center gap-2 mb-1">
          <FaInfoCircle className="text-primary" /> Details
        </label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          rows="3"
          className="w-full border border-highlight rounded-lg p-3 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="Additional product details..."
        />
      </div>

      {/* One-time Checkbox */}
      <div className="flex items-center space-x-3 p-4 bg-primary rounded-lg border border-primary">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            name="one_time"
            checked={form.one_time}
            onChange={handleChange}
            className="w-4 h-4 text-primary border-highlight rounded focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <FaExclamationCircle className="text-primary" />
          <label className="text-sm font-medium text-text">One Time Product</label>
        </div>
        <span className="text-xs text-primary ml-auto bg-primary px-2 py-1 rounded-full">Optional</span>
      </div>

      {/* Images */}
      <div className="border-2 border-dashed border-highlight rounded-lg p-6 text-center hover:border-primary transition-colors">
        <label className="block text-sm font-medium text-text flex items-center justify-center gap-2 mb-2">
          <FaImages className="text-primary text-lg" /> Product Images
        </label>
        <p className="text-xs text-gray-700 mb-4">Upload one or multiple product images</p>
        <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors inline-flex items-center gap-2">
          <FaUpload className="inline" /> Choose Files
          <input
            type="file"
            name="images"
            onChange={handleChange}
            multiple
            className="hidden"
          />
        </label>
        <p className="text-xs text-gray-700 mt-3">PNG, JPG, GIF up to 10MB</p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-between items-center pt-4">

        <Link 
          href="/admin/products" 
          className="flex items-center gap-2 bg-black bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
        >
          <ArrowLeft size={20} />
          Back
        </Link>

        <button
          type="submit"
          className=" bg-gradient-to-r from-primary to-primary text-white px-4 py-2 rounded-lg hover:from-primary hover:to-primary transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <FaPlus className="inline" /> Create Product
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default ProductCreatePage;
    
