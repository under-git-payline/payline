import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localhost:8080/graphqlpayline',
  // Add headers if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ["where", ["categoryIn"]],
            merge(existing, incoming, { args }) {
              // If this is a fresh query (no 'after' cursor), replace the existing data
              if (!args?.after) {
                return incoming;
              }
              
              // If this is a fetchMore operation (has 'after' cursor), append the new posts
              return {
                ...incoming,
                nodes: [...(existing?.nodes || []), ...(incoming?.nodes || [])],
              };
            },
          },
        },
      },
    },
  }),
  ssrMode: typeof window === 'undefined', // Enable SSR mode when running on server
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
});

export default client;
