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
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in paginatedCustomers" :key="customer.userId">
          <td>{{ customer.userId }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.accountApprovalStatus }}</td>
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
export default {
  props: {
    customers: Array,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.customers.length / this.itemsPerPage);
    },
    paginatedCustomers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.customers.slice(start, end);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
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

.table-responsive {
  width: 100%;
  overflow-x: auto;
}
tr th {
  background-color: #30323d;
  color: white;
}

tbody td:nth-child(odd) {
  background-color: rgb(249, 249, 249);
}
</style>
