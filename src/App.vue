<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/shared/layout/Header.vue";
import Footer from "./components/shared/layout/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
/* this comment must exist : for applying others scss !!!!! */
</style>
