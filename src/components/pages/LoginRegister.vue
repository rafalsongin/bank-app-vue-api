<template>
  <section>
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-md-5 form-container">
          <form @submit.prevent="login">
            <h2>Login</h2>
            <div class="mb-3">
              <label for="username">Email</label>
              <input v-model="username" id="username" type="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="password">Password</label>
              <input v-model="password" type="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="col-md-6 form-container">
          <form @submit.prevent="register">
            <div class="h2">
              <h2>Apply the form to become a customer!</h2>
            </div>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">Email</label>
              <input v-model="email" id="inputEmail" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input v-model="regPassword" type="password" class="form-control" id="inputPassword" minlength="8" maxlength="40" required />
            </div>
            <div class="mb-3">
              <label for="inputFirstName" class="form-label">First Name</label>
              <input v-model="firstName" id="inputFirstName" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="inputLastName" class="form-label">Last Name</label>
              <input v-model="lastName" id="inputLastName" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="inputBsn" class="form-label">BSN</label>
              <input v-model="bsn" id="inputBsn" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="inputPhoneNumber" class="form-label">Phone Number</label>
              <input v-model="phoneNumber" id="inputPhoneNumber" type="text" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import Swal from 'sweetalert2';
import axios from '@/axios_auth';
import router from "@/router";

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const authStore = useAuthStore();

    const login = async () => {
      try {
        await authStore.login(username.value, password.value);
        if (authStore.isLoggedIn) {
          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            router.push('/');
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

    // Register form refs and methods
    const email = ref("");
    const regPassword = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const bsn = ref("");
    const phoneNumber = ref("");

    const register = async () => {
      try {
        const response = await axios.post('/auth/register', {
          email: email.value,
          password: regPassword.value,
          firstName: firstName.value,
          lastName: lastName.value,
          bsn: bsn.value,
          phoneNumber: phoneNumber.value
        });

        console.log('Registration response:', response);

        if (response.status === 201 || response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Registration successful',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            router.push("/login");
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: `Unexpected status code: ${response.status}`
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: error.response.data
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: 'An unexpected error occurred. Please try again.'
          });
        }
      }
    };

    return {
      // Login
      username,
      password,
      login,
      // Register
      email,
      regPassword,
      firstName,
      lastName,
      bsn,
      phoneNumber,
      register
    };
  }
};
</script>


<style scoped>
.container {
  max-width: 1200px; /* Increased max-width */
  margin: 0 auto;
  padding-top: 50px;
}

.form-container {
  margin: 0 20px; /* Added margin between the forms */
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
  color: #30323d;
}

input {
  border: 2px solid #E8C547;
}

button {
  background-color: #E8C547;
  border-color: #E8C547;
  color: #FFF;
}

button:hover {
  background-color: #30323d;
  border-color: #30323d;
  color: #FFF;
}
</style>
