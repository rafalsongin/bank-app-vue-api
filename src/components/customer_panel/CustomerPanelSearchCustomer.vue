<template>
  <div>
    <header class="mb-4">
      <h2>Customer Search</h2>
    </header>
    <div class="container my-4">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
            id="firstName"
            v-model="firstName"
            class="form-control"
            placeholder="Enter First Name"
            type="text"
        />
      </div>
      <div class="form-group mt-3">
        <label for="lastName">Last Name</label>
        <input
            id="lastName"
            v-model="lastName"
            class="form-control"
            placeholder="Enter Last Name"
            type="text"
        />
      </div>
      <button class="btn btn-success mt-3" type="submit" @click="searchUser">
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
  </div>
</template>

<script>
import {searchCustomerIbanByName} from "../../stores/searchCustomerIbanByNameStore";
import {computed, ref} from "vue";

export default {
  props: {currentCustomer: Object},
  setup() {
    const store = searchCustomerIbanByName();

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
