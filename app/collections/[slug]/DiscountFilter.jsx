"use client";
import { useState, useEffect } from "react";
import data from "../../data";

const DiscountFilter = ({ setSortedProducts }) => {
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const discounts = [
    { id: 50, label: "Flat 50% off on Making Charges" },
    { id: 25, label: "Flat 25% off on Making Charges" },
    { id: 10, label: "Flat 10% off on Making Charges" },
    { id: 20, label: "Up to 20% off on MRP" },
  ];

  useEffect(() => {
    if (selectedDiscounts.length === 0) {
      setSortedProducts(data);
      return;
    }

    const filteredProducts = data.filter((item) =>
      selectedDiscounts.some((discount) => Number(item.discount) === discount)
    );

    setSortedProducts(filteredProducts);
  }, [selectedDiscounts, setSortedProducts]);

  const handleCheckboxChange = (id) => {
    setSelectedDiscounts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1">
      {discounts.map(({ id, label }) => (
        <label key={id} className="flex items-center gap-2 p-2 border-b last:border-0 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedDiscounts.includes(id)}
            onChange={() => handleCheckboxChange(id)}
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
          />
          <span className="text-base">{label}</span>
        </label>
      ))}
    </div>
  );
};

export default DiscountFilter;
