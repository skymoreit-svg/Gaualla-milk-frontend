"use client";

import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { baseurl } from "./utlis/apis";

const AddressForm = ({ onCancel, mapLocation, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "India",
    address_type: "home",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ✅ AUTO-FILL ADDRESS FROM MAP */
  useEffect(() => {
    if (mapLocation?.components) {
      setFormData((prev) => ({
        ...prev,
        street: mapLocation.components.street || "",
        city: mapLocation.components.city || "",
        state: mapLocation.components.state || "",
        zip_code: mapLocation.components.zip || "",
        country: mapLocation.components.country || "India",
      }));
    }
  }, [mapLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ✅ Basic validation */
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      toast.error("First and last name are required");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (!formData.street.trim() || !formData.city.trim()) {
      toast.error("Street and city are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        phone: formData.phone.trim(),
        street: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zip_code: formData.zip_code.trim(),
        country: formData.country,
        address_type: formData.address_type,

        /* LAT / LNG STORED IN DB */
        latitude: mapLocation?.lat || null,
        longitude: mapLocation?.lng || null,
      };

     

      const response = await axios.post(
        `${baseurl}/address/create`,
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("✅ Address saved successfully!");
        onSuccess?.(response.data.address);
        onCancel();
      } else {
        toast.error(response.data.message || "Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error(error.response?.data?.message || "Error saving address");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Add New Address</h3>
        <button onClick={onCancel} disabled={isSubmitting}>
          <FaTimes className="text-gray-500 hover:text-red-500" />
        </button>
      </div>

      {/* 📍 Map indicator */}
      {mapLocation?.formattedAddress && (
        <div className="mb-4 p-3 bg-[#62371f]/5 border border-[#62371f]/10 rounded-lg">
          <p className="text-sm font-medium text-[#62371f]">📍 Location from map</p>
          <p className="text-sm text-gray-700 mt-1">
            {mapLocation.formattedAddress}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="first_name" value={formData.first_name} onChange={handleChange}
          placeholder="First Name" className="input border rounded-lg px-3 py-2" required />

        <input name="last_name" value={formData.last_name} onChange={handleChange}
          placeholder="Last Name" className="input border rounded-lg px-3 py-2" required />

        <input name="phone" value={formData.phone} onChange={handleChange}
          placeholder="Phone Number" className="input border rounded-lg px-3 py-2 md:col-span-2"
          required />

        <input name="street" value={formData.street} onChange={handleChange}
          placeholder="Street Address" className="input border rounded-lg px-3 py-2 md:col-span-2" required />

        <input name="city" value={formData.city} onChange={handleChange}
          placeholder="City" className="input border rounded-lg px-3 py-2" required />

        <input name="state" value={formData.state} onChange={handleChange}
          placeholder="State" className="input border rounded-lg px-3 py-2" required />

        <input name="zip_code" value={formData.zip_code} onChange={handleChange}
          placeholder="ZIP Code" className="input border rounded-lg px-3 py-2" />

        <select name="address_type" value={formData.address_type} onChange={handleChange}
          className="input border rounded-lg px-3 py-2">
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>

        <div className="md:col-span-2 flex gap-4 mt-4">
          <button type="submit"
            className="flex-1 bg-[#62371f] text-white py-2.5 rounded-lg font-semibold">
            {isSubmitting ? "Saving..." : "Save Address"}
          </button>

          <button type="button" onClick={onCancel}
            className="flex-1 border py-2.5 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;