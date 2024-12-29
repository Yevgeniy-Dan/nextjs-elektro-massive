"use server";

import Reviews from "@/components/reviews/Reviews";
import { Metadata } from "next";

interface ReviewsPageProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = `/reviews`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uk: `${process.env.NEXT_PUBLIC_API_URL}/uk${canonicalPath}`,
        ru: `${process.env.NEXT_PUBLIC_API_URL}/ru${canonicalPath}`,
        "x-default": canonicalUrl,
      },
    },
  };
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ params }) => {
  return <Reviews lng={params.lng} />;
};

export default ReviewsPage;
