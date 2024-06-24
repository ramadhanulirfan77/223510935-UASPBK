<template>
    <div class="photos-container">
      <h2 class="photos-title">Photos</h2>
      <div v-if="photos.length === 0" class="loading">Loading...</div>
      <div v-else class="photo-grid">
        <div v-for="photo in photos" :key="photo.id" class="photo-item" @click="openModal(photo.url)">
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
          <p class="photo-title">{{ photo.title }}</p>
        </div>
      </div>
  
      <!-- Modal for full-size image -->
      <div v-if="showModal" class="modal" @click="closeModal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <img :src="modalImageUrl" alt="Full size image" class="full-size-image" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAlbumStore } from '../stores/albumStore';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
      const albumStore = useAlbumStore();
      const { photos } = storeToRefs(albumStore);
      const showModal = ref(false);
      const modalImageUrl = ref('');
  
      onMounted(() => {
        const albumId = route.params.id;
        albumStore.fetchPhotos(albumId);
      });
  
      const openModal = (url) => {
        modalImageUrl.value = url;
        showModal.value = true;
      };
  
      const closeModal = () => {
        showModal.value = false;
      };
  
      return {
        photos,
        showModal,
        modalImageUrl,
        openModal,
        closeModal
      };
    }
  };
  </script>
  
  <style scoped>
  .photos-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .photos-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #007bff;
  }
  
  .loading {
    font-size: 1.5rem;
    color: #666;
  }
  
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .photo-item {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }
  
  .photo-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s, filter 0.3s;
  }
  
  .photo-item:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .photo-item:hover img {
    transform: scale(1.1);
    filter: brightness(80%);
  }
  
  .photo-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    font-size: 1rem;
    text-align: center;
    transition: background-color 0.3s;
  }
  
  .photo-item:hover .photo-title {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  /* Modal styles */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
  }
  
  .full-size-image {
    width: 100%;
    height: auto;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 25px;
    color: #fff;
    font-size: 35px;
    font-weight: bold;
    transition: 0.3s;
  }
  
  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  