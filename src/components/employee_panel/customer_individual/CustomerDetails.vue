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
          <div class="d-flex justify-content-between">
            <button @click="saveAccount(account)" class="btn fw-bold py-2 px-4 rounded">
              Save
            </button>
            <button @click="loadAccountTransactions(account)" class="btn btn-showTransactions fw-bold py-2 px-4 rounded ms-4">
              Load Transactions
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container_customer_details my-3">
      <h3 class="text-3xl font-semibold mb-4">Transactions</h3>
      <p class="text-sm font-semibold mb-4">
        Account:
        {{ selectedAccount ? selectedAccount.iban : "Select an account" }}
      </p>
      <div v-if="transactions.length" class="table-responsive px-4">
        <table class="transaction-table table text-white align-middle">
          <thead>
            <tr>
              <th class="bg-cell">Timestamp</th>
              <th class="bg-cell">Type</th>
              <th class="bg-cell">Amount</th>
              <th class="bg-cell">From Account</th>
              <th class="bg-cell">To Account</th>
              <th class="bg-cell">Initiated by user</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in transactions" :key="index">
              <td class="bg-cell">{{ formatDate(transaction.timestamp) }}</td>
              <td class="bg-cell">{{ transaction.transactionType }}</td>
              <td class="bg-cell" :class="getTransactionClass(transaction)">
                {{ formatTransactionAmount(transaction) }}
              </td>
              <td class="bg-cell">{{ transaction.fromAccount }}</td>
              <td class="bg-cell">{{ transaction.toAccount }}</td>
              <td class="bg-cell">
                {{ transaction.initiatorName }} ({{
                  transaction.initiatorRole
                }})
              </td>
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
    </div>
  </div>
</template>

<script>
import { useCustomersStore } from "../../../stores/customersStore";
import { computed, onMounted, ref } from "vue";

export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const customersStore = useCustomersStore();
    const selectedAccount = ref(null);
    const accounts = computed(() => customersStore.accounts);

    const transactions = computed(() => customersStore.transactions);
    const currentPage = computed(() => customersStore.currentPage);
    const totalPages = computed(() => customersStore.totalPages);

    onMounted(() => {
      customersStore.fetchAccounts(props.customer.userId);
      customersStore.transactions = [];
    });

    const saveAccount = (account) => {
      customersStore.saveAccount(account);
    };

    const closeCustomerAccount = () => {
      customersStore.closeCustomerAccount(props.customer.userId);
    };

    const loadAccountTransactions = (account) => {
      selectedAccount.value = account;
      customersStore.fetchTransactionsByIban(account.iban);
    };

    const setPage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        customersStore.fetchTransactionsByIban(
          selectedAccount.value.iban,
          page
        );
      }
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

    const isOutgoingTransaction = (transaction) => {
      return (
        selectedAccount.value &&
        transaction.fromAccount === selectedAccount.value.iban
      );
    };

    const isIncomingTransaction = (transaction) => {
      return (
        selectedAccount.value &&
        transaction.toAccount === selectedAccount.value.iban
      );
    };

    const formatTransactionAmount = (transaction) => {
      const formattedAmount = formatCurrency(transaction.amount);
      return isOutgoingTransaction(transaction)
        ? `-${formattedAmount}`
        : `+${formattedAmount}`;
    };

    const getTransactionClass = (transaction) => {
      if (isOutgoingTransaction(transaction)) {
        return "red-amount";
      } else if (isIncomingTransaction(transaction)) {
        return "green-amount";
      } else {
        return "";
      }
    };

    return {
      accounts,
      transactions,
      currentPage,
      totalPages,
      setPage,
      saveAccount,
      closeCustomerAccount,
      loadAccountTransactions,
      formatCurrency,
      formatDate,
      formatTransactionAmount,
      getTransactionClass,
      selectedAccount,
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

.btn-showTransactions{
  background-color: #829ECC;
  color: white;
}

.btn-showTransactions:hover{
  background-color: #698dc7;
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
  margin-top: 20px;
}

.transaction-table {
  border-radius: 10px;
}

.bg-cell {
  background-color: #4d5061;
  color: white;
}

.red-amount {
  color: #f79797;
}

.green-amount {
  color: #7bf2ad;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}
</style>
