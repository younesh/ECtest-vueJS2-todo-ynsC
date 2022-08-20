import { shallowMount, createLocalVue } from "@vue/test-utils";
import IndexTodos from "@/components/modules/todos/IndexTodos.vue";
import Vuex from "vuex";
import todos from "@/store/modules/todos.js";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
describe("IndexTodos.vue testing :  ", () => {
  let store;
  let wrapper;
  const localVue = createLocalVue();
  beforeEach(async () => {
    localVue.use(Vuex);
    localVue.use(BootstrapVue);
    localVue.use(BootstrapVueIcons);
    store = new Vuex.Store({
      modules: {
        todos: todos,
        namespaced: true,
      },
    });
    wrapper = await shallowMount(IndexTodos, {
      store,
      localVue,
    });
  });

  test("TEST-1 : test if jest work !! for  IndexTodos cpt ", async () => {
    expect(1).toEqual(1);
  });

  test("TEST-2 : test if we have liste todo ", async () => {
    console.log("todos.state.todos.length >> " + todos.state.todos.length);
    let domTodo = await wrapper.find(".todos");

    expect(1).toEqual(1);
  });

  afterEach(async () => {
    // cleaning
    todos.state.todos = [];
    todos.state.currentTodo = null;
    todos.state.filter = {
      statusTodo: "both",
      keyword: null,
    };
  });
});
