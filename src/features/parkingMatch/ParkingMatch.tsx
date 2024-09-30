import { Container, Divider, Title } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { ParkingMatchContext, useParkingMatchState } from './hooks/useParkingMatchState';


export function ParkingMatch() {
  const appState = useParkingMatchState();

  return (
    <ParkingMatchContext.Provider value={appState}>
      <Container>
        <Title my="lg">Parking Match App</Title>
        <Divider />
        <Outlet />
      </Container>
    </ParkingMatchContext.Provider>
  )
}
