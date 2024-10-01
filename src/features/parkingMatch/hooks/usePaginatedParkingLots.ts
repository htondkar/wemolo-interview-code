import { useQuery } from '@apollo/client';
import { Query } from '@gql-types';
import { getAllEntriesQuery } from '../api/gqlQueries';
import { parkingsPageSize } from './useParkingMatchState';

export function usePaginatedParkingLots() {
  return useQuery<{ getAllParkingLots: Query['getAllParkingLots'] }>(getAllEntriesQuery, {
    variables: { limit: parkingsPageSize, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });
}
