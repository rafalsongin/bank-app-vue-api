<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <h3 class="text-3xl font-semibold mb-4">Transactions</h3>
      </div>
      <div class="col-12">
        <div v-if="transactions.length">
          <table class="table transaction-table text-white">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Sender</th>
                <th>From Account</th>
                <th>Account Type</th>
                <th>Recipient</th>
                <th>To Account</th>
                <th>Account Type</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in transactions"
                :key="transaction.transaction_id"
              >
                <td>{{ formatDate(transaction.timestamp) }}</td>
                <td>{{ transaction.transaction_type }}</td>
                <td>{{ formatCurrency(transaction.amount) }}</td>
                <td>{{ transaction.fromAccountEntity.customerFullName }}</td>
                <td>{{ transaction.fromAccountEntity.iban }}</td>
                <td>{{ transaction.fromAccountEntity.accountType }}</td>
                <td>{{ transaction.toAccountEntity.customerFullName }}</td>
                <td>{{ transaction.toAccountEntity.iban }}</td>
                <td>{{ transaction.toAccountEntity.accountType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center">
          <p>No transactions found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios_auth";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      transactions: [],
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions() {
      axios
        .get(`api/transactions`)
        .then((response) => {
          this.transactions = response.data;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch transactions: " + error.message,
          });
        });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("en-GB", options);
    },
  },
};
</script>

<style scoped>
.transaction-table {
  background-color: #4d5061;
  border-radius: 10px;
}
</style>
