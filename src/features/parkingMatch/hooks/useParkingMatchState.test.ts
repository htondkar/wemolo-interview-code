import { Lot, Query } from '@gql-types';
import { act, renderHook } from '@testing-library/react-hooks';
import { Mock, vi } from 'vitest';
import { usePaginatedParkingLots } from './usePaginatedParkingLots';
import {
  ParkingMatchContext,
  parkingsPageSize,
  useParkingMatchState,
} from './useParkingMatchState';

vi.mock('./usePaginatedParkingLots', () => ({
  usePaginatedParkingLots: vi.fn(),
}));

const mockLots: Lot[] = [
  {
    id: '1',
    address: '123 Main St',
    image: 'https://example.com/image1.jpg',
    name: 'Lot 1',
    size: 100,
    status: 'active',
    type: 'public',
  },
  {
    id: '2',
    address: '456 Elm St',
    image: 'https://example.com/image2.jpg',
    name: 'Lot 2',
    size: 200,
    status: 'inactive',
    type: 'store',
  },
];

describe('useParkingMatchState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state correctly', () => {
    (usePaginatedParkingLots as Mock).mockReturnValue({
      data: { getAllParkingLots: mockLots },
      loading: false,
    });

    const { result } = renderHook(() => useParkingMatchState());

    expect(result.current.lots).toEqual(mockLots);
    expect(result.current.lotToDisplay).toEqual(mockLots[0]);
    expect(result.current.isLoadingLots).toBe(false);
    expect(result.current.getLotLikedState(mockLots[0])).toBeUndefined();
  });

  it('should handle onLotLiked correctly', () => {
    (usePaginatedParkingLots as Mock).mockReturnValue({
      data: { getAllParkingLots: mockLots },
      loading: false,
    });

    const { result } = renderHook(() => useParkingMatchState());

    act(() => {
      result.current.onLotLiked(mockLots[0]);
    });

    expect(result.current.getLotLikedState(mockLots[0])).toBe('liked');
    expect(result.current.lotToDisplay).toEqual(mockLots[1]);
  });

  it('should handle onLotDisliked correctly', () => {
    (usePaginatedParkingLots as Mock).mockReturnValue({
      data: { getAllParkingLots: mockLots },
      loading: false,
    });

    const { result } = renderHook(() => useParkingMatchState());

    act(() => {
      result.current.onLotDisliked(mockLots[0]);
    });

    expect(result.current.getLotLikedState(mockLots[0])).toBe('disliked');
    expect(result.current.lotToDisplay).toEqual(mockLots[1]);
  });
});
