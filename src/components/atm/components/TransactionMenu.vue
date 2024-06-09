<template>
  <div class="text-center transaction-menu">
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
.transaction-menu {
  margin-top: 20px;
}

button {
  font-size: 1.2em;
  width: 100%;
  max-width: 300px;
  margin: 10px auto;
  background-color: #FFF;
  color: #30323d;
  border: 2px solid #E8C547;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  font-weight: bold;
}

button:hover {
  background-color: #E8C547;
  color: #FFF;
  border-color: #E8C547;
}

button:focus {
  outline: none;
  box-shadow: none;
  border-color: #E8C547;
}
</style>
