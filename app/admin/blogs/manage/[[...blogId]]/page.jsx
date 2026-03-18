"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { API_ENDPOINTS } from "@/app/config/constants";
import toast from "react-hot-toast";

// Client-side only editor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AdminBlogManagePage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editor = useRef(null);

  // unwrap params INSIDE component
  const resolvedParams = React.use(params);

  // Optional route param
  const blogIdFromRoute = useMemo(() => {
    const raw = resolvedParams?.blogId;
    if (!raw) return null;
    if (Array.isArray(raw)) return raw[0] || null;
    return raw;
  }, [resolvedParams]);

  const blogIdFromQuery = searchParams?.get("blogId");
  const modeFromQuery = searchParams?.get("mode");

  const isEditMode = useMemo(() => {
    return Boolean(blogIdFromRoute || blogIdFromQuery) || modeFromQuery === "edit";
  }, [blogIdFromRoute, blogIdFromQuery, modeFromQuery]);

  const activeBlogId = blogIdFromRoute || blogIdFromQuery;

  // Form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");
  const [readTime, setReadTime] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editorKey, setEditorKey] = useState(0);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setTag("");
    setReadTime("");
    setContent("");
    setEditorKey((p) => p + 1);
  };

  // Load blog in edit mode
  useEffect(() => {
    if (!isEditMode || !activeBlogId) {
      resetForm();
      return;
    }

    setLoading(true);

    (async () => {
      try {
        const res = await fetch(
          `${API_ENDPOINTS.ADMIN_BASE}/blog/get/${activeBlogId}`,
          { cache: "no-store" }
        );

        const data = await res.json().catch(() => null);
        if (!res.ok || data?.success === false) {
          throw new Error(data?.message || "Unable to load blog");
        }

        const blog = data?.blog || data;

        setTitle(blog.title || "");
        setAuthor(blog.writer || blog.author || "");
        setTag(blog.tag || "");
        setReadTime(blog.readtime || blog.readTime || "");
        setContent(blog.full_description || blog.content || "");
        setEditorKey((p) => p + 1);

        toast.success("Blog loaded ✨");
      } catch (err) {
        toast.error(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    })();
  }, [isEditMode, activeBlogId]);

  const validateForm = () => {
    if (!title || !author || !content || !tag || !readTime) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isEditing = Boolean(isEditMode && activeBlogId);
    const url = isEditing
      ? `${API_ENDPOINTS.ADMIN_BASE}/blog/update/${activeBlogId}`
      : `${API_ENDPOINTS.ADMIN_BASE}/blog/create`;

    const method = isEditing ? "PUT" : "POST";

    setSaving(true);
    const toastId = toast.loading(isEditing ? "Updating blog..." : "Creating blog...");

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          writer: author,
          tag,
          readtime: readTime,
          readTime,
          content,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Save failed");
      }

      toast.success(
        isEditing ? "Blog updated successfully ✅" : "Blog created successfully ✅",
        { id: toastId }
      );

      router.push("/admin/blogs");
    } catch (err) {
      toast.error(err.message || "Save failed", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Blog" : "Create Blog"}
        </h1>

        <Link
          href="/admin/blogs"
          className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm hover:bg-gray-100"
        >
          Back to list
        </Link>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading || saving}
          />
          <input
            className="border p-2 rounded"
            placeholder="Author / Writer"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={loading || saving}
          />
          <input
            className="border p-2 rounded"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            disabled={loading || saving}
          />
          <input
            className="border p-2 rounded"
            placeholder="Read Time (e.g. 5 min)"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            disabled={loading || saving}
          />
        </div>

        <div className="mt-4 border rounded-md overflow-hidden">
          <JoditEditor
            key={editorKey}
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            config={{
              readonly: false,
              height: 440,
              toolbarSticky: true,
              buttons:
                "bold,italic,underline,strikethrough,|," +
                "ul,ol,|," +
                "outdent,indent,|," +
                "link,image,video,|," +
                "font,fontsize,paragraph,|," +
                "source,undo,redo",
            }}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={saving || loading}
            className="px-5 py-2 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditMode ? "Update Blog" : "Create Blog"}
          </button>

          <button
            onClick={resetForm}
            disabled={saving || loading}
            className="px-5 py-2 rounded-md border text-sm font-semibold hover:bg-gray-100 disabled:opacity-60"
          >
            Reset
          </button>

          {loading && (
            <span className="text-sm text-gray-600">Loading blog…</span>
          )}
        </div>
      </div>
    </div>
  );
}