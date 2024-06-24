// components/store/AlbumStore.js
import { defineStore } from 'pinia';

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [],
    isLoading: true,
    currentAlbum: null, // Add a current album state
  }),
  actions: {
    async fetchAlbums() {
      this.isLoading = true;
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=5');
        const data = await response.json();
        this.albums = data;
        await this.fetchAlbumPhotos();
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchAlbumPhotos() {
      const albumPhotoPromises = this.albums.map(async (album) => {
        const photoResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}&_limit=3`);
        const photos = await photoResponse.json();
        album.photos = photos.map(photo => ({
          ...photo,
          url: photo.url.replace('https://via.placeholder.com', 'https://jsonplaceholder.typicode.com/photos'),
        }));
      });
      await Promise.all(albumPhotoPromises);
    },
    setCurrentAlbum(album) {
      this.currentAlbum = album;
    }
  },
});
