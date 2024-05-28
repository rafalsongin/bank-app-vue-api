<template>
  <div class="text-center">
    <h2 class="mb-4">Withdraw</h2>
    <form @submit.prevent="withdraw">
      <div class="mb-3">
        <label for="amount">Amount</label>
        <input v-model="amount" id="amount" type="number" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="button" class="btn btn-secondary" @click="goBack">Back</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      amount: 0
    };
  },
  methods: {
    async withdraw() {
      try {
        await axios.post('http://your-api-endpoint/withdraw', {
          amount: this.amount
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Withdrawal successful');
        this.goBack();
      } catch (error) {
        console.error('Error making withdrawal:', error);
      }
    },
    goBack() {
      this.$emit('go-back');
    }
  }
}
</script>

<style scoped>
form {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

button {
  margin-top: 10px;
}
</style>
