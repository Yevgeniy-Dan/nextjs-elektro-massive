import ProductListingClient from "@/components/products/ProductListingPage";
import Spinner from "@/components/shared/Spinner";
import { Suspense } from "react";

export default function ProductListingPage({
  params,
}: {
  params: { subcategory: string };
}) {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductListingClient subcategory={params.subcategory} />
    </Suspense>
  );
}
