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
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.userId">
          <td>{{ customer.userId }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.accountApprovalStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    customers: Array,
  },
};
</script>

<style scoped>
tr th {
  background-color: #343a40;
  color: white;
}

tbody td:nth-child(odd) {
  background-color: rgb(249, 249, 249);
}
</style>
