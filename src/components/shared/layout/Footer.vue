<template>
  <div class="footer">
    <b-container class="footer_wrapper">
      <b-row>
        <b-col> </b-col>
        <b-col> data source : {{ getSourceData }}</b-col>
        <b-col> </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { isFirebaseSource } from "@/store/modules/todos.js";
export default {
  computed: {
    getSourceData() {
      return isFirebaseSource ? "firebase" : "local json mock";
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  background-color: $color-gray-dark;
  color: white;
  padding: $gutter-half $gutter-half;
  min-height: $footer-hight;
}
</style>
