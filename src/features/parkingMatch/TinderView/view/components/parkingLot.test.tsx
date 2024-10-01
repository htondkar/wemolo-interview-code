import React from 'react';
import { Lot, Maybe } from '@gql-types';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { renderWithContext } from '../../../../../../test-utils/render';
import { ParkingLot } from './ParkingLot';

const mockLot: Maybe<Lot> = {
  id: '1',
  address: '123 Main St',
  image: 'https://example.com/image.jpg',
  name: 'Test Lot',
  size: 100,
  status: 'active',
  type: 'public',
};

describe('ParkingLot Component', () => {
  const onLotLiked = vi.fn();
  const onLotDisliked = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderParkingLot(lot: Maybe<Lot> = mockLot) {
    return renderWithContext(
      <ParkingLot lot={lot} onLotLiked={onLotLiked} onLotDisliked={onLotDisliked} />
    );
  }

  it('should render nothing if no lot is provided', () => {
    const { container } = renderParkingLot(null);
    expect(container.querySelector('image')).toBeNull();
  });

  it('should render the lot details', () => {
    const screen = renderParkingLot();

    expect(screen.getByText('Test Lot')).toBeTruthy();
    expect(screen.getByText('123 Main St')).toBeTruthy();
    expect(screen.getByText('Type: public')).toBeTruthy();
    expect(screen.getByText('Size: 100')).toBeTruthy();
    expect(screen.getByText('Status: active')).toBeTruthy();
  });

  it('should call onLotLiked when the like button is clicked', () => {
    const screen = renderParkingLot();

    const likeButton = screen.getByText('👍');
    fireEvent.click(likeButton);

    expect(onLotLiked).toHaveBeenCalledWith(mockLot);
  });

  it('should call onLotDisliked when the dislike button is clicked', () => {
    const screen = renderParkingLot();

    const dislikeButton = screen.getByText('👎');
    fireEvent.click(dislikeButton);

    expect(onLotDisliked).toHaveBeenCalledWith(mockLot);
  });
});
