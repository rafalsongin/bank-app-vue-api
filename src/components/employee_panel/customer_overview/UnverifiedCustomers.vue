<template>
  <div class="my-3">
    <table class="text-white table align-middle">
      <thead>
        <tr>
          <th scope="col">User ID</th>
          <th scope="col">Full Name</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Approval Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filteredCustomers" :key="customer.userId">
          <td>{{ customer.userId }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.accountApprovalStatus }}</td>
          <td>
            <button
              class="btn btn-verify fw-bold me-2"
              @click="approveCustomer(customer.userId)"
            >
              Verify
            </button>
            <button
              class="btn btn-decline text-white fw-bold"
              @click="declineCustomer(customer.userId)"
            >
              Decline
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useCustomersStore } from "../../../stores/customersStore";
import { computed } from "vue";

export default {
  setup() {
    const customersStore = useCustomersStore();

    const filteredCustomers = computed(
      () => customersStore.unverifiedCustomers
    );

    const approveCustomer = (userId) => {
      customersStore.approveCustomer(userId);
    };

    const declineCustomer = (userId) => {
      customersStore.declineCustomer(userId);
    };

    return {
      filteredCustomers,
      approveCustomer,
      declineCustomer,
    };
  },
};
</script>

<style scoped>
.btn-verify {
  background-color: #e8c547;
}
.btn-verify:hover {
  background-color: #f8da8a; /* Green background on hover */
}
.btn-decline {
  background-color: #5c80bc;
}
.btn-decline:hover {
  background-color: #5588e3;
}
</style>
