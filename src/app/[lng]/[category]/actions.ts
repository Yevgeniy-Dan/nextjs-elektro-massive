import {
  GetCategoryBySlugQuery,
  GetCategoryBySlugQueryVariables,
} from "@/gql/graphql";
import { GET_CATEGORY_BY_SLUG } from "@/graphql/queries/categories";
import { getClient } from "@/lib/apollo-client";

export async function getCategory(categorySlug: string, lng: string) {
  try {
    const { data } = await getClient().query<
      GetCategoryBySlugQuery,
      GetCategoryBySlugQueryVariables
    >({
      query: GET_CATEGORY_BY_SLUG,
      variables: {
        slug: categorySlug,
        locale: lng,
      },
    });

    const category = data.categories?.data[0];

    if (!category || !category.id) {
      return null;
    }

    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}
