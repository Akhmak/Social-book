<template>
  <article class="post">
    <div class="post__titleBox">
      <p class="post__titleText">{{ post.title }}</p>
    </div>

    <div class="post__actions">
      <button class="btn btn--ghost" type="button" @click="toggleComments">
        {{ isShowComments ? 'Скрыть' : 'Показать' }} комментарии ({{ post.comments.length }})
      </button>
      <button class="btn btn--ghost" type="button" @click="openEdit">
        Изменить
      </button>
      <button class="btn btn--danger" type="button" @click="store.deletePost(post.id)">
        Удалить
      </button>
    </div>

    <section v-if="isShowComments" class="post__comments">
      <div class="comment-list">
        <div v-for="c in post.comments" :key="c.id" class="comment">
          <div class="comment__row">
            <p class="comment__text">{{ c.text }}</p>
            <BaseButton variant="danger" small type="button" @click="store.deleteComment(post.id, c.id)">
              Удалить
            </BaseButton>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel__row">
          <input
            v-model="commentText"
            class="input"
            type="text"
            placeholder="Текст комментария..."
            @keyup.enter="handleAddComment"
          />
          <button class="btn btn--primary" :disabled="!commentText.trim()" @click="handleAddComment">
            Добавить
          </button>
        </div>
      </div>
    </section>

    <Modal
      v-model="isEditOpen"
      title="Редактирование поста"
      @close="closeEdit"
    >
      <textarea v-model="editText" class="textarea"></textarea>

      <template #footer>
        <BaseButton variant="ghost" type="button" @click="closeEdit">
          Закрыть
        </BaseButton>
        <BaseButton variant="primary" type="button" :disabled="!editText.trim()" @click="saveEdit">
          Сохранить
        </BaseButton>
      </template>
    </Modal>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue';
import { usePostsStore } from '../stores/posts';
import Modal from './Modal.vue';
import BaseButton from './BaseButton.vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const store = usePostsStore();

const isShowComments = ref(false);

const isEditOpen = ref(false);
const editText = ref('');

const commentText = ref('');

const toggleComments = () => {
  isShowComments.value = !isShowComments.value;
};

const openEdit = () => {
  editText.value = String(props.post.title ?? '');
  isEditOpen.value = true;
};

const closeEdit = () => {
  isEditOpen.value = false;
  // Важно: ничего не сохраняем при закрытии.
  editText.value = '';
};

const saveEdit = () => {
  store.updatePostTitle(props.post.id, editText.value);
  isEditOpen.value = false;
  editText.value = '';
};

const handleAddComment = () => {
  store.addComment(props.post.id, commentText.value);
  commentText.value = '';
};
</script>

