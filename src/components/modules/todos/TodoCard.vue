<template>
  <div class="todo-card mb-3">
    <h3>{{ todo.title }}</h3>
    <b-button variant="primary" class="mr-2" @click="$emit('editing')">
      edit
    </b-button>
    <b-button variant="danger" @click="$emit('deleting')"> delete </b-button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
.todo-card {
  border-radius: $raduis;
  padding: $gutter-half;
  box-shadow: $shadow-light;
  border: $border-default;
}
</style>
