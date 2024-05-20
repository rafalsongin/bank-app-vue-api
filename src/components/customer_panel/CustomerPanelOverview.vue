<template>
  <div v-if="currentCustomer != null">
    <div>
      <h5>Hello, welcome back</h5>
      <h2>{{ currentCustomer.firstName + " " + currentCustomer.lastName }}</h2>
    </div>
    <div v-if="currentCustomer.accountApprovalStatus == 'UNVERIFIED'">
      <div>
        <h2>Account Verification Pending</h2>
        <p>Your account is under verification. Please wait until it gets verified by a human employee.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentCustomer: Object,
  },
}
</script>