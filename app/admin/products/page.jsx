"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { adminimg, adminurl } from "../adminCompo/adminapis"
import Link from "next/link"


const ProductsTable = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const res = await axios.get(`${adminurl}/product`)
      if (res.data.success) {
        // Parse image string into array
        const parsed = res.data.product.map((p) => ({
          ...p,
          images: JSON.parse(p.images || "[]"),
        }))
        setProducts(parsed)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between">
      <h2 className="text-2xl font-bold mb-4">Products List</h2>
      <Link href={"create"} className=" h-fit text-lg px-3 bg-yellow-500 rounded-3xl text-white font-semibold">Create</Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
       <table className="min-w-full bg-white border border-gray-200 text-sm shadow rounded-lg overflow-hidden">
  <thead>
    <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-gray-700 uppercase text-xs tracking-wider">
      <th className="p-3 border">Image</th>
      <th className="p-3 border">Name</th>
      <th className="p-3 border">Category</th>
      <th className="p-3 border">Price</th>
      <th className="p-3 border">Old Price</th>
      <th className="p-3 border">Stock</th>
      <th className="p-3 border">Unit</th>
      <th className="p-3 border">Slug</th>
      <th className="p-3 border">Created</th>
      <th className="p-3 border text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {products.map((item) => (
      <tr
        key={item.id}
        className="hover:bg-gray-50 transition-colors duration-200"
      >
        {/* Show first image */}
        <td className="p-3 border text-center">
          {item.images?.length > 0 ? (
            <img
              src={`${adminimg}/uploads/${item.images[0]}`}
              alt={item.name}
              className="h-12 w-12 object-cover rounded-md shadow-sm"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </td>

        <td className="p-3 border font-medium text-gray-800">{item.name}</td>
        <td className="p-3 border">{item.category}</td>
        <td className="p-3 border text-green-600 font-semibold">
          ₹{item.price}
        </td>
        <td className="p-3 border text-red-500 line-through">
          {item.old_price}
        </td>
        <td className="p-3 border">
          {item.stock > 0 ? (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
              {item.stock}
            </span>
          ) : (
            <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">
              Out of stock
            </span>
          )}
        </td>
        <td className="p-3 border">{item.unit_quantity || "-"}</td>
        <td className="p-3 border text-gray-500">{item.slug}</td>
        <td className="p-3 border">
          {new Date(item.created_at).toLocaleDateString()}
        </td>

        {/* Actions */}
        <td className="p-3 border text-center space-x-2">
          <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Edit
          </button>
          <button className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  )
}

export default ProductsTable
