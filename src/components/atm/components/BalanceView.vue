<template>
  <div class="text-center balance-container">
    <h2 class="mb-4">Your Balance</h2>
    <p class="display-4">{{ formattedBalance }} €</p>
    <button @click="goBack" class="btn btn-secondary">Back</button>
  </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue';
import {useAtmStore} from '@/stores/AtmStore';
import Swal from 'sweetalert2';

export default {
  setup(props, {emit}) {
    const store = useAtmStore();
    const balance = ref(0);

    const fetchBalance = async () => {
      try {
        balance.value = await store.getBalance();
      } catch (error) {
        console.error('Error fetching balance:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch balance',
          showConfirmButton: true
        });
        balance.value = 0; // Ensure balance is set to a default value if an error occurs
      }
    };

    const goBack = () => {
      emit('go-back');
    };

    onMounted(() => {
      fetchBalance();
    });

    return {
      balance,
      formattedBalance: computed(() => balance.value.toFixed(2)),
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
