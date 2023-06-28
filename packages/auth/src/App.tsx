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
        path: '/auth/signin',
        async lazy() {
          const SignIn = await lazyLoad(() => import('./components/SignIn'));
          return { element: <SignIn onSignIn={() => {console.log('Signed in!');}} /> };
        },
      },
      {
        path: '/auth/signup',
        async lazy() {
          const SignUp = await lazyLoad(() => import('./components/SignUp'));
          return { element: <SignUp onSignIn={() => {console.log('Signed in!');}} /> };
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
