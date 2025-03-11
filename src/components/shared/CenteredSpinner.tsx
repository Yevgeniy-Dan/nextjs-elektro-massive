import React from "react";
import Spinner from "./Spinner";

const CenteredSpinner: React.FC = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 pt-8 w-full flex items-center justify-center min-h-[500px]">
      <Spinner />
    </div>
  );
};

export default CenteredSpinner;
