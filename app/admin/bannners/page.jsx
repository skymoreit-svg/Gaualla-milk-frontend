"use client";
import { useEffect, useState } from "react";
import { FiUploadCloud, FiImage } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import { adminimg, adminurl } from "../adminCompo/adminapis";
export default function BannerUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [allbanner, setAllBanner] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle upload submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("⚠️ Please select an image first!");
      return;
    }
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${adminurl}/banner/create`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Banner uploaded successfully!");
        setFile(null);
        setPreview(null);
        getBanner();
      } else {
        setMessage("❌ Upload failed: " + data.message);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all banners
  const getBanner = async () => {
    try {
      const response = await axios.get(`${adminurl}/banner`);
      const data = response.data;
      if (data && data.success) {
        setAllBanner(data.banners || []);
      } else {
        setAllBanner([]);
      }
    } catch (err) {
      setAllBanner([]);
      setMessage("Failed to load banners: " + (err.message || err));
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  // Delete a banner
  const handelDeleteBanner = async (id) => {
    setDeletingId(id);
    try {
      const response = await axios.delete(`${adminurl}/banner/${id}`);
      const data = await response.data;
      setMessage(data.message);
      getBanner();
    } catch (err) {
      setMessage("Failed to delete banner: " + (err.message || err));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 min-h-[80vh] bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-700">
              <FiImage className="text-blue-500 text-3xl" /> Banner Upload
            </h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer hover:border-blue-400 transition">
                <FiUploadCloud className="text-4xl text-blue-400 mb-2" />
                <span className="text-gray-500 text-base font-medium">Click or drag to upload image</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              {preview && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-48 object-cover rounded-lg border shadow"
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition"
              >
                {loading ? "Uploading..." : "Upload Banner"}
              </button>
            </form>
            {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
          </div>

          {/* Banner Gallery */}
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FiImage className="text-blue-400" /> All Banners
            </h3>
            {allbanner.length === 0 ? (
              <div className="text-gray-400 text-center py-12">No banners uploaded yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allbanner.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="relative group rounded-xl overflow-hidden border border-gray-100 shadow hover:shadow-lg transition"
                  >
                    <img
                      src={`${adminimg}/uploads/${item.image}`}
                      alt={index}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => handelDeleteBanner(item.id)}
                      disabled={deletingId === item.id}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-red-600 hover:text-white text-red-600 rounded-full p-2 shadow-lg transition disabled:opacity-60"
                      title="Delete banner"
                    >
                      <FaDeleteLeft className="text-xl" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...
