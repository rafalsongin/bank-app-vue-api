

<template>
  <div class="another-container my-3">
    <div class="bg-black">
    <div class="d-flex justify-content-between align-items-center">
      <button @click="toggleView" class="btn btn-toggle-view fw-bolder me-3">{{ toggleButtonText }}</button>
      <input type="text" class="form-control me-2" placeholder="Search Customers" @input="filterCustomers">
    </div>
    <!-- Pass customers as a prop to the dynamic component -->
    <component :is="currentView" :customers="customers" @update="update"/>
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
      currentView:  markRaw(AllCustomers),
      toggleButtonText: 'Show Unverified Customers',
      customers: [],
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      axios.get("/customers")
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
  },
};
</script>

<style scoped>
  .container {
    background-color: #4D5061 ;
    border-radius: 10px;
  }

  .btn-toggle-view {
    background-color: #829ECC;
    border-radius: 10px;
    margin-left: 51px;
  }
  .btn-toggle-view:focus {
    outline: none;  /* Removes the outline */
    box-shadow: none;  /* Optional: Removes any focus shadow, if there is one */
  }
  .btn-toggle-view:hover {
    background-color: #6190d3;
  }
</style>
