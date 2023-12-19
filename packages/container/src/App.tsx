// utils
import React, { lazy as lazyLoad, Suspense, useCallback, useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import Main from './components/Main';
import Loader from './components/Loader';
import AuthContextProvider from './contexts/authContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        async lazy() {
          const MarketingApp = await lazyLoad(() => import('./components/MarketingApp'));
          return { element: <MarketingApp /> };
        },
      },
      {
        path: '/pricing',
        async lazy() {
          const MarketingApp = await lazyLoad(() => import('./components/MarketingApp'));
          return { element: <MarketingApp /> };
        },
      },
      {
        path: '/auth/*',
        async lazy() {
          const AuthApp = await lazyLoad(() => import('./components/AuthApp'));
          return { element: <AuthApp /> };
        },
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthContextProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthContextProvider>
  );
}
