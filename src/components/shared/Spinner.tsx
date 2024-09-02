import { Loader } from "lucide-react";
import React from "react";

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 64, className = "" }) => {
  return (
    <div className="relative">
      <Loader
        size={size}
        strokeWidth={3}
        className="animate-spin text-elektro-red"
      />
    </div>
  );
};

export default Spinner;
