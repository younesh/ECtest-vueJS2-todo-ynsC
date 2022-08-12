import axios from "axios";
import { db } from "@/api/firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  /* updateDoc,*/
} from "firebase/firestore";
const isFirebaseSource = true;
// const API_TODOS = "https://todos-3d6eb-default-rtdb.europe-west1.firebasedatabase.app/todos";
const API_TODOS = "http://localhost:5151/todos";
// json-server --watch src/assets/mocks/todos.json --port 5151

const todosCollectionRef = collection(db, "todos"); // from firebase !!

const state = {
  todos: [],
};

// GETTERS
const getters = {
  allTodos(state) {
    return state.todos;
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
      console.error("error @store/deleteTodos ");
      console.error(e);
      throw e;
    }
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
