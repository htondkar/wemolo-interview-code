import { Lot, Maybe } from '@gql-types';
import { LikedState } from '../../types';
import { Actions, applyFilters, Filters, filtersReducer } from './filters';

describe('filtersReducer', () => {
  const initialState: Filters = {
    status: 'all',
    type: 'all',
    likedStatus: 'all',
    searchTerm: '',
    sortDirection: 'asc',
  };

  it('should set status', () => {
    const action: Actions = { type: 'setStatus', payload: 'active' };
    const newState = filtersReducer(initialState, action);
    expect(newState.status).toBe('active');
  });

  it('should set type', () => {
    const action: Actions = { type: 'setType', payload: 'store' };
    const newState = filtersReducer(initialState, action);
    expect(newState.type).toBe('store');
  });

  it('should set likedStatus', () => {
    const action: Actions = { type: 'setLikedStatus', payload: 'liked' };
    const newState = filtersReducer(initialState, action);
    expect(newState.likedStatus).toBe('liked');
  });

  it('should set searchTerm', () => {
    const action: Actions = { type: 'setSearchTerm', payload: 'test' };
    const newState = filtersReducer(initialState, action);
    expect(newState.searchTerm).toBe('test');
  });

  it('should set sortDirection', () => {
    const action: Actions = { type: 'setSortDirection', payload: 'desc' };
    const newState = filtersReducer(initialState, action);
    expect(newState.sortDirection).toBe('desc');
  });
});

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
