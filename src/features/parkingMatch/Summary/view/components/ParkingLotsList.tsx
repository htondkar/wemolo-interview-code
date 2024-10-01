import { Lot } from '@gql-types';
import { Table } from '@mantine/core';
import { LikedState } from '../../../types';

export function ParkingLotsList({
  lots,
  getLotLikedState,
}: {
  lots: Lot[];
  getLotLikedState: (lot: Lot) => LikedState | undefined;
}) {
  return (
    <Table.ScrollContainer minWidth={400} h={600} type="native">
      <Table stickyHeader striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Match</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {lots.map((lot) => {
            if (!lot) {return null;}
            const likedState = getLotLikedState(lot);
            return (
              <Table.Tr key={lot.id}>
                <Table.Td>{lot.name}</Table.Td>
                <Table.Td>{lot.address}</Table.Td>
                <Table.Td>{lot.status}</Table.Td>
                <Table.Td>{lot.type}</Table.Td>
                <Table.Td align="justify">
                  {likedState === 'liked' ? '✅' : likedState === 'disliked' ? '❌' : ''}
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
