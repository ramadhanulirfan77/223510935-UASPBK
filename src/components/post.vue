<template>
  <div class="background">
    <h1>Users</h1>
    <select v-model="selectedUser">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div v-if="isLoading">Loading posts...</div>
    <div v-else>
      <h2>Posts</h2>
      <ul>
        <li v-for="post in posts" :key="post.id" class="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const users = ref([]);
const posts = ref([]);
const selectedUser = ref(null);
const isLoading = ref(false);

const getUsers = async () => {
  const resource = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(resource);
  users.value = await response.json();
};

const getPosts = async () => {
  if (selectedUser.value !== null) {
    posts.value = [];
    isLoading.value = true;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    posts.value = await response.json();
    isLoading.value = false;
  }
};

getUsers();

watch(selectedUser, getPosts);
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

h3 {
  margin: 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

/* Styling untuk select dropdown */
select {
  padding: 10px;
  width: 300px;
  border: 1px solid #00d1ff;
  border-radius: 5px;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  cursor: pointer;
}

/* Styling untuk ul dan li */
ul {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

li {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  color: #ffffff;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

li p {
  margin: 10px 0 0;
  padding: 0;
}

/* Styling untuk loading text */
div[if="isLoading"] {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #00d1ff;
}
</style>
