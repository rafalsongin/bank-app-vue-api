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
              <div v-for="account in currentCustomer.accounts" :key="account.iban" class="mb-3">
                <AccountCard :account="account" @click="selectAccount(account)"></AccountCard>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedAccount" class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Transactions for {{ selectedAccount.iban }}</h5>
              <!-- Transaction filters -->
              <div class="mb-3 row">
                <div class="col-md-6">
                  <input v-model="startDate" class="form-control" placeholder="Start Date" type="date">
                </div>
                <div class="col-md-6">
                  <input v-model="endDate" class="form-control" placeholder="End Date" type="date">
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
                  <input v-model="amountValue" class="form-control" placeholder="Amount" type="number">
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-12">
                  <input v-model="fromIban" class="form-control" placeholder="From IBAN" type="text">
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-md-12">
                  <input v-model="toIban" class="form-control" placeholder="To IBAN" type="text">
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
              <!-- Transaction Display -->
              <ul v-if="transactions.length" class="list-group mb-4">
                <li v-for="transaction in transactions" :key="transaction.id" class="list-group-item">
                  <TransactionCard :selectedAccount="selectedAccount" :transaction="transaction"/>
                </li>
              </ul>
              <!-- Pagination -->
              <div class="mb-3 row justify-content-between">
                <div class="col-md-4">
                  <button :disabled="currentPage === 1" class="btn btn-primary w-100" @click="previousPage">Previous
                  </button>
                </div>
                <div class="col-md-4">
                  <button :disabled="currentPage === totalPages" class="btn btn-primary w-100" @click="nextPage">Next
                  </button>
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
import {useTransactionFetchStore} from "@/stores/transactionFetchStore.js";
import {ref} from 'vue';
import Swal from "sweetalert2";

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
      transactions: [],
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
    currentPage() {
      return useTransactionFetchStore().currentPage;
    },
    totalPages() {
      return useTransactionFetchStore().totalPages;
    },
  },
  methods: {
    selectAccount(account) {
      this.selectedAccount = account;
      this.clearFilters();
    },
    async fetchTransactions(account, filteredParams) {
      try {
        await useTransactionFetchStore().fetchTransactionsByAccountIban(account.iban, filteredParams);
        this.updateTransactions();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to fetch transactions!`,
        });
      }
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
    updateTransactions() {
      this.transactions = useTransactionFetchStore().transactions;
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
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        await this.fetchTransactions(this.selectedAccount, {
          page: this.currentPage + 1,
          ...this.getFilteredParams(),
        });
      }
    },
    async previousPage() {
      if (this.currentPage > 1) {
        await this.fetchTransactions(this.selectedAccount, {
          page: this.currentPage - 1,
          ...this.getFilteredParams(),
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
