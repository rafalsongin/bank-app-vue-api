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
            @blur="sanitizeIban('fromIban')"
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
            @blur="sanitizeIban('toIban')"
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
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import { useTransactionCreateStore } from "../../stores/transactionCreateStore";
import { useAuthStore } from "@/stores/authStore";

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
      currentEmployeeID: null,
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
  async mounted() {
    await this.fetchEmployeeDetails();
    console.log("Current employee:", this.currentEmployeeID);
  },
  methods: {
    isValidIban(iban) {
      // Basic IBAN validation for the Netherlands
      const ibanRegex = /^NL\d{2}[A-Z]{4}\d{10}$/;
      return ibanRegex.test(iban);
    },
    sanitizeIban(field) {
      this[field] = DOMPurify.sanitize(this[field]);
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
    async fetchEmployeeDetails() {
      try {
        const store = useAuthStore();
        const email = store.username || localStorage.getItem("username") || "";

        if (!email) {
          throw new Error("Email is not available");
        }

        const response = await axios.get(`api/employees/email/${email}`);

        if (response.status !== 200) {
          throw new Error("User was not found!");
        }

        this.currentEmployeeID = response.data.userId;
      } catch (error) {
        console.error("Error fetching employee details:", error.message);
      }
    },
    validateTransfer() {
      let newBalance = this.fromAccountDetails.balance - this.amount;

      switch (true) {
        case this.fromIban === "":
          Swal.fire({
            icon: "error",
            title: "Invalid account",
            text: "Please enter a valid account number in the From IBAN field.",
          });
          return false;
        case this.toIban === "":
          Swal.fire({
            icon: "error",
            title: "Invalid account",
            text: "Please enter a valid account number in the To IBAN field.",
          });
          return false;
        case this.amount === null || this.amount <= 0 || isNaN(this.amount):
          Swal.fire({
            icon: "error",
            title: "Invalid amount",
            text: "Please enter a valid amount.",
          });
          return false;

        case this.amount >
          this.fromAccountDetails.availableDailyAmountForTransfer:
          Swal.fire({
            icon: "error",
            title: "Invalid amount",
            text: "Amount exceeds daily transfer limit.",
          });
          return false;

        case this.amount > this.fromAccountDetails.balance:
          Swal.fire({
            icon: "error",
            title: "Invalid amount",
            text: "Amount exceeds account balance.",
          });
          return false;

        case newBalance < this.fromAccountDetails.absoluteTransferLimit:
          Swal.fire({
            icon: "error",
            title: "Invalid amount",
            text: "Amount exceeds absolute transfer limit.",
          });
          return false;

        case this.fromIban === this.toIban:
          Swal.fire({
            icon: "error",
            title: "Invalid transaction",
            text: "Cannot transfer to the same account.",
          });
          return false;

        default:
          return true;
      }
    },
    async transferAmount() {
      if (!this.validateTransfer()) {
        return;
      }

      const store = useTransactionCreateStore();

      try {
        const transactionData = {
          transactionType: "External Transaction",
          amount: this.amount,
          fromAccount: this.fromIban,
          toAccount: this.toIban,
          initiatedByUser: this.currentEmployeeID,
        };

        await store.createTransaction(transactionData);

        Swal.fire({
          icon: "success",
          title: "Transfer Successful",
          text: `Successfully transferred ${this.amount} from ${this.fromIban} to ${this.toIban}.`,
        });

        // Reset the form and store
        this.amount = null;
        this.fromIban = "";
        this.toIban = "";
        store.resetTransaction();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Transfer Failed",
          text: error.message,
        });
      }
    },
  },
};
</script>

<style></style>
