"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import slugify from "slugify";
import { adminurl } from "../../adminCompo/adminapis";
import { FaPlus, FaPlusCircle,FaTag,FaSignature,FaLink,FaAlignLeft,FaDollarSign,FaRegMoneyBillAlt,FaBoxes,FaWeight,FaInfoCircle,FaExclamationCircle ,FaImages,FaUpload} from "react-icons/fa";


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
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "images" && value) {
          for (let i = 0; i < value.length; i++) {
            formData.append("images", value[i]);
          }
        } else {
          formData.append(key, value);
        }
      });

      const res = await axios.post(`${adminurl}/product/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Product created successfully!");
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
      }
    } catch (err) {
      console.error(err);
      alert("Product creation failed");
    }
  };




  return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
  <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <FaPlusCircle className="inline" /> Create New Product
      </h1>
      <p className="text-blue-100 mt-1">Add a new product to your inventory</p>
    </div>

    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Category */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <label className="block text-sm font-medium text-blue-800 flex items-center gap-2 mb-1">
          <FaTag className="text-blue-600" /> Category
        </label>
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
          className="w-full border border-blue-200 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">Select Category</option>
          {categories?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <FaSignature className="text-blue-600" /> Product Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter product name"
        />
      </div>

      {/* Slug (auto-generated) */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <FaLink className="text-gray-500" /> Slug
        </label>
        <input
          type="text"
          name="slug"
          value={form.slug}
          readOnly
          className="w-full border border-gray-200 rounded-lg p-3 mt-1 bg-gray-100 text-gray-600"
        />
        <p className="text-xs text-gray-500 mt-1">Auto-generated from product name</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <FaAlignLeft className="text-blue-600" /> Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Describe your product..."
        />
      </div>

      {/* Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaDollarSign className="text-green-600" /> Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">₹</span>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg pl-8 p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaRegMoneyBillAlt className="text-gray-500" /> Old Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">₹</span>
            <input
              type="number"
              step="0.01"
              name="old_price"
              value={form.old_price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-8 p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Stock & Unit Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaBoxes className="text-blue-600" /> Stock
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Quantity in stock"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaWeight className="text-blue-600" /> Unit Quantity
          </label>
          <input
            type="text"
            name="unit_quantity"
            value={form.unit_quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., 500g, 1L, 12-pack"
          />
        </div>
      </div>

      {/* Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <FaInfoCircle className="text-blue-600" /> Details
        </label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Additional product details..."
        />
      </div>

      {/* One-time Checkbox */}
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
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <label className="block text-sm font-medium text-gray-700 flex items-center justify-center gap-2 mb-2">
          <FaImages className="text-blue-600 text-lg" /> Product Images
        </label>
        <p className="text-xs text-gray-500 mb-4">Upload one or multiple product images</p>
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
        <p className="text-xs text-gray-500 mt-3">PNG, JPG, GIF up to 10MB</p>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
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
    