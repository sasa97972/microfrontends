// Utils
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    async lazy() {
      const Landing = await import('./components/Landing');
      return { Component: Landing.default };
    },
    path: '/',
  },
  {
    async lazy() {
      const Pricing = await import('./components/Pricing');
      return { Component: Pricing.default };
    },
    path: '/pricing',
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
