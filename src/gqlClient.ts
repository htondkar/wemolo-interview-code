import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

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

// Add arguments to the query: limit and offset
export const getAllEntriesQuery = gql`
  query GetAllParkingLotsQuery($limit: Int, $offset: Int) {
    getAllParkingLots(limit: $limit, offset: $offset) {
      address
      id
      image
      name
      size
      status
      type
    }
  }
`;
