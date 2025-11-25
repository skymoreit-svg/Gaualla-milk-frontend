"use client"

import React, { useState } from 'react'
import { 
 
  FaCity, 
  FaGlobeAmericas, 
  FaHome, 
 
  FaArrowLeft,
 
  FaSpinner,
   FaPhoneAlt, FaUser
} from 'react-icons/fa';
import { RiGovernmentFill } from 'react-icons/ri';
import { HiIdentification } from 'react-icons/hi';
import axios from 'axios';
import { baseurl } from './utlis/apis';




const AddressForm = ({onCancel}) => {


  const [editingAddress, setEditingAddress] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

 const [formData, setFormData] = useState({ first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    zip_code: "",
    country: "India",
    address_type: "home",
    is_default: 0,





  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };









 const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // setError('');

    try {
      let response;
      if (editingAddress) {
        response = await axios.put(`${baseurl}/address/${editingAddress.id}`,formData );
      } else {
        response = await axios.post(`${baseurl}/address/create`,formData,{
            withCredentials:true
        } );
      }

      const data = response.data;
      if (data.success) {
        // setShowNewAddress(false);
        // setEditingAddress(null);
        setFormData({ first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    zip_code: "",
    country: "India",
    address_type: "home",
    is_default: 0,
});
onCancel()
        // fetchaddress();
      } else {
        setError(data.message || 'Failed to save address');
      }
    } catch (error) {
      console.error("Error saving address:", error);
      setError('An error occurred while saving the address. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };




//  const isDefault = defaultAddress?.id === address?.id;



  return (
    <div className="bg-gray-50 p-5 rounded-xl">
          <button
            onClick={onCancel}
            className="mb-4 text-gray-600 hover:text-gray-800 flex items-center transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to addresses
          </button>
    
          <h4 className="text-xl font-semibold mb-5 text-gray-800">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h4>
    
           <form onSubmit={handleAddressSubmit} className="space-y-5">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
    
            {/* Gender + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border bg-white"
                disabled={isSubmitting}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
    
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border px-3"
                disabled={isSubmitting}
              />
            </div>
    
            {/* Phone */}
            <div className="relative">
              <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border"
                required
                disabled={isSubmitting}
              />
            </div>
    
            {/* Street & Landmark */}
            <div className="relative">
              <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street Address"
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border"
                required
                disabled={isSubmitting}
              />
            </div>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Landmark (optional)"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border px-3"
              disabled={isSubmitting}
            />
    
            {/* City, State, ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="relative">
                <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border"
                  required
                  disabled={isSubmitting}
                />
              </div>
    
              <div className="relative">
                <RiGovernmentFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border"
                  required
                  disabled={isSubmitting}
                />
              </div>
    
              <div className="relative">
                <HiIdentification className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
    
            {/* Country */}
            <div className="relative">
              <FaGlobeAmericas className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border bg-white"
                required
                disabled={isSubmitting}
              >
                <option value="India">India</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
    
            {/* Address Type */}
            <select
              name="address_type"
              value={formData.address_type}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 border bg-white"
              disabled={isSubmitting}
            >
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
    
            {/* Default Address */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_default"
                checked={formData.is_default === 1}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <label className="ml-2 text-gray-700">Set as default address</label>
            </div>
    
            {/* Submit + Cancel */}
            <div className="flex justify-between pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center shadow-md"
              >
                {isSubmitting && <FaSpinner className="animate-spin mr-2" />}
                {isSubmitting ? "Saving..." : editingAddress ? "Update Address" : "Save Address"}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
    
        </div>
  )
}

export default AddressForm