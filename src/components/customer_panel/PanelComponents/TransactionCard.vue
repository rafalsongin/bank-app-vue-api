<template>
    <strong>Type:</strong> {{ transaction.transactionType }}<br />
    <strong>Amount:</strong> <span :class="amountClass(transaction)"> {{ formatAmount(transaction) }}</span><br />
    <strong>Date:</strong> {{ formatTimestamp(transaction.timestamp) }}<br/>
    <strong>From:</strong> {{ transaction.fromAccount }}<br/>
    <strong>To:</strong> {{ transaction.toAccount }}<br/>
    <strong>Initialized by:</strong> {{ transaction.initiatedByUser }}
</template>

<script>
export default {
  props: {
    transaction: Object,
    selectedAccount: Object
  },
  methods: {
    formatAmount(transaction) {
      const sign =
        transaction.fromAccount === this.selectedAccount.iban ? "-" : "+";
      const amount = Math.abs(transaction.amount).toFixed(2);
      return `${sign}${amount}`;
    },
    amountClass(transaction) {
      return transaction.fromAccount === this.selectedAccount.iban
        ? "text-danger font-weight-bold"
        : "text-success font-weight-bold";
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return (
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  }
};
</script>

<style scoped>
.text-danger {
  color: red;
}
.text-success {
  color: green;
}
.font-weight-bold {
  font-weight: bold;
}
</style>