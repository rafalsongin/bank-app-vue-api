<template>
  <div>
    <header class="mb-4">
      <h2>Customer Settings</h2>
    </header>
    <form @submit.prevent="updateSettings">
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="username">Username:</label>
        <div class="col-sm-10">
          <input id="username" v-model="customerDetails.username" class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="email">Email:</label>
        <div class="col-sm-10">
          <input id="email" :value="currentCustomer.email" class="form-control" disabled type="email">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="firstName">First Name:</label>
        <div class="col-sm-10">
          <input id="firstName" v-model="customerDetails.firstName" class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="lastName">Last Name:</label>
        <div class="col-sm-10">
          <input id="lastName" v-model="customerDetails.lastName" class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="phoneNumber">Phone Number:</label>
        <div class="col-sm-10">
          <input id="phoneNumber" v-model="customerDetails.phoneNumber" class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="bsn">BSN:</label>
        <div class="col-sm-10">
          <input id="bsn" v-model="customerDetails.bsn" class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="accountApprovalStatus">Account Status:</label>
        <div class="col-sm-10">
          <input id="accountApprovalStatus" :value="currentCustomer.accountApprovalStatus" class="form-control"
                 disabled type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Password:</label>
        <div class="col-sm-10 d-flex align-items-center">
          <button class="btn btn-primary ms-3" type="button" @click="showPasswordChangePanel">Change Password</button>
          <span>Does not function!</span>
        </div>
      </div>
      <div class="text-center">
        <button class="btn btn-success" type="submit">Update Details</button>
      </div>
    </form>
  </div>
</template>


<script>
import {useCustomerProfileStore} from "@/stores/customerProfileStore";
import Swal from "sweetalert2";

export default {
  props: {
    currentCustomer: Object
  },
  data() {
    return {
      customerDetails: {...this.currentCustomer}
    };
  },
  methods: {
    async updateSettings() {
      try {
        const updatedCustomerDetails = {
          email: this.currentCustomer.email,
          accountApprovalStatus: this.currentCustomer.accountApprovalStatus,
          ...this.customerDetails
        };

        await useCustomerProfileStore().updateCustomerDetails(updatedCustomerDetails);

        this.$emit('customerUpdated', updatedCustomerDetails);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to update customer details!`,
        });
      }
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
