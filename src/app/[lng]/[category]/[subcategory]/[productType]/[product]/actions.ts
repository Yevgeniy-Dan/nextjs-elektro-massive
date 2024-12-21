import {
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
} from "@/gql/graphql";
import { GET_PRODUCT_BY_SLUG } from "@/graphql/queries/product";
import { getClient } from "@/lib/apollo-client";

export async function getProduct(
  productSlug: string,
  productTypeSlug: string,
  lng: string
) {
  try {
    const { data } = await getClient().query<
      GetProductBySlugQuery,
      GetProductBySlugQueryVariables
    >({
      query: GET_PRODUCT_BY_SLUG,
      variables: {
        productSlug,
        productTypeSlug,
        locale: lng,
      },
    });

    const product = data.products?.data[0];

    if (!product || !product.id) {
      return null;
    }

    return product;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}
