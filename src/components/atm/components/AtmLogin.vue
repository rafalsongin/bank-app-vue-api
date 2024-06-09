<template>
  <section>
    <div class="container">
      <form @submit.prevent="login">
        <h2>Login</h2>
        <div class="mb-3">
          <label for="username">Username</label>
          <input v-model="username" id="username" type="email" class="form-control" required>
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
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import Swal from 'sweetalert2';

export default {
  setup(props, { emit }) {
    const username = ref('');
    const password = ref('');
    const store = useAuthStore();

    const login = async () => {
      try {
        await store.loginAtm(username.value, password.value);
        if (store.isLoggedIn) {
          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            emit('validate-login');
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'Login credentials are incorrect.'
          });
        } else {
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

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 50px;
}

form {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #30323d;
}

label {
  color: #4D5061;
  font-weight: bold;
}

.form-control {
  border: 2px solid #E8C547;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

.form-control:focus {
  border-color: #E8C547;
  box-shadow: 0 0 5px rgba(232, 197, 71, 0.5);
}

.btn-primary {
  background-color: #E8C547;
  border: none;
  color: #30323d;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #d4ae42;
}
</style>