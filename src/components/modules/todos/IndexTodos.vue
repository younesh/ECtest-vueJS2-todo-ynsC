<template>
  <div class="todos">
    <h2>Todo module</h2>

    <b-button variant="success" v-b-modal.modal_creation> Add todo </b-button>

    <hr />
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

    <b-modal id="modal_creation" title="Create a new todo " hide-footer>
      <!--

      @ok="validationModal"
      @hidden="resetModal"
      -->
      <FormAddEditTodo />
    </b-modal>
    <b-modal id="modal_edit" title="Editing a todo" hide-footer>
      <FormAddEditTodo />
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import FormAddEditTodo from "@/components/modules/todos/FormAddEditTodo.vue";
import TodoCard from "@/components/modules/todos/TodoCard.vue";
export default {
  data() {
    return {};
  },
  components: { FormAddEditTodo, TodoCard },
  methods: {
    ...mapActions("todos", ["fetchTodos", "deleteTodos"]),
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
      console.log("todo >> ", todo);
    },
  },
  /* --- computed ---- */
  computed: {
    ...mapState("todos", ["todos"]),
    ...mapGetters("todos", ["allTodos"]),
  },
  /* --- LIFE CYCLE --- */
  watch: {},
  created() {
    this.fetchTodos();
    console.log("@cycle/created");
  },
  mounted() {
    console.log("@cycle/mounted");
  },
  updated() {
    // this.dataTodos = this.todos;
  },
};
</script>

<style></style>
