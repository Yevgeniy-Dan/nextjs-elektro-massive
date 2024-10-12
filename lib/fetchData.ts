import {
  CategoryMenuQuery,
  GetProductsQuery,
  GetProductTypeBySlugQuery,
} from "@/gql/graphql.js";

const domain = "https://elektromassive.com";
const URLS_PER_SITEMAP = 50000;
const API_URL = `https://elektromassive.com/api/graphql`;

type Category = NonNullable<CategoryMenuQuery["categories"]>["data"][number];
type Subcategory = NonNullable<
  NonNullable<Category["attributes"]>["subcategories"]
>["data"][number];
type ProductType = NonNullable<
  GetProductTypeBySlugQuery["productTypes"]
>["data"][number];
type Product = NonNullable<GetProductsQuery["products"]>["data"][number];

const CategoryMenuDocument = `
  query CategoryMenu {
    categories {
      data {
        attributes {
          slug
          subcategories {
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    }
  }
`;

const GetProductTypeBySlugDocument = `
  query GetProductTypeBySlug($slug: String!) {
    productTypes(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;

const GetProductsDocument = `
  query GetProducts($page: Int!, $pageSize: Int!) {
    products(pagination: { page: $page, pageSize: $pageSize }) {
      data {
        attributes {
          slug
          subcategory {
            data {
              attributes {
                slug
              }
            }
          }
          product_types {
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          pageCount
          pageSize
          page
        }
      }
    }
  }
`;

async function fetchGraphQL<T>(
  query: string,
  variables = {}
): Promise<{ data: T }> {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as { data: T };
}

async function fetchAllCategories(): Promise<Category[]> {
  const { data } = await fetchGraphQL<CategoryMenuQuery>(CategoryMenuDocument);
  return data.categories?.data || [];
}

async function fetchAllSubcategories(): Promise<Subcategory[]> {
  const categories = await fetchAllCategories();
  return categories.flatMap(
    (category) => category.attributes?.subcategories?.data || []
  );
}

async function fetchAllProductTypes(): Promise<ProductType[]> {
  const subcategories = await fetchAllSubcategories();
  const productTypes: ProductType[] = [];

  for (const subcategory of subcategories) {
    const { data } = await fetchGraphQL<GetProductTypeBySlugQuery>(
      GetProductTypeBySlugDocument,
      { slug: subcategory.attributes?.slug }
    );
    productTypes.push(...(data.productTypes?.data || []));
  }

  return productTypes;
}

async function fetchAllProducts(): Promise<Product[]> {
  const pageSize = 20; // Set to match the server's default if it can't be changed
  let allProducts: Product[] = [];
  let page = 1;
  let hasMoreProducts = true;

  while (hasMoreProducts) {
    console.log(`Fetching products page ${page}...`);
    const { data } = await fetchGraphQL<GetProductsQuery>(GetProductsDocument, {
      pageSize,
      page,
    });

    const products = data.products?.data || [];
    allProducts = allProducts.concat(products);

    console.log(`Fetched ${products.length} products on page ${page}`);
    console.log(`Total products fetched so far: ${allProducts.length}`);

    if (products.length < pageSize) {
      hasMoreProducts = false;
      console.log("No more products to fetch.");
    } else {
      page++;
    }
  }

  console.log(`Total products fetched: ${allProducts.length}`);
  return allProducts;
}

export type { Category, Subcategory, ProductType, Product };

// Export functions
export {
  fetchAllCategories,
  fetchAllSubcategories,
  fetchAllProductTypes,
  fetchAllProducts,
};

// Export GraphQL documents if needed elsewhere
export {
  CategoryMenuDocument,
  GetProductTypeBySlugDocument,
  GetProductsDocument,
};
