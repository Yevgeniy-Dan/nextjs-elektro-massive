import React from "react";
import Spinner from "./Spinner";

interface CenteredSpinnerProps {
  minHeight?: string;
}

const CenteredSpinner: React.FC<CenteredSpinnerProps> = ({
  minHeight = "24rem",
}) => {
  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 pt-8 w-full flex items-center justify-center"
      style={{ minHeight }}
    >
      <Spinner />
    </div>
  );
};

export default CenteredSpinner;
