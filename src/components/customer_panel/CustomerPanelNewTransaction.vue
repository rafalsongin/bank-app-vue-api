<template>
  <div>
    <h2>Create Transaction</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="transaction_type">Transaction Type:</label>
        <select id="transaction_type" v-model="transaction.transaction_type" @change="selectTransactionType">
          <option v-for="transactionType in transactionTypes" :key="transactionType" :value="transactionType">
            {{ transactionType }}
          </option>
        </select>
      </div>

      <div>
        <label for="amount">Amount:</label>
        <input type="number" id="amount" v-model="transaction.amount" required />
      </div>

      <div>
        <label for="from_account">From Account (IBAN):</label>
        <select id="from_account" v-model="transaction.from_account" required>
          <option v-for="account in currentCustomer.accounts" :key="account.iban" :value="account.iban">
            {{ account.iban }}
          </option>
        </select>
        <span v-if="selectedAccount"> Balance: {{ selectedAccount.balance }}</span>
      </div>

      <div>
        <label for="to_account">To Account (IBAN):</label>
        <div v-if="transaction.transaction_type === 'Internal Transaction'">
          <select id="to_account" v-model="transaction.to_account" required>
            <option v-for="account in filteredToAccounts" :key="account.iban" :value="account.iban">
              {{ account.iban }}
            </option>
          </select>
        </div>
        <div v-else>
          <input type="text" id="to_account" v-model="transaction.to_account" required />
        </div>
      </div>

      <button type="submit">Create Transaction</button>
    </form>
  </div>
</template>

<script>
import { useTransactionStore } from '@/stores/transactionStore';
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
    ...mapState(useTransactionStore, ['transaction']),
    filteredToAccounts() {
      if (this.currentCustomer && this.currentCustomer.accounts) {
        const selectedAccount = this.currentCustomer.accounts.find(account => account.iban === this.transaction.from_account);
        return this.currentCustomer.accounts.filter(account => account.iban !== this.transaction.from_account && account.iban !== selectedAccount?.to_account);
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
    ...mapActions(useTransactionStore, ['createTransaction', 'resetTransaction']),
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
      this.transaction.to_account = "";
      this.transaction.transaction_type = event.target.value;
    },
    setInitiatorCustomer(transaction){
      transaction.initiated_by_account = this.currentCustomer.userId;
    },
    refreshCustomerAccountData(){
      this.$emit('updateCustomerAccountData');
    },
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
