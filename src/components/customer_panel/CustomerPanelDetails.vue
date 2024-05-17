<template>
  <div>
    <h2>Customer Details</h2>
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" :value="currentUser.username" disabled>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" :value="currentUser.email" disabled>
    </div>
    <div>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" :value="currentUser.first_name" disabled>
    </div>
    <div>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" :value="currentUser.last_name" disabled>
    </div>
    <!-- Add more fields as needed -->
  </div>
</template>

<script>
export default {
  props: {
    currentUser: Object
  }
};
</script>