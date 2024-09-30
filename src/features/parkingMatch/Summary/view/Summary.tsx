import { Lot } from '@/__generated__/graphql'
import { Button, Container, Divider, Flex, Radio, Stack, Table, TextInput, Title } from '@mantine/core'
import { use } from 'chai'
import { ParkingMatchContext, } from '../../ParkingMatch'
import { useContext } from 'react'

type Props = {
  entries: Lot[]
}

export function Summary() {
  const { lots, getLotLikedState } = useContext(ParkingMatchContext)
  const sortDirection = 'asc'

  return (
    <Container>
      <Title order={2} my="lg">Summary</Title>

      <Stack >
        <Flex align="center" gap="lg">
          <TextInput placeholder="Search" flex='1' />

          <Flex gap="xs" align="center">
            <Title order={5}>Sort by</Title>
            <Button variant='light'>
              Name{' '}
              {sortDirection === 'asc' ? '⬆' : '⬇'}
            </Button>
          </Flex>


        </Flex>

        <Flex gap="lg" align="center">
          <Flex gap="xs" align="center">
            <Title order={5}>Status: </Title>
            <Radio checked={false} onChange={console.log} label="Active" />
            <Radio checked={false} onChange={console.log} label="Inactive" />
            <Radio checked={true} onChange={console.log} label="All" />
          </Flex>

          <Divider variant='solid' orientation="vertical"></Divider>

          <Flex gap="xs" align="center">
            <Title order={5}>Type: </Title>
            <Radio checked={false} onChange={console.log} label="Store" />
            <Radio checked={false} onChange={console.log} label="Hotel" />
            <Radio checked={false} onChange={console.log} label="Public" />
            <Radio checked={true} onChange={console.log} label="All" />
          </Flex>

          <Divider variant='solid' orientation="vertical"></Divider>

          <Flex gap="xs" align="center">
            <Radio checked={false} onChange={console.log} label="Liked" />
            <Radio checked={false} onChange={console.log} label="Disliked" />
            <Radio checked={true} onChange={console.log} label="All" />
          </Flex>
        </Flex>

        <Divider />

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Address</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Match</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{
            lots.map((lot) => {
              const likedState = getLotLikedState(lot)

              return (
                <Table.Tr key={lot.id}>
                  <Table.Td>{lot.name}</Table.Td>
                  <Table.Td>{lot.address}</Table.Td>
                  <Table.Td>{lot.status}</Table.Td>
                  <Table.Td>{lot.type}</Table.Td>
                  <Table.Td align="justify">{likedState === 'liked' ? "✅" : likedState === 'disliked' ? "❌" : ''}</Table.Td>
                </Table.Tr>
              )
            })
          }</Table.Tbody>
        </Table>

      </Stack>
    </Container>
  )
}