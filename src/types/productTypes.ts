interface ProductTypeAttributes {
  title: string;
  slug: string;
}

interface ProductType {
  id: string;
  attributes: ProductTypeAttributes;
}

interface PaginationMeta {
  pagination: {
    total: number;
  };
}

interface ProductTypesData {
  data: ProductType[];
  meta: PaginationMeta;
}

export interface ProductTypesResponse {
  productTypes: ProductTypesData;
}
