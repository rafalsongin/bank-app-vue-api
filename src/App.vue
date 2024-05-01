<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from './components/commons/Navigation.vue';
import { useLoggedInStore } from '@/stores/logged_in';

export default {
  name: "App",
  components: {
    Navigation
  },
  created() {
    const store = useLoggedInStore();
    store.autoLogin();
  }
};
</script>

<style>
/* Style as needed */
</style>

