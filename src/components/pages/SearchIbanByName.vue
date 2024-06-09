<template>
  <div class="customer-search">
    <header class="mb-4 text-center">
      <h2>Customer Search</h2>
    </header>
    <div class="container my-4 p-4 border rounded shadow-sm bg-white">
      <div class="form-group">
        <label for="firstName" class="form-label">First Name</label>
        <input
          id="firstName"
          v-model="firstName"
          class="form-control"
          placeholder="Enter First Name"
          type="text"
        />
      </div>
      <div class="form-group mt-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          id="lastName"
          v-model="lastName"
          class="form-control"
          placeholder="Enter Last Name"
          type="text"
        />
      </div>
      <button
        class="btn btn-primary mt-4 w-100"
        type="submit"
        @click="searchUser"
      >
        Search User
      </button>
      <div v-if="iban" class="mt-4">
        <h5 class="text-center">Customer IBAN</h5>
        <p class="bg-light p-3 border rounded text-center">{{ iban }}</p>
      </div>
      <div v-else class="mt-4">
        <h5 class="text-center">Customer IBAN</h5>
        <p class="bg-light p-3 border rounded text-center">No IBAN found</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useSearchCustomerIbanByNameStore } from "../../stores/searchCustomerIbanByNameStore.js";
import { computed, ref } from "vue";

export default {
  setup() {
    const store = useSearchCustomerIbanByNameStore();

    const firstName = ref(store.firstName);
    const lastName = ref(store.lastName);

    const iban = computed(() => store.iban);

    const searchUser = () => {
      store.firstName = firstName.value;
      store.lastName = lastName.value;
      store.searchUser();
    };

    return {
      firstName,
      lastName,
      iban,
      searchUser,
    };
  },
};
</script>

<style scoped>
.customer-search {
  max-width: 600px;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  font-weight: bold;
}

.btn {
  transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

h5 {
  margin-top: 1rem;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.container {
  background-color: #ffffff;
}
</style>
