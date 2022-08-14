<template>
  <b-form class="add-todo">
    <b-form-group label="titre todo" for="inputTitle">
      <b-form-input
        id="inputTitle"
        type="text"
        v-model="todo.title"
        :class="{ 'form-control--error': !formFieldConfig['title'].isValide }"
        @input="formFieldConfig['title'].isValide = true"
      />
      <b-form-invalid-feedback
        v-html="formFieldConfig['title'].errorMessage"
        :state="formFieldConfig['title'].isValide"
      />
    </b-form-group>

    <b-form-group label="description todo" for="inputDescription">
      <b-form-input
        id="inputDescription"
        type="text"
        v-model="todo.description"
        :class="{
          'form-control--error': !formFieldConfig['description'].isValide,
        }"
        @input="formFieldConfig['description'].isValide = true"
      />
      <b-form-invalid-feedback
        v-html="formFieldConfig['description'].errorMessage"
        :state="formFieldConfig['description'].isValide"
      />
    </b-form-group>

    <b-form-group label="Date cible" for="inputDateTarget">
      <b-form-input
        id="inputDateTarget"
        type="datetime-local"
        v-model="todo.dateTarget"
        :class="{
          'form-control--error': !formFieldConfig['dateTarget'].isValide,
        }"
      />
      <b-form-invalid-feedback
        v-html="formFieldConfig['dateTarget'].errorMessage"
        :state="formFieldConfig['dateTarget'].isValide"
      />
    </b-form-group>

    <b-form-group
      label="status de la tache"
      for="inputCompleted"
      class="d-flex"
    >
      <b-form-checkbox
        id="inputCompleted"
        v-model="todo.completed"
        name="inputCompleted"
        unchecked-value="not_accepted"
      >
        tache terminé ?!
      </b-form-checkbox>
    </b-form-group>

    <b-button @click="newTodo(todo)"> ajouter todo </b-button>
  </b-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { addTodo, fetchTodos } from "@/store/modules/todos.js";
import { validationForm } from "@/core/tools/validationForm.js";
export default {
  name: "FormAddTodo",
  data() {
    return {
      todo: {
        title: "",
        description: "",
        dateTarget: "",
        dateCreation: "",
        completed: false,
      },
      formFieldConfig: {
        /**
         fieldXXX: {
          isRequired: true,
          type: "text", // format = { text | mail | number | url ....}
          isValide: true, // by defaut must be true
          errorMessage: "",
        },
         */
        title: {
          isRequired: true,
          type: "text",
          isValide: true,
          errorMessage: "",
        },
        description: {
          isRequired: true,
          type: "text",
          isValide: true,
          errorMessage: "",
        },
        dateTarget: {
          isRequired: true,
          type: "date", // format = { text | mail | number | url ....}
          isValide: true, // by defaut must be true
          errorMessage: "",
        },
        // dateTarget
      },
    };
  },
  methods: {
    ...mapActions("todos", ["fetchTodos", "addTodo"]),
    async newTodo(todo) {
      if (!validationForm(this.formFieldConfig, this.todo)) {
        return;
      }
      await this.addTodo(todo);
      console.log(todo);
      await this.fetchTodos();
      this.resetForm();
    },
    resetForm() {
      this.todo = {
        title: "",
        description: "",
        dateTarget: "",
        dateCreation: "",
        completed: false,
      };
    },
  },
  computed: {
    ...mapGetters("todos", ["allTodos"]),
  },
};
</script>

<style lang="scss"></style>
