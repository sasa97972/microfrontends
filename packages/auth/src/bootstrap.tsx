// Utils
import React from 'react';
import { createRoot } from 'react-dom/client';
import { isIsolationMode } from './utils/isIsolationMode';

// Config
import { DEV_ROOT_SELECTOR } from './config/config';

// Components
import App, { router } from './App';

interface Options {
  onNavigate?: (path: string) => void;
}

const mount = (el: Element, { onNavigate }: Options) => {
  const root = createRoot(el);
  root.render(<App />);

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
