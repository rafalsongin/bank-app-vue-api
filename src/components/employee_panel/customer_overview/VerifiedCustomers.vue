<template>
  <div class="my-3 table-responsive">
    <div class="informative-text">Click on a user to view their details.</div>
    <table class="table table-hover text-white align-middle">
      <thead>
        <tr>
          <th scope="col">User ID</th>
          <th scope="col">Full Name</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in customers"
          :key="customer.userId"
          @click="selectCustomer(customer)"
          class="table-row-hover"
        >
          <td>{{ customer.userId }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    customers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectCustomer(customer) {
      this.$emit("select-customer", customer);
    },
  },
};
</script>

<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.table-row-hover:hover {
  background-color: rgb(255, 255, 255);
  cursor: pointer;
}

.informative-text {
  color: white;
  font-size: 1rem;
  background-color: #7e858c;
  padding: 2px;
  text-align: center;
}

tr th {
  background-color: #343a40;
  color: white;
}

tbody td:nth-child(odd) {
  background-color: rgb(249, 249, 249);
}
</style>
