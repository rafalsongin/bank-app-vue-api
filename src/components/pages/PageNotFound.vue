<template>
  <div id="notfound" class="d-flex justify-content-center align-items-start vh-100">
    <div class="notfound text-center">
      <div class="notfound-404">
        <h1 class="display-1">404</h1>
      </div>
      <h2 class="mb-4">Oops! This Page Could Not Be Found</h2>
      <p class="mb-4">
        Sorry but the page you are looking for does not exist,
        has been removed, name changed, or is temporarily unavailable.
      </p>
      <a href="/" class="btn btn-primary">Go To Homepage</a>
    </div>
  </div>
</template>

<style scoped>
#notfound {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.notfound {
  max-width: 600px;
  width: 100%;
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.notfound-404 h1 {
  font-size: 180px;
  margin: 0;
  color: #30323d;
}

h2 {
  color: #30323d;
}

p {
  color: #606060;
}

a.btn {
  background-color: #E8C547;
  border-color: #E8C547;
  color: #FFF;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s, border-color 0.3s;
}

a.btn:hover {
  background-color: #30323d;
  border-color: #30323d;
  color: #FFF;
}
</style>
