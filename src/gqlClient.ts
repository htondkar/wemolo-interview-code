import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://interview-apixx07.dev.park-depot.de/',
  cache: new InMemoryCache(),
});


export const getAllEntriesQuery = gql`query ExampleQuery {
  getAllParkingLots {
    address
    id
    image
    name
    size
    status
    type
  }
}
`