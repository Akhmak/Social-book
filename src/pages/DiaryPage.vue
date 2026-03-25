<template>
  <div class="container">
    <div class="diary">
      <h1 class="diary__title">Дневник</h1>

      <section class="panel">
        <div class="panel__row">
          <input
            v-model="newTitle"
            class="input"
            type="text"
            placeholder="Новый пост ..."
            @keyup.enter="handleAdd"
          />
          <button class="btn btn--primary" :disabled="!newTitle.trim()" @click="handleAdd">
            Добавить
          </button>
        </div>
      </section>

      <section class="posts">
        <PostCard v-for="p in posts" :key="p.id" :post="p" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/posts';
import PostCard from '../components/PostCard.vue';

const store = usePostsStore();
const { posts } = storeToRefs(store);

const newTitle = ref('');

const handleAdd = () => {
  store.addPost(newTitle.value);
  newTitle.value = '';
};
</script>

