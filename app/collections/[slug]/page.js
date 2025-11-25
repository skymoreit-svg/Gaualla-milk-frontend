import React from "react";
import SlugInerPage from "./SlugInerPage";
import { notFound } from "next/navigation";

const serviceList = [
  { title: "Rings", link: "/collections/rings" },
  { title: "Earrings", link: "/collections/earrings" },
  { title: "Necklaces", link: "/collections/necklaces" },
  { title: "Bracelets", link: "/collections/bracelets" },
  { title: "For Him", link: "/collections/for-him" },
  { title: "For Her", link: "/collections/for-her" },
  { title: "Pendant", link: "/collections/pendant" },
  { title: "Bangles", link: "/collections/bangles" },
];

export async function generateStaticParams() {
  return serviceList.map((service) => ({
    slug: service.link.replace("/collections/", ""),
  }));
}

export default function CollectionPage({ params: { slug } }) {
  const collection = serviceList.find(
    (service) => service.link === `/collections/${slug}`
  );

  if (!collection) {
    return notFound();
  }

  return (
    <div>
      <SlugInerPage slug={slug} />
    </div>
  );
}
