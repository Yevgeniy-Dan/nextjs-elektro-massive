import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../utils/authOptions";

export async function POST(request: Request) {
  console.log("=== START REQUEST ===");
  const session = await getServerSession(authOptions);

  console.log("Session exists:", !!session);
  console.log("Session token exists:", !!session?.strapiToken);

  const body = await request.json();

  try {
    let authToken;
    if (session?.strapiToken) {
      authToken = `Bearer ${session.strapiToken}`;
    } else {
      console.log("Using  STRAPI_API_TOKEN:", process.env.STRAPI_API_TOKEN);

      authToken =
        request.headers.get("Authorization") ||
        `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    console.log("Final authToken exists:", !!authToken);
    console.log("STRAPI URL:", process.env.NEXT_PUBLIC_STRAPI_URL);

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(body),
    });
    console.log("Response status:", res.status);

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
