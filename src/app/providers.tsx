"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ApolloWrapper } from "../lib/apollo-wrapper";
import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import InitialQueryHandler from "@/components/InitialQueryHandler";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <ApolloWrapper>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            <InitialQueryHandler>{children}</InitialQueryHandler>
          </ReduxProvider>
        </QueryClientProvider>
      </ApolloWrapper>
    </SessionProvider>
  );
}
