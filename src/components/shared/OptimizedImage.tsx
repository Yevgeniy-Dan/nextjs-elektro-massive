import Image, { ImageProps } from "next/image";
import { memo } from "react";

const OptimizedImage = memo(
  ({ src, alt, priority, sizes, fill, ...props }: ImageProps) => {
    const defaultSizes =
      fill && !sizes
        ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        : sizes;

    return (
      <Image
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        quality={100}
        sizes={defaultSizes}
        fill={fill}
        priority={priority || false}
        {...props}
      />
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";
export default OptimizedImage;
