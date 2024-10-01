import { gql } from '@apollo/client';

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
