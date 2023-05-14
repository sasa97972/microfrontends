// Utils
import React, { lazy as lazyLoad, Suspense } from 'react';
import { createMemoryRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { isIsolationMode } from './utils/isIsolationMode';

// Components
import Loader from './components/Loader';
import Main from './components/Main';

const routerFactory = isIsolationMode() ? createBrowserRouter : createMemoryRouter;

export const router = routerFactory([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        async lazy() {
          const Landing = await lazyLoad(() => import('./components/Landing'));
          return { element: <Landing /> };
        },
      },
      {
        path: '/pricing',
        async lazy() {
          const Pricing = await lazyLoad(() => import('./components/Pricing'));
          return { element: <Pricing /> };
        },
      },
    ],
  },
]);

export default function App() {

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
