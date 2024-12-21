import {
  GetSubcategoryBySlugQuery,
  GetSubcategoryBySlugQueryVariables,
} from "@/gql/graphql";
import { GET_SUBCATEGORY_BY_SLUG } from "@/graphql/queries/subcategory";
import { getClient } from "@/lib/apollo-client";

export async function getSubcategory(subcategorySlug: string, lng: string) {
  try {
    const { data } = await getClient().query<
      GetSubcategoryBySlugQuery,
      GetSubcategoryBySlugQueryVariables
    >({
      query: GET_SUBCATEGORY_BY_SLUG,
      variables: {
        slug: subcategorySlug,
        locale: lng,
      },
    });

    const subcategory = data.subcategories?.data[0];

    if (!subcategory || !subcategory.id) {
      return null;
    }

    return subcategory;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}
