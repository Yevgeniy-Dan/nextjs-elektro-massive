import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
