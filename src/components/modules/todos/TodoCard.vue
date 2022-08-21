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
    <b-button variant="danger" class="mr-2" @click="$emit('deleting')">
      delete
    </b-button>
    <b-button @click="changeStatusTodo(todo)" :data-completed="todo.completed">
      <span v-if="isloading">
        <b-spinner type="grow" label="Spinning" />
      </span>

      <span v-else>
        {{ todo.completed ? "Make it undone ?" : "Make it done ?" }}
      </span>
    </b-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    todo: {
      isloading: false,
      type: Object,
    },
  },
  methods: {
    ...mapActions("todos", ["setStatusTodo", "fetchTodos"]),
    async changeStatusTodo(todo) {
      console.log("test ");
      await this.setStatusTodo(todo);
      await this.fetchTodos();
    },
  },
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
