import { NextRequest, NextResponse } from "next/server";
import { handlePaymentCallback } from "@/app/actions";

export async function POST(request: NextRequest) {
  let data;

  const contentType = request.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await request.json();
  } else {
    // Handle URL-encoded form data
    const formData = await request.formData();
    data = Object.fromEntries(formData);
  }

  try {
    const result = await handlePaymentCallback(data);

    if (result.success) {
      return NextResponse.redirect(
        new URL(`${result.redirectUrl}?status=success`, request.url)
      );
    } else {
      const errorMessage = encodeURIComponent(
        result.message || "Платіж не вдалося"
      );
      return NextResponse.redirect(
        new URL(
          `${result.redirectUrl}?status=error&message=${errorMessage}`,
          request.url
        )
      );
    }
  } catch (error) {
    console.error("Error processing payment callback:", error);
    const errorMessage = encodeURIComponent("Сталася неочікувана помилка");
    return NextResponse.redirect(
      new URL(`/checkout?status=error&message=${errorMessage}`, request.url)
    );
  }
}
