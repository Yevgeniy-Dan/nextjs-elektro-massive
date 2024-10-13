import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs/promises";
import path from "path";

import {
  fetchAllCategories,
  fetchAllProducts,
  fetchAllProductTypes,
  fetchAllSubcategories,
} from "../../../../lib/fetchData";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

    const categories = await fetchAllCategories();
    const subcategories = await fetchAllSubcategories();
    const productTypes = await fetchAllProductTypes();
    const products = await fetchAllProducts();

    const links = [
      { url: "/", changefreq: "daily", priority: 0.7 },
      ...categories.map((category) => ({
        url: `/${category.attributes?.slug}`,
        changefreq: "weekly",
        priority: 0.6,
      })),
      ...subcategories.map((subcategory) => ({
        url: `/${subcategory.attributes?.slug}`,
        changefreq: "weekly",
        priority: 0.5,
      })),
      ...productTypes.map((productType) => ({
        url: `/${productType.attributes?.slug}`,
        changefreq: "weekly",
        priority: 0.5,
      })),
      ...products.map((product) => ({
        url: `/${product.attributes?.subcategory?.data?.attributes?.slug}/${product.attributes?.product_types?.data[0]?.attributes?.slug}/${product.attributes?.slug}`,
        changefreq: "weekly",
        priority: 0.8,
      })),
    ];

    const stream = new SitemapStream({ hostname: baseUrl });
    const data = await streamToPromise(Readable.from(links).pipe(stream));
    const sitemapContent = data.toString();

    const publicDir = path.join(process.cwd(), "public");
    await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemapContent);

    return NextResponse.json(
      { message: "Sitemap generated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return NextResponse.json(
      { error: "Failed to generate sitemap" },
      { status: 500 }
    );
  }
}
