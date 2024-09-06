"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ApolloWrapper } from "../../lib/apollo-wrapper";
import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

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
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </ApolloWrapper>
    </SessionProvider>
  );
}
