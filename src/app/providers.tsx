"use client";

import { ApolloWrapper } from "../lib/apollo-wrapper";
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
          <InitialQueryHandler>{children}</InitialQueryHandler>
        </QueryClientProvider>
      </ApolloWrapper>
    </SessionProvider>
  );
}
