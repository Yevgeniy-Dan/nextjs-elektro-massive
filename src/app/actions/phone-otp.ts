"use server";

import axios from "axios";

interface IOtpResponse {
  message: string;
}

export async function sendOtp(phone: string): Promise<IOtpResponse> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const response = await axios.post<IOtpResponse>(
    `${strapiUrl}/api/auth/local/send-otp`,
    { phone },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
}
