<template>
  <div class="customer-details p-8 rounded-lg shadow-lg">
    <div class="container_customer_details">
      <h2 class="text-3xl font-bold mb-4">Customer Details</h2>
      <p class="text-lg mb-2">
        <strong>Full Name:</strong> {{ customer.firstName }}
        {{ customer.lastName }}
      </p>
      <p class="text-lg mb-2">
        <strong>Username:</strong> {{ customer.username }}
      </p>
      <p class="text-lg mb-2"><strong>Email:</strong> {{ customer.email }}</p>
      <p class="text-lg mb-2">
        <strong>Customer Account Status:</strong>
        {{ customer.accountApprovalStatus }}
      </p>
      <button
        @click="closeCustomerAccount"
        class="btn mb-4 fw-bold rounded shadow-md"
      >
        Close Customer Account
      </button>

      <h3 class="text-3xl font-semibold mb-4">Accounts</h3>
    </div>

    <div v-if="accounts.length">
      <div class="container_account_details">
        <div
          v-for="account in accounts"
          :key="account.iban"
          class="account-details bg-white rounded-lg shadow-md"
        >
          <p class="text-lg mb-2">
            <strong>Account Type:</strong> {{ account.accountType }}
          </p>
          <p class="text-lg mb-2">
            <strong>Account Status:</strong> {{ account.accountStatus }}
          </p>
          <p class="text-lg mb-2">
            <strong>Balance:</strong> {{ formatCurrency(account.balance) }}
          </p>
          <p class="text-lg mb-4"><strong>IBAN:</strong> {{ account.iban }}</p>
          <div class="mb-4">
            <label class="block font-semibold mb-2">
              Absolute Transfer Limit:
              <input
                type="number"
                v-model="account.absoluteTransferLimit"
                step="0.01"
                class="mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-2">
              Daily Transfer Limit:
              <input
                type="number"
                v-model="account.dailyTransferLimit"
                step="0.01"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>
          <button
            @click="saveAccount(account)"
            class="fw-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div class="container_customer_details my-3">
      <h3 class="text-3xl font-semibold mb-4">Transactions</h3>
      <div v-if="transactions.length">
        <table class="transaction-table text-white table align-middle">
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
      <div v-else>
        <p>No transactions found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../axios_auth";

export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      accounts: [],
      transactions: [],
    };
  },
  mounted() {
    this.fetchAccounts();
    this.fetchTransactions();
  },
  methods: {
    fetchAccounts() {
      axios
        .get(`api/accounts/customer/${this.customer.userId}`)
        .then((response) => {
          this.accounts = response.data;
          console.log(this.accounts);
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
        });
    },
    saveAccount(account) {
      axios
        .put(`api/accounts/changeAccount/${account.accountId}`, {
          absoluteTransferLimit: account.absoluteTransferLimit,
          dailyTransferLimit: account.dailyTransferLimit,
        })
        .then((response) => {
          console.log("Account updated successfully:", response.data);
          alert("Account limits updated successfully");
        })
        .catch((error) => {
          console.error("Error updating account:", error);
          alert("Failed to update account limits");
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
    closeCustomerAccount() {
      axios
        .put(`api/customers/closeAccount/${this.customer.userId}`)
        .then((response) => {
          this.$emit("update");
          console.log("Customer account closed successfully:", response.data);
          alert("Customer account closed successfully");
        })
        .catch((error) => {
          console.error("Error closing customer account:", error);
          alert("Failed to close customer account");
        });
    },
    fetchTransactions() {
      axios
        .get(`api/customers/transactions/${this.customer.userId}`)
        .then((response) => {
          this.transactions = response.data;
          console.log(this.transactions);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    },
  },
};
</script>

<style scoped>
.customer-details {
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  margin-top: 10px;
}

.account-details {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

label {
  display: block;
  margin-top: 10px;
}

button {
  margin-top: 10px;
  background-color: #e8c547;
  color: black;
  border: 1px solid #000000;
}

button:hover {
  background-color: #f8da8a;
}

.container_account_details {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.container_customer_details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(0, 0, 0);
  margin-top: 20px;
}

.transaction-table {
  background-color: #4d5061;
  border-radius: 10px;
}
</style>
