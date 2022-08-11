import axios from "axios";

const API_DATA = "http://localhost:5151/data";

const state = {
  data: [],
};

// GETTERS
const getters = {
  allData(state) {
    return state.data;
  },
};

// ACTIONS
const actions = {
  async fetchTodos({ commit }) {
    try {
      let AllData = await axios.get(API_DATA);
      commit("setData", AllData.data);
    } catch (e) {
      console.error("error fatch data ");
      console.error(e);

      throw e;
    }
  },
  /*
    async Actions({ commit }) {
      try {
        commit("X_MUTATION", XXX.data);
      } catch (e) {
        console.error("error XXX ");
        console.error(e);
  
        throw e;
      }
    }, */
};

// MUTATIONS
const mutations = {
  setData(state, payload) {
    state.data = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
