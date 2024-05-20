<template>
  <div class="profile-page">
    <div class="d-flex">
      <div class="nav-panel p-4 rounded-start">
        <CustomerPanelNavigation
            :currentPanel="currentPanel" :isNavigationDisabled="isNavigationDisabled"
            @selectPanel="selectPanel" />
      </div>
      <div class="content-panel rounded-end flex-grow-1">
        <div v-if="currentPanel === 'Overview'">
          <CustomerPanelOverview
              :currentCustomer="currentCustomer" />
        </div>
        <div v-else-if="currentPanel === 'Accounts'">
          <CustomerPanelAccounts
              :currentCustomer="currentCustomer"/>
        </div>
        <div v-else-if="currentPanel === 'Create Transaction'">
          <CustomerPanelNewTransaction
              :currentCustomer="currentCustomer"
              @updateCustomerAccountData="refreshCustomerAccounts"/>
        </div>
        <div v-else-if="currentPanel === 'Settings'">
          <CustomerPanelSettings
              :currentCustomer="currentCustomer" />
        </div>
      </div>
    </div>
  </div>
  <!--  <div>
      <CustomerPanelSuspended />
    </div>-->
</template>

<script>
import CustomerPanelSuspended from "@/components/customer_panel/CustomerPanelSuspended.vue";
import CustomerPanelNavigation from "@/components/customer_panel/CustomerPanelNavigation.vue";

import CustomerPanelOverview from "@/components/customer_panel/CustomerPanelOverview.vue";
import CustomerPanelAccounts from "@/components/customer_panel/CustomerPanelAccounts.vue";
import CustomerPanelNewTransaction from "@/components/customer_panel/CustomerPanelNewTransaction.vue";

import CustomerPanelSettings from "@/components/customer_panel/CustomerPanelSettings.vue";

import axios from "@/axios_auth";

export default {
  components: {
    CustomerPanelSuspended,
    CustomerPanelNavigation,
    CustomerPanelOverview,
    CustomerPanelAccounts,
    CustomerPanelNewTransaction,
    CustomerPanelSettings
  },
  data() {
    return {
      currentPanel: "Overview",
      currentCustomer:
          {
            userId: "",
            email: "",
            firstName: "",
            lastName: "",
            bankId: "",
            userRole: 0,
            phoneNumber: "",
            accountApprovalStatus: "",
            transactionLimit: null,
            accounts: []
          },
      isNavigationDisabled: true,
      panelData: {}
    };
  },
  methods: {
    async fetchCustomerDetails(id) {
      try {
        const response = await axios.get(`/api/customers/${id}`);

        if (response.status !== 200 || !response.data) {
          throw new Error("User was not found!");
        }

        this.currentCustomer = response.data;
        this.checkAccountStatus(this.currentCustomer.accountApprovalStatus);

        this.refreshCustomerAccounts();
      } catch (error) {
        console.error('Error fetching customer details:', error);
        this.$router.push("/404");
      }
    },
    refreshCustomerAccounts(){
      this.fetchCustomerAccounts(this.currentCustomer.userId)
    },
    async fetchCustomerAccounts(id) {
      try {
        const response = await axios.get(`/api/accounts/customer/${id}`);

        if (response.status !== 200) {
          throw new Error("Customer accounts were not found!");
        }

        this.currentCustomer.accounts = response.data;
      } catch (error) {
        console.error('Error fetching customer accounts:', error);
        this.$router.push("/404");
      }
    },
    selectPanel(panel) {
      this.currentPanel = panel;
    },
    isCurrentPanel(panel) {
      return panel === this.currentPanel ? 'current' : '';
    },
  },
  created() {
    const customerId = this.$route.params.id;
    this.fetchCustomerDetails(customerId);
  }
};
</script>

<style scoped>
.profile-page {
  margin: 0 auto;
  width: 90%;
  border: 3px solid black;
  border-radius: 10px;
}

.nav-panel {
  width: 20%;
  background-color: #6689c7;
}

.content-panel {
  padding: 2em;
  background-color: #e0e9fd;
}

.current {
  background-color: #5C80BC;
  color: #30323D;
  border-radius: 5px;
}
</style>
