<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Transfer Funds Between Accounts</h1>
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="form-group">
          <label for="fromIban">From IBAN:</label>
          <input
            type="text"
            id="fromIban"
            v-model="fromIban"
            class="form-control"
            placeholder="Enter IBAN"
          />
        </div>
        <div class="mt-3">
          <h5>From Account Details</h5>
          <ul class="list-group">
            <li class="list-group-item"><strong>Owner Name:</strong> s</li>
            <li class="list-group-item"><strong>Balance:</strong> s</li>
            <li class="list-group-item"><strong>Absolute Limit:</strong> s</li>
            <li class="list-group-item">
              <strong>Daily Transfer Limit:</strong>
              234234234234
            </li>
            <li class="list-group-item">
              <strong>Available Daily Amount Left:</strong>
              s
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            v-model="amount"
            class="form-control"
            placeholder="Enter amount"
          />
        </div>
        <button class="btn btn-primary mt-3 w-100">Transfer Amount</button>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="toIban">To IBAN:</label>
          <input
            type="text"
            id="toIban"
            v-model="toIban"
            class="form-control"
            placeholder="Enter IBAN"
          />
        </div>
        <div class="mt-3">
          <h5>To Account Details</h5>
          <ul class="list-group">
            <li class="list-group-item"><strong>Owner Name:</strong> s</li>
            <li class="list-group-item"><strong>Balance:</strong> s</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios_auth";

export default {
  data() {
    return {
      checkingAccountToTransferFromID: null,
      checkingAccountToTransferToID: null,
      transferAmount: null,
    };
  },

  methods: {},
};

// 1) insert iban and when the exact number of digits is reached, --
//add either the details of customer and account balance or an error message--
// 2) i need all transactions for the selected account
// 3) when the account is selected, display the account balance
// 4)before making a new transaction, i need to both checking accounts and the sum to be transferred
// 5) i need to check both limits daily transfer limit and account balance, and absolute limit
// 6) i need to be able to create a new transaction

// X) use the query and mutate stuff
</script>

<style></style>
