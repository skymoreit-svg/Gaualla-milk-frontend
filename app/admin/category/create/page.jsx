"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiUpload, FiImage, FiX, FiCheck } from 'react-icons/fi';
import {adminimg, adminurl } from "../../adminCompo/adminapis";
import toast from "react-hot-toast";


const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('');
  const [isDragging, setIsDragging] = useState(false);


  const [allCategory,setAllCategory]=useState( )

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedFile || !category) {
    toast.error("Please select an image and enter a category!");
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("category", category);

  try {
    const response = await axios.post(
      `${adminurl}/category/create`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const data = response.data;

    if (data.success) {
      toast.success("Category uploaded successfully! 🎉");

      setCategory("");
      setSelectedFile(null);

      getCategory();
    } else {
      toast.error(data.message || "Something went wrong!");
    }

  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
    toast.error("Upload failed! Please try again.");
  }
};




const getCategory= async()=>{
  const response = await axios.get(`${adminurl}/category`);
  const data= await response.data;
  if(data.success){
    setAllCategory(data.category)
  }
}
useEffect(()=>{
  getCategory()
}
,[])








const handeldelete = async (id) => {
  const response = await axios.delete(`${adminurl}/category/${id}`);
  const data = response.data;
  
  if (data.success) {
    // getCategory();
    location.reload() 
  }
};







  return (
    <div className="min-h-screen  w-full  bg-gradient-to-br from-primary to-primary flex justify-center p-4">
      <div className="bg-background rounded-2xl shadow-xl p-8 md:w-lg ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">Upload Image</h1>
          <p className="text-text">Select an image and add a categorylrhjhgi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              isDragging
                ? 'border-primary bg-primary'
                : selectedFile
                ? 'border-accent bg-green-50'
                : 'border-highlight hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <label htmlFor="file-upload" className="cursor-pointer">
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <FiCheck className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-accent mb-1">File Selected</p>
                    <p className="text-sm text-text truncate">{selectedFile.name}</p>
                    <p className="text-xs text-gray-700">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center justify-center mx-auto"
                  >
                    <FiX className="w-4 h-4 mr-1" />
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                    <FiImage className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text">Drop image here or click to browse</p>
                    <p className="text-sm text-gray-700 mt-1">Supports JPG, PNG, GIF</p>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors">
                    <FiUpload className="w-4 h-4 mr-2" />
                    Choose File
                  </div>
                </div>
              )}
            </label>
          </div>

          {/* Category Input */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-text">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-4 py-3 border border-highlight rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedFile || !category}
            className="w-full bg-gradient-to-r from-primary to-primary text-white py-3 px-4 rounded-lg font-medium hover:from-primary hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            <FiUpload className="w-5 h-5 mr-2" />
            Upload Image
          </button>
        </form>

        {/* Preview (optional) */}
        {selectedFile && (
          <div className="mt-6 p-4 bg-background rounded-lg">
            <h3 className="text-sm font-medium text-text mb-2">Preview:</h3>
            <div className="aspect-w-16 aspect-h-9 bg-background00 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        )}

         <button
        type="button"
        onClick={() => window.history.back()}
        className="mt-8 w-full py-3 bg-background00 hover:bg-gray-300 text-text rounded-lg font-medium transition"
      >
        ← Go Back
      </button>
      </div>
      
    </div>
  );
};

export default FileUploadPage;
