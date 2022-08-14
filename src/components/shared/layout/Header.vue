<template>
  <div class="header">
    <b-container class="header__wrapper">
      <router-link to="/"
        ><img
          alt="Vue logo"
          src="@/assets/images/logo.svg"
          class="header__logo"
      /></router-link>
      <MainMenu />
    </b-container>
  </div>
</template>

<script>
import MainMenu from "@/components/shared/layout/MainMenu.vue";
export default {
  components: {
    MainMenu,
  },
};
</script>

<style scoped lang="scss">
.header {
  background-color: $color-green-light;
  padding: $gutter-half 0px;
  box-shadow: $shadow-light;
  min-height: $header-hight;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    width: 100px;
  }
}
</style>
