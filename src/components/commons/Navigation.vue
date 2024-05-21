<template>
  <nav class="navbar navbar-expand-md navbar-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link" active-class="active"
            >Products</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/employeepanel"
            class="nav-link"
            active-class="active"
            >Customers</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link" active-class="active"
            >Customer registration</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/transferfunds"
            class="nav-link"
            active-class="active"
            >Transfer Funds</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/alltransactions"
            class="nav-link"
            active-class="active"
            >All Transactions</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style scoped>
.navbar {
  background-color: #30323d;
}
</style>
