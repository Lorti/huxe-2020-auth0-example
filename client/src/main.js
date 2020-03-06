import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { Auth0Plugin } from './auth';

Vue.use(Auth0Plugin, {
  domain: 'manuelwieser.eu.auth0.com',
  clientId: 'cc0QVcTdTyQtRgmDkayO0whM9sKW3QL9',
  audience: 'https://huxe2020.example.com',
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render(h) { return h(App); },
}).$mount('#app');
