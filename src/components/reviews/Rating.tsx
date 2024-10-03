import React, { useState } from "react";
import { Star } from "lucide-react";

interface RatingProps {
  name: string;
  value: number;
  onChange: (name: string, newValue: number) => void;
}

const Rating: React.FC<RatingProps> = ({ name, value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleMouseEnter = (starValue: number) => {
    setHoverValue(starValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleClick = (newValue: number) => {
    onChange(name, newValue);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          className={`cursor-pointer transition-colors duration-150 ${
            star <= (hoverValue || value)
              ? "text-yellow-400 fill-current"
              : "text-gray-200"
          }`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={() => handleMouseLeave()}
        />
      ))}
    </div>
  );
};

export default Rating;
