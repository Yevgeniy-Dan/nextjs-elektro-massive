import { authOptions } from "@/app/utils/authOptions";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { getServerSession } from "next-auth";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getServerSession(authOptions);

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${
        session?.strapiToken
          ? session?.strapiToken
          : process.env.STRAPI_API_TOKEN
      }`,
    },
  };
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});
