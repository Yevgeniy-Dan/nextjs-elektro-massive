interface ProductParam {
  key: string;
  value: string;
}

export interface ProductItem {
  id: string;
  attributes: {
    title: string;
    retail: number;
    currency: string;
    params: ProductParam[];
    image_link: string;
  };
}

interface PaginationMeta {
  total: number;
  pageCount: number;
  page: number;
  pageSize: number;
}

export interface ProductsResponse {
  products: {
    data: ProductItem[];
    meta: {
      pagination: PaginationMeta;
    };
  };
}

// Additional type for the query input
export interface ProductFiltersInput {
  params?: {
    key?: { eq?: string };
    value?:
      | { in?: string[] }
      | { eq?: string }
      | { lte?: string }
      | { gte?: string };
  };
}

// Query variables interface
export interface GetProductsVariables {
  subcategory: string;
  productType: string;
  filters?: ProductFiltersInput[];
  page: number;
  pageSize: number;
}
