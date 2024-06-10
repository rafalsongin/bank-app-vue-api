<template>
  <div class="text-center balance-container">
    <h2 class="mb-4">Your Balance</h2>
    <p class="display-4">{{ formattedBalance }} €</p>
    <button @click="goBack" class="btn btn-secondary">Back</button>
  </div>
</template>

<script>
import {ref, computed} from 'vue';

export default {
  props: {
    balance: {
      type: Number,
      required: true
    }
  },
  setup(props, {emit}) {
    const goBack = () => {
      emit('go-back');
    };

    return {
      formattedBalance: computed(() => props.balance.toFixed(2)),
      goBack
    };
  }
};
</script>

<style scoped>
.balance-container {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #30323d;
}

p {
  margin: 20px 0;
  color: #4D5061;
}

button {
  font-size: 1.2em;
  background-color: #4D5061;
  color: #FFF;
  border: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #424556;
}
</style>
