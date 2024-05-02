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
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.userID">
          <td>{{ customer.userID }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.accountApprovalStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    customers: Array
  }
}
</script>
