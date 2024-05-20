<template>
  <nav class="navbar navbar-expand-md navbar-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link" active-class="active">Products</router-link>
        </li>
        <li class="nav-item" v-if="userRole === 'Employee'">
          <router-link to="/employeepanel" class="nav-link" active-class="active">Customers</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto mb-2 mb-md-0">
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link" active-class="active">Customer Registration</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button @click="logout" class="btn btn-link nav-link">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import { useLoggedInStore } from '@/stores/logged_in';

export default {
  name: "Navigation",
  setup() {
    const store = useLoggedInStore();
    const router = useRouter(); // Initialize router

    const isLoggedIn = computed(() => store.isLoggedIn);
    const userRole = computed(() => store.role);

    const logout = () => {
      store.logout();
      router.push('/'); // Redirect to homepage after logout
    };

    return {
      isLoggedIn,
      userRole,
      logout
    };
  }
};
</script>

<style scoped>
.navbar {
  background-color: #30323D;
}

.navbar-nav.ms-auto {
  margin-left: auto;
}
</style>
