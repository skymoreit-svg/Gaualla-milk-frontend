"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import slugify from "slugify";
import Link from "next/link";
import { adminurl } from "../../../adminCompo/adminapis";
import { FaPlus, FaPlusCircle, FaTag, FaSignature, FaLink, FaAlignLeft, FaDollarSign, FaRegMoneyBillAlt, FaBoxes, FaWeight, FaInfoCircle, FaExclamationCircle, FaImages, FaUpload } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// Enable credentials for all admin requests
axios.defaults.withCredentials = true;

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

  const joditConfig = useMemo(() => ({
    readonly: false,
    placeholder: "Start typing...",
    height: 300,
    toolbarSticky: false,
    toolbarAdaptive: false,
    buttons: "bold,italic,paragraph,image,video",
    uploader: {
      insertImageAsBase64URI: true
    }
  }), []);

  // Fetch categories
  const getCategories = async () => {
    try {
      const response = await axios.get(`${adminurl}/category`, {
        withCredentials: true
      });
      const data = response.data;
      if (data.success) setCategories(data.category);
    } catch (e) {
      console.error("Category fetch failed:", e.message);
    }
  };

  // Fetch single product
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${adminurl}/product/id/${productId}`, {
        withCredentials: true
      });
      const data = response.data;
      if (data.success && data.product) {
        const product = data.product;
        console.log("Fetched product data:", product); // Debug log
        setForm({
          category_id: product.category_id ? String(product.category_id) : "",
          name: product.name || "",
          slug: product.slug || "",
          description: product.description || "",
          price: product.price ? String(product.price) : "",
          old_price: product.old_price ? String(product.old_price) : "",
          stock: product.stock ? String(product.stock) : "",
          unit_quantity: product.unit_quantity || "",
          details: product.details || "",
          images: null, // Will be handled separately for editing
          one_time: product.one_time === 1 || product.one_time === "1" || product.one_time === true,
        });
      } else {
        toast.error("Product not found");
        router.push("/admin/products");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error(error.response?.data?.message || "Failed to load product");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      getCategories();
      fetchProduct();
    }
  }, [productId]);

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
          withCredentials: true
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
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-text">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/admin/products"
              className="flex items-center gap-2 bg-background00 hover:bg-background00 text-text px-4 py-2 rounded-lg font-semibold transition-all duration-200"
            >
              <ArrowLeft size={20} />
              Back to Products
            </Link>
            <h2 className="text-3xl font-bold text-text">Edit Product</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div className="border border-highlight rounded-lg p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaTag className="text-primary" /> Category <span className="text-red-500">*</span>
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
                  <option key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Name */}
            <div className="border border-highlight rounded-lg p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaSignature className="text-primary" /> Product Name <span className="text-red-500">*</span>
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
            <div className="border border-highlight rounded-lg p-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaLink className="text-primary" /> Slug (URL)
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-background"
                placeholder="auto-generated-slug"
                readOnly
              />
              <p className="text-xs text-gray-700 mt-1">Auto-generated from product name</p>
            </div>

            {/* Description */}
            <div className="border border-highlight rounded-lg p-4 bg-background">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaAlignLeft className="text-primary" /> Description
              </label>
              <div className="mt-1 border rounded-md overflow-hidden bg-background">
                <JoditEditor
                  key="description-editor-edit"
                  value={form.description}
                  onBlur={(newContent) => setForm((prev) => ({ ...prev, description: newContent }))}
                  config={joditConfig}
                />
              </div>
            </div>

            {/* Price and Old Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-highlight rounded-lg p-4">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FaDollarSign className="text-primary" /> Price <span className="text-red-500">*</span>
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
              <div className="border border-highlight rounded-lg p-4">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FaRegMoneyBillAlt className="text-primary" /> Old Price
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
              <div className="border border-highlight rounded-lg p-4">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FaBoxes className="text-primary" /> Stock <span className="text-red-500">*</span>
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
              <div className="border border-highlight rounded-lg p-4">
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FaWeight className="text-primary" /> Unit Quantity
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
            <div className="border border-highlight rounded-lg p-4 bg-background">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FaInfoCircle className="text-primary" /> Additional Details
              </label>
              <div className="mt-1 border rounded-md overflow-hidden bg-background">
                <JoditEditor
                  key="details-editor-edit"
                  value={form.details}
                  onBlur={(newContent) => setForm((prev) => ({ ...prev, details: newContent }))}
                  config={joditConfig}
                />
              </div>
            </div>

            {/* One Time Product Checkbox */}
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
            <div className="border-2 border-dashed border-highlight rounded-lg p-6 text-center">
              <label className="block text-sm font-medium text-text flex items-center justify-center gap-2 mb-2">
                <FaImages className="text-primary text-lg" /> Product Images
              </label>
              <p className="text-xs text-gray-700 mb-4">Upload new images to replace existing ones (optional)</p>
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
              <p className="text-xs text-gray-700 mt-3">PNG, JPG, GIF up to 10MB each</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-primary to-primary text-white px-6 py-3 rounded-lg hover:from-primary hover:to-primary transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
