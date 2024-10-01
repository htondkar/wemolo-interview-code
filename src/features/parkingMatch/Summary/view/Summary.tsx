import { useContext, useReducer } from 'react';
import { Container, Divider, Stack, Title } from '@mantine/core';
import { ParkingMatchContext } from '../../hooks/useParkingMatchState';
import { Filters } from './components/Filters';
import { ParkingLotsList } from './components/ParkingLotsList';
import { filtersReducer } from './filtersReducer';
import { applyFilters } from './utils/applyFilters';

export function Summary(): JSX.Element {
  const [filters, dispatch] = useReducer(filtersReducer, {
    status: 'all',
    type: 'all',
    likedStatus: 'all',
    searchTerm: '',
    sortDirection: 'desc',
  });
  const { lots, getLotLikedState } = useContext(ParkingMatchContext);
  const filteredLots = applyFilters(lots, filters, getLotLikedState);

  return (
    <Container>
      <Title order={2} my="lg">
        Summary
      </Title>
      <Stack>
        <Filters filters={filters} dispatch={dispatch} />
        <Divider />
        <ParkingLotsList lots={filteredLots} getLotLikedState={getLotLikedState} />
      </Stack>
    </Container>
  );
}
