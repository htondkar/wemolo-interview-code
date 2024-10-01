import { Button, Divider, Flex, Radio, TextInput, Title } from '@mantine/core';
import { Actions, Filters as FiltersType } from '../filtersReducer';

type Props = {
  filters: FiltersType;
  dispatch: (action: Actions) => void;
};

export function Filters({ filters, dispatch }: Props): JSX.Element {
  return (
    <>
      <Flex align="center" gap="lg">
        <TextInput
          placeholder="Search"
          flex="1"
          value={filters.searchTerm}
          onChange={(e) => dispatch({ type: 'setSearchTerm', payload: e.target.value })}
        />

        <Flex gap="xs" align="center">
          <Title order={5}>Sort by name</Title>
          <Button
            variant="light"
            onClick={() =>
              dispatch({
                type: 'setSortDirection',
                payload: filters.sortDirection === 'asc' ? 'desc' : 'asc',
              })
            }
          >
            {filters.sortDirection === 'asc' ? '⤴️' : '⤵️'}
          </Button>
        </Flex>
      </Flex>

      <Flex gap="lg" align="center" wrap="wrap">
        <Flex gap="xs" align="center">
          <Title order={5}>Status: </Title>
          <Radio
            checked={filters.status === 'all'}
            onChange={() => dispatch({ type: 'setStatus', payload: 'all' })}
            label="All"
          />
          <Radio
            checked={filters.status === 'active'}
            onChange={() => dispatch({ type: 'setStatus', payload: 'active' })}
            label="Active"
          />
          <Radio
            checked={filters.status === 'inactive'}
            onChange={() => dispatch({ type: 'setStatus', payload: 'inactive' })}
            label="Inactive"
          />
        </Flex>

        <Divider variant="solid" orientation="vertical" />

        <Flex gap="xs" align="center">
          <Title order={5}>Type: </Title>
          <Radio
            checked={filters.type === 'all'}
            onChange={() => dispatch({ type: 'setType', payload: 'all' })}
            label="All"
          />
          <Radio
            checked={filters.type === 'store'}
            onChange={() => dispatch({ type: 'setType', payload: 'store' })}
            label="Store"
          />
          <Radio
            checked={filters.type === 'hotel'}
            onChange={() => dispatch({ type: 'setType', payload: 'hotel' })}
            label="Hotel"
          />
          <Radio
            checked={filters.type === 'public'}
            onChange={() => dispatch({ type: 'setType', payload: 'public' })}
            label="Public"
          />
        </Flex>

        <Divider variant="solid" orientation="vertical" />

        <Flex gap="xs" align="center">
          <Radio
            checked={filters.likedStatus === 'all'}
            onChange={() => dispatch({ type: 'setLikedStatus', payload: 'all' })}
            label="All"
          />
          <Radio
            checked={filters.likedStatus === 'liked'}
            onChange={() => dispatch({ type: 'setLikedStatus', payload: 'liked' })}
            label="Liked"
          />
          <Radio
            checked={filters.likedStatus === 'disliked'}
            onChange={() => dispatch({ type: 'setLikedStatus', payload: 'disliked' })}
            label="Disliked"
          />
        </Flex>
      </Flex>
    </>
  );
}
