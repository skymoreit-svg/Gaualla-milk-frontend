import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function CompleteProfileForm({ setCompleteProfileForm }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    gender: "",
    country: "",
    state: "",
    profileImage: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <div className="fixed  inset-0 overflow-y-auto bg-black/50 py-4 lg:py-10 z-[99999] pt-25">
      <div className="lg:w-[60%] h-full rounded bg-white mx-auto">
        <div className="p-4 border-b border-gray-500 flex items-center justify-between">
          <h5 className="text-xl lg:text-2xl">Complete Your Profile</h5>
          <IoCloseSharp
            className="text-2xl text-gray-700 cursor-pointer"
            onClick={() => setCompleteProfileForm(false)}
          />
        </div>

        <form className="bg-white space-y-4 p-4" onSubmit={handleSubmit}>
          <div className="bg-gray-100 mx-auto flex items-center justify-center h-28 w-28 rounded-full">
            {formData.profileImage ? (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Profile Preview"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <h6 className="text-sm text-gray-500">Upload Image</h6>
            )}
          </div>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <label className="cursor-pointer flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition">
              Upload Image
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            <p className="text-gray-600 text-sm">
              Upload a high-quality image to personalize your profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4 gap-y-4">
            <div className="flex flex-col w-full">
              <label>First Name</label>
              <input
                name="firstName"
                placeholder="Enter your First Name"
                type="text"
                className="border px-4 py-2 rounded w-full"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Last Name</label>
              <input
                name="lastName"
                placeholder="Enter your Last Name"
                type="text"
                className="border px-4 py-2 rounded w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Date of Birth</label>
              <input
                name="dateOfBirth"
                type="date"
                className="border px-4 py-2 rounded w-full"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Phone Number</label>
              <input
                name="phoneNumber"
                placeholder="Enter Phone Number"
                type="tel"
                className="border px-4 py-2 rounded w-full"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Gender</label>
              <select
                name="gender"
                className="border px-4 py-2 rounded w-full"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label>Address</label>
              <input
                name="address"
                placeholder="Enter your Address"
                type="text"
                className="border px-4 py-2 rounded w-full"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>House no</label>
              <input
                name="address"
                placeholder="Enter your Address"
                type="text"
                className="border px-4 py-2 rounded w-full"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Land Mark</label>
              <input
                name="address"
                placeholder="Enter your Address"
                type="text"
                className="border px-4 py-2 rounded w-full"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full">
              <label>Country</label>
              <select
                name="country"
                className="border px-4 py-2 rounded w-full"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label>State</label>
              <select
                name="state"
                className="border px-4 py-2 rounded w-full"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="California">California</option>
                <option value="London">London</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full px-5 bg-black py-2 rounded text-white font-medium">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
