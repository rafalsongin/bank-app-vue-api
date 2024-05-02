<template>
  <div class="container my-5">
    <table class="table table-hover">
      <thead class="column_header">
        <tr>
          <th scope="col" class="text-primary">User ID</th>
          <th scope="col" class="text-primary">Full Name</th>
          <th scope="col" class="text-primary">Username</th>
          <th scope="col" class="text-primary">Email</th>
          <th scope="col" class="text-primary">Approval Status</th>
          <th scope="col" class="text-primary">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.userID">
          <td>{{ customer.userID }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.accountApprovalStatus }}</td>
          <td>
            <button class="btn btn-success" @click="verifyCustomer(customer.userID)">Verify</button>
            <button class="btn btn-danger" @click="declineCustomer(customer.userID)">Decline</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    customers: Array
  },
  methods: {
    // verifyCustomer(userID) {
    //   // Trigger verify action
    //   this.$emit('verify', userID);
    // },
    // declineCustomer(userID) {
    //   // Trigger decline action
    //   this.$emit('decline', userID);
    // }
  }
}
</script>
