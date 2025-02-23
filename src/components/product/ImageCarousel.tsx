import React, { useState } from "react";
import { ComponentImagesImages } from "@/gql/graphql";

import dynamic from "next/dynamic";

interface ImageCarouselProps {
  images: ComponentImagesImages[];
  title: string;
}

const LightboxComponent = dynamic(() => import("./LightboxComponent"), {
  ssr: false,
});

const Carousel = dynamic(() => import("./Carousel"), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl">
      <Carousel
        images={images}
        title={title}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onImageClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <LightboxComponent
          images={images}
          selectedIndex={selectedIndex}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ImageCarousel;
