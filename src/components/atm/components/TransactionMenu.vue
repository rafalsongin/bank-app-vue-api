<template>
  <div class="text-center">
    <h2 class="mb-4">Transaction Menu</h2>
    <button @click="select('balance')" class="btn btn-outline-primary btn-block mb-2">Check Balance</button>
    <button @click="select('deposit')" class="btn btn-outline-primary btn-block mb-2">Deposit</button>
    <button @click="select('withdraw')" class="btn btn-outline-primary btn-block">Withdraw</button>
  </div>
</template>

<script>
export default {
  methods: {
    select(transaction) {
      this.$emit('select-transaction', transaction);
    }
  }
}
</script>

<style scoped>
button {
  font-size: 1.2em;
  width: 100%;
  max-width: 300px;
  margin: 10px auto;
}
</style>
