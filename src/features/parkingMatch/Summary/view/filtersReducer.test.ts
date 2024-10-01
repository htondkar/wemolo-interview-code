import { Actions, Filters, filtersReducer } from './filtersReducer';

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
