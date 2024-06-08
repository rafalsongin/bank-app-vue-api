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
        v-model="customersStore.searchQuery"
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
        :customer="customersStore.selectedCustomer"
        @update="customersStore.fetchCustomers"
        @select-customer="showCustomerDetails"
      />
    </div>
    <div v-else>
      <customer-details
        :customer="customersStore.selectedCustomer"
        @go-back="goBackToVerified"
      />
    </div>
  </div>
</template>

<script>
import { shallowRef, computed } from "vue";
import { useCustomersStore } from "../../stores/customersStore";
import UnverifiedCustomers from "../employee_panel/customer_overview/UnverifiedCustomers.vue";
import AllCustomers from "../employee_panel/customer_overview/AllCustomers.vue";
import CustomerDetails from "../employee_panel/customer_individual/CustomerDetails.vue";
import VerifiedCustomers from "../employee_panel/customer_overview/VerifiedCustomers.vue";

export default {
  components: {
    UnverifiedCustomers,
    AllCustomers,
    CustomerDetails,
    VerifiedCustomers,
  },
  setup() {
    const customersStore = useCustomersStore();
    customersStore.fetchCustomers(); // Fetch customers on component mount

    const currentView = shallowRef(AllCustomers);
    const isCustomerDetailsView = shallowRef(false);
    const toggleButtonTextUnverified = shallowRef("Show Unverified Customers");
    const toggleButtonTextVerified = shallowRef("Show Verified Customers");

    const filteredCustomers = computed(() => {
      let filtered = customersStore.customers;
      if (customersStore.searchQuery) {
        const searchTerm = customersStore.searchQuery.toLowerCase();
        filtered = filtered.filter((customer) => {
          return Object.values(customer).some((value) =>
            String(value).toLowerCase().includes(searchTerm)
          );
        });
      }
      if (currentView.value === UnverifiedCustomers) {
        return filtered.filter(
          (customer) => customer.accountApprovalStatus === "UNVERIFIED"
        );
      }
      if (currentView.value === VerifiedCustomers) {
        return filtered.filter(
          (customer) => customer.accountApprovalStatus === "VERIFIED"
        );
      }
      return filtered; // Return all customers for AllCustomers view
    });

    const toggleViewUnverified = () => {
      if (currentView.value !== UnverifiedCustomers) {
        currentView.value = UnverifiedCustomers;
        toggleButtonTextUnverified.value = "Show All Customers";
        toggleButtonTextVerified.value = "Show Verified Customers";
      } else {
        currentView.value = AllCustomers;
        toggleButtonTextUnverified.value = "Show Unverified Customers";
        toggleButtonTextVerified.value = "Show Verified Customers";
      }
    };

    const toggleViewVerified = () => {
      if (currentView.value !== VerifiedCustomers) {
        currentView.value = VerifiedCustomers;
        toggleButtonTextVerified.value = "Show All Customers";
        toggleButtonTextUnverified.value = "Show Unverified Customers";
      } else {
        currentView.value = AllCustomers;
        toggleButtonTextVerified.value = "Show Verified Customers";
        toggleButtonTextUnverified.value = "Show Unverified Customers";
      }
    };

    const showCustomerDetails = (customer) => {
      customersStore.setSelectedCustomer(customer);
      currentView.value = CustomerDetails;
      isCustomerDetailsView.value = true;
    };

    const goBackToVerified = () => {
      currentView.value = VerifiedCustomers;
      customersStore.setSelectedCustomer(null);
      isCustomerDetailsView.value = false;
    };

    return {
      customersStore,
      currentView,
      isCustomerDetailsView,
      toggleButtonTextUnverified,
      toggleButtonTextVerified,
      filteredCustomers,
      toggleViewUnverified,
      toggleViewVerified,
      showCustomerDetails,
      goBackToVerified,
    };
  },
};
</script>

<style scoped>
.btn-toggle-view {
  background-color: #5c80bc;
  border-radius: 10px;
  color: white;
}
.btn-toggle-view:focus {
  outline: none;
  box-shadow: none;
}
.btn-toggle-view:hover {
  background-color: #6190d3;
}
</style>
