<template>
  <div class="my-3 table-responsive">
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
        <tr v-for="customer in paginatedCustomers" :key="customer.userId">
          <td>{{ customer.userId }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.email }}</td>
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

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { useCustomersStore } from "../../../stores/customersStore";
import { computed, ref } from "vue";

export default {
  setup() {
    const customersStore = useCustomersStore();

    const filteredCustomers = computed(
      () => customersStore.unverifiedCustomers
    );

    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    const totalPages = computed(() =>
      Math.ceil(filteredCustomers.value.length / itemsPerPage.value)
    );

    const paginatedCustomers = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredCustomers.value.slice(start, end);
    });

    const approveCustomer = (userId) => {
      customersStore.approveCustomer(userId);
    };

    const declineCustomer = (userId) => {
      customersStore.declineCustomer(userId);
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    return {
      paginatedCustomers,
      approveCustomer,
      declineCustomer,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
    };
  },
};
</script>

<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
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

tr th {
  background-color: #30323d;
  color: white;
}

tbody td:nth-child(odd) {
  background-color: rgb(249, 249, 249);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #5c80bc;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 10px;
  border-radius: 10px;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
