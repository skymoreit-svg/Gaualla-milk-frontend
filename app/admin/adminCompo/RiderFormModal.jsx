"use client";

import { useState } from "react";
import axios from "axios";
import { adminurl } from "./adminapis";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

export default function RiderFormModal({ rider, onClose, onSaved }) {
  const isEdit = !!rider;
  const [form, setForm] = useState({
    name: rider?.name || "",
    phone: rider?.phone || "",
    email: rider?.email || "",
    password: "",
    vehicle_type: rider?.vehicle_type || "bike",
    vehicle_number: rider?.vehicle_number || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone) {
      setError("Name and phone are required");
      return;
    }
    if (!isEdit && !form.password) {
      setError("Password is required for new rider");
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await axios.put(`${adminurl}/riders/${rider.id}`, payload, { withCredentials: true });
      } else {
        await axios.post(`${adminurl}/riders/create`, form, { withCredentials: true });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">{isEdit ? "Edit Rider" : "Add New Rider"}</h2>
          <button onClick={onClose} className="text-gray-[#252729b8] hover:text-text"><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-text mb-1">Name *</label>
            <input
              type="text" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Phone *</label>
            <input
              type="tel" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Email</label>
            <input
              type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              {isEdit ? "New Password" : "Password *"}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-green-500"
                placeholder={isEdit ? "Leave blank to keep current" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-[#252729b8] hover:text-text"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {isEdit && (
              <p className="text-xs text-gray-[#252729b8] mt-1">Only fill this if you want to change the rider&apos;s password</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Vehicle Type</label>
            <select
              value={form.vehicle_type}
              onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="bike">Bike</option>
              <option value="scooter">Scooter</option>
              <option value="bicycle">Bicycle</option>
              <option value="van">Van</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Vehicle Number</label>
            <input
              type="text" value={form.vehicle_number}
              onChange={(e) => setForm({ ...form, vehicle_number: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. DL01AB1234"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent transition disabled:opacity-50"
          >
            {loading ? "Saving..." : isEdit ? "Update Rider" : "Create Rider"}
          </button>
        </form>
      </div>
    </div>
  );
}
