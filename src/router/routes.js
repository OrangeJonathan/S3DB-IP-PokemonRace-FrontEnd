import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/views/Home.vue';
import Race from '/src/components/Race.vue';
import Guess from '/src/views/Practice.vue';
import Friends from '/src/views/Friends.vue';


const routes = [
    { path: '/', component: Home, name: 'home'},
    { path: '/race', component: Race, name: 'race'},
    { path: '/practice', component: Guess, name: 'practice'},
    { path: '/friends', component: Friends, name: 'friends'}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;