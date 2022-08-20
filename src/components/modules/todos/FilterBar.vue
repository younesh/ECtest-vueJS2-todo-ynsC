<template>
  <b-form class="filter-bar row">
    <div class="col-md-auto">
      <h3>Filter</h3>
    </div>
    <b-form-group for="inputTitle" class="col-md-4">
      <b-form-input
        id="inputTitle"
        type="text"
        placeholder="keyword in title"
        v-model="filter.keyword"
      />
    </b-form-group>
    <b-form-radio-group class="col-md-6" v-model="filter.statusTodo">
      <b-form-radio v-model="filter.statusTodo" name="some-radios" value="done"
        >todos done</b-form-radio
      >
      <b-form-radio name="some-radios B" value="undone"
        >todos undone</b-form-radio
      >
      <b-form-radio name="some-radios B" value="both">Both</b-form-radio>
    </b-form-radio-group>
  </b-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      filter: {
        keyword: "",
        statusTodo: "both",
      },
    };
  },
  methods: {
    ...mapActions("todos", ["setFilter"]),
  },
  watch: {
    filter: {
      handler(val) {
        this.setFilter(val);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.filter-bar {
  background-color: $color-orange-light;
  border-radius: $raduis;
  align-items: center;
  padding: 10px 0px;
  margin: 10px 0px;

  .form-group {
    input[type="text"] {
      position: relative;
      top: 6px;
    }
  }
}
</style>
