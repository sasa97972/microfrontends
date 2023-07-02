// Utils
import React, { lazy as lazyLoad } from 'react';
import { createRoot } from 'react-dom/client';
import { isIsolationMode } from './utils/isIsolationMode';
import { createBrowserRouter, createMemoryRouter } from 'react-router-dom';

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
  console.log(initialPath);
  const router = routerFactory([
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
