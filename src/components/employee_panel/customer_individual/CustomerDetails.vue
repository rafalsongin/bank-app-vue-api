<template>
  <div class="customer-details bg-gray-100 p-8 rounded-lg shadow-lg">
    <div class="container_customer_details">
      <h2 class="text-3xl font-bold mb-4 text-gray-800">Customer Details</h2>

      <p class="text-lg mb-2">
        <strong>Full Name:</strong> {{ customer.firstName }}
        {{ customer.lastName }}
      </p>
      <p class="text-lg mb-2">
        <strong>Username:</strong> {{ customer.username }}
      </p>
      <p class="text-lg mb-4"><strong>Email:</strong> {{ customer.email }}</p>
      <h3 class="text-3xl font-semibold mb-4 text-gray-700">Accounts</h3>
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
            <strong>Balance:</strong> {{ formatCurrency(account.balance) }}
          </p>
          <p class="text-lg mb-4"><strong>IBAN:</strong> {{ account.iban }}</p>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">
              Absolute Transfer Limit:
              <input
                type="number"
                v-model="account.absoluteTransferLimit"
                step="0.01"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">
              Daily Transfer Limit:
              <input
                type="number"
                v-model="account.dailyTransferLimit"
                step="0.01"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>
          <button
            @click="saveAccount(account)"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
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
  },
  methods: {
    fetchAccounts() {
      axios
        .get(`api/accounts/${this.customer.userId}`)
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
      return Number(value).toFixed(2);
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
</style>
