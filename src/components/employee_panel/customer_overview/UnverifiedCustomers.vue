<template>
  <div class="container my-5">
    <table class="table table-hover">
      <thead class="column_header">
        <tr>
          <th scope="col" class="text-primary">User ID</th>
          <th scope="col" class="text-primary">Full Name</th>
          <th scope="col" class="text-primary">Username</th>
          <th scope="col" class="text-primary">Email</th>
          <th scope="col" class="text-primary">Approval Status</th>
          <th scope="col" class="text-primary">Actions</th>
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
            <button class="btn btn-success" @click="verifyCustomer(customer.userID)">Verify</button>
            <button class="btn btn-danger" @click="declineCustomer(customer.userID)">Decline</button>
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
