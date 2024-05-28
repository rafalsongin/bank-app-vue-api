<template>
  <div class="container h-100 d-flex justify-content-center align-items-center">
    <div class="atm-panel card shadow p-4">
      <h1 class="text-center mb-4">ATM Panel</h1>
      <div v-if="currentView === 'login'">
        <AtmLogin @validate-login="validateLogin" />
      </div>
      <div v-if="currentView === 'menu'">
        <TransactionMenu @select-transaction="selectTransaction" />
      </div>
      <div v-if="currentView === 'balance'">
        <BalanceView :balance="balance" @go-back="goBack" />
      </div>
      <div v-if="currentView === 'deposit'">
        <DepositView @go-back="goBack" />
      </div>
      <div v-if="currentView === 'withdraw'">
        <WithdrawView @go-back="goBack" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import AtmLogin from '../components/AtmLogin.vue';
import TransactionMenu from '../components/TransactionMenu.vue';
import BalanceView from '../components/BalanceView.vue';
import DepositView from '../components/DepositView.vue';
import WithdrawView from '../components/WithdrawView.vue';
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'AtmPanel',
  components: {
    AtmLogin,
    TransactionMenu,
    BalanceView,
    DepositView,
    WithdrawView
  },
  setup() {
    const currentView = ref('login');
    const balance = ref(0);
    const store = useAuthStore();

    const validateLogin = () => {
      currentView.value = 'menu';
    };

    const selectTransaction = async (transaction) => {
      if (transaction === 'balance') {
        try {
          const response = await axios.get('http://localhost:8080/atm/balance', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          balance.value = response.data !== undefined ? response.data : 0;
          currentView.value = 'balance';
        } catch (error) {
          console.error('Error fetching balance:', error);
          balance.value = 0; // Ensure balance is set to a default value if an error occurs
        }
      } else if (transaction === 'deposit') {
        currentView.value = 'deposit';
      } else if (transaction === 'withdraw') {
        currentView.value = 'withdraw';
      }
    };

    const goBack = () => {
      currentView.value = 'menu';
    };

    onMounted(() => {
      store.autoLogin();
      if (store.isLoggedIn && store.role === 'ATM') {
        currentView.value = 'menu';
      }
    });

    return {
      currentView,
      balance,
      validateLogin,
      selectTransaction,
      goBack
    };
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
}

.atm-panel {
  max-width: 400px;
  width: 100%;
}

.card {
  border-radius: 10px;
}

h1 {
  font-size: 2rem;
}
</style>
