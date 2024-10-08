import {
  GetHomePageProductsQuery,
  GetOrderByOrderNumberQuery,
  GetProductBySlugQuery,
  GetProductTypeBySlugQuery,
  GetShopReviewsQuery,
  GetSubcategoryBySlugQuery,
} from "@/gql/graphql";

export type ProductAttributes = NonNullable<
  NonNullable<
    NonNullable<GetProductBySlugQuery["products"]>["data"]
  >[0]["attributes"]
>;

export type ProductTypeBySlug = NonNullable<
  GetProductTypeBySlugQuery["productTypes"]
>["data"][number];

export type ProductData = NonNullable<
  NonNullable<GetProductBySlugQuery["products"]>["data"][number]
>;

export type SubcategoryData = NonNullable<
  NonNullable<GetSubcategoryBySlugQuery["subcategories"]>["data"][number]
>;

export type OrderAttributes = NonNullable<
  NonNullable<
    GetOrderByOrderNumberQuery["orders"]
  >["data"][number]["attributes"]
>;

export type HomePageProductEntity =
  | NonNullable<
      NonNullable<GetHomePageProductsQuery["topProducts"]>["data"][number]
    >
  | NonNullable<
      NonNullable<GetHomePageProductsQuery["newProducts"]>["data"][number]
    >
  | NonNullable<
      NonNullable<GetHomePageProductsQuery["saleProducts"]>["data"][number]
    >;

export type ShopReview = NonNullable<
  NonNullable<GetShopReviewsQuery["shopReviews"]>["data"][number]
>;
