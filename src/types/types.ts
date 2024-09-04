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
  //TODO: it is added when the popular, promotion and new was implemented
  subcategory: {
    data: {
      id: string;
    };
  };
  discount: number;
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

//TODO: it is added when the popular, promotion and new was implemented
export interface IProductsResponse {
  products: {
    data: IProductData[];
  };
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
  discount: number;
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
