<template>
  <div
    class="todo-card mb-3"
    :class="{ 'todo-card--done': todo.completed === true }"
  >
    <h3>{{ todo.title }}</h3>
    <b-button
      variant="primary"
      class="mr-2"
      @click="$emit('editing')"
      v-b-modal.modal_edit
    >
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
  methods: {},
  computed: {
    // ...mapGetters("todos", ["getCurrentTodo"]),
  },
};
</script>

<style lang="scss">
.todo-card {
  border-radius: $raduis;
  padding: $gutter-half;
  box-shadow: $shadow-light;
  border: $border-default;

  &--done {
    background-color: $color-gray-light;
    h3 {
      text-decoration: line-through;
    }
  }
}
</style>
