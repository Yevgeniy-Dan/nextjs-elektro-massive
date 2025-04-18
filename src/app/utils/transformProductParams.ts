import { ProductAttributes } from "@/types/types";

export interface ProductParams {
  [key: string]: string;
}

export const transformProductParams = (
  parameter_values: ProductAttributes["parameter_values"]
): ProductParams => {
  const params = parameter_values?.data.reduce((acc, paramValue) => {
    const name =
      paramValue.attributes?.parameter_type?.data?.attributes?.name || "";
    const value = paramValue.attributes?.value || "";
    return {
      ...acc,
      [name]: value,
    };
  }, {} as ProductParams);

  return params || ({} as ProductParams);
};
