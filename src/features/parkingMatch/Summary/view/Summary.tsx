import { Button, Container, Divider, Flex, Radio, Stack, Table, TextInput, Title } from '@mantine/core'

import { useContext, useReducer } from 'react'
import { applyFilters, filtersReducer } from './filters'
import { ParkingMatchContext } from '../../hooks/useParkingMatchState'


export function Summary() {
  const [filters, dispatch] = useReducer(filtersReducer, { status: 'all', type: 'all', likedStatus: 'all', searchTerm: '', sortDirection: 'desc' })
  const { lots, getLotLikedState } = useContext(ParkingMatchContext)


  const filteredLots = applyFilters(lots, filters, getLotLikedState)

  return (
    <Container>
      <Title order={2} my="lg">Summary</Title>

      <Stack >
        <Flex align="center" gap="lg">
          <TextInput placeholder="Search" flex='1' value={filters.searchTerm} onChange={e => dispatch({ type: 'setSearchTerm', payload: e.target.value })} />

          <Flex gap="xs" align="center">
            <Title order={5}>Sort by name</Title>
            <Button variant='light' onClick={() => dispatch({ type: 'setSortDirection', payload: filters.sortDirection === 'asc' ? "desc" : 'asc' })}>
              {filters.sortDirection === 'asc' ? '⤴️' : '⤵️'}
            </Button>
          </Flex>


        </Flex>

        <Flex gap="lg" align="center" wrap='wrap'>
          <Flex gap="xs" align="center">
            <Title order={5}>Status: </Title>
            <Radio checked={filters.status === 'all'} onChange={() => dispatch({ type: 'setStatus', payload: 'all' })} label="All" />
            <Radio checked={filters.status === 'active'} onChange={() => dispatch({ type: 'setStatus', payload: 'active' })} label="Active" />
            <Radio checked={filters.status === 'inactive'} onChange={() => dispatch({ type: 'setStatus', payload: 'inactive' })} label="Inactive" />
          </Flex>

          <Divider variant='solid' orientation="vertical"></Divider>

          <Flex gap="xs" align="center">
            <Title order={5}>Type: </Title>
            <Radio checked={filters.type === 'all'} onChange={() => dispatch({ type: 'setType', payload: 'all' })} label="All" />
            <Radio checked={filters.type === 'store'} onChange={() => dispatch({ type: 'setType', payload: 'store' })} label="Store" />
            <Radio checked={filters.type === 'hotel'} onChange={() => dispatch({ type: 'setType', payload: 'hotel' })} label="Hotel" />
            <Radio checked={filters.type === 'public'} onChange={() => dispatch({ type: 'setType', payload: 'public' })} label="Public" />
          </Flex>

          <Divider variant='solid' orientation="vertical"></Divider>

          <Flex gap="xs" align="center">
            <Radio checked={filters.likedStatus === 'all'} onChange={() => dispatch({ type: 'setLikedStatus', payload: 'all' })} label="All" />
            <Radio checked={filters.likedStatus === 'liked'} onChange={() => dispatch({ type: 'setLikedStatus', payload: 'liked' })} label="Liked" />
            <Radio checked={filters.likedStatus === 'disliked'} onChange={() => dispatch({ type: 'setLikedStatus', payload: 'disliked' })} label="Disliked" />
          </Flex>
        </Flex>

        <Divider />

        <Table.ScrollContainer minWidth={400} h={600} type='native'>
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
              {
                filteredLots.map((lot) => {
                  if (!lot) return null
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
              }
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

      </Stack>
    </Container>
  )
}