import { screen } from '@testing-library/react';
import { Summary } from './Summary';
import { Lot } from '@gql-types';
import { LikedState, ParkingAppState } from '../../types';
import { vi } from 'vitest';
import { renderWithContext } from '../../../../../test-utils/render';
import { ParkingMatchContext } from '../../hooks/useParkingMatchState';


const mockState = {
  likeStatus: {
    '1': 'liked',
    '2': 'disliked',
  },
  filteredLots: [
    { id: '1', name: 'Lot A', address: 'Address A', status: 'active', type: 'store', match: 90 },
    { id: '2', name: 'Lot B', address: 'Address B', status: 'inactive', type: 'hotel', match: 80 },
  ],
} as const;

describe('Summary Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderSummary() {
    return renderWithContext(
      <ParkingMatchContext.Provider value={{
        lots: mockState.filteredLots,
        getLotLikedState: ({ id }: Lot) => mockState.likeStatus[id] as LikedState,
      } as unknown as ParkingAppState}>
        <Summary />
      </ParkingMatchContext.Provider>
    );
  }

  it('should render filter buttons and radio buttons', () => {
    renderSummary()

    expect(screen.getByText('Sort by name')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Type:')).toBeInTheDocument();
    expect(screen.getAllByLabelText('All')).toHaveLength(3);
    expect(screen.getByLabelText('Active')).toBeInTheDocument();
    expect(screen.getByLabelText('Inactive')).toBeInTheDocument();
    expect(screen.getByLabelText('Store')).toBeInTheDocument();
    expect(screen.getByLabelText('Hotel')).toBeInTheDocument();
    expect(screen.getByLabelText('Public')).toBeInTheDocument();
    expect(screen.getByLabelText('Liked')).toBeInTheDocument();
    expect(screen.getByLabelText('Disliked')).toBeInTheDocument();
  });

  it('should render filtered lots', () => {
    renderSummary()

    expect(screen.getByText('Lot A')).toBeInTheDocument();
    expect(screen.getByText('Address A')).toBeInTheDocument();
    expect(screen.getByText('Lot B')).toBeInTheDocument();
    expect(screen.getByText('Address B')).toBeInTheDocument();
  });
});