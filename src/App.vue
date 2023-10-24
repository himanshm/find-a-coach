<!-- Main entry point of our application which holds all the views together -->
<template>
  <the-header></the-header>
  <!-- Render all the views here -->
  <!-- You are allowed to have multiple root level elements in your components' templates but if you plan on wrapping those components with transition then the wrapped components must only have one root element -->
  <router-view v-slot="slotProps">
    <!-- Add transition to routes -->
    <!-- mode="out-in" first animates the removal of the existing page and then the appearance of a new page. -->
    <transition name="route" mode="out-in">
      <!-- Bind the dynamic component to the component the router decided to Load -->
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
  components: {
    TheHeader
  },
  computed: {
    didAutoLogout() {
     return this.$store.getters.didAutoLogout
    }
  },

  created() {
    this.$store.dispatch('tryLogin')
  },

  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
    this.$router.replace('/coaches')
  }
}
  }
}
</script>

<style>
/* setup some global styles here */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
