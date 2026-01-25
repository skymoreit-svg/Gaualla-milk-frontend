import React from "react";
import ProductDetails from "./ProductDetails";
import AyutramartProduct from "@/app/AyutramartData";



export const generateStaticParams = async () => {
  return AyutramartProduct.map((product) => ({
    slug: product.slug,
  }));
};

export default async function Page({ params }) {
  const { slug } = await params;
  // const singleProduct = AyutramartProduct.find((product) => product.slug === slug);

  // if (!singleProduct) {
  //   return <div>Product not found</div>;
  // }

  return (
    <div>
      <ProductDetails slug={slug}  />
    </div>
  );
}