import { Lot, Maybe } from '@gql-types';
import { LikedState } from '../../../types';
import { Filters } from '../filtersReducer';
import { applyFilters } from './applyFilters';

describe('applyFilters', () => {
  const entries: Maybe<Lot>[] = [
    {
      id: '1',
      name: 'Lot A',
      status: 'active',
      type: 'store',
      image: '',
      size: 10,
      address: 'Address A',
    },
    {
      id: '2',
      name: 'Lot B',
      status: 'inactive',
      type: 'hotel',
      image: '',
      size: 20,
      address: 'Address B',
    },
    {
      id: '3',
      name: 'Lot C',
      status: 'active',
      type: 'public',
      image: '',
      size: 30,
      address: 'Address C',
    },
  ];

  const getLikedStatus = (lot: Lot): LikedState | undefined => {
    const likedStatusMap: Record<string, LikedState> = {
      '1': 'liked',
      '2': 'disliked',
      '3': 'liked',
    };
    return likedStatusMap[lot.id];
  };

  it('should filter by status', () => {
    const filters: Filters = {
      status: 'active',
      type: 'all',
      likedStatus: 'all',
      searchTerm: '',
      sortDirection: 'asc',
    };
    const result = applyFilters(entries, filters, getLikedStatus);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('3');
  });

  it('should filter by type', () => {
    const filters: Filters = {
      status: 'all',
      type: 'store',
      likedStatus: 'all',
      searchTerm: '',
      sortDirection: 'asc',
    };
    const result = applyFilters(entries, filters, getLikedStatus);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter by likedStatus', () => {
    const filters: Filters = {
      status: 'all',
      type: 'all',
      likedStatus: 'liked',
      searchTerm: '',
      sortDirection: 'asc',
    };
    const result = applyFilters(entries, filters, getLikedStatus);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('3');
  });

  it('should filter by searchTerm', () => {
    const filters: Filters = {
      status: 'all',
      type: 'all',
      likedStatus: 'all',
      searchTerm: 'Lot B',
      sortDirection: 'asc',
    };
    const result = applyFilters(entries, filters, getLikedStatus);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('should sort by name', () => {
    const filters: Filters = {
      status: 'all',
      type: 'all',
      likedStatus: 'all',
      searchTerm: '',
      sortDirection: 'asc',
    };
    const result = applyFilters(entries, filters, getLikedStatus);
    expect(result[0].name).toBe('Lot A');
    expect(result[1].name).toBe('Lot B');
    expect(result[2].name).toBe('Lot C');
  });

  it('should sort by name in descending order', () => {
    const filters: Filters = {
      status: 'all',
      type: 'all',
      likedStatus: 'all',
      searchTerm: '',
      sortDirection: 'desc',
    };
    const result = applyFilters(entries, filters, getLikedStatus);
    expect(result[0].name).toBe('Lot C');
    expect(result[1].name).toBe('Lot B');
    expect(result[2].name).toBe('Lot A');
  });
});
