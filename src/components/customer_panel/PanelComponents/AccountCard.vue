<template>
  <div class="card mb-3 px-0 py-0 shadow-sm">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="mb-0">{{ account.accountType }}</h4>
      <span class="text-muted">{{ account.iban }}</span>
    </div>
    <div class="card-body d-flex justify-content-between">
      <div class="text-center px-4">
        <p class="mb-1 text-secondary">Balance</p>
        <h4 class="mb-0">{{ account.balance.toFixed(2) }}&#8364</h4>
      </div>
      <div class="border-left px-4">
        <div class="mb-3">
          <p class="mb-1 text-secondary">Daily Transfer Limit</p>
          <span class="h5">{{ account.dailyTransferLimit.toFixed(2) }}&#8364</span>
        </div>
        <div>
          <p class="mb-1 text-secondary">Absolute Limit</p>
          <span class="h5">{{ account.absoluteTransferLimit.toFixed(2) }}&#8364</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    account: Object
  }
};
</script>

<style scoped>
.card-body .border-left {
  border-left: 1px solid #e0e0e0;
}
</style>