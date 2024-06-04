<template>
  <div>
    <header class="mb-4">
      <h2>Accounts</h2>
    </header>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Account Details</h5>
              <div v-for="account in currentCustomer.accounts"
                :key="account.iban" class="mb-3">
                <AccountCard
                  :account="account" @click="selectAccount(account)"
                ></AccountCard>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" v-if="selectedAccount">
          <div class="card mb-4">
            <div class="card-body">
              <div class="card-title">
                <h5>Transactions for {{ selectedAccount.iban }}</h5>
                <div>
                  <!--  Maria, you can work in here,
                  when you make a button for search or something
                  you could swap over the transactions array to a filtered one -->
                  <span style="color: red;">Add filters and searches</span>
                </div>
              </div>
              <div class="list-group">
                <div v-for="transaction in transactions" 
                  :key="transaction.id" class="list-group-item">
                  <TransactionCard :transaction="transaction" :selectedAccount="selectedAccount"></TransactionCard>
                </div>
                <div v-if="!transactions.length" class="list-group-item">
                  No transactions found.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountCard from "@/components/customer_panel/PanelComponents/AccountCard.vue";
import TransactionCard from "@/components/customer_panel/PanelComponents/TransactionCard.vue";
import { useTransactionFetchStore } from "@/stores/transactionFetchStore.js";

export default {
  components: {
    AccountCard,
    TransactionCard,
  },
  props: {
    currentCustomer: Object,
  },
  data() {
    return {
      selectedAccount: null,
    };
  },
  computed: {
    transactions() {
      return useTransactionFetchStore().transactions;
    },
  },
  methods: {
    async fetchTransactions(account) {
      console.log(account);
      try {
        await useTransactionFetchStore().fetchTransactionsByAccountIban(account.iban);
      } catch (error) {
        console.error("Error when fetching transactions of selected account:", error.message);
      }
    },
    selectAccount(account) {
      this.selectedAccount = account;
      this.fetchTransactions(account);
    }
  },
};
</script>

<style scoped>

</style>
