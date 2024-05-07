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
import { ref } from 'vue';
import { useLoggedInStore } from '@/stores/logged_in';

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
          alert("Login successful");
        } else {
          console.log("Login Failed");
          alert("Login failed");
        }
      } catch (error) {
        alert("Login Failed: " + error.message);
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
