import { getAllEntriesQuery } from '@/gqlClient';
import { useQuery } from '@apollo/client';
import { Query } from '@gql-types';
import { parkingsPageSize } from './useParkingMatchState';

export function usePaginatedParkingLots() {
  return useQuery<{ getAllParkingLots: Query["getAllParkingLots"]; }>(
    getAllEntriesQuery,
    { variables: { limit: parkingsPageSize, offset: 0, }, notifyOnNetworkStatusChange: true }
  );
}
