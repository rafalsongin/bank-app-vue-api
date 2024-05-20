<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
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
              <input v-model="password" type="password" class="form-control" id="inputPassword" minlength="8" maxlength="40" required />
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
import { useRouter } from 'vue-router';
import axios from '@/axios_auth';
import Swal from 'sweetalert2';

export default {
  name: "Register",
  setup() {
    const email = ref("");
    const password = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const bsn = ref("");
    const phoneNumber = ref("");
    const router = useRouter();

    const register = async () => {
      try {
        const response = await axios.post('/auth/register', {
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value,
          bsn: bsn.value,
          phoneNumber: phoneNumber.value
        });

        console.log('Registration response:', response); // Log the full response

        // Check for successful status codes
        if (response.status === 201 || response.status === 200) {
          console.log("Registration Successful");
          Swal.fire({
            icon: 'success',
            title: 'Registration successful',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            router.push("/login");
          });
        } else {
          console.log("Unexpected status code:", response.status);
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: `Unexpected status code: ${response.status}`
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.error("Registration Failed: ", error.response.data);
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: error.response.data
          });
        } else {
          console.error("Registration Failed: ", error);
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: 'An unexpected error occurred. Please try again.'
          });
        }
      }
    };

    return {
      email,
      password,
      firstName,
      lastName,
      bsn,
      phoneNumber,
      register
    };
  }
};
</script>

<style>
/* Style as needed */
</style>
