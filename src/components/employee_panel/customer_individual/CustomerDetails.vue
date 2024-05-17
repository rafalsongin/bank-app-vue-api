<template>
  <div class="customer-details">
    <h2>Customer Details</h2>
    <p><strong>User ID:</strong> {{ customer.userId }}</p>
    <p><strong>Full Name:</strong> {{ customer.firstName }} {{ customer.lastName }}</p>
    <p><strong>Username:</strong> {{ customer.username }}</p>
    <p><strong>Email:</strong> {{ customer.email }}</p>
    <!-- Add more customer details as needed -->
  </div>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.customer-details {
    margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  color: white;
}
</style>
