"use client";

import Image, { ImageLoaderProps, ImageProps } from "next/image";

interface ImageAppProps extends ImageProps {
  quality?: number;
  className?: string;
}

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  //TODO: Use CDN
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ImageWithLoader = ({
  src,
  alt,
  width,
  height,
  quality,
  className,
  ...props
}: ImageAppProps) => {
  return (
    <Image
      loader={imageLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      className={className}
      {...props}
    />
  );
};

export default ImageWithLoader;
