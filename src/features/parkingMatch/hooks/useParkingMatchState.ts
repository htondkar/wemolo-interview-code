import { Lot } from '@gql-types';
import { useState, useCallback, createContext } from 'react';
import { ParkingAppState } from '../types';
import { usePaginatedParkingLots } from './usePaginatedParkingLots';


export const parkingsPageSize = 5;

export const ParkingMatchContext = createContext<ParkingAppState>({
  lots: [],
  lotToDisplay: null,
  isLoadingLots: false,
  getLotLikedState: () => undefined,
  onLotDisliked: () => { },
  onLotLiked: () => { },
});

export function useParkingMatchState(): ParkingAppState {
  const [likedState, setLikedState] = useState<Record<string, 'liked' | 'disliked'>>({});
  const [displayedItemIndex, setDisplayedItemIndex] = useState(0);

  const query = usePaginatedParkingLots()

  const availableLots = query.data?.getAllParkingLots || [];

  const fetchMoreLots = useCallback(() => {
    query.fetchMore({
      variables: { limit: parkingsPageSize, offset: availableLots.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          getAllParkingLots: [...(prev.getAllParkingLots ?? []), ...(fetchMoreResult.getAllParkingLots ?? [])]
        };
      }
    });
  }, [availableLots]);


  return {
    lots: availableLots,
    lotToDisplay: availableLots[displayedItemIndex],
    isLoadingLots: query.loading,
    getLotLikedState: (lot: Lot) => likedState[lot.id],
    onLotLiked: (lot: Lot) => {
      setLikedState(state => ({ ...state, [lot.id]: 'liked' }));
      setDisplayedItemIndex(state => state + 1);

      if (displayedItemIndex === availableLots.length - 1) {
        fetchMoreLots();
      }
    },
    onLotDisliked: (lot: Lot) => {
      setLikedState(state => ({ ...state, [lot.id]: 'disliked' }));
      setDisplayedItemIndex(state => state + 1);

      if (displayedItemIndex === availableLots.length - 1) {
        fetchMoreLots();
      }
    }
  };
}
