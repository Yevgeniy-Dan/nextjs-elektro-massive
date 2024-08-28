export interface ProductType {
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

export interface ProductTypesResponse {
  productTypes: {
    data: ProductType[];
  };
}

export interface ProductTypeFiltersResponse {
  productTypeFilters: Record<string, string[]>;
}

export interface Product {
  id: string;
  title: string;
  retail: number;
  currency: string;
  image_link: string;
}

export interface FilteredProductsResponse {
  filteredProducts: {
    products: Array<Product>;
    nextCursor: string;
    pageCount: number;
    totalCount: number;
    currentPage: number;
  };
}
