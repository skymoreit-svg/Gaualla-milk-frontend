"use client";

import React, { useState } from "react";

const Description = ({data}) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-5  md:px-12 xl:px-32">
      <div className="flex  overflow-x-auto border-b text-xl font-semibold scrollbar-hide">
        {["description", "additional-info", "reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 lg:px-8 text-nowrap py-2 lg:py-4 text-lg md:text-xl ${activeTab === tab
              ? "border-b-4 border-orange-500 text-black"
              : "text-gray-600 hover:text-black"
              }`}
          >
            {tab === "description"
              ? "Description"
              : tab === "additional-info"
                ? "Additional Information"
                : "Reviews"}
          </button>
        ))}
      </div>

      <div className="py-6 text-lg md:text-2xl">
        {activeTab === "description" && (
          <div>
            <p className="mt-4 text-justify text-lg text-gray-600" dangerouslySetInnerHTML={{__html:data}}>
         </p>

            {/* <h3 className="font-bold text-xl mt-6">Details</h3>
            <ul className="list-disc pl-6 text-lg text-gray-600">
              <li>Product Type: Brass Roti Tawa</li>
              <li>Material: Pure Brass</li>
              <li>Handle: Heat-Resistant Insulated Handle</li>
              <li>Diameter: 10–12 inches (varies by model)</li>
              <li>Weight: Approx. 800g – 1.2kg</li>
              <li>Usage: Roti, Paratha, Dosa, Flatbreads</li>
              <li>Finish: Handcrafted, Traditional Polish</li>
              <li>Care: Hand Wash Only (No Dishwasher)</li>
              <li>Health Benefit: Supports Ayurvedic Cooking Practices</li>
              <li>Origin: India</li>
              <li>Packaging: Eco-Friendly Kraft Box</li>

            </ul> */}
          </div>

        )}

        {activeTab === "additional-info" && (
          <div>
          
            <h3 className="font-bold text-xl mt-6">Shipping</h3>
           <p className="text-lg text-gray-600">
  We offer worldwide delivery for our fresh dairy products, including A2 milk, ghee, butter, and paneer. 
  Delivery estimates and shipping options are shown at checkout, based on your location and product availability. 
  Please note that some regional restrictions may apply.
</p>
          </div>

        )}

        {activeTab === "reviews" && (
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-6">
              <div className="flex items-center">
                <span className="text-orange-500 text-3xl">★★★★☆</span>
                <p className="ml-2 text-lg">4.00 out of 5</p>
              </div>
              <div className="mt-4 flex flex-col md:flex-row justify-between">
                <div className="text-lg">
                  <p>★★★★★ <span className="ml-2">1</span></p>
                  <p>★★★★☆ <span className="ml-2">2</span></p>
                  <p>★★★☆☆ <span className="ml-2">0</span></p>
                  <p>★★☆☆☆ <span className="ml-2">0</span></p>
                  <p>★☆☆☆☆ <span className="ml-2">0</span></p>
                </div>
              </div>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-md text-lg">
                Write a Review
              </button>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="font-bold text-xl">Most Recent</h3>

              <div className="mt-4 border-b pb-4">
                <div className="flex items-center">
                  <span className="text-orange-500 text-xl">★★★★☆</span>
                  <p className="ml-2 font-bold">Rohit</p>
                </div>
                <h4 className="font-bold text-lg mt-2">A must-have for every Indian kitchen!</h4>
                <p className="text-gray-600 text-lg">
                  The brass tawa is heavy, sturdy, and gives my rotis a perfect puff. The handle stays cool, which is a big plus. Feels like going back to my roots with every use.
                </p>
              </div>

              <div className="mt-4 border-b pb-4">
                <div className="flex items-center">
                  <span className="text-orange-500 text-xl">★★★★☆</span>
                  <p className="ml-2 font-bold">Amit</p>
                </div>
                <h4 className="font-bold text-lg mt-2">Excellent quality and traditional touch</h4>
                <p className="text-gray-600 text-lg">
                  Beautifully crafted and well-balanced. It does take a bit more care to clean, but the results are worth it. My parathas have never tasted better!
                </p>
              </div>

              <div className="mt-4 border-b pb-4">
                <div className="flex items-center">
                  <span className="text-orange-500 text-xl">★★★★★</span>
                  <p className="ml-2 font-bold">Sneha</p>
                </div>
                <h4 className="font-bold text-lg mt-2">Healthier and tastier cooking!</h4>
                <p className="text-gray-600 text-lg">
                  I switched from non-stick to this brass tawa for Ayurvedic benefits. The heat distribution is amazing and food tastes much more authentic.
                </p>
              </div>
            </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default Description;
