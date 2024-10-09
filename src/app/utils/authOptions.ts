import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { StrapiErrorT } from "@/types/strapi/StrapiError";
import { StrapiLoginResponseT } from "@/types/User";

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
          // prompt: "consent",
          // access_type: "offline",
          // response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(params) {
      const { user, account, profile } = params;
      if (account?.provider === "google") {
        return true;
      }
      return false;
    },
    async jwt({ token, trigger, account, user, session }) {
      if (account) {
        if (account.provider === "google") {
          try {
            const strapiResponse = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/google/callback?access_token=${account.access_token}`,
              { cache: "no-cache" }
            );

            if (!strapiResponse.ok) {
              const strapiError: StrapiErrorT = await strapiResponse.json();
              throw new Error(strapiError.error.message);
            }
            const strapiLoginResponse: StrapiLoginResponseT =
              await strapiResponse.json();

            token.strapiToken = strapiLoginResponse.jwt;
            token.provider = account.provider;
            token.strapiUserId = strapiLoginResponse.user.id;
            token.blocked = strapiLoginResponse.user.blocked;
          } catch (error) {
            throw error;
          }
        }
      }
      return token;
    },
    async session({ token, session }) {
      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      console.log("redirect error", url, baseUrl);
      return baseUrl;
    },
  },
};
