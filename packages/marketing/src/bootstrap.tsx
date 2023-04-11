// Links
import React from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './App';

const mount = (el: Element) => {
  const root = createRoot(el);
  root.render(<App />);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing_dev_root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
