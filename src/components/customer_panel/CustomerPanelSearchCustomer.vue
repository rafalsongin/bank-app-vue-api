<template>
  <header class="mb-4">
    <h2>Customer Settings</h2>
  </header>
  <div v-if="currentCustomer != null" class="container my-4">
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        v-model="firstName"
        class="form-control"
        placeholder="Enter First Name"
      />
    </div>
    <div class="form-group mt-3">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        v-model="lastName"
        class="form-control"
        placeholder="Enter Last Name"
      />
    </div>
    <button @click="searchUser" type="submit" class="btn btn-success mt-3">
      Search User
    </button>
    <div v-if="iban" class="mt-4">
      <h5>Customer IBAN</h5>
      <p class="bg-light p-3 border rounded">{{ iban }}</p>
    </div>
    <div v-else class="mt-4">
      <h5>Customer IBAN</h5>
      <p class="bg-light p-3 border rounded">No IBAN found</p>
    </div>
  </div>
</template>

<script>
import axios from "../../axios_auth";
import Swal from "sweetalert2";

export default {
  props: {
    currentCustomer: Object,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      iban: null,
    };
  },
  methods: {
    async searchUser() {
      try {
        const response = await axios.get(
          `/api/customers/getIbanByCustomerName/${this.firstName}/${this.lastName}`
        );
        if (response.status === 204) {
          this.iban = null;
          Swal.fire("No IBAN found", "", "info");
        } else {
          this.iban = response.data;
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.iban = null;
          Swal.fire("No IBAN found", "", "info");
        } else {
          Swal.fire(
            "Error",
            "An error occurred while searching for the IBAN",
            "error"
          );
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}

h5 {
  margin-top: 1rem;
}

.bg-light {
  background-color: #f8f9fa !important;
}
</style>
