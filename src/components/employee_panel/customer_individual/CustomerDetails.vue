<template>
  <div class="customer-details">
    <h2>Customer Details</h2>
    <p><strong>User ID:</strong> {{ customer.userId }}</p>
    <p><strong>Full Name:</strong> {{ customer.firstName }} {{ customer.lastName }}</p>
    <p><strong>Username:</strong> {{ customer.username }}</p>
    <p><strong>Email:</strong> {{ customer.email }}</p>
    <!-- Add more customer details as needed -->
  </div>
</template>

<script>
import axios from "../../../axios_auth";

export default {
  props: {
    customer: {
      type: Object,
      required: true
    }
    },
    data() {
        return {
            accounts: [],
            transactions: []
        }
    },
    mounted() {
        this.fetchAccounts();
        // this.fetchTransactions();
    },
    methods: {
        fetchAccounts() {
            axios.get(`api/accounts/${this.customer.userId}`)
                .then(response => {
                    this.accounts = response.data;
                    console.log(this.accounts);
                })
                .catch(error => {
                    console.error('Error fetching accounts:', error);
                });
        },
        // fetchTransactions() {
        //     axios.get(`/transactions/${this.customer.userId}`)
        //         .then(response => {
        //             this.transactions = response.data;
        //         })
        //         .catch(error => {
        //             console.error('Error fetching transactions:', error);
        //         });
        // }
    }

}
</script>

<style scoped>
.customer-details {
    margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  color: white;
}
</style>
