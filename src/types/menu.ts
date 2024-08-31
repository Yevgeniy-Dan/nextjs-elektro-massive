interface Icon {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface Subcategory {
  id: string;
  attributes: {
    title: string;
    slug: string;
    icon: Icon;
  };
}

export interface Category {
  id: string;
  attributes: {
    name: string;
    slug: string;
    icon: Icon;
    subcategories: {
      data: Array<Subcategory>;
    };
  };
}

export interface CategoryMenuData {
  categories: {
    data: Array<Category>;
  };
}
