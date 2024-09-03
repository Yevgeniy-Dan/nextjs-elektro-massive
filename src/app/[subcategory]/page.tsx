import ProductListingClient from "@/components/products/ProductListingPage";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import Spinner from "@/components/shared/Spinner";
import { Suspense } from "react";

export default function ProductListingPage({
  params,
}: {
  params: { subcategory: string };
}) {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <ProductListingClient subcategoryId={params.subcategory} />
    </Suspense>
  );
}
