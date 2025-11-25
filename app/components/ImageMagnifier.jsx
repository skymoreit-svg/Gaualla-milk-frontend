import React, { useState, useRef } from "react";

export default function ImageMagnifier({ activeImg }) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      className="relative  sm:w-[450px] h-[250px] sm:h-[400px] md:h-[500px] w-full md:w-[600px] lg:w-[500px]  border border-green-500 overflow-hidden"
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <img ref={imgRef} className="w-full h-full object-cover" src={activeImg} alt="Product" />
      {zoom && (
        <div
          className="absolute inset-0 bg-no-repeat border-2 border-gray-500 rounded-md"
          style={{
            backgroundImage: `url(${activeImg})`,
            backgroundSize: "200%", // Zoom level
            backgroundPosition: `${position.x}% ${position.y}%`,
          }}
        ></div>
      )}
    </div>
  );
}
