<template>
  <div class="my-3">
    <table class="text-white table align-middle">
      <thead>
        <tr>
          <th scope="col">User ID</th>
          <th scope="col">Full Name</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.userId">
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
      required: true
    }
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter(customer => customer.accountApprovalStatus === 'VERIFIED');
    }
  }
}
</script>
