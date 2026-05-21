"use client";

import React, { useEffect, useRef } from "react";
import { enhanceVideos } from "@/app/components/utlis/videoEnhancer";

export default function RichTextHtmlRenderer({ html, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (html && containerRef.current) {
      enhanceVideos(containerRef.current);
    }
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
