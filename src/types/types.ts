import {
  GetProductBySlugQuery,
  GetProductQuery,
  GetProductTypeBySlugQuery,
  GetProductTypesQuery,
  GetSubcategoryBySlugQuery,
} from "@/gql/graphql";

export type ProductAttributes = NonNullable<
  NonNullable<NonNullable<GetProductQuery["product"]>["data"]>["attributes"]
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
