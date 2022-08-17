<template>
  <div class="todos">
    <h2>Todo module</h2>

    <b-button variant="success" v-b-modal.modal_creation> Add todo </b-button>

    <FilterBar />
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
    return {};
  },
  components: { FormAddEditTodo, TodoCard, FilterBar },
  methods: {
    ...mapActions("todos", ["fetchTodos", "deleteTodos", "setCurrentTodo"]),
    removeTodo(todo) {
      this.$bvModal
        .msgBoxConfirm(
          `est vous sur de vouloir supprimer cette tache ? \n ID : ${todo.id} `
        )
        .then(async (value) => {
          if (value) {
            await this.deleteTodos(todo);
            await this.fetchTodos();
          }
        })
        .catch((err) => {
          // An error occurred
          throw (" error in @removeMovie ", err);
        });
    },
    validationModal() {
      console.log(" validationModal >> ");
    },
    resetModal() {
      console.log(" resetModal >> ");
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
  async created() {
    //  await this.fetchTodos();
    // console.log("@cycle/created");
  },
  async mounted() {
    await this.fetchTodos();
    console.log("@cycle/mounted of indexTodo.vue");
  },
  updated() {
    // this.dataTodos = this.todos;
  },
};
</script>

<style></style>
