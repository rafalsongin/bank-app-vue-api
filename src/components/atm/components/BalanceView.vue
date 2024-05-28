<template>
  <div class="text-center">
    <h2 class="mb-4">Your Balance</h2>
    <p class="display-4">{{ formattedBalance }} €</p>
    <button @click="goBack" class="btn btn-secondary">Back</button>
  </div>
</template>

<script>
export default {
  props: {
    balance: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedBalance() {
      return this.balance.toFixed(2);
    }
  },
  methods: {
    goBack() {
      this.$emit('go-back');
    }
  }
}
</script>

<style scoped>
p {
  margin: 20px 0;
}

button {
  font-size: 1.2em;
}
</style>
