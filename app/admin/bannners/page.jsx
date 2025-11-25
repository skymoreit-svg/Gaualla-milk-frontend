"use client";
import { useEffect, useState } from "react";
import { FiUploadCloud, FiImage } from "react-icons/fi";
import { adminimg, adminurl } from "../adminCompo/adminapis";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";




export default function BannerUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
 const [allbanner,setAllBanner]=useState()



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

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
        getBanner()
      } else {
        setMessage("❌ Upload failed: " + data.message);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBanner=async()=>{
    const response = await axios.get(`${adminurl}/banner`)
    const data = await response.data;
    if(data.success){
        setAllBanner(data.banners)

    }
  }
  useEffect(()=>{
    getBanner()
  },[])
const handelDeleteBanner=async(id)=>{
  const response = await axios.delete(`${adminurl}/banner/${id}`);
  const data= await response.data;
  alert(data.message)
  getBanner()
}


  return (
<div className="grid grid-cols-2 gap-2 p-6">

    <div className=" w-full mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
        
      <h2 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
        <FiImage className="text-blue-600" /> Upload Banner
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File input */}
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <FiUploadCloud className="text-3xl text-gray-500 mb-2" />
          <span className="text-gray-600 text-sm">Click to upload image</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>

        {/* Preview */}
        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg shadow"
            />
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Status */}
      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>

    {allbanner?.map((item,index)=>{
        return(
<div key={index} className=" relative" >

<img src={`${adminimg}/uploads/${item.image}`} alt={index}  className="h-[20rem]"/>

<FaDeleteLeft onClick={()=>handelDeleteBanner(item.id)} className="absolute top-2 text-red-700 font-bold shadow-2xl cursor-pointer right-3 text-2xl"  />
    </div>)})

    }


    </div>
  );
}
