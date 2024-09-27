import CenteredSpinner from "@/components/shared/CenteredSpinner";
import { Suspense } from "react";
import { getClient } from "../../../../lib/apollo-client";
import {
  GetProductTypeBySlugQuery,
  GetProductTypeBySlugQueryVariables,
  GetSubcategoryBySlugQuery,
  GetSubcategoryBySlugQueryVariables,
} from "@/gql/graphql";
import { GET_SUBCATEGORY_BY_SLUG } from "@/components/product/queries";
import { GET_PRODUCT_TYPE_BY_SLUG } from "@/components/products/queries";
import { get } from "http";
import ProductListingClient from "@/components/products/ProductListingClient";

interface ProductTypePageProps {
  params: {
    subcategory: string;
    productType: string;
  };
}

async function getSubcategoryAndProductType(
  subcategorySlug: string,
  productTypeSlug: string
) {
  const subcategoryData = await getClient().query<
    GetSubcategoryBySlugQuery,
    GetSubcategoryBySlugQueryVariables
  >({
    query: GET_SUBCATEGORY_BY_SLUG,
    variables: { slug: subcategorySlug },
  });

  const productTypeData = await getClient().query<
    GetProductTypeBySlugQuery,
    GetProductTypeBySlugQueryVariables
  >({
    query: GET_PRODUCT_TYPE_BY_SLUG,
    variables: { slug: productTypeSlug },
  });

  const subcategory = subcategoryData.data?.subcategories?.data[0];
  const productType = productTypeData.data?.productTypes?.data[0];

  return { subcategory, productType };
}

async function ProductTypePageContainer({ params }: ProductTypePageProps) {
  const { subcategory, productType } = await getSubcategoryAndProductType(
    params.subcategory,
    params.productType
  );

  if (!subcategory || !productType || !subcategory.id || !productType.id) {
    return <div>Subcategory or product type not found.</div>;
  }

  return (
    <ProductListingClient
      subcategoryId={subcategory.id}
      productTypeId={productType.id}
      subcategorySlug={params.subcategory}
      productTypeSlug={params.productType}
    />
  );
}

const ProductTypePage: React.FC<ProductTypePageProps> = (props) => {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <ProductTypePageContainer {...props} />
    </Suspense>
  );
};

export default ProductTypePage;
