import Image, { ImageProps } from "next/image";
import { memo } from "react";

const OptimizedImage = memo(({ src, alt, priority, ...props }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
});

OptimizedImage.displayName = "OptimizedImage";
export default OptimizedImage;
