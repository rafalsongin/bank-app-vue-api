<template>
  <div class="container my-4">
    <header class="mb-4">
      <h2>Customer Settings</h2>
    </header>
    <form @submit.prevent="updateSettings">
      <div class="mb-3 row">
        <label for="username" class="col-sm-2 col-form-label">Username:</label>
        <div class="col-sm-10">
          <input type="text" id="username" :value="currentCustomer.username" class="form-control" >
        </div>
      </div>
      <div class="mb-3 row">
        <label for="email" class="col-sm-2 col-form-label">Email:</label>
        <div class="col-sm-10">
          <input type="email" id="email" :value="currentCustomer.email" class="form-control" >
        </div>
      </div>
      <div class="mb-3 row">
        <label for="firstName" class="col-sm-2 col-form-label">First Name:</label>
        <div class="col-sm-10">
          <input type="text" id="firstName" :value="currentCustomer.firstName" class="form-control" >
        </div>
      </div>
      <div class="mb-3 row">
        <label for="lastName" class="col-sm-2 col-form-label">Last Name:</label>
        <div class="col-sm-10">
          <input type="text" id="lastName" :value="currentCustomer.lastName" class="form-control" >
        </div>
      </div>
      <div class="mb-3 row">
        <label for="phoneNumber" class="col-sm-2 col-form-label">Phone Number:</label>
        <div class="col-sm-10">
          <input type="text" id="phoneNumber" v-model="currentCustomer.phoneNumber" class="form-control">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="bsn" class="col-sm-2 col-form-label">BSN:</label>
        <div class="col-sm-10">
          <input type="text" id="bsn" :value="currentCustomer.bsn" class="form-control" >
        </div>
      </div>
      <div class="mb-3 row">
        <label for="accountApprovalStatus" class="col-sm-2 col-form-label">Account Status:</label>
        <div class="col-sm-10">
          <input type="text" id="accountApprovalStatus" :value="currentCustomer.accountApprovalStatus" class="form-control" disabled>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Password:</label>
        <div class="col-sm-10 d-flex align-items-center">
          <button type="button" class="btn btn-primary ms-3" @click="showPasswordChangePanel">Change Password</button>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-success">Update Details</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    currentCustomer: Object
  },
  data() {
    return {
      updateCustomerDetails: {
        username: "",
        email: "",
        firstName: "",
        lastname: "",
        phoneNumber: "",
        bsn: "",
      }
    };
  },
  methods: {
    updateSettings() {
      // Function for updating customer settings
      alert('Settings updated successfully!');
    },
    showPasswordChangePanel() {
      // Function for opening dialogpanel for password change
      alert('Open password change panel!');
    }
  }
};
</script>

<style scoped>
/* Additional custom styling can be added here if needed */
</style>
