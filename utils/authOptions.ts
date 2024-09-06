import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          // access_type: "offline",
          // scope:
          //   "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && account.access_token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/google/callback`,
            {
              params: {
                access_token: account.access_token,
              },
            }
          );

          if (response.data.jwt) {
            account.strapiToken = response.data.jwt;
            account.strapiUserId = response.data.user.id;

            return true;
          }
        } catch (error) {
          console.log(error);
          console.error("Error authenticating with Strapi:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.strapiToken = account.strapiToken;
        token.strapiUserId = account.strapiUserId;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.strapiToken = token.strapiToken;
      session.strapiUserId = token.strapiUserId;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) return baseUrl;
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  // pages: {
  //   signIn: "/auth/signin",
  // },
};
