"use client";

import { useSingInMergeCart } from "@/hooks/useCartSync";

const InitialQueryHandler = ({ children }: React.PropsWithChildren) => {
  useSingInMergeCart();

  return children;
};

export default InitialQueryHandler;
