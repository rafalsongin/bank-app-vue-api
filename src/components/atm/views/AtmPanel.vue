<template>
  <div class="container h-100 mb-3 d-flex justify-content-center align-items-center">
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
        <DepositView @go-back="goBack" @update-balance="updateBalance" />
      </div>
      <div v-if="currentView === 'withdraw'">
        <WithdrawView @go-back="goBack" @update-balance="updateBalance" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import AtmLogin from '../components/AtmLogin.vue';
import TransactionMenu from '../components/TransactionMenu.vue';
import BalanceView from '../components/BalanceView.vue';
import DepositView from '../components/DepositView.vue';
import WithdrawView from '../components/WithdrawView.vue';
import { useAtmStore } from '@/stores/atmStore.js';

import Swal from 'sweetalert2';

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
    const store = useAtmStore();
    const balance = ref(0);

    const validateLogin = () => {
      currentView.value = 'menu';
    };

    const selectTransaction = async (transaction) => {
      if (transaction === 'balance') {
        try {
          balance.value = await store.getBalance();
          currentView.value = 'balance';
        } catch (error) {
          console.error('Error fetching balance:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch balance',
            showConfirmButton: true
          });
        }
      } else {
        currentView.value = transaction;
      }
    };

    const goBack = () => {
      currentView.value = 'menu';
    };

    const updateBalance = async () => {
      try {
        balance.value = await store.getBalance();
      } catch (error) {
        console.error('Error updating balance:', error);
      }
      if (currentView.value === 'balance') {
        currentView.value = 'menu';
        setTimeout(() => {
          currentView.value = 'balance';
        }, 0);
      }
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
      goBack,
      updateBalance
    };
  }
};
</script>

<style scoped>
.container {
  min-height: 80vh;
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
  color: #30323d;
}
</style>
