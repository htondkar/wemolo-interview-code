import { Lot } from '@gql-types';
import { Grid, GridCol, Text, Title } from '@mantine/core';

export function LotInfo({ lot: { address, name, type, size, status } }: { lot: Lot }) {
  return (
    <Grid
      p="md"
      
      style={{
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        background: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      <GridCol span={6}>
        <Title order={3} c="gray.0">{name}</Title>
        <Text size="md" c="gray.0">{address}</Text>
      </GridCol>
      <GridCol span={6}>
        <Text size="sm" c="gray.0">Type: {type}</Text>
        <Text size="sm" c="gray.0">Size: {size}</Text>
        <Text size="sm" c="gray.0">Status: {status}</Text>
      </GridCol>
    </Grid>
  );
}
