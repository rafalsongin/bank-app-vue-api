<template>
  <div>
    <div v-if="customerStatus == 'UNVERIFIED'">
      <div>
        <h2>Account Verification Pending</h2>
        <p>Your account is under verification. Please wait until it gets verified by a human employee.</p>
      </div>
    </div>
    <div v-else>
      <h5>Hello, welcome back</h5>
      <h2 v-if="currentUser != null">{{ currentUser.first_name + " " + currentUser.last_name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentUser: Object,
    customerStatus: String
  },
}
</script>