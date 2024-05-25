<template>
  <div class="container my-4">
    <h2 class="mb-4">Create Transaction</h2>
    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="transaction_type" class="form-label">Transaction Type:</label>
        <select id="transaction_type" v-model="transaction.transaction_type" @change="selectTransactionType" class="form-select" required>
          <option v-for="transactionType in transactionTypes" :key="transactionType" :value="transactionType">
            {{ transactionType }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="amount" class="form-label">Amount:</label>
        <input type="number" id="amount" v-model="transaction.amount" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="from_account" class="form-label">From Account (IBAN):</label>
        <select id="from_account" v-model="transaction.from_account" class="form-select" required>
          <option v-for="account in currentCustomer.accounts" :key="account.iban" :value="account.iban">
            {{ account.iban }}
          </option>
        </select>
        <div v-if="selectedAccount" class="mt-2 text-muted">Balance: {{ selectedAccount.balance.toFixed(2) }}&#8364</div>
      </div>

      <div class="mb-3">
        <label for="to_account" class="form-label">To Account (IBAN):</label>
        <div v-if="transaction.transaction_type === 'Internal Transaction'">
          <select id="to_account" v-model="transaction.to_account" class="form-select" required>
            <option v-for="account in filteredToAccounts" :key="account.iban" :value="account.iban">
              {{ account.iban }}
            </option>
          </select>
        </div>
        <div v-else>
          <input type="text" id="to_account" v-model="transaction.to_account" class="form-control" required />
        </div>
      </div>

      <button type="submit" class="btn btn-success">Create Transaction</button>
    </form>
  </div>
</template>

<script>
import { useTransactionCreateStore } from '@/stores/transactionCreateStore';
import { mapState, mapActions } from 'pinia';
import DOMPurify from 'dompurify';

export default {
  props: {
    currentCustomer: Object
  },
  data() {
    return {
      transactionTypes: ["Internal Transaction", "External Transaction"],
    };
  },
  computed: {
    ...mapState(useTransactionCreateStore, ['transaction']),
    filteredToAccounts() {
      if (this.currentCustomer && this.currentCustomer.accounts) {
        if (this.transaction.transaction_type === this.transactionTypes[0]) {
          const selectedAccount = this.currentCustomer.accounts.find(account => account.iban === this.transaction.from_account);
          return this.currentCustomer.accounts.filter(account =>
              account.iban !== this.transaction.from_account &&
              account.iban !== selectedAccount?.to_account
          );
        } else {
          return this.currentCustomer.accounts.filter(account =>
              account.account_type === "CHECKING" &&
              account.iban !== this.transaction.from_account
          );
        }
      } else {
        return [];
      }
    },
    selectedAccount() {
      if (this.currentCustomer && this.currentCustomer.accounts) {
        return this.currentCustomer.accounts.find(account => account.iban === this.transaction.from_account);
      }
      return null;
    }
  },
  methods: {
    ...mapActions(useTransactionCreateStore, ['createTransaction', 'resetTransaction']),
    async submitForm() {
      try {
        this.sanitizeFields();

        if (!this.isTransferAmountValid(this.selectedAccount)) {
          throw new Error('Invalid transfer amount');
        }

        // Force setting the userId for transaction
        this.setInitiatorCustomer(this.transaction);

        const response = await this.createTransaction(this.transaction);
        if(!response){
          console.error('Error when creating transaction:', error.message);
          return;
        }
        else{
          alert('Transaction created successfully!');
          this.resetTransaction();
          this.refreshCustomerAccountData();
        }

      } catch (error) {
        console.error('Error during form submission:', error.message);
        alert(`Error: ${error.message}`);
      }
    },
    isTransferAmountValid(selectedAccount) {
      if (!selectedAccount) {
        alert('From Account was not selected!');
        return false;
      } else {
        if (this.transaction.amount > selectedAccount.balance || this.transaction.amount <= 0) {
          alert('The amount of funds wanting to transfer is not enough.');
          return false;
        }
        return true;
      }
    },
    selectTransactionType(event) {
      this.transaction.from_account = "";
      this.transaction.to_account = "";
      this.transaction.transaction_type = event.target.value;
    },
    setInitiatorCustomer(transaction){
      transaction.initiated_by_account = this.currentCustomer.userId;
    },
    refreshCustomerAccountData(){
      this.$emit('updateCustomerAccountData');
    },
    /* Sanitization on fe is for ux */
    sanitizeFields() {
      this.transaction.transaction_type = DOMPurify.sanitize(this.transaction.transaction_type);
      this.transaction.amount = DOMPurify.sanitize(this.transaction.amount);
      this.transaction.from_account = DOMPurify.sanitize(this.transaction.from_account);
      this.transaction.to_account = DOMPurify.sanitize(this.transaction.to_account);
      this.transaction.initiated_by_account = DOMPurify.sanitize(this.transaction.initiated_by_account);
    },
  }
};
</script>


<style scoped>
form div {
  margin-bottom: 10px;
}

label {
  display: block;
}

input, select {
  width: 25%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
