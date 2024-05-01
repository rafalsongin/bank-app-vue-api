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
        <tr v-for="user in users" :key="user.user_id">
          <td>{{ user.user_id }}</td>
          <td>{{ user.full_name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.approval_status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        // Sample user data
        { user_id: 1, full_name: 'John Doe', username: 'john.doe', email: 'john@example.com', approval_status: 'Approved' },
        // Add more users here
      ],
    };
  },
};
</script>

<style scoped>
 body {
  font-family: 'Open Sans', sans-serif;
}

h1, th {
  font-family: 'Roboto', sans-serif;
}

code, .code {
  font-family: 'Fira Code', monospace;
}

.text-primary {
  color: #30233D; 
}

 .column_header{
background-color: #CDCD1C;
}  
</style>
