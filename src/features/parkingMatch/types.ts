import { Lot, Maybe } from '@gql-types';

export type LikedState = 'liked' | 'disliked';

export type ParkingAppState = {
  lots: Maybe<Lot>[];
  lotToDisplay: Lot | null;
  isLoadingLots: boolean;
  getLotLikedState: (lot: Lot) => LikedState | undefined;
  onLotLiked: (lot: Lot) => void;
  onLotDisliked: (lot: Lot) => void;
};
