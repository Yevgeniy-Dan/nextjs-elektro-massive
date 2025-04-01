import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    // URL твоего sitemap.xml в S3
    const s3SitemapUrl =
      `${process.env.AWS_SITEMAP_FOLDER_URL}/sitemap.xml?t=` + Date.now();

    console.log("Fetching main sitemap from:", s3SitemapUrl);

    // Получаем sitemap из S3
    const response = await axios.get(s3SitemapUrl, {
      responseType: "text",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    console.log(
      "Fetched main sitemap, first 100 chars:",
      response.data.substring(0, 100)
    );

    // Создаем ответ с правильными заголовками
    return new NextResponse(response.data, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "X-Robots-Tag": "index, follow",
        "Cache-Control": "no-store, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching main sitemap:", error);
    return new NextResponse("Error fetching sitemap", { status: 500 });
  }
}
