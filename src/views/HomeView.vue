<template>
  <main class="home page">
    <b-container>
      <IndexTodo />
    </b-container>
  </main>
</template>

<script>
import IndexTodo from "@/components/modules/todos/IndexTodos.vue";
export default {
  components: { IndexTodo },
};

// to emplement TS
//  lang="ts" : import { Component, Vue } from "vue-property-decorator";
/* 
@Component({
  components: { LandingCarousel },
})
export default class HomeView extends Vue {}*/
</script>

<style scoped lang="scss"></style>
