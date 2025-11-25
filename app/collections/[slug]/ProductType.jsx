"use client"
import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import data  from "../../data"

export default function ProductType() {

    const [categories, setCategories] = useState([
        { id: 646, label: "Earrings", link: "/collections/earrings", count: 0 },
        { id: 417, label: "Rings", link: "/collections/rings", count: 0 },
        { id: 110, label: "Necklace", link: "/collections/Necklace", count: 0 },
        { id: 328, label: "Bracelets", link: "/collections/bracelets", count: 0 },
      ]);

      useEffect(() => {
        setCategories((prevCategories) =>
          prevCategories.map((category) => ({
            ...category,
            count: data.filter((item) => item.categorie.toLowerCase() === category.label.toLowerCase()).length,
          }))
        );
      }, [data]);
      
  return (
    <div className='grid grid-cols-1  gap-y-2'>
      {categories.map(({ id, label, count ,link}) => (
        <Link key={id} href={link}>
 
      {label} <span className="text-gray-500">({count})</span>
  </Link>
))}

    </div>
  )
}
