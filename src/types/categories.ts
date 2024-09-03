// Interface for the image data
interface IImageData {
  attributes: {
    url: string;
  };
}

// Interface for the image
interface Image {
  data: IImageData;
}

// Interface for category attributes
interface ICategoryAttributes {
  name: string;
  image: Image;
}

// Interface for a single category
interface ICategory {
  id: string;
  attributes: ICategoryAttributes;
}

// Interface for the categories data
interface ICategoriesData {
  data: ICategory[];
}

// Interface for the entire categories object
interface ICategories {
  categories: ICategoriesData;
}

// Interface for the entire query response
export interface IGetCategoriesResponse {
  categories: ICategoriesData;
}

// Interface for the query variables (if any)
export interface IGetCategoriesVariables {
  // Add any variables here if needed
}
