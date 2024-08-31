interface IAdditionalImage {
  id: string;
  link: string;
}

interface IProductParams {
  [key: string]: string;
}

export interface IProductAttributes {
  part_number: string;
  title: string;
  retail: number;
  currency: string;
  image_link: string;
  description: string;
  additional_images: IAdditionalImage[];
  params: IProductParams;
}

export interface IProductData {
  id: string;
  attributes: IProductAttributes;
}

interface IProduct {
  data: IProductData;
}

export interface IProductResponse {
  product: IProduct;
}

export interface IProductType {
  id: string;
  attributes: {
    title: string;
    slug: string;
    icon: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface IProductTypesResponse {
  productTypes: {
    data: IProductType[];
  };
}

export interface IProductTypeFiltersResponse {
  productTypeFilters: Record<string, string[]>;
}

export interface IFilteredProduct {
  id: string;
  title: string;
  retail: number;
  currency: string;
  image_link: string;
  additional_images: IAdditionalImage[];
}

export interface IFilteredProductsResponse {
  filteredProducts: {
    products: Array<IFilteredProduct>;
    nextCursor: string;
    pageCount: number;
    totalCount: number;
    currentPage: number;
  };
}
