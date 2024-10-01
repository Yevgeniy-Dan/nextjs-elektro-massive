import { writeFileSync } from "fs";
import fetch from "node-fetch";
import {
  CategoryMenuQuery,
  GetProductsQuery,
  GetProductTypeBySlugQuery,
} from "@/gql/graphql.js";

const domain = "https://www.elektromassive.com";
const URLS_PER_SITEMAP = 50000;
const API_URL = `https://www.elektromassive.com/api/graphql`;

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

function generateSitemapXML(urls: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  `
    )
    .join("")}
</urlset>`;
}

function generateSitemapIndex(sitemapFiles: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapFiles
    .map(
      (file) => `
  <sitemap>
    <loc>${domain}/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  `
    )
    .join("")}
</sitemapindex>`;
}

export async function generateSitemaps() {
  console.log("Fetching categories...");
  const categories = await fetchAllCategories();
  console.log(`Fetched ${categories.length} categories`);

  console.log("Fetching subcategories...");
  const subcategories = await fetchAllSubcategories();
  console.log(`Fetched ${subcategories.length} subcategories`);

  console.log("Fetching product types...");
  const productTypes = await fetchAllProductTypes();
  console.log(`Fetched ${productTypes.length} product types`);

  console.log("Fetching all products...");
  const products = await fetchAllProducts();
  console.log(`Fetched ${products.length} products`);

  const allUrls = [
    domain,
    ...categories.map((category) => `${domain}/${category.attributes?.slug}`),
    ...subcategories.map(
      (subcategory) => `${domain}/${subcategory.attributes?.slug}`
    ),
    ...productTypes.map(
      (productType) => `${domain}/${productType.attributes?.slug}`
    ),
    ...products.map(
      (product) =>
        `${domain}/${product.attributes?.subcategory?.data?.attributes?.slug}/${product.attributes?.product_types?.data[0]?.attributes?.slug}/${product.attributes?.slug}`
    ),
  ];

  console.log(`Total URLs to be included in sitemap: ${allUrls.length}`);

  const sitemapFiles: string[] = [];

  for (let i = 0; i < allUrls.length; i += URLS_PER_SITEMAP) {
    const sitemapUrls = allUrls.slice(i, i + URLS_PER_SITEMAP);
    const sitemapXml = generateSitemapXML(sitemapUrls);
    const fileName = `sitemap-${Math.floor(i / URLS_PER_SITEMAP) + 1}.xml`;
    writeFileSync(`public/${fileName}`, sitemapXml);
    sitemapFiles.push(fileName);
    console.log(`Generated ${fileName} with ${sitemapUrls.length} URLs`);
  }

  if (sitemapFiles.length > 1) {
    const sitemapIndex = generateSitemapIndex(sitemapFiles);
    writeFileSync("public/sitemap.xml", sitemapIndex);
    console.log(`Sitemap index generated with ${sitemapFiles.length} sitemaps`);
  } else {
    console.log("Single sitemap generated successfully!");
  }

  console.log("Sitemap generation complete!");
}
