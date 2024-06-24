<template>
  <div class="photo-container">
    <q-page-container>
      <h2 class="text-h6 q-mb-sm">Photos</h2>
      <q-card v-if="isLoading">
        <q-card-section class="q-pa-md">
          Loading photos...
        </q-card-section>
      </q-card>
      <q-card v-else>
        <q-card-section class="photos-list">
          <q-item v-for="photo in currentAlbum.photos" :key="photo.id">
            <q-item-section>
              <q-img :src="photo.thumbnailUrl" :alt="photo.title" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ photo.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-page-container>
  </div>
</template>

<script setup>
import { useAlbumStore } from '../components/store/AlbumStore';
import { onMounted, ref } from 'vue';

const albumStore = useAlbumStore();
const albumId = $route.params.id;
const isLoading = ref(true);

onMounted(() => {
  const album = albumStore.albums.find(album => album.id === parseInt(albumId));
  if (album) {
    albumStore.setCurrentAlbum(album);
    isLoading.value = false;
  } else {
    console.error(`Album with ID ${albumId} not found`);
  }
});
</script>

<style scoped>
/* Styling untuk Photo.vue */
.photo-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
}

.photos-list {
  display: flex;
  flex-wrap: wrap;
}

.photo-item {
  width: calc(33.33% - 20px);
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.photo-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px 8px 0 0;
}

.photo-item p {
  padding: 10px;
  background-color: #f0f0f0;
  margin: 0;
  font-size: 14px;
  color: #333;
  border-top: 1px solid #ddd;
}

@media (max-width: 768px) {
  .photo-item {
    width: calc(50% - 20px);
  }
}

.some-component {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
}

.q-btn {
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.q-card {
  /* Menyesuaikan gaya kartu dari Quasar */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
