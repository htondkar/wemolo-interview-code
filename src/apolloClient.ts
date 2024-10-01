import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: false,
          merge: (existing = [], incoming) => [...existing, ...incoming],
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: 'https://interview-apixx07.dev.park-depot.de/',
  cache,
});
