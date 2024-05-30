<template>
  <div v-if="currentCustomer != null" class="container my-4">
    <div class="mb-4">
      <h5>Hello, welcome back</h5>
      <h2>{{ currentCustomer.firstName + " " + currentCustomer.lastName }}</h2>
    </div>

    <div v-if="currentCustomer.accountApprovalStatus == 'UNVERIFIED'" class="alert alert-warning text-center">
      <h4>Account Verification Pending</h4>
      <p>Your account is under verification. Please wait until it gets verified by a human employee.</p>
    </div>
  </div>
</template>

<script>
import AccountCard from "@/components/customer_panel/PanelComponents/AccountCard.vue";

export default {
  components: {
    AccountCard
  },
  props: {
    currentCustomer: Object,
  },
  data() {
    return {};
  },
};
</script>
