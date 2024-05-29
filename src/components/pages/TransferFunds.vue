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
          <div v-if="isFromAccountValid">
            <ul class="list-group">
              <li class="list-group-item">
                <strong>Owner Name:</strong>
                {{ fromAccountDetails.customerFullName || "-" }}
              </li>
              <li class="list-group-item">
                <strong>Balance:</strong>
                {{
                  fromAccountDetails.balance != null
                    ? fromAccountDetails.balance + " €"
                    : "0.00 €"
                }}
              </li>
              <li class="list-group-item">
                <strong>Absolute Limit:</strong>
                {{
                  fromAccountDetails.absoluteTransferLimit != null
                    ? fromAccountDetails.absoluteTransferLimit + " €"
                    : "0.00 €"
                }}
              </li>
              <li class="list-group-item">
                <strong>Daily Transfer Limit:</strong>
                {{
                  fromAccountDetails.dailyTransferLimit != null
                    ? fromAccountDetails.dailyTransferLimit + " €"
                    : "0.00 €"
                }}
              </li>
              <li class="list-group-item">
                <strong>Available Daily Amount Left:</strong>
                {{
                  fromAccountDetails.availableDailyAmountForTransfer != null
                    ? fromAccountDetails.availableDailyAmountForTransfer + " €"
                    : "0.00 €"
                }}
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="text-danger">Error: From account not found.</p>
          </div>
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
        <button class="btn btn-primary mt-3 w-100" @click="transferAmount">
          Transfer Amount
        </button>
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
          <div v-if="isToAccountValid">
            <ul class="list-group">
              <li class="list-group-item">
                <strong>Owner Name:</strong>
                {{ toAccountDetails.customerFullName || "-" }}
              </li>
              <li class="list-group-item">
                <strong>Balance:</strong>
                {{
                  toAccountDetails.balance != null
                    ? toAccountDetails.balance + " €"
                    : "0.00 €"
                }}
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="text-danger">Error: To account not found.</p>
          </div>
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
      fromIban: "",
      toIban: "",
      amount: null,
      fromAccountDetails: {},
      toAccountDetails: {},
      isFromAccountValid: true,
      isToAccountValid: true,
    };
  },

  watch: {
    fromIban(newIban) {
      if (this.isValidIban(newIban)) {
        this.getCheckingAccountsByIBAN(newIban, "from");
      }
    },
    toIban(newIban) {
      if (this.isValidIban(newIban)) {
        this.getCheckingAccountsByIBAN(newIban, "to");
      }
    },
  },

  methods: {
    isValidIban(iban) {
      // Basic IBAN validation for the Netherlands
      const ibanRegex = /^NL\d{2}[A-Z]{4}\d{10}$/;
      return ibanRegex.test(iban);
    },
    getCheckingAccountsByIBAN(iban, type) {
      axios
        .get(`api/accounts/getCheckingAccount/${iban}`)
        .then((response) => {
          if (type === "from") {
            this.fromAccountDetails = response.data;
            this.isFromAccountValid = true;
          } else if (type === "to") {
            this.toAccountDetails = response.data;
            this.isToAccountValid = true;
          }
        })
        .catch((error) => {
          console.error(error);
          if (type === "from") {
            this.fromAccountDetails = {};
            this.isFromAccountValid = false;
          } else if (type === "to") {
            this.toAccountDetails = {};
            this.isToAccountValid = false;
          }
        });
    },
    transferAmount() {
      // Implement your transfer logic here
      console.log(
        `Transferring ${this.amount} from ${this.fromIban} to ${this.toIban}`
      );
    },
  },
};
</script>

<!-- 


// 4)before making a new transaction, i need to both checking accounts and the sum to be transferred
// 5) i need to check both limits daily transfer limit and account balance, and absolute limit before the transaction
// 6) i need to be able to create a new transaction

// X) use the query and mutate stuff -->

<!--
    TODO: errors for pressing the button:
    - if the amount is not a number
    - if the amount is not a positive number
    - if the amount is greater than the daily transfer limit
    - if the amount is greater than the account balance
    - if the amount is greater than the absolute limit
    - if it's the same account in both of them

    TODO: ADD CHECKS IN BACKEND
 -->

<style></style>
