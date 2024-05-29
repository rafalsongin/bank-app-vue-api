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
              <div
                v-for="account in currentCustomer.accounts"
                :key="account.iban"
                class="mb-3"
              >
                <AccountCard
                  :account="account"
                  @click="selectAccount(account)"
                ></AccountCard>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" v-if="selectedAccount">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">
                Transactions for {{ selectedAccount.iban }}
              </h5>
              <ul class="list-group">
                <li
                  v-for="transaction in transactions"
                  :key="transaction.id"
                  class="list-group-item"
                >
                  <strong>Type:</strong> {{ transaction.transactionType }}<br />
                  <strong>Amount:</strong>
                  <span :class="amountClass(transaction)">{{
                    formatAmount(transaction)
                  }}</span
                  ><br />
                  <strong>Date:</strong>
                  {{ formatTimestamp(transaction.timestamp) }}<br />
                  <strong>From:</strong> {{ transaction.fromAccount }}<br />
                  <strong>To:</strong> {{ transaction.toAccount }}<br />
                  <strong>Initialized by:</strong>
                  {{ transaction.initiatedByUser }}
                </li>
                <li v-if="!transactions.length" class="list-group-item">
                  No transactions found.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountCard from "@/components/customer_panel/PanelComponents/AccountCard.vue";
import { useTransactionFetchStore } from "@/stores/transactionFetchStore.js";

export default {
  components: {
    AccountCard,
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
        await useTransactionFetchStore().fetchTransactionsByAccountIban(
          account.iban
        );
      } catch (error) {
        console.error(
          "Error when fetching transactions of selected account:",
          error.message
        );
      }
    },
    selectAccount(account) {
      this.selectedAccount = account;
      this.fetchTransactions(account);
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return (
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    },
    formatAmount(transaction) {
      const sign =
        transaction.fromAccount === this.selectedAccount.iban ? "-" : "+";
      const amount = Math.abs(transaction.amount).toFixed(2);
      return `${sign}${amount}`;
    },
    amountClass(transaction) {
      return transaction.fromAccount === this.selectedAccount.iban
        ? "text-danger font-weight-bold"
        : "text-success font-weight-bold";
    },
  },
};
</script>

<style scoped>
.text-danger {
  color: red;
}
.text-success {
  color: green;
}
.font-weight-bold {
  font-weight: bold;
}
</style>
