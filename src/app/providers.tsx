"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ApolloWrapper } from "../../lib/apollo-wrapper";
import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import InitialQueryHandler from "@/components/InitialQueryHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const queryClient = new QueryClient();

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
