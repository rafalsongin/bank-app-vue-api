<template>
  <div>
    <header>
      <h2>Customer Settings</h2>
    </header>
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" :value="currentCustomer.username" disabled>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" :value="currentCustomer.email" disabled>
    </div>
    <div>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" :value="currentCustomer.firstName" disabled>
    </div>
    <div>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" :value="currentCustomer.lastName" disabled>
    </div>
    <!-- Add more fields as needed -->
  </div>
</template>

<script>
export default {
  props: {
    currentCustomer: Object
  }
};
</script>