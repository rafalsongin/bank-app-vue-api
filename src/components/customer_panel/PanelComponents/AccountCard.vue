<template>
  <div class="card w-25">
    <div class="card-header">
      <h4>{{ account.accountType }}</h4>
      <span>{{ account.iban }}</span>
    </div>
    <div class="card-body d-flex flex-row">
      <div class="accountBalance">
        <p>Balance</p>
        <h4>{{ account.balance }}&#8364</h4>
      </div>
      <div class="accountLimits">
        <div>
          <p>Account Daily Limit</p>
          <span class="accountLimit">{{ account.dailyTransferLimit }}&#8364</span>
        </div>
        <div>
          <p>Account Absolute Limit</p>
          <span class="accountLimit">{{ account.absoluteTransferLimit }}&#8364</span>
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
.card {
  margin-bottom: 1em;
}
.card-header span {
  text-decoration: underline;
}
.card-header span:first-child {
  text-transform: capitalize;
  margin-right: 1em;
}
.card-body div {
  padding-right: 10px;
  padding-left: 1rem;
  margin-right: 2em;
}
.card-body > div:not(:first-child) {
  border-left: 2px solid gray;
}
.accountLimits div:first-child {
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.accountLimits p {
  margin-bottom: 8px;
}
</style>