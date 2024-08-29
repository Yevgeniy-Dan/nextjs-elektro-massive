import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  if (!process.env.NEXT_PUBLIC_STRAPI_URL || !process.env.STRAPI_API_TOKEN) {
    console.error(
      "Strapi URL or api token is not set in environment variables"
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from Strapi: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
