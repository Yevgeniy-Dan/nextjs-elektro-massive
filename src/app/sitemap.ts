import { MetadataRoute } from "next";
import {
  fetchAllCategories,
  fetchAllSubcategories,
  fetchAllProductTypes,
  fetchAllProducts,
} from "../../lib/fetchData";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log("sitemap() function called at", new Date().toISOString());

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const categories = await fetchAllCategories();
  const subcategories = await fetchAllSubcategories();
  const productTypes = await fetchAllProductTypes();
  const products = await fetchAllProducts();

  const categoriesUrls = categories.map((category) => ({
    url: `${baseUrl}/${category.attributes?.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const subcategoriesUrls = subcategories.map((subcategory) => ({
    url: `${baseUrl}/${subcategory.attributes?.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const productTypesUrls = productTypes.map((productType) => ({
    url: `${baseUrl}/${productType.attributes?.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const productsUrls = products.map((product) => ({
    url: `${baseUrl}/${product.attributes?.subcategory?.data?.attributes?.slug}/${product.attributes?.product_types?.data[0]?.attributes?.slug}/${product.attributes?.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoriesUrls,
    ...subcategoriesUrls,
    ...productTypesUrls,
    ...productsUrls,
  ];
}
