
import { Link } from "react-router-dom"

import { ActionIcon, BackgroundImage, Box, Button, Container, Flex, Grid, GridCol, Image, Text, Title } from '@mantine/core'
import { LikedState, ParkingMatchContext, useParkingMatchState } from '../../ParkingMatch'
import { Lot } from '@gql-types'
import { useContext } from 'react'

export function TinderView() {
  const { lots, getLotLikedState, onLotDisliked, onLotLiked } = useContext(ParkingMatchContext)

  return (
    <Flex direction="column" gap="md">
      <Link to="/parking-match/summary">
        <Button variant='light'>
          Go to summary
        </Button>
      </Link>

      {lots.map((lot) =>
        <ParkingLot lot={lot} key={lot?.id} onLotDisliked={onLotDisliked} onLotLiked={onLotLiked} getLotLikedState={getLotLikedState} />
      )}
    </Flex>
  )
}

type Props = {
  lot?: Lot;
  onLotLiked: (lot: Lot) => void;
  onLotDisliked: (lot: Lot) => void;
  getLotLikedState: (lot: Lot) => LikedState | undefined;
}

function ParkingLot({ lot, getLotLikedState, onLotDisliked, onLotLiked }: Props) {
  if (!lot) return null

  const { id, address, image, name, size, status, type } = lot

  return (
    <Box key={id} w={600} mx="auto" style={{ position: 'relative' }}>
      {image &&
        <BackgroundImage radius="md" src={image} h={600}>
          <Grid p="xs" style={{ zIndex: 1, position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.8)' }} >
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

          <ActionIcon variant="white" size="xl" style={{ position: 'absolute', left: 24, top: 24, zIndex: 2 }} onClick={() => onLotDisliked(lot)}>
            👎
          </ActionIcon>

          <ActionIcon variant="white" size="xl" style={{ position: 'absolute', right: 24, top: 24, zIndex: 2 }} onClick={() => onLotLiked(lot)}>
            👍
          </ActionIcon>
        </BackgroundImage>
      }
    </Box>
  )
}
