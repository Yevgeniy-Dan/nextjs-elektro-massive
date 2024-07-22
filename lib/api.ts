import client from "./apollo-client";
import { GET_PRODUCTS } from "./queries";

export interface ProductItem {
  id: string;
  attributes: {
    name: string;
    vendor_code: string;
    price: number;
  };
}

async function getProducts(): Promise<ProductItem[]> {
  const { data } = await client.query({ query: GET_PRODUCTS });
  return data.products.data;
}

export const strapiApi = {
  getProducts,
};
