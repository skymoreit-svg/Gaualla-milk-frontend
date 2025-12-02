"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Edit2, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { adminurl, adminimg } from "../adminCompo/adminapis";

import DeletePopup from "../../components/DeletePopup";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // popup states
  const [popupOpen, setPopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // OPEN POPUP
  const openPopup = (id) => {
    setDeleteId(id);
    setPopupOpen(true);
  };

  // DELETE CONFIRM HANDLER
  const handleConfirmDelete = async () => {
    setPopupOpen(false);
    const toastId = toast.loading("Deleting...");

    try {
      const res = await axios.delete(`${adminurl}/category/${deleteId}`);

      if (res.data.success) {
        toast.success("Category deleted successfully!", { id: toastId });
        fetchCategories();
      } else {
        toast.error("Delete failed!", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!", { id: toastId });
    }
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${adminurl}/category`);
      const data = response.data;

      if (data.success) {
        setCategories(data.category);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // FILTERED LIST
  const filtered = useMemo(() => {
    return categories.filter((c) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(search) ||
        (c.description || "").toLowerCase().includes(search);

      const matchesStatus =
        selectedStatus === "all" || c.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, selectedStatus]);

  return (
    <div className="container mx-auto px-7 py-8">

      {/* DELETE POPUP */}
      <DeletePopup
        isOpen={popupOpen}
        title="Delete Category?"
        message="This action cannot be undone."
        onCancel={() => setPopupOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-900 text-sm mt-1">Manage product categories</p>
        </div>

        <Link
          href="/admin/category/create"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Category
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="bg-white border border-gray-400 rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading categories...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchCategories}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Showing <strong>{filtered.length}</strong> of {categories.length} categories
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center py-12 bg-white rounded-2xl shadow">
                No categories found
              </div>
            ) : (
              filtered.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-lg shadow p-5 relative border border-gray-100"
                >
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <Link
                      href={`/admin/category/edit/${cat.id}`}
                      title="Edit"
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 className="w-5 h-5" />
                    </Link>

                    <button
                      title="Delete"
                      onClick={() => openPopup(cat.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <Image
                      src={`${adminimg}/uploads/${cat.image}`}
                      alt={cat.name}
                      width={200}
                      height={150}
                      className="w-40 h-40 rounded-lg object-cover border mx-auto"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {cat.name}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
