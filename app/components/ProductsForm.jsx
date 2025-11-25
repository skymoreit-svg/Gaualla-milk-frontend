"use client"
import { useState } from "react";
import React from 'react'

export default function ProductsForm() {
     const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
      };

      const serviseList = [
        {
          title: "Rings",
          link: "/collections/rings",
        },
        {
          title: "Earrings",
          link: "/collections/earrings",
        },
        {
          title: "Necklaces",
          link: "/collections/necklaces",
        },
        {
          title: "Bracelets",
          link: "/collections/bracelets",
        },
        { title: "For Him", link: "/collections/for-him" },
    
        { title: "For Her", link: "/collections/for-her" },
      ];
    
  return (
    <div>
       <div className="  rounded-2xl shadow-2xl px-4 py-3">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Contact Us
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#173842]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#173842]"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#173842]"
                      />
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Select Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#173842]"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {serviseList.map((item, index) => (
                          <option key={index} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        rows="4"
                        className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#173842]"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#173842] text-white py-2 rounded-md hover:bg-[#17384297] transition duration-300"
                    >
                      Submit
                    </button>
                  </form>
                </div>
    </div>
  )
}
