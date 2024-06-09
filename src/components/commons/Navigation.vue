<template>
  <nav class="navbar navbar-expand-md navbar-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img
          src="/src/assets/images/icons/iconRound.png"
          alt="Logo"
          class="logo"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item" v-if="!isAtmLogin">
            <router-link to="/" class="nav-link" active-class="active"
              >Home</router-link
            >
          </li>
          <li class="nav-item" v-if="userRole === 'EMPLOYEE' && !isAtmLogin">
            <router-link
              to="/employeepanel"
              class="nav-link"
              active-class="active"
              >Customers</router-link
            >
          </li>
          <li class="nav-item" v-if="userRole === 'EMPLOYEE' && !isAtmLogin">
            <router-link
              to="/transferfunds"
              class="nav-link"
              active-class="active"
              >Transfer Funds</router-link
            >
          </li>
          <li class="nav-item" v-if="userRole === 'EMPLOYEE' && !isAtmLogin">
            <router-link
              to="/alltransactions"
              class="nav-link"
              active-class="active"
              >All Transactions</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-md-0">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link
              to="/login-register"
              class="nav-link"
              active-class="active"
              >Login / Register</router-link
            >
          </li>
          <li class="nav-item d-flex align-items-center" v-if="isLoggedIn">
            <span class="navbar-text me-3"
              >{{ userEmail }} ({{ userRole }})</span
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn && userRole === 'CUSTOMER'">
            <router-link
              :to="profileLink"
              class="nav-link"
              active-class="active"
              >Profile</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn && userRole === 'CUSTOMER'">
            <router-link
              to="/search-customer-iban"
              class="nav-link"
              active-class="active"
              >Search Customer's IBAN</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button @click="logout" class="btn btn-link nav-link">
              Logout
            </button>
          </li>
          <li class="nav-item" v-if="!isLoggedIn && !isAtmLogin">
            <router-link to="/atm" class="nav-link" active-class="active"
              >ATM</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

export default {
  name: "Navigation",
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const isLoggedIn = computed(() => store.isLoggedIn);
    const userRole = computed(() => store.role || localStorage.getItem("role"));
    const userEmail = computed(
      () => store.username || localStorage.getItem("username") || ""
    );
    const isAtmLogin = computed(() => userRole.value === "ATM");

    const logout = () => {
      store.logout();
      router.push("/"); // Redirect to homepage after logout
    };

    // Watch for changes in the store to update localStorage
    watch([userRole, userEmail], ([newUserRole, newUserEmail]) => {
      if (newUserRole) {
        localStorage.setItem("role", newUserRole);
      }
      if (newUserEmail) {
        localStorage.setItem("username", newUserEmail);
      }
    });

    return {
      isLoggedIn,
      userRole,
      userEmail,
      isAtmLogin,
      logout,
    };
  },
  computed: {
    profileLink() {
      const username = localStorage.getItem("username");
      return `/customerpanel/${username}`;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #30323d;
}

.navbar-nav.ms-auto {
  margin-left: auto;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.navbar-text {
  color: #fff;
  margin-right: 1rem; /* Adjusted margin for better spacing */
}

.navbar .nav-link,
.navbar .btn-link {
  color: #fff;
}

.navbar .nav-link.active {
  font-weight: bold;
}

.bi-person-circle {
  font-size: 2rem; /* Increased font size for better visibility */
  cursor: pointer;
}
</style>
