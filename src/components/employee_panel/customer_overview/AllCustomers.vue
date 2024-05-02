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
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.userID">
          <td>{{ customer.userID }}</td>
          <td>{{ customer.fullName }} </td> 
          <td>{{ customer.username }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.accountApprovalStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../../../axios_auth";
// return full name of customer
export default {
  data() {
    return {
      customers: [],
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      axios.get("/customers")
        .then((result) => {
          console.log(result);
          this.customers = result.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
 body {
  font-family: 'Open Sans', sans-serif;
  background-color: #4D5061;
}

h1, th {
  font-family: 'Roboto', sans-serif;
}

code, .code {
  font-family: 'Fira Code', monospace;
}

.text-primary {
  color: #ffffff; 
}

 .column_header{
background-color: #5C80BC;
color: rgb(255, 255, 255);
}  

table{
  background-color: #5C80BC;

}
.container{
  background-color: #5C80BC;
  border-radius: 10px;
}
</style>
