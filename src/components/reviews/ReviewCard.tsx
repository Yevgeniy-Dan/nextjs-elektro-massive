"use client";

import { ShopReview } from "@/types/types";
import { CircleUserRound, Star, User } from "lucide-react";
import React from "react";

interface ReviewCardProps {
  review: ShopReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const rating = review.attributes?.overallRating ?? 0;

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md h-64 overflow-y-auto">
      <div className="flex items-center mb-2">
        <CircleUserRound className="w-10 h-10 rounded-full stroke-[1] mr-3" />
        <div>
          <h3 className="font-semibold">{review.attributes?.customerName}</h3>
          <div className="flex mt-1 relative">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-gray-300" />
              ))}
            </div>
            <div
              className="flex overflow-hidden absolute top-0 left-0"
              style={{ width: `${(rating / 5) * 100}%` }}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 flex-shrink-0 fill-current"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-base">{review?.attributes?.comment}</p>
    </div>
  );
};

export default ReviewCard;
