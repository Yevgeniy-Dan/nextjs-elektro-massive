import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { ProductAttributes } from "@/types/types";
import { transformProductParams } from "@/app/utils/transformProductParams";

interface ProductParamsProps {
  part_number: string;
  params: ProductAttributes["parameter_values"];
  initialParamsCount: number;
}

const ProductParams: React.FC<ProductParamsProps> = ({
  part_number,
  params,
  initialParamsCount,
}) => {
  const [showAllParams, setShowAllParams] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleParams = () => {
    setShowAllParams(!showAllParams);
  };

  const transformedParams = {
    ...transformProductParams(params),
    Артикул: part_number,
  };

  const paramsToShow = Object.entries(transformedParams);

  useEffect(() => {
    if (containerRef.current) {
      setContentHeight(containerRef.current.scrollHeight);
    }
  }, [paramsToShow, showAllParams]);

  const containerVariants = {
    open: { height: contentHeight, opacity: 1 },
    closed: { height: 40 * initialParamsCount, opacity: 1 },
  };

  return (
    <div className="text-base mb-4 relative">
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="closed"
        animate={showAllParams ? "open" : "closed"}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <AnimatePresence initial={false}>
          {paramsToShow.map(([key, value]) => (
            <div className="flex py-1" key={key}>
              <span className="font-medium w-1/2 flex-shrink-0">{key}:</span>
              <span className="w-1/2 break-words">{value}</span>
            </div>
          ))}
        </AnimatePresence>
      </motion.div>

      {Object.keys(transformedParams).length > initialParamsCount && (
        <motion.button
          onClick={toggleParams}
          className="w-full mt-2 p-2 flex justify-center items-center border-t border-b font-semibold text-lg"
          animate={{
            y: 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {showAllParams ? (
            <>
              Приховати
              <ChevronUp size={24} className="ml-1" />
            </>
          ) : (
            <>
              Показати ще
              <ChevronDown size={24} className="ml-1" />
            </>
          )}
        </motion.button>
      )}
    </div>
  );
};

export default ProductParams;
