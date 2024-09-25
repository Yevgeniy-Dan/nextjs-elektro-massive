import { CategoryMenuQuery } from "@/gql/graphql";

export type Category = NonNullable<
  NonNullable<CategoryMenuQuery["categories"]>["data"][number]
>;

export type CategoryAttributes = NonNullable<Category["attributes"]>;

export type Subcategory = NonNullable<
  NonNullable<CategoryAttributes["subcategories"]>["data"][number]
>;
