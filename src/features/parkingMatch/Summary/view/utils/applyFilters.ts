import { Lot, Maybe } from '@gql-types';
import { LikedState } from '../../../types';
import { Filters } from '../filtersReducer';

export function applyFilters(
  entries: Maybe<Lot>[],
  filters: Filters,
  getLikedStatus: (lot: Lot) => LikedState | undefined
): Lot[] {
  return entries
    .filter((entry): entry is Lot => {
      if (!entry) {
        return false;
      }

      if (filters.status !== 'all' && entry.status !== filters.status) {
        return false;
      }

      if (filters.type !== 'all' && entry.type !== filters.type) {
        return false;
      }

      if (filters.likedStatus !== 'all') {
        const liked = filters.likedStatus === 'liked';
        const expectedLikedState = liked ? 'liked' : 'disliked';

        const likedState = getLikedStatus(entry);

        if (likedState === undefined) {
          return false;
        }

        return getLikedStatus(entry) === expectedLikedState;
      }

      if (
        filters.searchTerm &&
        !entry.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort(
      (a, b) =>
        new Intl.Collator('en').compare(a.name, b.name) * (filters.sortDirection === 'asc' ? 1 : -1)
    );
}
