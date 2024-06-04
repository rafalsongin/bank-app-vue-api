<template>
    <div v-if="currentCustomer != null" class="container my-4">
      Hello from Search!
    </div>
</template>

<script>
export default {
  props: {
    currentCustomer: Object
  },
  data() {

  },
  methods: {
    
  }
};
</script>

<style scoped>
/* Additional custom styling can be added here if needed */
</style>
