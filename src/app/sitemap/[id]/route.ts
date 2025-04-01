import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("Sitemap route handler called with ID:", params.id);

  try {
    const id = params.id;
    const s3SitemapUrl = `https://elektromassivebucketproduction.s3.amazonaws.com/sitemap/sitemap-${id}.xml?t=${Date.now()}`;

    const response = await axios.get(s3SitemapUrl, {
      responseType: "text",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    return new NextResponse(response.data, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "X-Robots-Tag": "index, follow",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching sitemap:", error);
    return new NextResponse("Error fetching sitemap", { status: 500 });
  }
}
