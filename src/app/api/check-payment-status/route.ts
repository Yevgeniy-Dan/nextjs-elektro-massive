"use server";

import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const LIQPAY_PUBLIC_KEY = process.env.LIQPAY_PUBLIC_KEY;
const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY;

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const data = {
      public_key: LIQPAY_PUBLIC_KEY,
      version: 3,
      action: "status",
      order_id: orderId,
    };

    const dataString = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(JSON.stringify(data))
    );
    const signature = CryptoJS.enc.Base64.stringify(
      CryptoJS.SHA1(LIQPAY_PRIVATE_KEY + dataString + LIQPAY_PRIVATE_KEY)
    );

    const response = await fetch("https://www.liqpay.ua/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(
        dataString
      )}&signature=${encodeURIComponent(signature)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error checking LiqPay status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
