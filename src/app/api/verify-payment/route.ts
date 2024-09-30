import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, signature } = body;

    if (!data || !signature) {
      return NextResponse.json(
        { status: "error", message: "Missing data or signature" },
        { status: 400 }
      );
    }

    // Verify signature
    const calculatedSignature = CryptoJS.SHA1(
      LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY
    ).toString(CryptoJS.enc.Base64);

    if (calculatedSignature !== signature) {
      return NextResponse.json(
        { status: "error", message: "Invalid signature" },
        { status: 400 }
      );
    }

    // Decode and parse the data
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );

    if (decodedData.status === "success") {
      // Update order status in your database
      return NextResponse.json(
        { status: "success", message: "Payment successful" },
        { status: 200 }
      );
    } else {
      // Update order status in your database
      return NextResponse.json(
        { status: "failed", message: "Payment failed" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
