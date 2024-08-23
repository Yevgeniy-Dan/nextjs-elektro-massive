export interface AlternativeTitle {
  title: string;
}

export interface FilterValue {
  values: string[];
}

export interface ProductFilterAttributes {
  title: string;
  alternative_titles: AlternativeTitle[];
  FilterValues: FilterValue[];
}

export interface ProductFilterData {
  id: string;
  attributes: ProductFilterAttributes;
}

export interface ProductFilters {
  data: ProductFilterData[];
}

// This is the main interface you'll use with useQuery
export interface FiltersQueryResult {
  productFilters: ProductFilters;
}
