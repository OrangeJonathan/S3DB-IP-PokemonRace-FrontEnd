import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Race from './components/Race.vue';
import Practice from './components/Practice.vue';
import Friends from './components/Friends.vue';


const routes = [
    { path: '/home', component: Home},
    { path: '/race', component: Race},
    { path: '/practice', component: Practice},
    { path: '/friends', component: Friends}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;