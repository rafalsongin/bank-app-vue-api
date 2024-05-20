<template>
  <div>
    <header>
      <h2>Accounts</h2>
    </header>
    <div class="row row-cols-2 gap-1">
      <AccountCard v-for="account in currentCustomer.accounts"
                   :account="account" :key="account.iban"
                   @click="selectAccount(account)"/>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import AccountCard from "@/components/customer_panel/PanelComponents/AccountCard.vue";
import axios from "@/axios_auth";
export default {
  components: {
    AccountCard
  },
  props: {
    currentCustomer: Object
  },
  data() {
    return {
      currentAccount: "",
    };
  },
  methods: {
    selectAccount(customerAccountIban) {
      this.currentAccount = customerAccountIban;
    }
  }
};
</script>