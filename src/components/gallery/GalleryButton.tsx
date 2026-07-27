"use client";

import Image from "next/image";
import { useLightbox } from "./LightboxProvider";

export function GalleryButton({
  index,
  src,
  alt,
  caption,
  className,
  imgSizes,
}: {
  index: number;
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgSizes: string;
}) {
  const { open } = useLightbox();

  return (
    <button className={className ? `gallery-item ${className}` : "gallery-item"} onClick={() => open(index)}>
      <Image src={src} alt={alt} fill sizes={imgSizes} style={{ objectFit: "cover" }} />
      {caption && <span className="gallery-caption">{caption}</span>}
    </button>
  );
}
