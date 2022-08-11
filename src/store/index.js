import moduleStruct from "@/store/modules/moduleStruct";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    moduleStruct,
  },
});
