<template>
  <div class="container">
    <div
      v-if="!isCustomerDetailsView"
      class="d-flex justify-content-between align-items-center"
    >
      <button
        @click="toggleViewUnverified"
        class="btn btn-toggle-view fw-bolder me-3"
      >
        {{ toggleButtonTextUnverified }}
      </button>
      <button
        @click="toggleViewVerified"
        class="btn btn-toggle-view fw-bolder me-3"
      >
        {{ toggleButtonTextVerified }}
      </button>
      <input
        type="text"
        class="form-control me-2"
        placeholder="Search Customers"
        v-model="searchQuery"
      />
    </div>
    <div v-else class="d-flex justify-content align-items-center">
      <button
        @click="goBackToVerified"
        class="btn btn-toggle-view fw-bolder me-3"
      >
        Go Back
      </button>
    </div>
    <!-- Conditionally render the-table div or CustomerDetails -->
    <div v-if="!isCustomerDetailsView" class="the-table">
      <component
        :is="currentView"
        :customers="filteredCustomers"
        :customer="selectedCustomer"
        @update="update"
        @select-customer="showCustomerDetails"
      />
    </div>
    <div v-else>
      <customer-details
        :customer="selectedCustomer"
        @go-back="goBackToVerified"
      />
    </div>
  </div>
</template>

<script>
import { markRaw } from "vue";
import axios from "../../axios_auth";
import UnverifiedCustomers from "../employee_panel/customer_overview/UnverifiedCustomers.vue";
import AllCustomers from "../employee_panel/customer_overview/AllCustomers.vue";
import CustomerDetails from "../employee_panel/customer_individual/CustomerDetails.vue";
import VerifiedCustomers from "../employee_panel/customer_overview/VerifiedCustomers.vue";
import { useCustomersStore } from "../../stores/customersStore";
import Swal from "sweetalert2";

export default {
  components: {
    UnverifiedCustomers,
    AllCustomers,
    CustomerDetails,
    VerifiedCustomers,
  },
  data() {
    return {
      currentView: markRaw(AllCustomers),
      isCustomerDetailsView: false,
      toggleButtonTextUnverified: "Show Unverified Customers",
      toggleButtonTextVerified: "Show Verified Customers",
      customers: [],
      selectedCustomer: null,
      searchQuery: "", // Search term input by user
    };
  },
  mounted() {
    this.update();
  },
  computed: {
    filteredCustomers() {
      let filtered = this.customers;
      if (this.searchQuery) {
        const searchTerm = this.searchQuery.toLowerCase();
        filtered = filtered.filter((customer) => {
          return Object.values(customer).some((value) =>
            String(value).toLowerCase().includes(searchTerm)
          );
        });
      }
      if (this.currentView === UnverifiedCustomers) {
        return filtered.filter(
          (customer) => customer.accountApprovalStatus === "UNVERIFIED"
        );
      }
      if (this.currentView === VerifiedCustomers) {
        return filtered.filter(
          (customer) => customer.accountApprovalStatus === "VERIFIED"
        );
      }
      return filtered; // Return all customers for AllCustomers view
    },
  },
  methods: {
    update() {
      axios
        .get("/api/customers")
        .then((result) => {
          this.customers = result.data;
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch customers: " + error.message,
          })
        );
    },
    toggleViewUnverified() {
      if (this.currentView !== UnverifiedCustomers) {
        this.currentView = markRaw(UnverifiedCustomers);
        this.toggleButtonTextUnverified = "Show All Customers";
        this.toggleButtonTextVerified = "Show Verified Customers";
      } else {
        this.currentView = markRaw(AllCustomers);
        this.toggleButtonTextUnverified = "Show Unverified Customers";
        this.toggleButtonTextVerified = "Show Verified Customers";
      }
    },
    toggleViewVerified() {
      if (this.currentView !== VerifiedCustomers) {
        this.currentView = markRaw(VerifiedCustomers);
        this.toggleButtonTextVerified = "Show All Customers";
        this.toggleButtonTextUnverified = "Show Unverified Customers";
      } else {
        this.currentView = markRaw(AllCustomers);
        this.toggleButtonTextVerified = "Show Verified Customers";
        this.toggleButtonTextUnverified = "Show Unverified Customers";
      }
    },
    showCustomerDetails(customer) {
      this.selectedCustomer = customer;
      this.currentView = markRaw(CustomerDetails);
      this.isCustomerDetailsView = true;
    },
    goBackToVerified() {
      this.currentView = markRaw(VerifiedCustomers);
      this.selectedCustomer = null;
      this.isCustomerDetailsView = false;
    },
  },
};
</script>

<style scoped>
.the-table {
  background-color: #4d5061;
  border-radius: 10px;
}

.btn-toggle-view {
  background-color: #5c80bc;
  border-radius: 10px;
  color: white;
}
.btn-toggle-view:focus {
  outline: none; /* Removes the outline */
  box-shadow: none; /* Optional: Removes any focus shadow, if there is one */
}
.btn-toggle-view:hover {
  background-color: #6190d3;
}
</style>
