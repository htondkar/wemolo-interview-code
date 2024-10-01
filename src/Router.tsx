import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ParkingMatch } from './features/parkingMatch/ParkingMatch';
import { Summary } from './features/parkingMatch/summary/view/Summary';
import { TinderView } from './features/parkingMatch/tinderView/view/TinderView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ParkingMatch />,
    children: [
      {
        path: '/',
        element: <TinderView />,
      },
      {
        path: 'summary',
        element: <Summary />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
