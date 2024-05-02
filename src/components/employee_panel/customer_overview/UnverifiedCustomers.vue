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
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customersFiltered" :key="customer.userID">
          <td>{{ customer.userID }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.username }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.accountApprovalStatus }}</td>
          <td>
            <button class="btn btn-verify fw-bold me-2" @click="verifyCustomer(customer.userID)">Verify</button>
            <button class="btn btn-decline text-white fw-bold" @click="declineCustomer(customer.userID)">Decline</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../../../axios_auth";

export default {
    data () {
        return {
            customersFiltered: []
        }
    },
  props: {
    customers: Array
    },
    computed: {
    customersFiltered() {
      return this.customers.filter(customer => customer.accountApprovalStatus === 'UNVERIFIED');
    }
  },
    methods: {
    verifyCustomer(userID) {
        axios.post(`/customers/approve/${userID}`)
          .then((result) => {
            console.log(result);
            this.$emit('update');
          })
          .catch((error) => console.log(error));
    },
      declineCustomer(userID) {
                axios.post(`/customers/decline/${userID}`)
          .then((result) => {
            console.log(result);
            this.$emit('update');
          })
          .catch((error) => console.log(error));
      
    }
  }
}
</script>

<style>
  .btn-verify{
    background-color: #E8C547;
  }
  .btn-verify:hover {
    background-color: #f8da8a; /* Green background on hover */

  }
  .btn-decline{
    background-color: #5C80BC;
  }
  .btn-decline:hover{
    background-color: #5588e3;
  }
</style>
