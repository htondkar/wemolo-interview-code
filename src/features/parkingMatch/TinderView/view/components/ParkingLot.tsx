import { Maybe, Lot } from '@gql-types';
import { Box, BackgroundImage, Grid, GridCol, Title, ActionIcon, Text } from '@mantine/core';

type Props = {
  lot?: Maybe<Lot>;
  onLotLiked: (lot: Lot) => void;
  onLotDisliked: (lot: Lot) => void;
};
export function ParkingLot({ lot, onLotDisliked, onLotLiked }: Props) {
  if (!lot) return null;

  const { id, address, image, name, size, status, type } = lot;

  return (
    <Box key={id} w={600} mx="auto" style={{ position: 'relative' }}>
      {image &&
        <BackgroundImage radius="md" src={image} h={600}>
          <Grid p="md" style={{ zIndex: 1, position: 'absolute', left: 0, right: 0, top: 0, background: 'rgba(0, 0, 0, 0.8)' }}>
            <GridCol span={6}>
              <Title order={3}>{name}</Title>
              <Text size="md">{address}</Text>
            </GridCol>
            <GridCol span={6}>
              <Text size="sm">Type: {type}</Text>
              <Text size="sm">Size: {size}</Text>
              <Text size="sm">Status: {status}</Text>
            </GridCol>
          </Grid>

          <ActionIcon variant="filled" color="rgba(0, 0, 0, 0.66)" radius='50%' size={70} style={{ position: 'absolute', left: 12, bottom: 16, zIndex: 2, '--ai-hover': 'black' }} onClick={() => onLotDisliked(lot)}>
            <Text size='30'>
              👎
            </Text>
          </ActionIcon>

          <ActionIcon variant="filled" color="rgba(0, 0, 0, 0.66)" radius='50%' size={70} style={{ position: 'absolute', right: 12, bottom: 16, zIndex: 2, '--ai-hover': 'black' }} onClick={() => onLotLiked(lot)}>
            <Text size='30'>
              👍
            </Text>
          </ActionIcon>
        </BackgroundImage>}
    </Box>
  );
}
