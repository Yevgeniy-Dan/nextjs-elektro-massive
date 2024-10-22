"use client";

import Reviews from "@/components/reviews/Reviews";

interface ReviewsPageProps {
  params: {
    lng: string;
  };
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ params }) => {
  return <Reviews lng={params.lng} />;
};

export default ReviewsPage;
