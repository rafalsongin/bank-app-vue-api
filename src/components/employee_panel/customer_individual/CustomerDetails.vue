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
import { searchCustomerIbanByName } from "../../../stores/searchCustomerIbanByNameStore";

export default {
  setup() {
    const searchCustomerIbanByName = useCustomerStore();

    return {
      firstName: searchCustomerIbanByName.firstName,
      lastName: searchCustomerIbanByName.lastName,
      iban: searchCustomerIbanByName.iban,
      searchUser: searchCustomerIbanByName.searchUser,
    };
  },
};
</script>

<style scoped>
.customer-details {
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  margin-top: 10px;
}

.account-details {
  background-color: #4d5061;
  border: 1px, solid rgb(0, 0, 0);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

label {
  display: block;
  margin-top: 10px;
}

button {
  margin-top: 10px;
  background-color: #e8c547;
  color: black;
  border: 1px solid #000000;
}

button:hover {
  background-color: #f8da8a;
}

.container_account_details {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.container_customer_details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.transaction-table {
  border-radius: 10px;
}

.bg-cell {
  background-color: #4d5061;
  color: white;
}

.red-amount {
  color: #f79797;
}

.green-amount {
  color: #7bf2ad;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}
</style>
