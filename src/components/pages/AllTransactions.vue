<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <h3 class="text-3xl font-semibold mb-4">Transactions</h3>
      </div>
      <div class="col-12">
        <div v-if="transactions && transactions.length">
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
              <tr
                v-for="transaction in transactions"
                :key="transaction.transaction_id"
              >
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
import { computed } from 'vue';

export default {
  setup() {
    const transactionsStore = useTransactionsStore();
    transactionsStore.fetchTransactions();

    const transactions = computed(() => transactionsStore.transactions);
    const currentPage = computed(() => transactionsStore.currentPage);
    const totalPages = computed(() => transactionsStore.totalPages);

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

    const setPage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        transactionsStore.setPage(page);
      }
    };

    return {
      transactions,
      currentPage,
      totalPages,
      formatCurrency,
      formatDate,
      setPage,
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
