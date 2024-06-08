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
              <div class="mb-3 row">
                <div class="col-md-6">
                  <input type="date" v-model="startDate" class="form-control" placeholder="Start Date">
                </div>
                <div class="col-md-6">
                  <input type="date" v-model="endDate" class="form-control" placeholder="End Date">
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-6">
                  <select v-model="amountCondition" class="form-control">
                    <option value="equal">Equal</option>
                    <option value="greaterThan">Greater Than</option>
                    <option value="lessThan">Less Than</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <input type="number" v-model="amountValue" class="form-control" placeholder="Amount">
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-12">
                  <input type="text" v-model="fromIban" class="form-control" placeholder="From IBAN">
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-12">
                  <input type="text" v-model="toIban" class="form-control" placeholder="To IBAN">
                </div>
              </div>
              <div class="mb-3 row justify-content-center">
                <div class="col-md-4">
                  <button class="btn btn-primary w-100" @click="applyFilter">Apply Filter</button>
                </div>
                <div class="col-md-4">
                  <button class="btn btn-secondary w-100" @click="clearFilters">Clear Filters</button>
                </div>
              </div>
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
import { ref } from 'vue';

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
    startDate: ref(null),
    endDate: ref(null),
    amountCondition: ref('equal'),
    amountValue: ref(null),
    fromIban: ref(null),
    toIban: ref(null),
    };
  },
  computed: {
    transactions() {
      return useTransactionFetchStore().transactions;
    },
  },
  methods: {
    async fetchTransactions(account, filteredParams = null) {
      console.log(account);
      try {
        await useTransactionFetchStore().fetchTransactionsByAccountIban(account.accountId, filteredParams); // to fix issues id pushed
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

    getFilteredParams() {
      return {
        startDate: this.startDate,
        endDate: this.endDate,
        amountCondition: this.amountValue != null && this.amountValue !== '' ? this.amountCondition : null,
        amountValue: this.amountValue != null && this.amountValue !== '' ? this.amountValue : null,
        fromIban: this.fromIban && this.fromIban.trim() !== '' ? this.fromIban : null,
        toIban: this.toIban && this.toIban.trim() !== '' ? this.toIban : null,
      };
    },

    applyFilter() {
      const filteredParams = this.getFilteredParams();
      this.fetchTransactions(this.selectedAccount, filteredParams);
    },

    clearFilters() {
      this.startDate = null;
      this.endDate = null;
      this.amountCondition = 'equal';
      this.amountValue = null;
      this.fromIban = null;
      this.toIban = null;
      this.applyFilter(); 
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
