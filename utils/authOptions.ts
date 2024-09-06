import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          access_type: "offline",
          scope:
            "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email?.endsWith("@gmail.com") || false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // If the URL is the base URL, it means no specific redirect was requested
      if (url === baseUrl) {
        return baseUrl;
      }

      // If it's an internal URL, allow it
      if (url.startsWith(baseUrl)) return url;

      // For relative URLs, construct the full URL
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();

      // Default to the base URL for any other case
      return baseUrl;
    },
  },
  // pages: {
  //   signIn: "/auth/signin",
  // },
};
