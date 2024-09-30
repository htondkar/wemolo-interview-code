import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { TinderView } from './features/parkingMatch/TinderView/view/TinderView';
import { Summary } from './features/parkingMatch/Summary/view/Summary';
import { ParkingMatch } from './features/parkingMatch/ParkingMatch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: "/parking-match",
    element: <ParkingMatch />,
    children: [
      {
        path: "tinder-view",
        element: <TinderView />,
      },
      {
        path: "summary",
        element: <Summary />,
      },
    ],
  },
]);


export function Router() {
  return <RouterProvider router={router} />;
}
