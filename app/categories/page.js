"use client";
import React from "react";
import CategoriesGrid from "../components/Shop";
import Link from "next/link";
import { FaGreaterThan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Image from "next/image";
import OtherBanner from "../components/OtherBanner";

const page = () => {
  return (
    <>
      <OtherBanner text="Categories" />

      <CategoriesGrid />
    </>
  );
};

export default page;
