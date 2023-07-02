// Utils
import React, { lazy as lazyLoad } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createMemoryRouter } from 'react-router-dom';
import { isIsolationMode } from './utils/isIsolationMode';

// Config
import { DEV_ROOT_SELECTOR } from './config/config';

// Components
import App from './App';
import Main from './components/Main';

interface Options {
  onNavigate?: (path: string) => void;
  initialPath?: string;
}

const routerFactory = isIsolationMode() ? createBrowserRouter : createMemoryRouter;

const mount = (el: Element, { onNavigate, initialPath }: Options) => {
  const router = routerFactory([
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
  ], {
    initialEntries: initialPath ? [initialPath] : undefined,
  });

  const root = createRoot(el);
  root.render(<App router={router} />);

  router.subscribe((routerAction) => {
    if (routerAction.historyAction === 'PUSH') {
      typeof onNavigate === 'function' && onNavigate(routerAction.location.pathname);
    }
  });

  return {
    onParentNavigate: (path: string) => {
      if (router.state.location.pathname !== path) {
        router.navigate(path);
      }
    },
  };
};

if (isIsolationMode()) {
  mount(document.querySelector(DEV_ROOT_SELECTOR)!, {});
}

export { mount };
