"use client";
import { useState, useEffect } from "react";
const initialPriceRanges = [
  { id: 1, label: "Under ₹5,000", value: "under-5000", min: 0, max: 5000 ,count:15},
  { id: 2, label: "₹5,001 - ₹10,000", value: "5001-10000", min: 5001, max: 10000,count:18 },
  { id: 3, label: "₹10,001 - ₹15,000", value: "10001-15000", min: 10001, max: 15000,count:20 },
  { id: 4, label: "₹15,001 - ₹20,000", value: "15001-20000", min: 15001, max: 20000,count:20 },
  { id: 5, label: "₹20,001 - ₹30,000", value: "20001-30000", min: 20001, max: 30000,count:20 },
  { id: 6, label: "₹30,001 - ₹40,000", value: "30001-40000", min: 30001, max: 40000,count:10 },
  { id: 7, label: "₹40,001 - ₹50,000", value: "40001-50000", min: 40001, max: 50000,count:20 },
  { id: 8, label: "₹50,001 - ₹75,000", value: "50001-75000", min: 50001, max: 75000,count:20 },
  { id: 9, label: "₹75,001 - ₹1,00,000", value: "75001-100000", min: 75001, max: 100000,count:14 },
];

const PriceFilter = ({  setSortedProducts,productData }) => {
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const updatedRanges = initialPriceRanges.map((range) => ({
      ...range,
      count: productData.filter((item) => item.price >= range.min && item.price <= range.max).length,
    }));
    setPriceRanges(updatedRanges);
  }, []);

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setSortedProducts(productData); 
      return;
    }

    const filteredProducts = productData.filter((item) =>
      selectedFilters.some((value) => {
        const range = initialPriceRanges.find((r) => r.value === value);
        return range && item.price >= range.min && item.price <= range.max;
      })
    );

    setSortedProducts(filteredProducts);
  }, [selectedFilters, setSortedProducts]);

  const handleChange = (value) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((v) => v !== value)
        : [...prevFilters, value]
    );
  };

  return (
    <ul className="space-y-2 py-4">
      {initialPriceRanges.map((range) => (
        <li key={range.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={range.value}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={selectedFilters.includes(range.value)}
            onChange={() => handleChange(range.value)}
          />
          <label htmlFor={range.value} className="text-base cursor-pointer">
            {range.label} <span className="text-gray-500">({range.count})</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default PriceFilter;
