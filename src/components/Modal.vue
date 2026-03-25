<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="requestClose">
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal__header">
          <h3 class="modal__title">{{ title }}</h3>
          <button class="modal__close" type="button" aria-label="Close" @click="requestClose">
            ×
          </button>
        </div>

        <div class="modal__body">
          <slot />
        </div>

        <div class="modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'close']);

const requestClose = () => {
  emit('update:modelValue', false);
  emit('close');
};
</script>

