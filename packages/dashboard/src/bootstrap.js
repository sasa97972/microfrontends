// Utils
import { createApp } from 'vue';
import { isIsolationMode } from './utils/isIsolationMode';

// Config
import { DEV_ROOT_SELECTOR } from './config/config';

// Components
import Dashboard from './components/Dashboard.vue';

const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

if (isIsolationMode()) {
  mount(document.querySelector(DEV_ROOT_SELECTOR));
}

export { mount };
