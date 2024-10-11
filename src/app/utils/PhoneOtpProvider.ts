import { StrapiLoginResponseT } from "@/types/User";
import { Provider } from "next-auth/providers/index";

interface PhoneOtpProviderOptions {
  apiBaseUrl: string;
}

export default function PhoneOtpProvider(
  options: PhoneOtpProviderOptions
): Provider {
  return {
    id: "phoneOtp",
    name: "Phone OTP",
    type: "credentials",
    credentials: {
      phone: { label: "Номер телефона", type: "text" },
      token: { label: "Код підтвердження", type: "text" },
    },
    authorize: async (credentials) => {
      if (!credentials?.phone || !credentials?.token) {
        throw new Error("Необхідно вказати номер телефону та код з SMS");
      }

      const verifyOtpUrl = `${options.apiBaseUrl}/api/auth/verify-otp`;

      try {
        const verifyRes = await fetch(verifyOtpUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: credentials.phone,
            token: credentials.token,
          }),
        });

        const data: StrapiLoginResponseT = await verifyRes.json();

        if (verifyRes.ok) {
          return {
            id: String(data.user.id),
            name: data.user.username,
            email: data.user.email,
            phone: data.user.phone,
            provider: data.user.provider,
            blocked: data.user.blocked,
            role: data.user.role,
            jwt: data.jwt,
          };
        } else {
          throw new Error(
            data.message || "Неправильний номер телефону або OTP"
          );
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
        throw error;
      }
    },
  };
}
