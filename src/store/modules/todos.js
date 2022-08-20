import axios from "axios";
import { db } from "@/api/firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
export const isFirebaseSource = process.env.VUE_APP_MODE === "prod";
const API_TODOS = process.env.VUE_APP_LOCAL_API;
// json-server --watch src/assets/mocks/todos.json --port 5151

const todosCollectionRef = collection(db, "todos"); // from firebase !!

const state = {
  todos: [],
  currentTodo: null,
  filter: {
    statusTodo: "both",
    keyword: null, // null
  },
};

// GETTERS
const getters = {
  allTodos(state) {
    if (state.filter.keyword === null) {
      if (state.filter.statusTodo === "both") {
        return state.todos;
      } else {
        let checkCompleted = state.filter.statusTodo === "done" ? true : false;
        return state.todos.filter((todo) => todo.completed === checkCompleted);
      }
    } else {
      if (state.filter.statusTodo === "both") {
        return state.todos.filter((todo) =>
          todo.title.toLowerCase().includes(state.filter.keyword.toLowerCase())
        );
      } else {
        let checkCompleted = state.filter.statusTodo === "done" ? true : false;
        return state.todos.filter(
          (todo) =>
            todo.title
              .toLowerCase()
              .includes(state.filter.keyword.toLowerCase()) &&
            todo.completed === checkCompleted
        );
      }
    }
  },
  getCurrentTodo(state) {
    return state.currentTodo;
  },
};

// ACTIONS
const actions = {
  async fetchTodos({ commit }) {
    try {
      let AllTodos = [];
      if (isFirebaseSource) {
        const AllTodosTmp = await getDocs(todosCollectionRef);
        AllTodosTmp.docs.map((doc) => {
          // car ds firebase les id sont ds un  niveau superieur que data , en va reecrire la liste envotée au state du store :
          AllTodos = [...AllTodos, { ...doc.data(), id: doc.id }];
        });
        commit("setTodos", AllTodos);
      } else {
        AllTodos = await axios.get(API_TODOS);
        commit("setTodos", AllTodos.data);
      }
    } catch (e) {
      console.error("error fetch FETCH_MOVIES");
      console.error(e);
      throw e;
    }
  },
  async addTodo(NULL, newTodo) {
    try {
      let dateCreation = new Date();
      let newTodoTmp = {
        ...newTodo,
        dateCreation: dateCreation.toISOString(),
      };
      if (isFirebaseSource) {
        //  console.log("STORE/addTodo :  newTodoTmp ", newTodoTmp);
        await addDoc(todosCollectionRef, newTodoTmp);
      } else {
        await axios.post(API_TODOS, newTodoTmp);
      }
    } catch (e) {
      console.error("action/addTodo");
      console.error(e);
      throw e;
    }
  },
  async deleteTodos(NULL, todo) {
    try {
      if (isFirebaseSource) {
        const todoDoc = doc(db, "todos", todo.id);
        await deleteDoc(todoDoc);
      } else {
        await axios.delete(API_TODOS + "/" + todo.id);
      }
    } catch (e) {
      console.error("error @store/Action/deleteTodos ");
      console.error(e);
      throw e;
    }
  },
  async updateTodo(NULL, editedTodo) {
    try {
      if (isFirebaseSource) {
        // choosing the doc to modify
        const todoDoc = doc(db, "todos", editedTodo.id);
        await updateDoc(todoDoc, editedTodo); // maj on firebase
      } else {
        await axios.put(API_TODOS + "/" + editedTodo.id, editedTodo);
      }
    } catch (e) {
      console.error("error @store/Action/updateTodo ");
      console.error(e);

      throw e;
    }
  },
  async setCurrentTodo({ commit }, currentTodo) {
    commit("setCurrentTodo", currentTodo);
  },

  async setFilter({ commit }, filter) {
    commit("setFilter", filter);
  },

  /*
  async Actions({ commit }) {
    try {
      commit("X_MUTATION", AllTodos.data);
    } catch (e) {
      console.error("error XXX ");
      console.error(e);

      throw e;
    }
  }, */
};

// MUTATIONS
const mutations = {
  setTodos(state, payload) {
    state.todos = payload;
  },
  setCurrentTodo(state, payload) {
    state.currentTodo = payload;
  },
  setFilter(state, payload) {
    state.filter = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
