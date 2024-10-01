import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Loader, Text } from '@mantine/core';
import { ParkingMatchContext } from '../../hooks/useParkingMatchState';
import { ParkingLot } from './components/ParkingLot';

export function TinderView() {
  const { isLoadingLots, onLotDisliked, onLotLiked, lotToDisplay } =
    useContext(ParkingMatchContext);

  return (
    <Flex direction="column" gap="md">
      <Link to="/summary">
        <Button variant="light" my="sm">
          Go to summary
        </Button>
      </Link>

      <Flex justify="center" align="center" mih={500}>
        {isLoadingLots ? (
          <Loader size={30} />
        ) : (
          <ParkingLot lot={lotToDisplay} onLotDisliked={onLotDisliked} onLotLiked={onLotLiked} />
        )}
        {!isLoadingLots && !lotToDisplay && <Text>No more lots to display</Text>}
      </Flex>
    </Flex>
  );
}
