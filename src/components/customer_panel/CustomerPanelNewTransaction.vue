<template>
  <div class="container my-4">
    <h2 class="mb-4">Create Transaction</h2>
    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <div class="row mb-3">
        <div class="col-md-12">
          <label for="transactionType" class="form-label">Transaction Type:</label>
          <select id="transactionType" v-model="transaction.transactionType" @change="selectTransactionType" class="form-select" required>
            <option v-for="transactionType in transactionTypes" :key="transactionType" :value="transactionType">
              {{ transactionType }}
            </option>
          </select>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label for="amount" class="form-label">Amount:</label>
          <input type="number" id="amount" v-model="transaction.amount" class="form-control" required />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-12">
          <label for="fromAccount" class="form-label">From Account (IBAN):</label>
          <select id="fromAccount" v-model="transaction.fromAccount" class="form-select" required>
            <option v-for="account in filteredFromAccounts" :key="account.iban" :value="account.iban">
              {{ account.iban }}
            </option>
          </select>
          <div v-if="selectedAccount" class="mt-2 text-muted">Balance: {{ selectedAccount.balance.toFixed(2) }}&#8364</div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-12">
          <label for="toAccount" class="form-label">To Account (IBAN):</label>
          <div v-if="transaction.transactionType === 'Internal Transaction'">
            <select id="toAccount" v-model="transaction.toAccount" class="form-select" required>
              <option v-for="account in filteredToAccounts" :key="account.iban" :value="account.iban">
                {{ account.iban }}
              </option>
            </select>
          </div>
          <div v-else>
            <input type="text" id="toAccount" v-model="transaction.toAccount" class="form-control" required />
          </div>
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
import Swal from 'sweetalert2';

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
    filteredFromAccounts() {
      if (this.currentCustomer && this.currentCustomer.accounts) {
        if (this.transaction.transactionType === this.transactionTypes[1]) { // External
          return this.currentCustomer.accounts.filter(account => account.accountType === "CHECKING");
        } else {
          return this.currentCustomer.accounts;
        }
      } else {
        return [];
      }
    },
    filteredToAccounts() {
      if (this.currentCustomer && this.currentCustomer.accounts) {
        if (this.transaction.transactionType === this.transactionTypes[0]) { // Internal
          const selectedAccount = this.currentCustomer.accounts.find(account => account.iban === this.transaction.fromAccount);
          return this.currentCustomer.accounts.filter(account =>
            account.iban !== this.transaction.fromAccount &&
            account.iban !== selectedAccount?.toAccount
          );
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    selectedAccount() {
      if (this.currentCustomer && this.currentCustomer.accounts) {
        return this.currentCustomer.accounts.find(account => account.iban === this.transaction.fromAccount);
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
          throw Error("Invalid Transfer amount: " + error.message);
        }

        // Force setting the userId for transaction
        this.setInitiatorCustomer(this.transaction);

        const response = await this.createTransaction(this.transaction);
        if(!response){
          throw Error('There was an error creating the transaction. Please try again.');
        }
        else{

          Swal.fire({
            title: 'Success!',
            text: 'Transaction created successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
          });
          this.resetTransaction();
          this.refreshCustomerAccountData();
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `Error: `+ error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    },
    isTransferAmountValid(selectedAccount) {
      try{
        if (!selectedAccount) {
          throw Error('From Account was not selected!');
        } else {
          if(this.transaction.amount <= 0){
            throw Error('Transaction amount is not valid!');
          }
          if ((this.selectedAccount.balance-this.transaction.amount) < selectedAccount.absoluteTransferLimit) {
            throw Error('Absolute transfer amount reached!');
          }
          return true;
        }
      }catch(error){
        throw Error(error.message);
      }
    },
    selectTransactionType(event) {
      this.transaction.fromAccount = "";
      this.transaction.toAccount = "";
      this.transaction.transactionType = event.target.value;
    },
    setInitiatorCustomer(transaction){
      transaction.initiatedByUser = this.currentCustomer.userId;
    },
    refreshCustomerAccountData(){
      this.$emit('updateCustomerAccountData');
    },
    /* Sanitization on fe is for ux */
    sanitizeFields() {
      this.transaction.transactionType = DOMPurify.sanitize(this.transaction.transactionType);
      this.transaction.amount = DOMPurify.sanitize(this.transaction.amount);
      this.transaction.fromAccount = DOMPurify.sanitize(this.transaction.fromAccount);
      this.transaction.toAccount = DOMPurify.sanitize(this.transaction.toAccount);
      this.transaction.initiatedByUser = DOMPurify.sanitize(this.transaction.initiatedByUser);
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