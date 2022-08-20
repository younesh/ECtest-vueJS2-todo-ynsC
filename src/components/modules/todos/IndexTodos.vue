<template>
  <div class="todos">
    <h2>Todo module</h2>

    <b-button variant="success" v-b-modal.modal_creation> Add todo </b-button>

    <FilterBar />
    <div
      v-if="isloading"
      class="d-flex justify-content-center align-items-center mb-5"
    >
      <b-spinner type="grow" variant="primary" label="Spinning" />
    </div>
    <b-row>
      <template v-for="todo in allTodos">
        <b-col md="6" :key="todo.id">
          <TodoCard
            :todo="todo"
            @deleting="removeTodo(todo)"
            @editing="edit(todo)"
          />
        </b-col>
      </template>
    </b-row>

    <b-modal
      ref="modal_form"
      id="modal_creation"
      title="Create a new todo "
      hide-footer
    >
      <FormAddEditTodo @hideModal="closeModal" />
    </b-modal>
    <b-modal
      ref="modal_form"
      id="modal_edit"
      title="Editing a todo"
      hide-footer
    >
      <FormAddEditTodo :isEditMode="true" @hideModal="closeModal" />
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import FormAddEditTodo from "@/components/modules/todos/FormAddEditTodo.vue";
import TodoCard from "@/components/modules/todos/TodoCard.vue";
import FilterBar from "@/components/modules/todos/FilterBar.vue";
export default {
  name: "IndexTodos",
  data() {
    return {
      isloading: false,
    };
  },
  components: { FormAddEditTodo, TodoCard, FilterBar },
  methods: {
    ...mapActions("todos", ["fetchTodos", "deleteTodos", "setCurrentTodo"]),
    removeTodo(todo) {
      this.$bvModal
        .msgBoxConfirm(
          `are you sure you want to remove this task ? \n ID : ${todo.id} `
        )
        .then(async (value) => {
          if (value) {
            await this.deleteTodos(todo);
            await this.fetchTodos();
          }
        })
        .catch((err) => {
          throw (" error in  removeTodo ", err);
        });
    },
    edit(todo) {
      this.setCurrentTodo(todo);
    },
    closeModal() {
      this.$refs["modal_form"].hide();
    },
  },
  /* --- computed ---- */
  computed: {
    ...mapState("todos", ["todos"]),
    ...mapGetters("todos", ["allTodos"]),
  },
  /* --- LIFE CYCLE --- */
  watch: {},
  async mounted() {
    this.isloading = true;
    await this.fetchTodos();
    this.isloading = false;
  },
};
</script>

<style></style>
