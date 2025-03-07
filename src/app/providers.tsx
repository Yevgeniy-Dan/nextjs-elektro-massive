"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import dynamic from "next/dynamic";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

const ApolloWrapper = dynamic(
  () => import("../lib/apollo-wrapper").then((mod) => mod.ApolloWrapper),
  { ssr: true }
);

const InitialQueryHandler = dynamic(
  () => import("@/components/InitialQueryHandler"),
  { ssr: false }
);

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
          {session ? (
            <InitialQueryHandler>{children}</InitialQueryHandler>
          ) : (
            children
          )}
        </QueryClientProvider>
      </ApolloWrapper>
    </SessionProvider>
  );
}
