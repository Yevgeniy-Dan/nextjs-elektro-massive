"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ApolloWrapper } from "../../lib/apollo-wrapper";
import { store } from "@/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ApolloWrapper>
  );
}
