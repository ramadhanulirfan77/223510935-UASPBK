<template>
    <!-- Menggunakan div sebagai pembungkus utama -->
    <div class="background">
      <h1>RAMADHANUL IRFAN
      </h1> 
      <h2>NPM 223510935
      </h2>
      <!-- Menampilkan kegiatan yang sudah ada dalam sebuah tabel -->
      <table>
        <thead>
          <tr>
            <th>Kegiatan</th>
            <th>Status</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in activities" :key="activity.id" :class="{ completed: activity.completed }">
            <td>
              <!-- Jika kegiatan sudah selesai, maka tampilkan dengan coretan -->
              <span :style="{ 'text-decoration': activity.completed ? 'line-through' : 'none' }">{{ activity.name }}</span>
            </td>
            <td>
              <!-- Jika kegiatan sudah selesai, tampilkan 'Telah Selesai', jika belum, tampilkan 'Belum Selesai' -->
              <span v-if="activity.completed">Telah Selesai</span>
              <span v-else>Belum Selesai</span>
              <input type="checkbox" v-model="activity.completed">
            </td>
            <td>
              <button @click="cancelActivity(activity.id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Form untuk menambahkan kegiatan baru -->
      <form @submit.prevent="addActivity">
        <input type="text" v-model="newActivity" placeholder="Masukkan kegiatan baru">
        <button type="submit">Tambahkan</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Data contoh untuk kegiatan
  const activities = ref([
    { id: 1, name: 'Kegiatan 1', completed: false },
    { id: 2, name: 'Kegiatan 2', completed: false }
  ]);
  
  // Kolom input untuk kegiatan baru
  const newActivity = ref('');
  
  // Fungsi untuk menambahkan kegiatan baru
  function addActivity() {
    if (newActivity.value.trim() !== '') {
      activities.value.push({ id: Date.now(), name: newActivity.value, completed: false });
      newActivity.value = '';
    }
  }
  
  // Fungsi untuk membatalkan kegiatan
  function cancelActivity(id) {
    const index = activities.value.findIndex(activity => activity.id === id);
    if (index !== -1) {
      activities.value.splice(index, 1);
    }
  }
  </script>
  
  <style scoped>
/* CSS untuk pembungkus utama */
.background {
  background-image: url(image/bgr.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  min-height: 100vh;

  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Styling untuk heading */
h1, h2 {
  margin: 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

/* Tabel dengan tema modern masa depan */
table {
  width: 80%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.6);
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: rgba(0, 0, 0, 0.8);
  color: #00d1ff;
  text-transform: uppercase;
}

td {
  color: #ffffff;
}

tr:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.completed {
  background-color: rgba(0, 128, 0, 0.3);
}

/* Styling untuk form */
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

input[type="text"] {
  padding: 10px;
  width: 300px;
  border: 1px solid #00d1ff;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #00d1ff;
  color: #000000;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #00a0cc;
}

button:active {
  background-color: #007a99;
}

/* Menambahkan coretan untuk kegiatan yang sudah selesai */
.completed span {
  text-decoration: line-through;
}
</style>
  