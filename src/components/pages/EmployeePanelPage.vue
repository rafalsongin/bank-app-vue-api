

<template>
  <div class="another-container my-5">
    <button @click="toggleView" class="btn btn-info">{{ toggleButtonText }}</button>
    <!-- Pass customers as a prop to the dynamic component -->
    <component :is="currentView" :customers="customers" @update="update"  />
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
  body {
    font-family: 'Open Sans', sans-serif;
    background-color: #4D5061;
  }

  h1, th {
    font-family: 'Roboto', sans-serif;
  }

  code, .code {
    font-family: 'Fira Code', monospace;
  }

  .text-primary {
    color: #ffffff; 
  }

  .column_header {
    background-color: #5C80BC;
    color: rgb(255, 255, 255);
  }  

  table {
    background-color: #5C80BC;
  }

  .container {
    background-color: #5C80BC;
    border-radius: 10px;
  }

  .btn-info {
    background-color: #627D98;
    border: none;
    color: white;
  }
</style>
