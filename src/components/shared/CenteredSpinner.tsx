import React from "react";
import Spinner from "./Spinner";

const CenteredSpinner: React.FC = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 pt-8">
      <Spinner />
    </div>
  );
};

export default CenteredSpinner;
