<template>
  <div class="container my-4">
    <header class="mb-4">
      <h2>Customer Settings</h2>
    </header>
    <form @submit.prevent="updateSettings">
      <div class="mb-3 row">
        <label for="username" class="col-sm-2 col-form-label">Username:</label>
        <div class="col-sm-10">
          <input type="text" id="username" v-model="customerDetails.username" class="form-control">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="email" class="col-sm-2 col-form-label">Email:</label>
        <div class="col-sm-10">
          <input type="email" id="email" v-model="customerDetails.email" class="form-control" disabled>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="firstName" class="col-sm-2 col-form-label">First Name:</label>
        <div class="col-sm-10">
          <input type="text" id="firstName" v-model="customerDetails.firstName" class="form-control">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="lastName" class="col-sm-2 col-form-label">Last Name:</label>
        <div class="col-sm-10">
          <input type="text" id="lastName" v-model="customerDetails.lastName" class="form-control">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="phoneNumber" class="col-sm-2 col-form-label">Phone Number:</label>
        <div class="col-sm-10">
          <input type="text" id="phoneNumber" v-model="customerDetails.phoneNumber" class="form-control">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="bsn" class="col-sm-2 col-form-label">BSN:</label>
        <div class="col-sm-10">
          <input type="text" id="bsn" v-model="customerDetails.bsn" class="form-control">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="accountApprovalStatus" class="col-sm-2 col-form-label">Account Status:</label>
        <div class="col-sm-10">
          <input type="text" id="accountApprovalStatus" v-model="customerDetails.accountApprovalStatus" class="form-control" disabled>
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
import { useCustomerStore } from '@/stores/customerProfileStore';

export default {
  props: {
    currentCustomer: Object
  },
  data() {
    return {
      customerDetails: { ...this.currentCustomer }
    };
  },
  methods: {
    async updateSettings() {
      const customerStore = useCustomerStore();
      await customerStore.updateCustomerDetails(this.customerDetails);
      this.$emit('customerUpdated', this.customerDetails); // Emit updated details
    },
    showPasswordChangePanel() {
      // Function for opening dialog panel for password change
      alert('Open password change panel!');
    }
  }
};
</script>

<style scoped>
/* Additional custom styling can be added here if needed */
</style>
