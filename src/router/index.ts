import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Announcement from '../components/Announcement.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/announcement', component: Announcement },
];

const router = createRouter({
  history: createWebHistory('/landing/'),
  routes,
});

export default router;
