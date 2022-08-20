<template>
  <div>
    <div class="mainMenu">
      <a class="mainMenu__btnMobile" @click="toggleMainMenu">
        <b-icon icon="list" v-show="!isMobileMenuOpen"></b-icon>
        <b-icon icon="x-circle" v-show="isMobileMenuOpen"></b-icon>
        <!-- https://icons.getbootstrap.com/icons/x-circle/ -->
      </a>
      <div class="mainMenu__wrapper">
        <nav>
          <router-link
            v-for="(item, index) in menuData"
            :key="index"
            :to="item.path"
            >{{ item.name }}</router-link
          >
        </nav>
      </div>
    </div>

    <div class="mainMenu--mobile" :class="isMobileMenuOpen ? 'opened' : ''">
      <transition name="slideX">
        <nav @click="toggleMainMenu">
          <router-link
            v-for="(item, index) in menuData"
            :key="index"
            :to="item.path"
            >{{ item.name }}</router-link
          >
        </nav>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuOpen: false,
      menuData: [
        {
          path: "/",
          name: "Home",
        },
        {
          path: "/about",
          name: "About",
        },
      ],
    };
  },
  methods: {
    toggleMainMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      console.log("this.isMobileMenuOpen >> ", this.isMobileMenuOpen);
    },
  },
};
</script>

<style scoped lang="scss">
.mainMenu {
  position: relative;
  &__btnMobile {
    display: block;
    width: 45px;
    height: 45px;
  }

  &__wrapper {
    display: none;

    a {
      margin: 0px $gutter-half;
      font-family: $font-family-title;
      font-weight: 400;
    }
  }
  &--mobile {
    position: absolute;
    width: 100%;
    left: 0;
    top: 76px;
    overflow: hidden;
    z-index: -1;
    nav {
      left: 100%;
      position: relative;
      z-index: 100;
      background-color: $color-gray-dark;
      color: white;
      padding: $gutter-half;
      width: 100%;
      height: calc(100vh - 76px);
      transition: left 0.3s ease;
      a {
        display: block;
        font-size: 2rem;
        text-align: center;
        margin: $gutter-half 0px;
      }
    }
    &.opened {
      z-index: 100;
      nav {
        left: 0;
      }
    }
  }
}

.slideX-enter-active {
  transition: all 0.3s ease;
}
//-----  MEDIA QUERY / RESPONSIVE ----
@media #{$bp-min-sm} {
  .mainMenu {
    &__btnMobile {
      display: none;
    }

    &__wrapper {
      display: flex;
    }
  }
}
</style>
