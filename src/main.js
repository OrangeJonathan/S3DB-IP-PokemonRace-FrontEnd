import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes.js';
import { createAuth0 } from '@auth0/auth0-vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';  

const app = createApp(App);

app.use(router);
app.use(VueSweetalert2);
app.use(
  createAuth0({
    domain: "pokemonracer.eu.auth0.com",
    clientId: "Ro4SCGvNoy246c6hH9o1uoAXdtLvtzmj",
    authorizationParams: {
      redirect_uri: 'http://localhost:3000/callback',
      audience: 'https://pokemon-racer.test.com',
    },
  })
);
app.mount('#app');