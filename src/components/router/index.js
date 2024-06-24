// components/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Album from '../album.vue'; // Sesuaikan dengan struktur Anda
import Photo from '../views/photo.vue'; // Sesuaikan dengan struktur Anda

const routes = [
  { path: '/', redirect: '/albums' },
  { path: '/albums', component: Album },
  { path: '/albums/:id', component: Photo, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
