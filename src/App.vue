<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from './components/commons/Navigation.vue';
import { useAuthStore } from '@/stores/authStore';

export default {
  name: "App",
  components: {
    Navigation
  },
  created() {
    const store = useAuthStore();
    store.autoLogin();
  }
};// stop
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  font-family: 'Open Sans', sans-serif;
  background-color: #E8C547; 
}
</style>

<!-- change background-color to #E8C547-->
