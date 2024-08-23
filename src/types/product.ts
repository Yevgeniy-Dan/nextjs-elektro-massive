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
  };
}

export interface ProductsResponse {
  products: {
    data: ProductItem[];
  };
}
