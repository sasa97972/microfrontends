import { DEV_ROOT_SELECTOR } from '../config/config';

export const isIsolationMode = () => {
  if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector(DEV_ROOT_SELECTOR);
    if (devRoot) {
      return true;
    }
  }
  return false;
};
