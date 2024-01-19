import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/views/Home.vue';
import RaceInvite from '/src/views/RaceInvite.vue';
import Race from '/src/views/race.vue'
import Guess from '/src/views/Practice.vue';
import Friends from '/src/views/Friends.vue';
import Profile from '/src/views/Profile.vue';
import Callback from '/src/views/Callback.vue';
import PageNotFound from '/src/views/PageNotFound.vue'
import { authGuard } from "@auth0/auth0-vue";

const routes = [
    { path: '/', component: Home, name: 'home'},
    { path: '/practice', component: Guess, name: 'practice', beforeEnter: authGuard},
    { path: '/raceinvite', component: RaceInvite, name: 'raceinvite', beforeEnter: authGuard},
    { path: '/race', component: Race, name: 'race', beforeEnter: authGuard},
    { path: '/friends', component: Friends, name: 'friends', beforeEnter: authGuard},
    { path: '/profile', component: Profile, name: 'profile', beforeEnter: authGuard },
    { path: '/callback', component: Callback, name: 'callback' },
    { path: '/:pathMatch(.*)*', component: PageNotFound, name: 'not-found' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;