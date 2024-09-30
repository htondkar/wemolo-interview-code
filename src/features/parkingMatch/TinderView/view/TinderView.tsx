
import { Link } from "react-router-dom"
import { Button, Flex, Loader, Text } from '@mantine/core'
import { useContext } from 'react'
import { ParkingLot } from './components/ParkingLot'
import { ParkingMatchContext } from '../../hooks/useParkingMatchState'

export function TinderView() {
  const { isLoadingLots, onLotDisliked, onLotLiked, lotToDisplay } = useContext(ParkingMatchContext)

  return (
    <Flex direction="column" gap="md">
      <Link to="/parking-match/summary">
        <Button variant='light' my="sm">
          Go to summary
        </Button>
      </Link>

      <Flex justify='center' align='center' mih={500}>
        {
          isLoadingLots
            ? <Loader size={30} />
            : <ParkingLot lot={lotToDisplay} onLotDisliked={onLotDisliked} onLotLiked={onLotLiked} />
        }

        {!isLoadingLots && !lotToDisplay && <Text>No more lots to display</Text>}
      </Flex>
    </Flex>
  )
}