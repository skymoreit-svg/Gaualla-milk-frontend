"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import for client-side only
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AdminBlogEditor() {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");           
  const [readTime, setReadTime] = useState(""); 
  const [content, setContent] = useState("");   
  const [saving, setSaving] = useState(false);

  
  const [editorKey, setEditorKey] = useState(0);

  const handleSave = async () => {
    if (!title || !author || !content || !tag || !readTime) { 
      alert("All fields are required");
      return;
    }

    setSaving(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9002";
      const res = await fetch(`${apiBase}/admin/blog/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, tag, readTime, content }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = data?.message || data?.error || "Save failed";
        throw new Error(msg);
      }

      alert("Blog saved successfully ✅");

      // Reset all fields
      setTitle("");
      setAuthor("");
      setTag("");        
      setReadTime("");   
      setContent("");
      setEditorKey((prev) => prev + 1); 
    } catch (err) {
      alert(`Save failed ❌ - ${err.message || err}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>

      {/* Title, Author, Tag & Read Time */}
      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-4 rounded"
        placeholder="Read Time (e.g., 5 min)"
        value={readTime}
        onChange={(e) => setReadTime(e.target.value)}
      />

      {/* Jodit Editor */}
      <JoditEditor
        key={editorKey} 
        ref={editor}
        defaultValue={content}
        onBlur={(newContent) => setContent(newContent)} 
        config={{
          readonly: false,
          height: 400,
          toolbarSticky: true,
          toolbarButtonSize: "middle",
          toolbarAdaptive: true,
          listStylePosition: true,
          buttons:
            "bold,italic,underline,strikethrough,|," +
            "ul,ol,|," +
            "outdent,indent,|," +
            "link,image,video,|," +
            "font,fontsize,paragraph,|," +
            "source,undo,redo",
        }}
      />

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        {saving ? "Saving..." : "Save Blog"}
      </button>
    </div>
  );
}
