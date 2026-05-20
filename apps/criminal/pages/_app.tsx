import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '@daehanlaw/graphql';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const client = useMemo(() => getApolloClient(process.env.NEXT_PUBLIC_API_URL), []);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
