import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons, BCarousel } from "bootstrap-vue";

import moment from "vue-moment";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons); // doc https://icons.getbootstrap.com/icons/list/
Vue.use(moment);
Vue.component("b-carousel", BCarousel); //doc https://bootstrap-vue.org/docs/components/carousel

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
