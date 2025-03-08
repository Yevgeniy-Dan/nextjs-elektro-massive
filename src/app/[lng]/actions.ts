import {
  GetBannersQuery,
  GetBannersQueryVariables,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetHomePageProductsQuery,
  GetHomePageProductsQueryVariables,
} from "@/gql/graphql";
import { GET_CATEGORIES } from "@/graphql/queries/categories";
import { GET_BANNERS } from "@/graphql/queries/common";
import { GET_HOME_PAGE_PRODUCTS } from "@/graphql/queries/products";
import { getClient } from "@/lib/apollo-client";

export async function getBanners() {
  try {
    const { data } = await getClient().query<
      GetBannersQuery,
      GetBannersQueryVariables
    >({
      query: GET_BANNERS,
    });

    const banners = data.banners?.data || [];

    if (!banners) {
      return null;
    }

    return banners;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function getHomePageProducts(lng: string) {
  try {
    const { data } = await getClient().query<
      GetHomePageProductsQuery,
      GetHomePageProductsQueryVariables
    >({
      query: GET_HOME_PAGE_PRODUCTS,
      variables: {
        limit: 20,
        locale: lng,
      },
    });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching home page products:", error);
    return null;
  }
}

export async function getCategories(lng: string) {
  try {
    const { data } = await getClient().query<
      GetCategoriesQuery,
      GetCategoriesQueryVariables
    >({
      query: GET_CATEGORIES,
      variables: {
        locale: lng,
      },
    });

    if (!data) {
      return null;
    }

    return data.categories?.data || [];
  } catch (error) {
    console.error("Error fetching home page categories:", error);
    return null;
  }
}
