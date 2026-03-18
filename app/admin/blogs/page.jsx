"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@/app/config/constants";
import ConfirmDialog from "@/app/components/ConfirmDialog";

export default function AdminBlogsListPage() {
  const [blogs, setBlogs] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setListLoading(true);
    setListError("");
    try {
      const res = await fetch(`${API_ENDPOINTS.ADMIN_BASE}/blog/getall`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data?.success && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else {
        setListError(data?.message || "Failed to load blogs");
      }
    } catch (err) {
      setListError(err.message || "Failed to load blogs");
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // open dialog
  const askDelete = (blogId) => {
    setSelectedBlogId(blogId);
    setConfirmOpen(true);
  };

  // confirm delete
  const handleDelete = async () => {
    if (!selectedBlogId) return;

    setDeletingId(selectedBlogId);

    try {
      const res = await fetch(
        `${API_ENDPOINTS.ADMIN_BASE}/blog/delete/${selectedBlogId}`,
        { method: "DELETE" }
      );
      const data = await res.json().catch(() => null);

      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Delete failed");
      }

      setBlogs((prev) => prev.filter((b) => b.id !== selectedBlogId));
      toast.success("Blog deleted successfully");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    } finally {
      setDeletingId(null);
      setConfirmOpen(false);
      setSelectedBlogId(null);
    }
  };

  const formatReadTime = (value) => {
    if (!value) return "-";
    return `${value}`;
  };

  return (
    <div className="max-w-full mx-auto px-3 sm:px-6 lg:px-8 py-6">
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>

          <div className="flex gap-2">
            <button
              onClick={fetchBlogs}
              disabled={listLoading}
              className="px-3 py-1.5 rounded-md border border-blue-200 bg-blue-50 text-sm font-semibold text-blue-700"
            >
              Refresh
            </button>

            <Link
              href="/admin/blogs/manage"
              className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-semibold"
            >
              Create Blog
            </Link>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="min-w-full text-sm bg-white">
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b hover:bg-gray-100">
                  <td className="px-3 py-3 font-semibold">{blog.title}</td>
                  <td className="px-3 py-3">
                    {blog.writer || blog.author || "—"}
                  </td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-50">
                      {blog.tag || "—"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-50">
                      {formatReadTime(blog.readtime || blog.readTime)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right space-x-2">
                    <Link
                      href={`/admin/blogs/manage/${blog.id}?mode=edit`}
                      className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => askDelete(blog.id)}
                      className="px-3 py-1.5 rounded-md bg-red-600 text-white text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Blog?"
        message="This blog will be permanently deleted."
        confirmText="Delete"
        loading={Boolean(deletingId)}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}