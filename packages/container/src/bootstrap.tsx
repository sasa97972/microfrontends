// Utils
import React from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './App';

const root = createRoot(document.querySelector('#root') as Element);
root.render(<App />);

export {};
