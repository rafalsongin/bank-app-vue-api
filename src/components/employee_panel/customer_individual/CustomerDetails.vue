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
          class="account-details text-white rounded-lg shadow-md"
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
import { useCustomersStore } from "../../../stores/customersStore";
import { computed, onMounted } from "vue";

export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const customersStore = useCustomersStore();

    const accounts = computed(() => customersStore.accounts);
    const transactions = computed(() => customersStore.transactions);

    onMounted(() => {
      customersStore.fetchAccounts(props.customer.userId);
      customersStore.fetchTransactions(props.customer.userId);
    });

    const saveAccount = (account) => {
      customersStore.saveAccount(account);
    };

    const closeCustomerAccount = () => {
      customersStore.closeCustomerAccount(props.customer.userId);
    };

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

    return {
      accounts,
      transactions,
      saveAccount,
      closeCustomerAccount,
      formatCurrency,
      formatDate,
    };
  },
};
</script>

<style scoped>
.customer-details {
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  margin-top: 10px;
}

.account-details {
  background-color: #4d5061;
  border: 1px, solid rgb(0, 0, 0);
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
