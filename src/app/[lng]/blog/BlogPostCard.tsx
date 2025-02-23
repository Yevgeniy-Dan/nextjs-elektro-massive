"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPost } from "@/types/types";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import OptimizedImage from "@/components/shared/OptimizedImage";

interface BlogPostCardProps {
  posts: BlogPost[];
  currentPostId?: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  posts,
  currentPostId,
}) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollPrev();
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollNext();
    },
    [emblaApi]
  );

  const handleCardClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const relatedPosts = posts.filter((post) => post.id !== currentPostId);

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4">Інші статті</h2>
      <div className="relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex mx-4">
            {relatedPosts.map((post) => (
              <div
                key={post.id}
                className="embla__slide flex-shrink-0 w-72 h-80 my-4 p-2"
                onClick={() => handleCardClick(post.attributes?.slug || "")}
                role="link"
                tabIndex={0}
                style={{ cursor: "pointer" }}
              >
                <article className="h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="block relative pt-[66.66%]">
                    <OptimizedImage
                      src={
                        process.env.NEXT_PUBLIC_STRAPI_URL +
                          post.attributes?.image.data?.attributes?.url || ""
                      }
                      alt={
                        post.attributes?.image.data?.attributes
                          ?.alternativeText || ""
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {post.attributes?.name}
                    </h3>
                    <ReactMarkdown className="text-gray-600 mb-4 line-clamp-2">
                      {post.attributes?.description}
                    </ReactMarkdown>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
        >
          <ChevronLeft size={48} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
        >
          <ChevronRight size={48} />
        </button>
      </div>
    </div>
  );
};

export default BlogPostCard;
