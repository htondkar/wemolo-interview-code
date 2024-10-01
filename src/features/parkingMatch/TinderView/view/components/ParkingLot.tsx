import { Lot, Maybe } from '@gql-types';
import { BackgroundImage, Box, Text } from '@mantine/core';
import fallbackImage from '../assets/placeholder.jpeg';
import { LotInfo } from './LotInfo';
import { FloatingReactionButton } from './ReactionButton';

type Props = {
  lot?: Maybe<Lot>;
  onLotLiked: (lot: Lot) => void;
  onLotDisliked: (lot: Lot) => void;
};

export function ParkingLot({ lot, onLotDisliked, onLotLiked }: Props) {
  if (!lot) return null;

  return (
    <Box w={600} mx="auto" style={{ position: 'relative' }}>
      <BackgroundImage radius="md" src={lot.image ?? fallbackImage} h={600}>
        <LotInfo lot={lot} />
        <FloatingReactionButton
          onClick={() => onLotDisliked(lot)}
          styles={{ left: 12, bottom: 16 }}
        >
          👎
        </FloatingReactionButton>
        <FloatingReactionButton onClick={() => onLotLiked(lot)} styles={{ right: 12, bottom: 16 }}>
          👍
        </FloatingReactionButton>
      </BackgroundImage>
    </Box>
  );
}
