<template>
  <section>
    <div class="container">
      <form @submit.prevent="login">
        <h2>Login</h2>
        <div class="mb-3">
          <label for="username">Username</label>
          <input v-model="username" id="username" type="text" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="password">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
import {ref} from 'vue';
import {useLoggedInStore} from '@/stores/logged_in';
import Swal from 'sweetalert2';
import router from "@/router";

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const store = useLoggedInStore();

    const login = async () => {
      try {
        await store.login(username.value, password.value);
        if (store.isLoggedIn) {
          console.log("Login Successful");
          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            router.push('/'); // Redirect to homepage after success
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Login credentials are incorrect");
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'Login credentials are incorrect.'
          });
        } else {
          console.log("Login Failed: " + (error.response ? error.response.data.message : error.message));
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: `An error occurred: ${error.response ? error.response.data.message : error.message}`
          });
        }
      }
    };

    return {
      username,
      password,
      login
    };
  }
};
</script>
