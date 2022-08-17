<template>
  <b-form class="add-todo">
    <b-form-group label="Title *" for="inputTitle">
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

    <b-form-group label="Description *" for="inputDescription">
      <b-form-textarea
        id="inputDescription"
        type="text"
        rows="6"
        v-model="todo.description"
        :class="{
          'form-control--error': !formFieldConfig['description'].isValide,
        }"
        @input="formFieldConfig['description'].isValide = true"
      ></b-form-textarea>
      <b-form-invalid-feedback
        v-html="formFieldConfig['description'].errorMessage"
        :state="formFieldConfig['description'].isValide"
      />
    </b-form-group>

    <b-form-group label="Target date *" for="inputDateTarget">
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

    <b-form-group label="task status" for="inputCompleted" class="d-flex">
      <b-form-checkbox
        id="inputCompleted"
        v-model="todo.completed"
        name="inputCompleted"
        :unchecked-value="false"
      >
        task done
      </b-form-checkbox>
    </b-form-group>
    <div class="d-flex justify-content-end">
      <b-button
        class="mr-3"
        variant="success"
        @click="newTodo(todo)"
        v-if="!isEditMode"
      >
        add todo
      </b-button>
      <b-button
        class="mr-3"
        variant="success"
        @click="editingCurrentTodo(todo)"
        :disabled="!isTodoFormChanged"
        v-else
      >
        update current todo
      </b-button>
      <b-button variant="danger" @click="$emit('hideModal')"> close </b-button>
    </div>
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
          isRequired: false,
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
  props: {
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions("todos", ["fetchTodos", "addTodo", "updateTodo"]),
    async newTodo(todo) {
      if (!validationForm(this.formFieldConfig, this.todo)) {
        return;
      }
      await this.addTodo(todo);
      console.log(todo);
      await this.fetchTodos();
      this.resetForm();
      this.$emit("hideModal");
    },
    async editingCurrentTodo(todo) {
      // todo comfirmation of editing
      if (!validationForm(this.formFieldConfig, this.todo)) {
        return;
      }
      this.$bvModal
        .msgBoxConfirm(
          `are you sure you want to modify this task? \n ID : ${todo.id} `
        )
        .then(async (value) => {
          if (value) {
            await this.updateTodo(todo);
            await this.fetchTodos();
            await this.$bvModal.msgBoxOk(`update completed successfully !!`);
            this.$emit("hideModal");
          }
        })
        .catch((err) => {
          // An error occurred
          throw (" error in @editingCurrentTodo ", err);
        });
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
    ...mapGetters("todos", ["allTodos", "getCurrentTodo"]),
    isTodoFormChanged() {
      return JSON.stringify(this.todo) !== JSON.stringify(this.getCurrentTodo);
    },
  },
  created() {
    if (this.isEditMode) {
      this.todo = { ...this.getCurrentTodo };
    }
  },
};
</script>

<style lang="scss"></style>
