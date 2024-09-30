import { Container, Divider, Flex, Stack, Title } from '@mantine/core';
import { createContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useQuery } from "@apollo/client"
import { getAllEntriesQuery } from '@/gqlClient'
import { Lot, Query } from '@gql-types';

export function ParkingMatch() {
  const appState = useParkingMatchState();

  return (
    <ParkingMatchContext.Provider value={appState}>
      <Container>
        <Title my="lg">Parking Match App</Title>
        <Divider />
        <Outlet />
      </Container>
    </ParkingMatchContext.Provider>
  )
}

export type LikedState = 'liked' | 'disliked';

type ParkingAppState = {
  lots: Lot[];
  getLotLikedState: (lot: Lot) => LikedState | undefined;
  onLotLiked: (lot: Lot) => void;
  onLotDisliked: (lot: Lot) => void;
}

export const ParkingMatchContext = createContext<ParkingAppState>({ getLotLikedState: () => undefined, lots: [], onLotDisliked: () => { }, onLotLiked: () => { } });

export function useParkingMatchState(): ParkingAppState {
  const [likedState, setLikedState] = useState<Record<string, 'liked' | 'disliked'>>({});

  const query = useQuery<{ getAllParkingLots: Query["getAllParkingLots"] }>(
    getAllEntriesQuery
  )

  return {
    lots: query.data?.getAllParkingLots?.filter(x => !!x) || [],
    getLotLikedState: (lot: Lot) => likedState[lot.id],
    onLotLiked: (lot: Lot) => {
      setLikedState(state => ({ ...state, [lot.id]: 'liked' }))
    },
    onLotDisliked: (lot: Lot) => {
      setLikedState(state => ({ ...state, [lot.id]: 'disliked' }))
    }
  };
}

