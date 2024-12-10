"use server";

import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import {
  fetchAllCategories,
  fetchAllProducts,
  fetchAllProductTypes,
  fetchAllSubcategories,
} from "../../../lib/fetchData";

import AWS from "aws-sdk";

import { NextResponse } from "next/server";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

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

    const s3UploadResult = await uploadSitemapToS3(sitemapContent);

    return NextResponse.json(
      { message: "Sitemap generated successfully", url: s3UploadResult.link },
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

const uploadSitemapToS3 = async (sitemapContent: string) => {
  if (!process.env.AWS_BUCKET_NAME) {
    throw new Error(
      "AWS_BUCKET_NAME is not defined in the environment variables."
    );
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `sitemap.xml`,
    Body: sitemapContent,
    ContentType: "application/xml",
    ACL: "public-read",
  };

  try {
    const data = await s3.upload(params).promise();
    return { link: data.Location };
  } catch (err) {
    console.error("Error uploading file to S3:", err);
    throw err;
  }
};
