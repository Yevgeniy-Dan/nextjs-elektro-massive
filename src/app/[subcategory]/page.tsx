"use server";

import CenteredSpinner from "@/components/shared/CenteredSpinner";
import { Suspense } from "react";
import { getClient } from "../../../lib/apollo-client";
import { GET_SUBCATEGORY_BY_SLUG } from "@/components/product/queries";
import {
  GetProductTypesQuery,
  GetProductTypesQueryVariables,
  GetSubcategoryBySlugQuery,
  GetSubcategoryBySlugQueryVariables,
} from "@/gql/graphql";
import { SubcategoryData } from "@/types/types";
import { GET_PRODUCT_TYPES } from "@/components/products/queries";
import { redirect } from "next/navigation";

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

async function getFirstProductType(
  subcategoryId: string
): Promise<string | null> {
  const { data } = await getClient().query<
    GetProductTypesQuery,
    GetProductTypesQueryVariables
  >({
    query: GET_PRODUCT_TYPES,
    variables: {
      subcategoryId,
    },
  });

  return data?.productTypes?.data[0]?.attributes?.slug || null;
}

async function SubcategoryPageContainer({ slug }: { slug: string }) {
  const subcategory = await getSubcategoryBySlug(slug);

  if (!subcategory || !subcategory.id) {
    return <div>Subcategory not found</div>;
  }

  const firstProductTypeSlug = await getFirstProductType(subcategory.id);

  if (!firstProductTypeSlug) {
    return <div>No product types found for this subcategory</div>;
  }

  redirect(`/${slug}/${firstProductTypeSlug}`);
}

const SubcategoryPage: React.FC<SubcategoryPageProps> = ({ params }) => {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <SubcategoryPageContainer slug={params.subcategory} />
    </Suspense>
  );
};

export default SubcategoryPage;
