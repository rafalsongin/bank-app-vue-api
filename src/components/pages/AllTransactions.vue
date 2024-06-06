<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <h3 class="text-3xl font-semibold mb-4">Transactions</h3>
      </div>
      <div class="col-12">
        <div class="mb-3 row">
          <div class="col-md-3">
            <input type="date" v-model="startDate" class="form-control" placeholder="Start Date">
          </div>
          <div class="col-md-3">
            <input type="date" v-model="endDate" class="form-control" placeholder="End Date">
          </div>
          <div class="col-md-3">
            <select v-model="amountCondition" class="form-control">
              <option value="equal">Equal</option>
              <option value="greaterThan">Greater Than</option>
              <option value="lessThan">Less Than</option>
            </select>
          </div>
          <div class="col-md-3">
            <input type="number" v-model="amountValue" class="form-control" placeholder="Amount">
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-md-6">
            <input type="text" v-model="fromIban" class="form-control" placeholder="From IBAN">
          </div>
          <div class="col-md-6">
            <input type="text" v-model="toIban" class="form-control" placeholder="To IBAN">
          </div>
        </div>
        <div class="mb-3 row justify-content-center">
            <div class="col-md-2">
              <button class="btn btn-primary" @click="applyFilter">Apply Filter</button>
          </div>
          <div class="col-md-2">
            <button class="btn btn-secondary" @click="clearFilters">Clear Filters</button>
          </div>
        </div>
        <div v-if="transactions.length" class="table-responsive">
          <table class="table transaction-table text-white">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Type</th>
                <th>Amount</th>
                <th>From Account</th>
                <th>To Account</th>
                <th>Initiated by user</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in transactions" :key="index">
                <td>{{ formatDate(transaction.timestamp) }}</td>
                <td>{{ transaction.transactionType }}</td>
                <td>{{ formatCurrency(transaction.amount) }}</td>
                <td>{{ transaction.fromAccount }}</td>
                <td>{{ transaction.toAccount }}</td>
                <td>{{ transaction.initiatorName }} ({{ transaction.initiatorRole }})</td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                @click="setPage(currentPage - 1)"
              >
                <a class="page-link" href="#">Previous</a>
              </li>
              <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: currentPage === page }"
                @click="setPage(page)"
              >
                <a class="page-link" href="#">{{ page }}</a>
              </li>
              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
                @click="setPage(currentPage + 1)"
              >
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
        <div v-else class="text-center">
          <p>No transactions found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTransactionsStore } from "../../stores/allTransactionsStore";
import { ref, computed } from 'vue';

export default {
  setup() {
    const transactionsStore = useTransactionsStore();
    transactionsStore.fetchTransactions();

    const transactions = computed(() => transactionsStore.transactions);
    const currentPage = computed(() => transactionsStore.currentPage);
    const totalPages = computed(() => transactionsStore.totalPages);

    const startDate = ref(null);
    const endDate = ref(null);
    const amountCondition = ref('equal');
    const amountValue = ref(null);
    const fromIban = ref(null);
    const toIban = ref(null);

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    };

    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    const getFilteredParams = () => {
      return {
        fromIbanValue: fromIban.value && fromIban.value.trim() !== '' ? fromIban.value : null,
        toIbanValue: toIban.value && toIban.value.trim() !== '' ? toIban.value : null,
      };
    };

    const setPage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        const { fromIbanValue, toIbanValue } = getFilteredParams();
        transactionsStore.fetchTransactions(page, startDate.value, endDate.value, amountCondition.value, amountValue.value, fromIbanValue, toIbanValue);
      }
    };

    const applyFilter = () => {
      const { fromIbanValue, toIbanValue } = getFilteredParams();

      transactionsStore.fetchTransactions(1, startDate.value, endDate.value, amountCondition.value, amountValue.value, fromIbanValue, toIbanValue);
    };

    const clearFilters = () => {
      startDate.value = null;
      endDate.value = null;
      amountCondition.value = 'equal';
      amountValue.value = null;
      fromIban.value = null;
      toIban.value = null;
      applyFilter(); 
    };

    return {
      transactions,
      currentPage,
      totalPages,
      formatCurrency,
      formatDate,
      setPage,

      startDate,
      endDate,
      amountCondition,
      amountValue,
      fromIban,
      toIban,
      applyFilter,
      clearFilters,
    };
  },
};
</script>

<style scoped>
  .table-responsive {
    width: 100%;
    overflow-x: auto;
  }
</style>
