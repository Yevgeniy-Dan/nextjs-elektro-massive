import { MetadataRoute } from "next";
import {
  fetchAllCategories,
  fetchAllSubcategories,
  fetchAllProductTypes,
  fetchAllProducts,
} from "../../lib/fetchData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.elektromassive.com";

  const categories = await fetchAllCategories();
  const subcategories = await fetchAllSubcategories();
  const productTypes = await fetchAllProductTypes();
  const products = await fetchAllProducts();

  const categoriesUrls = categories.map((category) => ({
    url: `${baseUrl}/${category.attributes?.slug}`,
    lastModified: new Date(),
  }));

  const subcategoriesUrls = subcategories.map((subcategory) => ({
    url: `${baseUrl}/${subcategory.attributes?.slug}`,
    lastModified: new Date(),
  }));

  const productTypesUrls = productTypes.map((productType) => ({
    url: `${baseUrl}/${productType.attributes?.slug}`,
    lastModified: new Date(),
  }));

  const productsUrls = products.map((product) => ({
    url: `${baseUrl}/${product.attributes?.subcategory?.data?.attributes?.slug}/${product.attributes?.product_types?.data[0]?.attributes?.slug}/${product.attributes?.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...categoriesUrls,
    ...subcategoriesUrls,
    ...productTypesUrls,
    ...productsUrls,
  ];
}
