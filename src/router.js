import { createRouter, createWebHistory } from 'vue-router';
import Album from './views/Album.vue';
import Photos from './views/Photos.vue';

const routes = [
  { path: '/album', component: Album },
  { path: '/album/:id', component: Photos },
  { path: '/', redirect: '/album' } // Optional: Redirect root to /albums
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
