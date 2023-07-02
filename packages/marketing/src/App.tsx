// Utils
import React, { Suspense } from 'react';
import { RouterProvider, RouterProviderProps } from 'react-router-dom';

// Components
import Loader from './components/Loader';

interface AppProps {
  router: RouterProviderProps['router'];
}

export default function App({ router }: AppProps) {

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
