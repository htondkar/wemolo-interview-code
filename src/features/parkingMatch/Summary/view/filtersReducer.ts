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
