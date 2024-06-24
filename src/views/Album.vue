<template>
    <div>
      <h2>Albums</h2>
      <div v-if="albums.length === 0">Loading...</div>
      <ul v-if="albums.length > 0" class="album-list">
        <li v-for="album in albums" :key="album.id" @click="navigateToPhotos(album.id)">
          {{ album.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useAlbumStore } from '../stores/albumStore';
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const albumStore = useAlbumStore();
      const { albums } = storeToRefs(albumStore);
      const router = useRouter();
  
      onMounted(() => {
        albumStore.fetchAlbums();
      });
  
      const navigateToPhotos = (albumId) => {
        router.push(`/album/${albumId}`);
      };
  
      return {
        albums,
        navigateToPhotos
      };
    }
  };
  </script>
  
  <style scoped>
  .album-list {
    list-style-type: none;
    padding: 0;
  }
  
  .album-list li {
    cursor: pointer;
    padding: 10px;
    margin: 5px 0;
    background-color: #f0f0f0;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .album-list li:hover {
    background-color: #dcdcdc;
  }
  </style>
  