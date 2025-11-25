"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseurl } from '../components/utlis/apis';
import ProductAyurvedCard from '../components/ProductAyurvedCard';
import OtherBanner from '../components/OtherBanner';

const page = ({ searchParams }) => {
  const params = searchParams?.name;
  const [product, setProduct] = useState()


  const fetchcategoryProduct = async (data) => {
    const response = await axios.get(`${baseurl}/getproduct/${data}`)
    const data2 = await response.data;
    if (data2.success) {
      setProduct(data2.product)
    }
  }

  useEffect(() => {
    fetchcategoryProduct(params)
  }, [])



  return (
    <> <OtherBanner text="Products" />


      <div className='grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8  p-3 md:p-8 lg:px-20'>

        {product?.map((item, index) => <ProductAyurvedCard product={item} key={index} />)}

      </div>
    </>
  )
}

export default page