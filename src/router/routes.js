import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/views/Home.vue';
import Race from '/src/views/Race.vue';
import Guess from '/src/views/Practice.vue';
import Friends from '/src/views/Friends.vue';
import Profile from '/src/views/Profile.vue';
import Callback from '/src/views/Callback.vue';
import { authGuard } from "@auth0/auth0-vue";


const routes = [
    { path: '/', component: Home, name: 'home'},
    { path: '/practice', component: Guess, name: 'practice'},
    { path: '/race', component: Race, name: 'race', beforeEnter: authGuard},
    { path: '/friends', component: Friends, name: 'friends', beforeEnter: authGuard},
    { path: '/profile', component: Profile, name: 'profile', beforeEnter: authGuard },
    { path: '/callback', component: Callback, name: 'callback' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;