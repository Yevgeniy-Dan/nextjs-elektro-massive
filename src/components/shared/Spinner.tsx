import { Loader } from "lucide-react";
import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 64,
  color = "text-elektro-red",
  className = "",
}) => {
  return (
    <div className="relative">
      <Loader size={size} strokeWidth={3} className={`animate-spin ${color}`} />
    </div>
  );
};

export default Spinner;
