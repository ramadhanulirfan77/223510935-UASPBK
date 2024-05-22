<template>
  <div class="todos-container">
    <h2>Todos</h2>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <span :class="{ completed: todo.completed }">{{ todo.name }}</span>
        <button @click="removeTodo(todo.id)">Hapus</button>
      </li>
    </ul>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Tambahkan Todos Baru">
      <button type="submit">Tambahkan</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const { emit } = defineEmits();

const todos = ref([
  { id: 1, name: 'AMBATRON', completed: false },
  { id: 2, name: 'RUSDI', completed: false }
]);

const newTodo = ref('');

function addTodo() {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ id: Date.now(), name: newTodo.value, completed: false });
    newTodo.value = '';
    emit('addTodo');
  }
}

function removeTodo(id) {
  const index = todos.value.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.value.splice(index, 1);
    emit('removeTodo');
  }
}
</script>

<style scoped>

.todos-container {
  margin-top: 20px;
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


.todos-container ul {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.todos-container li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  color: #ffffff;
}

.todos-container li:last-child {
  border-bottom: none;
}

.todos-container li:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.todos-container li p {
  margin: 10px 0 0;
  padding: 0;
}

.todos-container button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.todos-container button:hover {
  background-color: #c82333;
}
</style>
