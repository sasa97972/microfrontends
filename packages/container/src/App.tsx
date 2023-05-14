// utils
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import MarketingApp from './components/MarketingApp';
import Main from './components/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <MarketingApp />,
      },
      {
        path: '/pricing',
        element: <MarketingApp />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
