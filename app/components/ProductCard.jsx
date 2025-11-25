import { FaRegHeart, FaStarHalfAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";

const ProductCard = ({ product, bg }) => {
  const {
    id,
    name,
    price,
    originalPrice,
    img1,
    img2,
    categorie,
    title,
    tag,
    discount,
  } = product;

  

  const rating = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      <div className="group h-[500px] transition-shadow duration-500 ease-in-out overflow-hidden relative">
        <div className="relative h-[300px] transition-all duration-500 ease-in-out">
          <div className="discount h-12 text-xs text-center flex items-center justify-center text-black w-12 absolute z-10 left-5 top-4 bg-white rounded-full">
            {discount}%
          </div>

          <img
            src={img1}
            alt={name}
            className="w-full h-full opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out object-cover"
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <img
              src={img2}
              alt={name}
              className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            />
            <div className="absolute inset-0 translate-x-8 group-hover:translate-x-0 duration-500 ease-in-out transition-transform flex flex-col gap-y-4 items-end py-4 px-2 text-black text-lg">
              <div className="p-2 bg-white hover:text-amber-700 rounded-full w-fit transition-all duration-300">
                <FaRegHeart />
              </div>
              <div className="p-2 bg-white hover:text-amber-700 rounded-full w-fit transition-all duration-300">
                <IoMdEye />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${bg == "bg-black" ? "bg-black text-white" : "bg-[#F3F1EC] text-black"} 
        absolute bottom-0 left-0 w-full flex flex-col items-center gap-y-4 py-4 
        overflow-hidden transition-transform duration-500 ease-in-out 
        translate-y-16 group-hover:translate-y-0`}
        >
          <h6 className="text-center text-lg">{title}</h6>
          <div className="flex items-center text-yellow-500 text-2xl">
            {[...Array(fullStars)].map((_, i) => (
              <FaStar key={`full-${i}`} />
            ))}
            {halfStar && <FaStarHalfAlt />}
            {[...Array(emptyStars)].map((_, i) => (
              <FaRegStar key={`empty-${i}`} />
            ))}
          </div>

          <div className="flex items-center gap-x-3">
            <span className="text-xl font-bold text-[#CE967E]">
              ₹ {product.price}
            </span>
            <span className="text-gray-400 line-through">
              ₹ {product.price + 400}
            </span>
          </div>

          <Link
            href={`/product/${product.title
              .toLowerCase()
              .replace(/,/g, "")
              .split(" ")
              .join("-")}`}
            className={`${
              bg == "bg-black"
                ? "bg-[#F3F1EC] hover:bg-[#f0ebdf] hover:text-gray-400 text-black"
                : "bg-black hover:bg-gray-800 text-white hover:text-gray-100"
            } w-fit duration-500 ease-in-out px-8 py-2 mx-auto block capitalize`}
          >
            View product
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
