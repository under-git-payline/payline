"use client";

import { ApolloProvider } from '@apollo/client/react';
import client from '@/lib/apollo-client';

interface Props {
  children: React.ReactNode;
}

export default function ApolloWrapper({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
