import { GetProductQuery, GetProductTypesQuery } from "@/gql/graphql";

export type ProductAttributes = NonNullable<
  NonNullable<NonNullable<GetProductQuery["product"]>["data"]>["attributes"]
>;

export type ProductType = NonNullable<
  GetProductTypesQuery["productTypes"]
>["data"][number];
