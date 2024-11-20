import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../utils/authOptions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const body = await request.json();

  try {
    let authToken;
    if (session?.strapiToken) {
      authToken = `Bearer ${session.strapiToken}`;
    } else {
      authToken =
        request.headers.get("Authorization") ||
        `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      if (res.status === 401) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      return NextResponse.json(
        {
          error: `Error ${res.statusText}`,
        },

        {
          status: res.status,
        }
      );
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
