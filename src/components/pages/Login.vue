<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <form>
            <div class="mb-3">
              <label for="inputUsername" class="form-label">Username</label>
              <input v-model="username" id="inputUsername" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" id="inputPassword" />
            </div>
            <button @click="login" type="button" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useLoggedInStore } from '@/stores/logged_in';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const store = useLoggedInStore();
    const router = useRouter();

    const login = async () => {
      try {
        await store.login(username.value, password.value);
        if (store.isLoggedIn) {
          console.log("Login Success");
          router.replace("/products");
        } else {
          console.log("Login Failed");
        }
      } catch (error) {
        alert("Login Failed");
        console.error(error);
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

<style>
/* Style as needed */
</style>
