import { Lot, Maybe } from '@gql-types';
import { LikedState } from '../../types';

export type Filters = {
  status: 'all' | 'active' | 'inactive';
  type: 'all' | 'store' | 'hotel' | 'public';
  likedStatus: 'all' | 'liked' | 'disliked';
  searchTerm: string;
  sortDirection: 'asc' | 'desc';
};

export type Actions =
  | {
      type: 'setStatus';
      payload: Filters['status'];
    }
  | {
      type: 'setType';
      payload: Filters['type'];
    }
  | {
      type: 'setLikedStatus';
      payload: Filters['likedStatus'];
    }
  | {
      type: 'setSearchTerm';
      payload: Filters['searchTerm'];
    }
  | {
      type: 'setSortDirection';
      payload: Filters['sortDirection'];
    };

export function filtersReducer(state: Filters, action: Actions): Filters {
  switch (action.type) {
    case 'setStatus':
      return { ...state, status: action.payload };
    case 'setType':
      return { ...state, type: action.payload };
    case 'setLikedStatus':
      return { ...state, likedStatus: action.payload };
    case 'setSearchTerm':
      return { ...state, searchTerm: action.payload };
    case 'setSortDirection':
      return { ...state, sortDirection: action.payload };
    default:
      return state;
  }
}

export function applyFilters(
  entries: Maybe<Lot>[],
  filters: Filters,
  getLikedStatus: (lot: Lot) => LikedState | undefined
): Lot[] {
  return entries
    .filter((entry): entry is Lot => {
      if (!entry) return false;
      if (filters.status !== 'all' && entry.status !== filters.status) return false;
      if (filters.type !== 'all' && entry.type !== filters.type) return false;
      if (filters.likedStatus !== 'all') {
        const liked = filters.likedStatus === 'liked';
        const likedState = getLikedStatus(entry);
        if (likedState === undefined) return false;
        return getLikedStatus(entry) === (liked ? 'liked' : 'disliked');
      }
      if (
        filters.searchTerm &&
        !entry.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
        return false;
      return true;
    })
    .sort(
      (a, b) =>
        new Intl.Collator('en').compare(a.name, b.name) * (filters.sortDirection === 'asc' ? 1 : -1)
    );
}
