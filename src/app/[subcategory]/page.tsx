import ProductListingClient from "@/components/products/ProductListingPage";
import { Suspense } from "react";

export default function ProductListingPage({
  params,
}: {
  params: { subcategory: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListingClient subcategory={params.subcategory} />
    </Suspense>
  );
}
