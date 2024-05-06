<template>
  <div id="notfound" class="d-flex justify-content-center align-items-center vh-100">
    <div class="notfound text-center">
      <div class="notfound-404">
        <h1 class="display-1">404</h1>
      </div>
      <h2 class="mb-4">Oops! This Page Could Not Be Found</h2>
      <p class="mb-4">
        Sorry but the page you are looking for does not exist,
        have been removed, name changed, or is temporarily unavailable.</p>
      <a href="/" class="btn btn-primary">Go To Homepage</a>
    </div>
  </div>
</template>

<style scoped>
#notfound {
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.notfound-404 h1 {
  font-size: 180px;
  margin: 0;
}
</style>