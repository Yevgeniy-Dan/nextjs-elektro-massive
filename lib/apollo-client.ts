import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        ? `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
