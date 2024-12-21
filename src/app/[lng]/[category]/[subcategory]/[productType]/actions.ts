import {
  GetProductTypeBySlugQuery,
  GetProductTypeBySlugQueryVariables,
} from "@/gql/graphql";
import { GET_PRODUCT_TYPE_BY_SLUG } from "@/graphql/queries/productType";
import { getClient } from "@/lib/apollo-client";

export async function getProductType(productTypeSlug: string, lng: string) {
  try {
    const { data } = await getClient().query<
      GetProductTypeBySlugQuery,
      GetProductTypeBySlugQueryVariables
    >({
      query: GET_PRODUCT_TYPE_BY_SLUG,
      variables: {
        slug: productTypeSlug,
        locale: lng,
      },
    });

    const productType = data.productTypes?.data[0];

    if (!productType || !productType.id) {
      return {
        productType: null,
        total: 0,
      };
    }

    return { productType, total: data.productTypes?.meta.pagination.total };
  } catch (error) {
    console.error("Error fetching product type:", error);
    return {
      productType: null,
      total: 0,
    };
  }
}
