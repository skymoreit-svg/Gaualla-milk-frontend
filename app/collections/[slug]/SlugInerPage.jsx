"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaGreaterThan, FaQ } from "react-icons/fa6";
// import Appointment from "@/app/components/A";
import Faq from "@/app/components/Faq";
import StoreLoction from "@/app/components/StoreLoction";
import ProductCard from "@/app/components/ProductCard";
import Filter from "./Filter";
import { BiCategory } from "react-icons/bi";
import { MdSort } from "react-icons/md";
import { IoColorFilterSharp } from "react-icons/io5";
import BottomFilter from "./BottomFilter";
import ProductsForm from "@/app/components/ProductsForm";
import data from "../../data"
export default function SlugInerPage({ slug }) {
  const innerData = {
    rings: {
      heading: "rings",
      para1:
        "At Vajra Jewels, we believe that every ring symbolizes a unique journey, which is why our collection features an exquisite range of designs to suit every taste. From intricately designed diamond rings to timeless classic bands, each piece is meticulously crafted to enhance your elegance and reflect your individuality. With transparent pricing and minimal margins, Vajra Jewels ensures you find the perfect diamond ring at the best value. Whether you're celebrating a special occasion or searching for a meaningful gift, our collection offers the perfect choice.",
      para2:
        "Vajra Jewels’ diamond ring collection is designed to inspire and captivate, offering an array of styles that suit every personality. Each ring is crafted with precision using lab-grown diamonds that radiate exceptional brilliance, allowing you to wear your jewelry with confidence. Whether you’re looking for an elegant diamond ring for women, a sophisticated band for men, or a sleek, minimal design, Vajra Jewels has the perfect piece for you. Explore our collection and find the ultimate accessory to complement your unique style.",
      InnerImg: "/img/inner/ring.webp",
      data: [
        {
          id: 1,
          toggle: false,
          name: "Diamond Earring",
          price: 45224,
          originalPrice: 50,
          discount: "50% OFF",
          img1: "/img/product-list/1.webp",
          img2: "/img/product-list/1hover.webp",
          categorie: "Rings",
          title:
            "Elegant Gold Ring with a Stunning Design, Perfect for Special Occasions",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-03-01", // Newest
        },
        {
          id: 2,
          toggle: false,
          name: "Diamond Ring",
          price: 38500,
          originalPrice: 50,
          discount: "50% OFF",
          img1: "/img/product-list/2.webp",
          img2: "/img/product-list/2hover.webp",
          categorie: "Rings",
          title:
            "Diamond Ring Crafted with Precision, Offering a Luxurious Look",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-02-28",
        },
        {
          id: 3,
          toggle: false,
          name: "Diamond Earring",
          price: 15000,
          originalPrice: 50,
          discount: "50% OFF",
          img1: "/img/product-list/4.webp",
          img2: "/img/product-list/4hover.webp",
          categorie: "Rings",
          title:
            "Silver Band Ring with a Minimalist Yet Classy Appeal for Everyday Wear",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-02-15", // Older
        },
        {
          id: 4,
          toggle: false,
          name: "Gold Plated Ring",
          price: 32000,
          originalPrice: 60,
          discount: "30% OFF",
          img1: "/img/product-list/5.webp",
          img2: "/img/product-list/5hover.webp",
          categorie: "Rings",
          title: "Gold Plated Ring with a Unique and Timeless Design",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-02-10",
        },
        {
          id: 5,
          toggle: false,
          name: "Platinum Engagement Ring",
          price: 55000,
          originalPrice: 75,
          discount: "33% OFF",
          img1: "/img/product-list/6.webp",
          img2: "/img/product-list/6hover.webp",
          categorie: "Rings",
          title: "Platinum Engagement Ring with a Brilliant Diamond Setting",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-01-30",
        },
        {
          id: 6,
          toggle: false,
          name: "Sapphire Ring",
          price: 42000,
          originalPrice: 70,
          discount: "31% OFF",
          img1: "/img/product-list/7.webp",
          img2: "/img/product-list/7hover.webp",
          categorie: "Rings",
          title: "Sapphire Gemstone Ring with Exquisite Craftsmanship",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-01-20", // Oldest
        },
        {
          id: 7,
          toggle: false,
          name: "Rose Gold Promise Ring",
          price: 35,
          originalPrice: 55,
          discount: "36% OFF",
          img1: "/img/product-list/8.webp",
          img2: "/img/product-list/8hover.webp",
          categorie: "Rings",
          title: "Rose Gold Promise Ring with a Delicate and Romantic Appeal",
          price: 28000,
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-01-20", // Oldest
        },
        {
          id: 8,
          toggle: false,
          name: "Classic Wedding Band",
          price: 40,
          originalPrice: 65,
          discount: "38% OFF",
          img1: "/img/product-list/9.webp",
          img2: "/img/product-list/9hover.webp",
          categorie: "Rings",
          title: "Classic Wedding Band with a Simple Yet Elegant Finish",
          price: 35000,
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-02-10", // Newer
        },
      ],
    },

    necklaces: {
      heading: "necklaces",
      para1:
        "At Vajra Jewels, we believe that a necklace is more than just an accessory—it’s a reflection of elegance and personal style. Our collection features a stunning range of designs, from intricate diamond-studded necklaces to timeless, minimal styles. Each piece is meticulously crafted to enhance your beauty and make a statement. With transparent pricing and minimal margins, Vajra Jewels ensures you find the perfect diamond necklace at the best value. Whether you're looking for a luxurious piece for a special occasion or a sophisticated everyday necklace, our collection offers the perfect choice.",
      para2:
        "Vajra Jewels’ diamond necklace collection is designed to inspire and enchant, offering a variety of styles to suit every personality. Each necklace is crafted with precision using lab-grown diamonds that radiate unmatched brilliance, allowing you to wear your jewelry with confidence. Whether you’re searching for a bold statement necklace, a delicate diamond chain, or an elegant layering piece, Vajra Jewels has the perfect design for you. Explore our collection and find the ultimate necklace to complement your unique style.",
      InnerImg: "/img/inner/necklaces.webp",
      data: [
        {
          id: 59,
          toggle: false,
          name: "Pearl Necklace",
          price: 37000,
          originalPrice: 74000,
          discount: "50% OFF",
          img1: "/img/product-list/17.webp",
          img2: "/img/product-list/17hover.webp",
          categorie: "Necklace",
          title:
            "Pearl Necklace with a Graceful Finish, Ideal for a Classic Look",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-01-15",
        },
        {
          id: 60,
          toggle: false,
          name: "Gold Chain Necklace",
          price: 52000,
          originalPrice: 104000,
          discount: "50% OFF",
          img1: "/img/product-list/16.webp",
          img2: "/img/product-list/16hover.webp",
          categorie: "Necklace",
          title:
            "Gold Chain Necklace with a Sleek and Modern Design for Everyday Wear",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-02-05",
        },
        {
          id: 61,
          toggle: false,
          name: "Diamond Necklace",
          price: 85000,
          originalPrice: 170000,
          discount: "50% OFF",
          img1: "/img/product-list/15.webp",
          img2: "/img/product-list/15hover.webp",
          categorie: "Necklace",
          title:
            "Diamond Necklace with a Luxurious Look, Perfect for Grand Occasions",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-03-10",
        },
        {
          id: 62,
          toggle: false,
          name: "Kundan Bridal Necklace",
          price: 98000,
          originalPrice: 196000,
          discount: "50% OFF",
          img1: "/img/product-list/14.webp",
          img2: "/img/product-list/14hover.webp",
          categorie: "Necklace",
          title:
            "Kundan Bridal Necklace with an Exquisite and Traditional Design",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-04-01",
        },
        {
          id: 63,
          toggle: false,
          name: "Emerald Pendant Necklace",
          price: 65000,
          originalPrice: 130000,
          discount: "50% OFF",
          img1: "/img/product-list/13.webp",
          img2: "/img/product-list/13hover.webp",
          categorie: "Necklace",
          title: "Emerald Pendant Necklace, Offering a Rich and Royal Appeal",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-04-20",
        },
        {
          id: 64,
          toggle: false,
          name: "Platinum Choker Necklace",
          price: 72000,
          originalPrice: 144000,
          discount: "50% OFF",
          img1: "/img/product-list/12.webp",
          img2: "/img/product-list/12hover.webp",
          categorie: "Necklace",
          title:
            "Platinum Choker Necklace with a Contemporary yet Elegant Design",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-05-05",
        },
        {
          id: 65,
          toggle: false,
          name: "Sapphire Drop Necklace",
          price: 79000,
          originalPrice: 158000,
          discount: "50% OFF",
          img1: "/img/product-list/11.webp",
          img2: "/img/product-list/11hover.webp",
          categorie: "Necklace",
          title: "Sapphire Drop Necklace with a Stunning and Radiant Finish",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-06-15",
        },
        {
          id: 66,
          toggle: false,
          name: "Ruby Studded Necklace",
          price: 89000,
          originalPrice: 178000,
          discount: "50% OFF",
          img1: "/img/product-list/10.webp",
          img2: "/img/product-list/10hover.webp",
          categorie: "Necklace",
          title:
            "Ruby Studded Necklace, A Statement Piece for Special Occasions",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
      ],
    },
    earrings: {
      heading: "earrings",
      para1:
        "At Vajra Jewels, we believe that earrings are more than just accessories—they are a statement of elegance and personality. Our collection features a stunning range of designs, from classic diamond studs to intricate drop earrings, ensuring a perfect match for every occasion. Each piece is crafted with precision to enhance your beauty and complement your style effortlessly. With transparent pricing and minimal margins, Vajra Jewels makes it easy to find the perfect pair of diamond earrings at the best value, whether for yourself or as a cherished gift.",
      para2:
        "Vajra Jewels’ diamond earring collection is designed to captivate and inspire, offering an array of styles for every taste. Each pair is meticulously crafted using lab-grown diamonds that radiate exceptional brilliance, ensuring you shine with confidence. Whether you're searching for elegant hoop earrings, dazzling chandelier designs, or timeless solitaire studs, Vajra Jewels has the perfect pair for you. Explore our collection and discover the ultimate earrings to elevate your unique style.",
      InnerImg: "/img/inner/earrings.webp",
      data: [
        {
          id: 67,
          toggle: false,
          name: "Stud Earrings",
          price: 21000,
          originalPrice: 42000,
          discount: "50% OFF",
          img1: "/img/product-list/9.webp",
          img2: "/img/product-list/9hover.webp",
          categorie: "Earrings",
          title:
            "Stud Earrings with a Simple Yet Elegant Design for a Chic Look",
          tag: "Best Seller",
          classic: false,
        },
        {
          id: 68,
          toggle: false,
          name: "Hoop Earrings",
          price: 27500,
          originalPrice: 55000,
          discount: "50% OFF",
          img1: "/img/product-list/8.webp",
          img2: "/img/product-list/8hover.webp",
          categorie: "Earrings",
          title:
            "Hoop Earrings with a Bold and Stylish Appearance, Perfect for Parties",
          tag: "Special Offer",
          classic: false,
        },
        {
          id: 69,
          toggle: false,
          name: "Dangle Earrings",
          price: 36000,
          originalPrice: 72000,
          discount: "50% OFF",
          img1: "/img/product-list/7.webp",
          img2: "/img/product-list/7hover.webp",
          categorie: "Earrings",
          title:
            "Dangle Earrings with an Eye-Catching Shine for an Elegant Statement",
          tag: "New Arrival",
          classic: false,
        },
        {
          id: 70,
          toggle: false,
          name: "Chandelier Earrings",
          price: 48000,
          originalPrice: 96000,
          discount: "50% OFF",
          img1: "/img/product-list/6.webp",
          img2: "/img/product-list/6hover.webp",
          categorie: "Earrings",
          title:
            "Chandelier Earrings with Intricate Detailing, Perfect for Weddings",
          tag: "Best Seller",
        },
        {
          id: 71,
          toggle: false,
          name: "Pearl Drop Earrings",
          price: 32000,
          originalPrice: 64000,
          discount: "50% OFF",
          img1: "/img/product-list/5.webp",
          img2: "/img/product-list/5hover.webp",
          categorie: "Earrings",
          title:
            "Pearl Drop Earrings with a Soft and Elegant Look for Formal Wear",
          tag: "New Arrival",
          classic: false,
        },
        {
          id: 72,
          toggle: false,
          name: "Gold Huggie Earrings",
          price: 28500,
          originalPrice: 57000,
          discount: "50% OFF",
          img1: "/img/product-list/4.webp",
          img2: "/img/product-list/4hover.webp",
          categorie: "Earrings",
          title: "Gold Huggie Earrings Offering a Modern and Minimalist Appeal",
          tag: "Best Seller",
          classic: false,
        },
        {
          id: 73,
          toggle: false,
          name: "Diamond Cluster Earrings",
          price: 75000,
          originalPrice: 150000,
          discount: "50% OFF",
          img1: "/img/product-list/2.webp",
          img2: "/img/product-list/2hover.webp",
          categorie: "Earrings",
          title:
            "Diamond Cluster Earrings with a Sparkling and Luxurious Touch",
          tag: "Special Offer",
          classic: true,
        },
        {
          id: 74,
          toggle: false,
          name: "Sapphire Stud Earrings",
          price: 43000,
          originalPrice: 86000,
          discount: "50% OFF",
          img1: "/img/product-list/1.webp",
          img2: "/img/product-list/1hover.webp",
          categorie: "Earrings",
          title: "Sapphire Stud Earrings Adding a Pop of Color to Any Outfit",
          tag: "New Arrival",
          classic: true,
        },
      ],
    },
    bracelets: {
      heading: "bracelets",
      para1:
        "At Vajra Jewels, we believe that a bracelet is more than just an accessory—it’s a symbol of elegance and grace. Our collection features an exquisite range of designs, from delicate diamond bangles to contemporary tennis bracelets, ensuring a perfect fit for every occasion. Each piece is meticulously crafted to enhance your style and add a touch of sophistication to your look. With transparent pricing and minimal margins, Vajra Jewels makes it easy to find the perfect diamond bracelet at the best value, whether for yourself or as a meaningful gift.",
      para2:
        "Vajra Jewels’ diamond bracelet collection is designed to enchant and inspire, offering a variety of styles to suit every personality. Each bracelet is expertly crafted using lab-grown diamonds that radiate exceptional brilliance, allowing you to wear your jewelry with confidence. Whether you're looking for a timeless diamond bangle, an elegant chain bracelet, or a statement cuff, Vajra Jewels has the perfect piece for you. Explore our collection and find the ultimate bracelet to complement your unique style.",
      InnerImg: "/img/inner/bracelets.webp",
      data: [
        {
          id: 33,
          toggle: false,
          name: "Diamond Bracelet",
          price: 55000,
          originalPrice: 110000,
          discount: "50% OFF",
          img1: "/img/product-list/8.webp",
          img2: "/img/product-list/8hover.webp",
          categorie: "Bracelets",
          title:
            "Diamond Bracelet with Exquisite Detailing for an Elegant Look",
          tag: "Special Offer",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 34,
          toggle: false,
          name: "Gold Bracelet",
          price: 42000,
          originalPrice: 84000,
          discount: "50% OFF",
          img1: "/img/product-list/7.webp",
          img2: "/img/product-list/7hover.webp",
          categorie: "Bracelets",
          title:
            "Gold Bracelet with an Intricate Design, Adding Luxury to Your Style",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 35,
          toggle: false,
          name: "Silver Charm Bracelet",
          price: 18500,
          originalPrice: 37000,
          discount: "50% OFF",
          img1: "/img/product-list/6.webp",
          img2: "/img/product-list/6hover.webp",
          categorie: "Bracelets",
          title:
            "Silver Charm Bracelet with Delicate Engravings for a Trendy Appeal",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },

        {
          id: 36,
          toggle: false,
          name: "Platinum Cuff Bracelet",
          price: 60000,
          originalPrice: 120000,
          discount: "50% OFF",
          img1: "/img/product-list/5.webp",
          img2: "/img/product-list/5hover.webp",
          categorie: "Bracelets",
          title: "Platinum Cuff Bracelet with a Bold and Modern Appeal",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 37,
          toggle: false,
          name: "Ruby-Studded Bracelet",
          price: 49500,
          originalPrice: 99000,
          discount: "50% OFF",
          img1: "/img/product-list/2.webp",
          img2: "/img/product-list/2hover.webp",
          categorie: "Bracelets",
          title: "Elegant Ruby-Studded Bracelet with a Royal Aesthetic",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 38,
          toggle: false,
          name: "Sapphire Tennis Bracelet",
          price: 68000,
          originalPrice: 136000,
          discount: "50% OFF",
          img1: "/img/product-list/1.webp",
          img2: "/img/product-list/1hover.webp",
          categorie: "Bracelets",
          title:
            "Sapphire Tennis Bracelet Designed for Luxury and Sophistication",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },

        {
          id: 39,
          toggle: false,
          name: "Emerald Beaded Bracelet",
          price: 32000,
          originalPrice: 64000,
          discount: "50% OFF",
          img1: "/img/product-list/8.webp",
          img2: "/img/product-list/8hover.webp",
          categorie: "Bracelets",
          title: "Emerald Beaded Bracelet with a Unique and Trendy Look",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 40,
          toggle: false,
          name: "Infinity Knot Bracelet",
          price: 27000,
          originalPrice: 54000,
          discount: "50% OFF",
          img1: "/img/product-list/4.webp",
          img2: "/img/product-list/4hover.webp",
          categorie: "Bracelets",
          title: "Infinity Knot Bracelet Symbolizing Eternal Love and Strength",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
      ],
    },

    "for-her": {
      heading: "bracelets",
      para1:
        "At Vajra Jewels, we believe that jewelry is more than just an accessory—it’s a reflection of beauty, confidence, and individuality. Our collection for women features a stunning range of designs, from elegant diamond rings to exquisite necklaces, bracelets, and earrings. Each piece is thoughtfully crafted to enhance your elegance and complement your unique style. With transparent pricing and minimal margins, Vajra Jewels ensures you find the perfect jewelry that combines luxury and affordability, whether for everyday wear or a special occasion.",
      para2:
        "Vajra Jewels’ women’s jewelry collection is designed to inspire and empower, offering a variety of styles for every personality. Each piece is expertly crafted with lab-grown diamonds that radiate brilliance, allowing you to shine with confidence. Whether you’re looking for a delicate pendant, a dazzling pair of earrings, or a timeless diamond bracelet, Vajra Jewels has the perfect piece for you. Explore our collection and discover the ultimate jewelry to complement your elegance and grace.",
      InnerImg: "/img/inner/for-her.webp",
      data: [
        {
          id: 45,
          toggle: false,
          name: "Platinum Bangles",
          price: 85000,
          originalPrice: 170000,
          discount: "50% OFF",
          img1: "/img/product-list/1.webp",
          img2: "/img/product-list/1hover.webp",
          categorie: "Bangles",
          title:
            "Modern Platinum Bangles Offering a Sleek and Sophisticated Look",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 46,
          toggle: false,
          name: "Ruby-Embedded Bangles",
          price: 65000,
          originalPrice: 130000,
          discount: "50% OFF",
          img1: "/img/product-list/30.webp",
          img2: "/img/product-list/30hover.webp",
          categorie: "Bangles",
          title:
            "Ruby-Embedded Bangles with a Regal Design, Enhancing Elegance",
          tag: "Special Offer",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 47,
          toggle: false,
          name: "Silver Filigree Bangles",
          price: 42000,
          originalPrice: 84000,
          discount: "50% OFF",
          img1: "/img/product-list/27.webp",
          img2: "/img/product-list/27hover.webp",
          categorie: "Bangles",
          title:
            "Silver Filigree Bangles with Artistic Detailing, A Timeless Classic",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 48,
          toggle: false,
          name: "Pearl Inlay Bangles",
          price: 58000,
          originalPrice: 116000,
          discount: "50% OFF",
          img1: "/img/product-list/26.webp",
          img2: "/img/product-list/26hover.webp",
          categorie: "Bangles",
          title:
            "Pearl Inlay Bangles with a Soft Elegance, Ideal for Graceful Attire",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 49,
          toggle: false,
          name: "Traditional Gold Bangles",
          price: 68000,
          originalPrice: 136000,
          discount: "50% OFF",
          img1: "/img/product-list/25.webp",
          img2: "/img/product-list/25hover.webp",
          categorie: "Bangles",
          title:
            "Traditional Gold Bangles with an Ethnic Touch, Perfect for Festive Wear",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 50,
          toggle: false,
          name: "Diamond Studded Bangles",
          price: 75000,
          originalPrice: 150000,
          discount: "50% OFF",
          img1: "/img/product-list/24.webp",
          img2: "/img/product-list/24hover.webp",
          categorie: "Bangles",
          title:
            "Diamond Studded Bangles for a Royal Look, Blending Tradition with Luxury",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 52,
          toggle: false,
          name: "Antique Bangles",
          price: 49000,
          originalPrice: 98000,
          discount: "50% OFF",
          img1: "/img/product-list/23.webp",
          img2: "/img/product-list/23hover.webp",
          categorie: "Bangles",
          title:
            "Antique Bangles with an Old-World Charm, Showcasing Fine Craftsmanship",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 53,
          toggle: false,
          name: "Kundan Bangles",
          price: 72000,
          originalPrice: 144000,
          discount: "50% OFF",
          img1: "/img/product-list/22.webp",
          img2: "/img/product-list/22hover.webp",
          categorie: "Bangles",
          title:
            "Kundan Bangles with Intricate Detailing, Perfect for Grand Occasions",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 55,
          toggle: false,
          name: "Platinum Bangles",
          price: 85000,
          originalPrice: 170000,
          discount: "50% OFF",
          img1: "/img/product-list/21.webp",
          img2: "/img/product-list/21hover.webp",
          categorie: "Bangles",
          title:
            "Modern Platinum Bangles Offering a Sleek and Sophisticated Look",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 56,
          toggle: false,
          name: "Ruby-Embedded Bangles",
          price: 65000,
          originalPrice: 130000,
          discount: "50% OFF",
          img1: "/img/product-list/20.webp",
          img2: "/img/product-list/20hover.webp",
          categorie: "Bangles",
          title:
            "Ruby-Embedded Bangles with a Regal Design, Enhancing Elegance",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 57,
          toggle: false,
          name: "Silver Filigree Bangles",
          price: 42000,
          originalPrice: 84000,
          discount: "50% OFF",
          img1: "/img/product-list/19.webp",
          img2: "/img/product-list/19hover.webp",
          categorie: "Bangles",
          title:
            "Silver Filigree Bangles with Artistic Detailing, A Timeless Classic",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 58,
          toggle: false,
          name: "Pearl Inlay Bangles",
          price: 58000,
          originalPrice: 116000,
          discount: "50% OFF",
          img1: "/img/product-list/18.webp",
          img2: "/img/product-list/18hover.webp",
          categorie: "Bangles",
          title:
            "Pearl Inlay Bangles with a Soft Elegance, Ideal for Graceful Attire",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 59,
          toggle: false,
          name: "Pearl Necklace",
          price: 37000,
          originalPrice: 74000,
          discount: "50% OFF",
          img1: "/img/product-list/17.webp",
          img2: "/img/product-list/17hover.webp",
          categorie: "Necklace",
          title:
            "Pearl Necklace with a Graceful Finish, Ideal for a Classic Look",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
      ],
    },
    "for-him": {
      heading: "bracelets",
      para1:
        "At Vajra Jewels, we believe that every piece of jewelry tells a story, which is why our men's collection is designed to reflect strength, sophistication, and individuality. From bold diamond rings to sleek bracelets and classic cufflinks, each piece is crafted with precision to enhance your style effortlessly. With transparent pricing and minimal margins, Vajra Jewels ensures you find the perfect jewelry that blends luxury with masculinity, whether for daily wear or a special occasion.",
      para2:
        "Vajra Jewels’ men’s jewelry collection is designed to make a statement, offering refined and contemporary designs that suit every personality. Each piece is meticulously crafted using lab-grown diamonds that radiate exceptional brilliance, ensuring you stand out with confidence. Whether you're searching for a stylish diamond ring, an elegant chain, or a sophisticated bracelet, Vajra Jewels has the perfect accessory for you. Explore our collection and find the ultimate jewelry piece to complement your unique style.",
      InnerImg: "/img/inner/for-him.webp",
      data: [
        {
          id: 60,
          toggle: false,
          name: "Gold Chain Necklace",
          price: 52000,
          originalPrice: 104000,
          discount: "50% OFF",
          img1: "/img/product-list/16.webp",
          img2: "/img/product-list/16hover.webp",
          categorie: "Necklace",
          title:
            "Gold Chain Necklace with a Sleek and Modern Design for Everyday Wear",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 61,
          toggle: false,
          name: "Diamond Necklace",
          price: 85000,
          originalPrice: 170000,
          discount: "50% OFF",
          img1: "/img/product-list/15.webp",
          img2: "/img/product-list/15hover.webp",
          categorie: "Necklace",
          title:
            "Diamond Necklace with a Luxurious Look, Perfect for Grand Occasions",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 62,
          toggle: false,
          name: "Kundan Bridal Necklace",
          price: 98000,
          originalPrice: 196000,
          discount: "50% OFF",
          img1: "/img/product-list/14.webp",
          img2: "/img/product-list/14hover.webp",
          categorie: "Necklace",
          title:
            "Kundan Bridal Necklace with an Exquisite and Traditional Design",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 63,
          toggle: false,
          name: "Emerald Pendant Necklace",
          price: 65000,
          originalPrice: 130000,
          discount: "50% OFF",
          img1: "/img/product-list/13.webp",
          img2: "/img/product-list/13hover.webp",
          categorie: "Necklace",
          title: "Emerald Pendant Necklace, Offering a Rich and Royal Appeal",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 64,
          toggle: false,
          name: "Platinum Choker Necklace",
          price: 72000,
          originalPrice: 144000,
          discount: "50% OFF",
          img1: "/img/product-list/12.webp",
          img2: "/img/product-list/12hover.webp",
          categorie: "Necklace",
          title:
            "Platinum Choker Necklace with a Contemporary yet Elegant Design",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 65,
          toggle: false,
          name: "Sapphire Drop Necklace",
          price: 79000,
          originalPrice: 158000,
          discount: "50% OFF",
          img1: "/img/product-list/11.webp",
          img2: "/img/product-list/11hover.webp",
          categorie: "Necklace",
          title: "Sapphire Drop Necklace with a Stunning and Radiant Finish",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 65,
          toggle: false,
          name: "Sapphire Drop Necklace",
          price: 79000,
          originalPrice: 158000,
          discount: "50% OFF",
          img1: "/img/product-list/11.webp",
          img2: "/img/product-list/11hover.webp",
          categorie: "Necklace",
          title: "Sapphire Drop Necklace with a Stunning and Radiant Finish",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 66,
          toggle: false,
          name: "Ruby Studded Necklace",
          price: 89000,
          originalPrice: 178000,
          discount: "50% OFF",
          img1: "/img/product-list/10.webp",
          img2: "/img/product-list/10hover.webp",
          categorie: "Necklace",
          title:
            "Ruby Studded Necklace, A Statement Piece for Special Occasions",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 67,
          toggle: false,
          name: "Stud Earrings",
          price: 21000,
          originalPrice: 42000,
          discount: "50% OFF",
          img1: "/img/product-list/9.webp",
          img2: "/img/product-list/9hover.webp",
          categorie: "Earrings",
          title:
            "Stud Earrings with a Simple Yet Elegant Design for a Chic Look",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 68,
          toggle: false,
          name: "Hoop Earrings",
          price: 27500,
          originalPrice: 55000,
          discount: "50% OFF",
          img1: "/img/product-list/8.webp",
          img2: "/img/product-list/8hover.webp",
          categorie: "Earrings",
          title:
            "Hoop Earrings with a Bold and Stylish Appearance, Perfect for Parties",
          tag: "Special Offer",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 69,
          toggle: false,
          name: "Dangle Earrings",
          price: 36000,
          originalPrice: 72000,
          discount: "50% OFF",
          img1: "/img/product-list/7.webp",
          img2: "/img/product-list/7hover.webp",
          categorie: "Earrings",
          title:
            "Dangle Earrings with an Eye-Catching Shine for an Elegant Statement",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 70,
          toggle: false,
          name: "Chandelier Earrings",
          price: 48000,
          originalPrice: 96000,
          discount: "50% OFF",
          img1: "/img/product-list/6.webp",
          img2: "/img/product-list/6hover.webp",
          categorie: "Earrings",
          title:
            "Chandelier Earrings with Intricate Detailing, Perfect for Weddings",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 71,
          toggle: false,
          name: "Pearl Drop Earrings",
          price: 32000,
          originalPrice: 64000,
          discount: "50% OFF",
          img1: "/img/product-list/5.webp",
          img2: "/img/product-list/5hover.webp",
          categorie: "Earrings",
          title:
            "Pearl Drop Earrings with a Soft and Elegant Look for Formal Wear",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 72,
          toggle: false,
          name: "Gold Huggie Earrings",
          price: 28500,
          originalPrice: 57000,
          discount: "50% OFF",
          img1: "/img/product-list/4.webp",
          img2: "/img/product-list/4hover.webp",
          categorie: "Earrings",
          title: "Gold Huggie Earrings Offering a Modern and Minimalist Appeal",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 73,
          toggle: false,
          name: "Diamond Cluster Earrings",
          price: 75000,
          originalPrice: 150000,
          discount: "50% OFF",
          img1: "/img/product-list/2.webp",
          img2: "/img/product-list/2hover.webp",
          categorie: "Earrings",
          title:
            "Diamond Cluster Earrings with a Sparkling and Luxurious Touch",
          tag: "Special Offer",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 74,
          toggle: false,
          name: "Sapphire Stud Earrings",
          price: 43000,
          originalPrice: 86000,
          discount: "50% OFF",
          img1: "/img/product-list/1.webp",
          img2: "/img/product-list/1hover.webp",
          categorie: "Earrings",
          title: "Sapphire Stud Earrings Adding a Pop of Color to Any Outfit",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
      ],
    },
    pendant: {
      heading: "bracelets",
      para1:
        "At Vajra Jewels, we believe that a bracelet is more than just an accessory—it’s a symbol of elegance and grace. Our collection features an exquisite range of designs, from delicate diamond bangles to contemporary tennis bracelets, ensuring a perfect fit for every occasion. Each piece is meticulously crafted to enhance your style and add a touch of sophistication to your look. With transparent pricing and minimal margins, Vajra Jewels makes it easy to find the perfect diamond bracelet at the best value, whether for yourself or as a meaningful gift.",
      para2:
        "Vajra Jewels’ diamond bracelet collection is designed to enchant and inspire, offering a variety of styles to suit every personality. Each bracelet is expertly crafted using lab-grown diamonds that radiate exceptional brilliance, allowing you to wear your jewelry with confidence. Whether you're looking for a timeless diamond bangle, an elegant chain bracelet, or a statement cuff, Vajra Jewels has the perfect piece for you. Explore our collection and find the ultimate bracelet to complement your unique style.",
      InnerImg: "/img/inner/bracelets.webp",
      data: [
        {
          id: 33,
          toggle: false,
          name: "Diamond Bracelet",
          price: 55000,
          originalPrice: 110000,
          discount: "50% OFF",
          img1: "/img/product-list/8.webp",
          img2: "/img/product-list/8hover.webp",
          categorie: "Pendant",
          title:
            "Diamond Bracelet with Exquisite Detailing for an Elegant Look",
          tag: "Special Offer",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 34,
          toggle: false,
          name: "Gold Bracelet",
          price: 42000,
          originalPrice: 84000,
          discount: "50% OFF",
          img1: "/img/product-list/7.webp",
          img2: "/img/product-list/7hover.webp",
          categorie: "Pendant",
          title:
            "Gold Bracelet with an Intricate Design, Adding Luxury to Your Style",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 35,
          toggle: false,
          name: "Silver Charm Bracelet",
          price: 18500,
          originalPrice: 37000,
          discount: "50% OFF",
          img1: "/img/product-list/6.webp",
          img2: "/img/product-list/6hover.webp",
          categorie: "Pendant",
          title:
            "Silver Charm Bracelet with Delicate Engravings for a Trendy Appeal",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },

        {
          id: 36,
          toggle: false,
          name: "Platinum Cuff Bracelet",
          price: 60000,
          originalPrice: 120000,
          discount: "50% OFF",
          img1: "/img/product-list/5.webp",
          img2: "/img/product-list/5hover.webp",
          categorie: "Pendant",
          title: "Platinum Cuff Bracelet with a Bold and Modern Appeal",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 37,
          toggle: false,
          name: "Ruby-Studded Bracelet",
          price: 49500,
          originalPrice: 99000,
          discount: "50% OFF",
          img1: "/img/product-list/2.webp",
          img2: "/img/product-list/2hover.webp",
          categorie: "Pendant",
          title: "Elegant Ruby-Studded Bracelet with a Royal Aesthetic",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 38,
          toggle: false,
          name: "Sapphire Tennis Bracelet",
          price: 68000,
          originalPrice: 136000,
          discount: "50% OFF",
          img1: "/img/product-list/1.webp",
          img2: "/img/product-list/1hover.webp",
          categorie: "Pendant",
          title:
            "Sapphire Tennis Bracelet Designed for Luxury and Sophistication",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },

        {
          id: 39,
          toggle: false,
          name: "Emerald Beaded Bracelet",
          price: 32000,
          originalPrice: 64000,
          discount: "50% OFF",
          img1: "/img/product-list/8.webp",
          img2: "/img/product-list/8hover.webp",
          categorie: "Pendant",
          title: "Emerald Beaded Bracelet with a Unique and Trendy Look",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 40,
          toggle: false,
          name: "Infinity Knot Bracelet",
          price: 27000,
          originalPrice: 54000,
          discount: "50% OFF",
          img1: "/img/product-list/4.webp",
          img2: "/img/product-list/4hover.webp",
          categorie: "Pendant",
          title: "Infinity Knot Bracelet Symbolizing Eternal Love and Strength",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
      ],
    },
    bangles: {
      heading: "bangles",
      para1:
        "At Vajra Jewels, we believe that a bracelet is more than just an accessory—it’s a symbol of elegance and grace. Our collection features an exquisite range of designs, from delicate diamond bangles to contemporary tennis bracelets, ensuring a perfect fit for every occasion. Each piece is meticulously crafted to enhance your style and add a touch of sophistication to your look. With transparent pricing and minimal margins, Vajra Jewels makes it easy to find the perfect diamond bracelet at the best value, whether for yourself or as a meaningful gift.",
      para2:
        "Vajra Jewels’ diamond bracelet collection is designed to enchant and inspire, offering a variety of styles to suit every personality. Each bracelet is expertly crafted using lab-grown diamonds that radiate exceptional brilliance, allowing you to wear your jewelry with confidence. Whether you're looking for a timeless diamond bangle, an elegant chain bracelet, or a statement cuff, Vajra Jewels has the perfect piece for you. Explore our collection and find the ultimate bracelet to complement your unique style.",
      InnerImg: "/img/inner/bracelets.webp",
      data: [
        {
          id: 33,
          toggle: false,
          name: "Diamond Bracelet",
          price: 55000,
          originalPrice: 110000,
          discount: "50% OFF",
          img1: "/img/product-list/8.webp",
          img2: "/img/product-list/8hover.webp",
          categorie: "bangles",
          title:
            "Diamond Bracelet with Exquisite Detailing for an Elegant Look",
          tag: "Special Offer",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 34,
          toggle: false,
          name: "Gold Bracelet",
          price: 42000,
          originalPrice: 84000,
          discount: "50% OFF",
          img1: "/img/product-list/7.webp",
          img2: "/img/product-list/7hover.webp",
          categorie: "bangles",
          title:
            "Gold Bracelet with an Intricate Design, Adding Luxury to Your Style",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 35,
          toggle: false,
          name: "Silver Charm Bracelet",
          price: 18500,
          originalPrice: 37000,
          discount: "50% OFF",
          img1: "/img/product-list/6.webp",
          img2: "/img/product-list/6hover.webp",
          categorie: "bangles",
          title:
            "Silver Charm Bracelet with Delicate Engravings for a Trendy Appeal",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },

        {
          id: 36,
          toggle: false,
          name: "Platinum Cuff Bracelet",
          price: 60000,
          originalPrice: 120000,
          discount: "50% OFF",
          img1: "/img/product-list/5.webp",
          img2: "/img/product-list/5hover.webp",
          categorie: "bangles",
          title: "Platinum Cuff Bracelet with a Bold and Modern Appeal",
          tag: "New Arrival",
          classic: false,
          createdAt: "2024-07-01",
        },
        {
          id: 37,
          toggle: false,
          name: "Ruby-Studded Bracelet",
          price: 49500,
          originalPrice: 99000,
          discount: "50% OFF",
          img1: "/img/product-list/2.webp",
          img2: "/img/product-list/2hover.webp",
          categorie: "bangles",
          title: "Elegant Ruby-Studded Bracelet with a Royal Aesthetic",
          tag: "New Arrival",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 38,
          toggle: false,
          name: "Sapphire Tennis Bracelet",
          price: 68000,
          originalPrice: 136000,
          discount: "50% OFF",
          img1: "/img/product-list/1.webp",
          img2: "/img/product-list/1hover.webp",
          categorie: "bangles",
          title:
            "Sapphire Tennis Bracelet Designed for Luxury and Sophistication",
          tag: "Best Seller",
          classic: false,
          createdAt: "2024-07-01",
        },

        {
          id: 39,
          toggle: false,
          name: "Emerald Beaded Bracelet",
          price: 32000,
          originalPrice: 64000,
          discount: "50% OFF",
          img1: "/img/product-list/8.webp",
          img2: "/img/product-list/8hover.webp",
          categorie: "bangles",
          title: "Emerald Beaded Bracelet with a Unique and Trendy Look",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
        {
          id: 40,
          toggle: false,
          name: "Infinity Knot Bracelet",
          price: 27000,
          originalPrice: 54000,
          discount: "50% OFF",
          img1: "/img/product-list/4.webp",
          img2: "/img/product-list/4hover.webp",
          categorie: "bangles",
          title: "Infinity Knot Bracelet Symbolizing Eternal Love and Strength",
          tag: "Best Seller",
          classic: true,
          createdAt: "2024-07-01",
        },
      ],
    },
  };

  const slugProduct = innerData[slug];

  const [sortBy, setSortBy] = useState("newest");

  const classicProductCate = slugProduct.data.filter((elm) => elm.classic);

  const serviseList = [
    {
      title: "Rings",
      link: "/collections/rings",
    },
    {
      title: "Earrings",
      link: "/collections/earrings",
    },
    {
      title: "Necklaces",
      link: "/collections/necklaces",
    },
    {
      title: "Bracelets",
      link: "/collections/bracelets",
    },
    { title: "For Him", link: "/collections/for-him" },

    { title: "For Her", link: "/collections/for-her" },
  ];

 

  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const sortedData = [...slugProduct.data].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "price-low") return a.price - b.price;
      return 0;
    });
    setSortedProducts(sortedData);
  }, [sortBy]);


  return (
    <div className="bg-[#F3F1EC] ">
        <BottomFilter/>
   

        <div className="relative text-white">
        
        <div className="bg-cover bg-center bg-no-repeat relative bg-[url('/img/heroSection/2swiper.webp')] h-[25vh] md:h-[35vh]   xl:h-[40vh] flex flex-col justify-center items-center">

            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="relative text-center px-6 md:px-16 xl:px-40">
              <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase">
              {slug.split("-").join(" ")}

              </h1>

              <div className="flex items-center justify-center gap-x-2 mt-4 text-sm md:text-base">
                <Link href="/" className="hover:text-gray-300 transition">
                  Home
                </Link>
                <FaGreaterThan className="text-xs opacity-70" />
                <span className="font-medium"> {slug}</span>
              </div>
            </div>
          </div>
        </div>



      <div className="container mx-auto">
        <div className="px-5 md:px-12 xl:px-32  py-10 lg:py-20">
          <div className="flex items-start lg:gap-x-10">
            <div className="lg:w-[30%] xl:w-[23%] mt-5 lg:mt-0">
              <div className="sticky top-0 lg:px-4  lg:py-4 space-y-10 lg:space-y-8 hidden lg:block">
                <Filter  setSortedProducts={setSortedProducts} productData={slugProduct.data} />


               

                <div>
                  <img
                    src="/img/banner/hot3.webp"
                    alt="banner"
                    className="drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-[70%] xl:w-[70%]">
              <div className="flex flex-col sm:flex-row justify-between items-left lg:items-center p-4 rounded-lg">
                <p className="text-sm md:text-lg text-gray-400 ">
                  Displaying <span className="font-semibold">1 - 12</span> out
                  of <span className="font-semibold">146</span> products.
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm md:text-lg text-gray-400">Sort by:</p>
                  <select
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="oldest">Newest to Oldest</option>
                    <option value="price-high">Price High to Low</option>
                    <option value="price-low">Price Low to High</option>
                    <option value="newest">Oldest to Newest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 md:gap-6 lg:gap-8 mt-6 ">
                {sortedProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[35vh] lg:h-[90vh]  w-full flex items-center justify-center  text-gray-100 relative ">
          <video
            src="/img/slug/1.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover "
            autoPlay
            loop
            muted
          ></video>

          <div className="relative text-center px-4 ">
            <h1 className="text-3xl md:text-4xl lg:text-7xl  drop-shadow-lg">
              A New Era of Diamonds{" "}
            </h1>
            <h1 className="text-3xl md:text-4xl lg:text-7xl drop-shadow-lg">
              Crafted by Vajra Jewels{" "}
            </h1>
            <button className="mt-6 bg-white text-black hover:text-white hover:bg-transparent border border-white duration-300 transition-all text-xl px-6 py-2 shadow-md">
              Learn More
            </button>
          </div>
        </div>

        <div className="px-5 md:px-12 xl:px-32 py-10 lg:py-16">
          <h5 className="text-3xl md:text-4xl lg:text-5xl text-gray-500">
            Vajra classic
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-6 lg:gap-14 mt-6 ">
            {classicProductCate.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>


        <div className="px-5 md:px-12 xl:px-32 pt-5 pb-10 md:py-10  xl:py-16 text-center">
          <div className="flex flex-col items-center gap-y-4">
            <h6 className="text-2xl md:text-3xl lg:text-5xl italic font-semibold text-gray-800">
              Visit Our Store
            </h6>
            <p className="text-gray-600 max-w-2xl text-center">
              Choosing diamond jewelry is a cherished experience. Visit our
              Bengaluru store and find the perfect piece that resonates with
              your elegance.
            </p>

            <button className="mt-6 bg-[#13353F] text-white hover:bg-[#13313f] hover:text-black border border-black duration-300 transition-all text-lg px-6 py-2 shadow-md hover">
              Check Store Location
            </button>
          </div>

          <StoreLoction />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-12 xl:px-32 ">
          <div className="w-full lg:w-[50%] space-y-10">
            <h4 className="text-2xl md:text-3xl lg:text-5xl uppercase">
              Vajra J ewels {slugProduct.heading}
            </h4>
            <p className="text-gray-600 text-lg text-justify lg:text-start">
              {slugProduct.para1}
            </p>
            <p className="text-gray-600 text-lg text-justify lg:text-start">
              {slugProduct.para2}
            </p>
          </div>
          <div className="w-[30%] hidden lg:block">
            <img src={slugProduct.InnerImg} alt="inner-item" />
          </div>
        </div>

        {/* <Appointment /> */}

        <Faq />
      </div>
    </div>
  );
}
