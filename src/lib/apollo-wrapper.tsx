"use client";

import { createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { signOut } from "next-auth/react";

// have a function to create a client for you
function makeClient() {
  const httpLink = createHttpLink({
    uri: "/api/graphql",
    fetchOptions: { cache: "no-store" },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log("HEYHEYH");
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, extensions, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`);
        if (extensions?.code === "UNAUTHENTICATED") {
          console.log("GraphQL error 401: Logging out...");
          signOut();
        }
      });
    }
    if (networkError) {
      if ("statusCode" in networkError && networkError.statusCode === 401) {
        console.log("Network error 401: Logging out...");
        signOut();
      }
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
