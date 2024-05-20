<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <button @click="toggleView" class="btn btn-toggle-view fw-bolder me-3">{{ toggleButtonText }}</button>
      <input type="text" class="form-control me-2" placeholder="Search Customers" v-model="searchQuery">
    </div>
    <!-- Pass customers as a prop to the dynamic component -->
    <div class="the-table"> 
      <component :is="currentView" :customers="filteredCustomers" @update="update"/>
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import axios from "../../axios_auth";
import UnverifiedCustomers from "../employee_panel/customer_overview/UnverifiedCustomers.vue";
import AllCustomers from "../employee_panel/customer_overview/AllCustomers.vue";

export default {
  data() {
    return {
      currentView: markRaw(AllCustomers),
      toggleButtonText: 'Show Unverified Customers',
      customers: [],
      searchQuery: '' // Search term input by user
    };
  },
  mounted() {
    this.update();
  },
  computed: {
    filteredCustomers() {
      if (!this.searchQuery) {
        return this.customers; // return all customers if searchQuery is empty
      }
      const searchTerm = this.searchQuery.toLowerCase();
      return this.customers.filter(customer => {
        return Object.values(customer).some(value =>
          String(value).toLowerCase().includes(searchTerm)
        );
      });
    }
  },
  methods: {
    update() {
      axios.get("/api/customers")
        .then((result) => {
          console.log(result);
          this.customers = result.data;
        })
        .catch((error) => console.log(error));
    },
    toggleView() {
      if (this.currentView === AllCustomers) {
        this.currentView = markRaw(UnverifiedCustomers);
        this.toggleButtonText = 'Show All Customers';
      } else {
        this.currentView = markRaw(AllCustomers);
        this.toggleButtonText = 'Show Unverified Customers';
      }
    }
  }
};
</script>


<style scoped>
  .the-table {
    background-color: #4D5061 ;
    border-radius: 10px;
  }

  .btn-toggle-view {
    background-color: #829ECC;
    border-radius: 10px;
  }
  .btn-toggle-view:focus {
    outline: none;  /* Removes the outline */
    box-shadow: none;  /* Optional: Removes any focus shadow, if there is one */
  }
  .btn-toggle-view:hover {
    background-color: #6190d3;
  }
</style>
