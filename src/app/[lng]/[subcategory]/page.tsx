"use server";

import CenteredSpinner from "@/components/shared/CenteredSpinner";
import { Suspense } from "react";
import { getClient } from "../../../lib/apollo-client";
import { GET_SUBCATEGORY_BY_SLUG } from "@/components/product/queries";
import {
  GetSubcategoryBySlugQuery,
  GetSubcategoryBySlugQueryVariables,
} from "@/gql/graphql";
import { SubcategoryData } from "@/types/types";
import ProductListingClient from "@/components/products/ProductListingClient";

interface SubcategoryPageProps {
  params: {
    subcategory: string;
  };
}

async function getSubcategoryBySlug(
  slug: string
): Promise<SubcategoryData | null> {
  const { data } = await getClient().query<
    GetSubcategoryBySlugQuery,
    GetSubcategoryBySlugQueryVariables
  >({
    query: GET_SUBCATEGORY_BY_SLUG,
    variables: {
      slug,
    },
  });

  return data?.subcategories?.data[0] || null;
}

async function SubcategoryPageContainer({ slug }: { slug: string }) {
  const subcategory = await getSubcategoryBySlug(slug);

  if (!subcategory || !subcategory.id) {
    return <div>Subcategory not found</div>;
  }

  return (
    <ProductListingClient
      subcategoryId={subcategory.id}
      subcategorySlug={slug}
      subcategoryTitle={subcategory.attributes?.title || ""}
    />
  );
}

const SubcategoryPage: React.FC<SubcategoryPageProps> = ({ params }) => {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <SubcategoryPageContainer slug={params.subcategory} />
    </Suspense>
  );
};

export default SubcategoryPage;
