import { defineStore } from 'pinia';
import { ref } from 'vue';

const initialPosts = [
  {
    id: 1,
    title:
      'Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.',
    comments: [
      { id: 1, text: 'Самый яркий комментарий в этом посте' },
      { id: 2, text: 'Один из бессмысленный комментарий в этом посте' },
    ],
  },
  {
    id: 2,
    title:
      'Краткосрочное вымышленное преломление может выполнять особую роль в пространстве главной роли игрока',
    comments: [{ id: 1, text: 'Очень научно и непонятно' }],
  },
];

export const usePostsStore = defineStore('posts', () => {
  const posts = ref(initialPosts);

  const addPost = (title) => {
    const trimmed = String(title ?? '').trim();
    if (!trimmed) return;

    const nextId = posts.value.reduce((m, p) => Math.max(m, p.id), 0) + 1;
    posts.value.push({ id: nextId, title: trimmed, comments: [] });
  };

  const deletePost = (postId) => {
    const id = Number(postId);
    posts.value = posts.value.filter((p) => p.id !== id);
  };

  const updatePostTitle = (postId, nextTitle) => {
    const id = Number(postId);
    const trimmed = String(nextTitle ?? '').trim();
    if (!trimmed) return;

    const post = posts.value.find((p) => p.id === id);
    if (!post) return;
    post.title = trimmed;
  };

  const addComment = (postId, text) => {
    const id = Number(postId);
    const trimmed = String(text ?? '').trim();
    if (!trimmed) return;

    const post = posts.value.find((p) => p.id === id);
    if (!post) return;

    const nextCommentId =
      post.comments.reduce((m, c) => Math.max(m, c.id), 0) + 1;
    post.comments.push({ id: nextCommentId, text: trimmed });
  };

  const deleteComment = (postId, commentId) => {
    const pId = Number(postId);
    const cId = Number(commentId);

    const post = posts.value.find((p) => p.id === pId);
    if (!post) return;
    post.comments = post.comments.filter((c) => c.id !== cId);
  };

  return {
    posts,
    addPost,
    deletePost,
    updatePostTitle,
    addComment,
    deleteComment,
  };
});

