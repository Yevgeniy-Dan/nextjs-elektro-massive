import { ProductAttributes } from "@/types/types";

export interface ProductParams {
  [key: string]: string;
}

export const transformProductParams = (
  product_parameters: ProductAttributes["product_parameters"]
): ProductParams => {
  const params = product_parameters?.data.reduce((acc, productParam) => {
    const name =
      productParam.attributes?.parameter_value?.data?.attributes?.parameter_type
        ?.data?.attributes?.name || "";
    const value =
      productParam.attributes?.parameter_value?.data?.attributes?.value || "";
    return {
      ...acc,
      [name]: value,
    };
  }, {} as ProductParams);

  return params || ({} as ProductParams);
};
