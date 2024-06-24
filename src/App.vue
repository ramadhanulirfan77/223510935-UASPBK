<template>
  <div class="app-container">
    <h1 class="welcome-text">Selamat Datang di Website Danul</h1>
    <nav>
      <ul>
        <li @click="selectMenu('todos')" :class="{ active: selectedMenu === 'todos' }">Todos</li>
        <li @click="selectMenu('posts')" :class="{ active: selectedMenu === 'posts' }">Posts</li>
        <li @click="navigateTo('album')" :class="{ active: selectedMenu === 'album' }">Albums</li>
      </ul>
    </nav>
    <div class="content">
      <todos v-if="selectedMenu === 'todos'" @removeTodo="removeTodo" />
      <post v-if="selectedMenu === 'posts'" />
      <router-view v-if="selectedMenu === 'album'"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import todos from './components/todos.vue';
import post from './components/post.vue';

export default {
  components: {
    todos,
    post,
  },
  setup() {
    const router = useRouter();
    const selectedMenu = ref('');

    const selectMenu = (menu) => {
      selectedMenu.value = menu;
    };

    const navigateTo = (route) => {
      selectedMenu.value = route;
      router.push(`/${route}`);
    };

    const removeTodo = () => {
      // Implementasi logika removeTodo jika diperlukan
    };

    return {
      selectedMenu,
      selectMenu,
      navigateTo,
      removeTodo
    };
  }
};
</script>

<style scoped>
/* Modern CSS Styling */
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(components/image/bgr.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
  background-position: center;
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.welcome-text {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ffffff;
  text-align: center;
}

nav {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  width: 100%;
  max-width: 900px;
  border-radius: 8px;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

li {
  margin: 0 15px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

li:hover {
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
}

li.active {
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
}

.content {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
}
</style>
