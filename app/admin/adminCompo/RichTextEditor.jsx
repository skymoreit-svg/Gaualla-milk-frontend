"use client";
import React, { useMemo, useState, useRef } from "react";
import ReactDOM from "react-dom";

// Polyfill ReactDOM.findDOMNode for react-quill in React 19 compatibility
if (typeof window !== "undefined") {
  const findDOMNodePolyfill = (el) => {
    if (!el) return null;
    if (el instanceof HTMLElement) return el;
    if (typeof el.getEditor === "function") {
      return el.getEditor().container;
    }
    return el;
  };

  if (!ReactDOM.findDOMNode) {
    ReactDOM.findDOMNode = findDOMNodePolyfill;
  }
  if (ReactDOM.default && !ReactDOM.default.findDOMNode) {
    ReactDOM.default.findDOMNode = findDOMNodePolyfill;
  }
}

import dynamic from "next/dynamic";
import axios from "axios";
import { adminurl } from "./adminapis";
import { FaUpload, FaVideo, FaTimes, FaLink } from "react-icons/fa";

// Import styles for Quill
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to prevent SSR window reference error
const ReactQuill = dynamic(
  async () => {
    const { default: RQ, Quill } = await import("react-quill");

    // Override the default "video" blot to support both HTML5 <video> tags and iframes dynamically
    if (Quill) {
      try {
        const BlockEmbed = Quill.import("blots/block/embed");
        class CustomVideoBlot extends BlockEmbed {
          static create(value) {
            const node = super.create();
            
            // Check if URL is an iframe-based video (YouTube/Vimeo)
            const isIframe = value.includes("youtube.com") || value.includes("youtu.be") || value.includes("vimeo.com") || value.includes("player.vimeo.com");

            if (isIframe) {
              const iframe = document.createElement("iframe");
              iframe.setAttribute("src", value);
              iframe.setAttribute("frameborder", "0");
              iframe.setAttribute("allowfullscreen", "true");
              iframe.setAttribute("class", "quill-video-iframe w-full aspect-video rounded-xl shadow-md");
              iframe.setAttribute("style", "width: 100%; aspect-ratio: 16/9; display: block; margin: 12px auto; border-radius: 12px;");
              node.appendChild(iframe);
            } else {
              const video = document.createElement("video");
              video.setAttribute("src", value);
              video.setAttribute("autoplay", "true");
              video.setAttribute("muted", "true");
              video.setAttribute("loop", "true");
              video.setAttribute("playsinline", "true");
              video.setAttribute("webkit-playsinline", "true");
              video.setAttribute("controlslist", "nodownload");
              video.setAttribute("class", "quill-video-element w-full rounded-xl shadow-md");
              video.setAttribute("style", "width: 100%; height: auto; display: block; margin: 12px auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);");
              node.appendChild(video);
            }

            node.setAttribute("data-src", value);
            node.setAttribute("class", "quill-video-container my-4");
            node.setAttribute("style", "display: block; width: 100%; text-align: center;");
            return node;
          }

          static value(node) {
            return node.getAttribute("data-src");
          }
        }
        CustomVideoBlot.blotName = "video";
        CustomVideoBlot.tagName = "div";
        Quill.register(CustomVideoBlot, true);
      } catch (err) {
        console.error("Failed to register custom video blot:", err);
      }
    }

    return RQ;
  },
  {
    ssr: false,
    loading: () => (
      <div className="h-60 flex items-center justify-center border border-highlight rounded-lg bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    ),
  }
);

const RichTextEditor = ({ value, onChange, placeholder = "Start typing..." }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoTab, setVideoTab] = useState("upload"); // "upload" | "embed"
  const [embedUrl, setEmbedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const activeQuillRef = useRef(null);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic"],
        ["image", "video"],
        ["clean"],
      ],
      handlers: {
        image: function () {
          // 'this' refers to the Quill toolbar instance
          const quill = this.quill;

          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("files", file);

            try {
              const res = await axios.post(`${adminurl}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
              });

              const fileName = res.data.files?.[0] || res.data.data?.files?.[0];
              const baseUrl = res.data.baseurl || res.data.data?.baseurl || "";
              const imageUrl = res.data.path || res.data.data?.path || (baseUrl + fileName);

              if (imageUrl) {
                const range = quill.getSelection(true) || { index: 0 };
                quill.insertEmbed(range.index, "image", imageUrl);
              }
            } catch (err) {
              console.error("Quill custom image upload failed:", err);
              alert("Image upload failed: " + err.message);
            }
          };
        },
        video: function () {
          // Intercept Quill default video prompts and open our beautiful custom modal
          activeQuillRef.current = this.quill;
          setIsVideoModalOpen(true);
        }
      },
    },
  }), []);

  const formats = [
    "header",
    "bold",
    "italic",
    "image",
    "video",
  ];

  // Helper to parse YouTube and Vimeo URLs
  const getEmbedUrl = (url) => {
    const youtubeReg = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const youtubeMatch = url.match(youtubeReg);
    if (youtubeMatch && youtubeMatch[2].length === 11) {
      return `https://www.youtube.com/embed/${youtubeMatch[2]}`;
    }

    const vimeoReg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
    const vimeoMatch = url.match(vimeoReg);
    if (vimeoMatch && vimeoMatch[3]) {
      return `https://player.vimeo.com/video/${vimeoMatch[3]}`;
    }

    return null;
  };

  const handleInsertVideo = () => {
    if (!embedUrl.trim()) return;
    const quill = activeQuillRef.current;
    if (!quill) return;

    try {
      const range = quill.getSelection(true) || { index: 0 };
      const youtubeOrVimeoUrl = getEmbedUrl(embedUrl);

      // Embed either the resolved YouTube/Vimeo link or direct link
      const targetUrl = youtubeOrVimeoUrl || embedUrl;
      quill.insertEmbed(range.index, "video", targetUrl);

      setIsVideoModalOpen(false);
      setEmbedUrl("");
    } catch (err) {
      console.error("Inserting video link failed:", err);
      alert("Failed to insert video link: " + err.message);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 50 * 1024 * 1024; // 50MB limit
    if (file.size > maxSize) {
      alert("Video file size cannot exceed 50MB.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await axios.post(`${adminurl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const fileName = res.data.files?.[0] || res.data.data?.files?.[0];
      const baseUrl = res.data.baseurl || res.data.data?.baseurl || "";
      const videoUrl = res.data.path || res.data.data?.path || (baseUrl + fileName);

      if (videoUrl) {
        const quill = activeQuillRef.current;
        if (quill) {
          const range = quill.getSelection(true) || { index: 0 };
          quill.insertEmbed(range.index, "video", videoUrl);
        }
      }
      setIsVideoModalOpen(false);
    } catch (err) {
      console.error("Local video upload failed:", err);
      alert("Failed to upload video: " + err.message + "\n" + (err.response?.data?.message || ""));
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("video/")) {
      alert("Please drop a valid video file.");
      return;
    }

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Video file size cannot exceed 50MB.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await axios.post(`${adminurl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const fileName = res.data.files?.[0] || res.data.data?.files?.[0];
      const baseUrl = res.data.baseurl || res.data.data?.baseurl || "";
      const videoUrl = res.data.path || res.data.data?.path || (baseUrl + fileName);

      if (videoUrl) {
        const quill = activeQuillRef.current;
        if (quill) {
          const range = quill.getSelection(true) || { index: 0 };
          quill.insertEmbed(range.index, "video", videoUrl);
        }
      }
      setIsVideoModalOpen(false);
    } catch (err) {
      console.error("Local video upload failed:", err);
      alert("Failed to upload video: " + err.message + "\n" + (err.response?.data?.message || ""));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="quill-editor-wrapper bg-background text-text relative">
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="min-h-[200px]"
      />

      {/* Premium Video Upload Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-background border border-highlight rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 relative animate-popup-in">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-highlight/30">
              <h3 className="text-lg font-bold text-text flex items-center gap-2">
                <FaVideo className="text-primary text-lg animate-pulse" /> Add Video Content
              </h3>
              <button
                onClick={() => {
                  if (!uploading) setIsVideoModalOpen(false);
                }}
                className="text-gray-700 hover:text-text hover:bg-black/5 p-1.5 rounded-full transition-all"
                disabled={uploading}
              >
                <FaTimes />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-highlight/30 my-4">
              <button
                type="button"
                onClick={() => setVideoTab("upload")}
                className={`flex-1 pb-2 text-sm font-semibold border-b-2 transition-all ${
                  videoTab === "upload"
                    ? "border-primary text-text"
                    : "border-transparent text-gray-700 hover:text-text"
                }`}
                disabled={uploading}
              >
                Upload Local Video
              </button>
              <button
                type="button"
                onClick={() => setVideoTab("embed")}
                className={`flex-1 pb-2 text-sm font-semibold border-b-2 transition-all ${
                  videoTab === "embed"
                    ? "border-primary text-text"
                    : "border-transparent text-gray-700 hover:text-text"
                }`}
                disabled={uploading}
              >
                Embed Web Link
              </button>
            </div>

            {/* Tab content */}
            {videoTab === "upload" ? (
              <div className="space-y-4">
                {uploading ? (
                  <div className="flex flex-col items-center justify-center py-8 space-y-3">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    <p className="text-sm font-semibold text-text">Uploading local video... Please wait</p>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-highlight/60 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer relative bg-black/5"
                  >
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <FaUpload className="mx-auto text-primary text-3xl mb-3" />
                    <p className="text-sm font-bold text-text">Drag & Drop Video File Here</p>
                    <p className="text-xs text-gray-700 mt-1">or click to browse from storage</p>
                    <p className="text-[10px] text-gray-700 mt-3 font-semibold">Supports MP4, WebM (Max 50MB)</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text mb-1">
                    Paste Video or Embed Link
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-700">
                      <FaLink size={14} />
                    </span>
                    <input
                      type="url"
                      placeholder="e.g. https://www.youtube.com/watch?v=..."
                      value={embedUrl}
                      onChange={(e) => setEmbedUrl(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-highlight/50 rounded-lg text-sm bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-gray-700 mt-1">
                    Supports YouTube embed, Vimeo embed, or direct MP4/WebM URLs.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-highlight/30">
                  <button
                    type="button"
                    onClick={() => {
                      setIsVideoModalOpen(false);
                      setEmbedUrl("");
                    }}
                    className="px-4 py-2 border border-highlight/50 rounded-lg text-xs font-bold text-text hover:bg-black/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertVideo}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/95 transition-all shadow-md"
                  >
                    Insert Video
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
