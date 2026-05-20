import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const DEFAULT_API_URL = 'https://api.daehanlaw.com/graphql';

let _client: ApolloClient<any> | null = null;

/**
 * Auth link — attaches `Authorization: Bearer <token>` when a token is found in
 * localStorage. Public pages (no token) work unchanged. Admin pages get auth
 * automatically. SSR has no localStorage access; the link returns no header.
 */
const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== 'undefined' ? window.localStorage.getItem('accessToken') : null;
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

function createApolloClient(apiUrl?: string): ApolloClient<any> {
  const uri = apiUrl ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
  const httpLink = new HttpLink({ uri });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      // SSG queries at build time — no-cache is fine (one-shot) but cache-first also works on repeat builds
      query:      { fetchPolicy: 'cache-first', errorPolicy: 'all' },
      // Public read-only pages: don't background-refetch on every nav. ISR (revalidate 900) handles freshness.
      watchQuery: { fetchPolicy: 'cache-first', errorPolicy: 'all' },
    },
  });
}

export function getApolloClient(apiUrl?: string): ApolloClient<any> {
  if (typeof window === 'undefined') {
    return createApolloClient(apiUrl);
  }
  if (!_client) {
    _client = createApolloClient(apiUrl);
  }
  return _client;
}
