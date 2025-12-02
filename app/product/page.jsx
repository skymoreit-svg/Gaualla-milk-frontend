"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseurl } from '../components/utlis/apis';
import ProductAyurvedCard from '../components/ProductAyurvedCard';
import OtherBanner from '../components/OtherBanner';

const page = ({ searchParams }) => {
  const params = searchParams?.name;
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  const fetchcategoryProduct = async (data) => {
    try {
      setLoading(true)
      setError(null)
      
      // If no category or "all" is selected, fetch all products
      const endpoint = !data || data === 'all' 
        ? `${baseurl}/getproduct/all` 
        : `${baseurl}/getproduct/${data}`
      
      const response = await axios.get(endpoint)
      const data2 = response.data;
      
      if (data2.success && data2.product) {
        // Parse images if they're JSON strings
        const parsedProducts = data2.product.map(item => ({
          ...item,
          images: typeof item.images === 'string' 
            ? JSON.parse(item.images) 
            : item.images
        }))
        setProduct(parsedProducts)
      } else {
        setProduct([])
        setError('No products found')
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err.message || 'Failed to fetch products')
      setProduct([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchcategoryProduct(params)
  }, [params])

  return (
    <>
      <OtherBanner text="Products" />
      
      {loading && (
        <div className='flex justify-center items-center py-20'>
          <p className='text-lg text-gray-600'>Loading products...</p>
        </div>
      )}

      {error && !loading && (
        <div className='flex justify-center items-center py-20'>
          <p className='text-lg text-red-600'>{error}</p>
        </div>
      )}

      {!loading && product.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-3 md:p-8 lg:px-20'>
          {product.map((item, index) => (
            <ProductAyurvedCard product={item} key={item.id || index} />
          ))}
        </div>
      )}

      {!loading && product.length === 0 && !error && (
        <div className='flex justify-center items-center py-20'>
          <p className='text-lg text-gray-600'>No products available</p>
        </div>
      )}
    </>
  )
}

export default page