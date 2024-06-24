<!-- components/album.vue -->
<template>
  <div class="albums-container">
    <h2>Albums</h2>

    <div v-if="albumStore.isLoading">Loading albums...</div>
    <div v-else>
      <ul class="albums-list">
        <li v-for="album in albumStore.albums" :key="album.id" class="album-item">
          <h3 @click="viewAlbumPhotos(album.id)">{{ album.title }}</h3>
          <div class="photos-container">
            <div v-for="photo in album.photos" :key="photo.id" class="photo-item">
              <a :href="photo.url" target="_blank" rel="noopener noreferrer">
                <img :src="photo.thumbnailUrl" :alt="photo.title" />
              </a>
              <p>{{ photo.title }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAlbumStore } from '../components/store/AlbumStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const albumStore = useAlbumStore();
const router = useRouter();

onMounted(() => {
  albumStore.fetchAlbums();
});

const viewAlbumPhotos = (albumId) => {
  router.push({ path: `/albums/${albumId}` });
};
</script>

<style scoped>
.albums-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #0d0d0d; /* Warna latar belakang gelap */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4); /* Efek bayangan */
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
}

.albums-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.album-item {
  margin-bottom: 20px;
  cursor: pointer;
  border: 1px solid transparent; /* Garis tepi transparan */
  transition: all 0.3s ease; /* Transisi untuk efek hover */
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.album-item:hover {
  transform: translateY(-5px); /* Mengangkat item sejauh 5px saat hover */
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.4); /* Efek shadow saat hover */
  border-color: #00ffff; /* Warna border saat hover */
}

.album-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 255, 255, 0.1); /* Warna overlay transparan */
  transition: opacity 0.3s ease; /* Transisi untuk opacity */
  z-index: -1;
}

.album-item:hover::before {
  opacity: 0.3; /* Menampilkan overlay saat hover */
}

.album-item h3 {
  margin-bottom: 10px;
  color: #ffffff; /* Warna teks putih */
  font-size: 1.5rem; /* Ukuran font judul */
}

.photos-container {
  display: flex;
  flex-wrap: wrap;
}

.photo-item {
  width: calc(33.33% - 20px);
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Efek bayangan */
}

.photo-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: transform 0.2s ease; /* Transisi untuk efek hover */
}

.photo-item:hover img {
  transform: scale(1.05); /* Efek scaling saat hover */
}

.photo-item p {
  padding: 10px;
  background-color: #1a1a1a; /* Warna latar belakang info foto */
  margin: 0;
  font-size: 14px;
  color: #ffffff; /* Warna teks putih */
  border-top: 1px solid #333; /* Garis atas */
  border-radius: 0 0 8px 8px;
}

@media (max-width: 768px) {
  .photo-item {
    width: calc(50% - 20px);
  }
}
</style>

