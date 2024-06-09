<template>
  <div v-if="isLoadingPage"></div>
  <div v-else>
    <div
      v-if="
        currentCustomer.accountApprovalStatus == 'VERIFIED' ||
        currentCustomer.accountApprovalStatus == 'UNVERIFIED'
      "
      class="profile-page"
    >
      <div class="d-flex">
        <div class="nav-panel p-4 rounded-start">
          <CustomerPanelNavigation
            :currentPanel="currentPanel"
            :isNavigationDisabled="isNavigationDisabled"
            @selectPanel="selectPanel"
          />
        </div>
        <div class="content-panel rounded-end flex-grow-1">
          <div v-if="currentPanel === 'Overview'">
            <CustomerPanelOverview :currentCustomer="currentCustomer" />
          </div>
          <div v-else-if="currentPanel === 'Accounts'">
            <CustomerPanelAccounts :currentCustomer="currentCustomer" />
          </div>
          <div v-else-if="currentPanel === 'Create Transaction'">
            <CustomerPanelNewTransaction
              :currentCustomer="currentCustomer"
              @updateCustomerAccountData="refreshCustomerAccounts"
            />
          </div>
          <div v-else-if="currentPanel === 'Search Customer'">
            <CustomerPanelSearchCustomer :currentCustomer="currentCustomer" />
          </div>
          <div v-else-if="currentPanel === 'Settings'">
            <CustomerPanelSettings
              :currentCustomer="currentCustomer"
              @customerUpdated="updateCustomerDetails"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <CustomerPanelSuspended />
    </div>
  </div>
</template>

<script>
import CustomerPanelSuspended from "@/components/customer_panel/CustomerPanelSuspended.vue";
import CustomerPanelNavigation from "@/components/customer_panel/CustomerPanelNavigation.vue";

import CustomerPanelOverview from "@/components/customer_panel/CustomerPanelOverview.vue";
import CustomerPanelAccounts from "@/components/customer_panel/CustomerPanelAccounts.vue";
import CustomerPanelNewTransaction from "@/components/customer_panel/CustomerPanelNewTransaction.vue";

import CustomerPanelSearchCustomer from "@/components/customer_panel/CustomerPanelSearchCustomer.vue";
import CustomerPanelSettings from "@/components/customer_panel/CustomerPanelSettings.vue";

import { useCustomerProfileStore } from "@/stores/customerProfileStore";

export default {
  components: {
    CustomerPanelSuspended,
    CustomerPanelNavigation,
    CustomerPanelOverview,
    CustomerPanelAccounts,
    CustomerPanelNewTransaction,
    CustomerPanelSearchCustomer,
    CustomerPanelSettings,
  },
  data() {
    return {
      isLoadingPage: true,
      currentCustomer: null,
      currentPanel: "Overview",
      isNavigationDisabled: true,
    };
  },
  methods: {
    async fetchCustomerDetails(email) {
      try {
        const customerProfileStore = useCustomerProfileStore();
        await customerProfileStore.fetchCustomerDetails(email);
        this.updateCustomerDetails(customerProfileStore.currentCustomer);
        this.checkAccountStatus(this.currentCustomer.accountApprovalStatus);
        this.isLoadingPage = false;
      } catch (error) {
        console.error("Error fetching customer details:", error.message);
      }
    },
    async fetchCustomerAccounts() {
      try {
        const customerProfileStore = useCustomerProfileStore();
        await customerProfileStore.fetchCustomerAccounts(
          this.currentCustomer.userId
        );
        this.updateCustomerDetails(customerProfileStore.currentCustomer);
      } catch (error) {
        console.error("Error fetching customer accounts:", error);
        this.$router.push("/404");
      }
    },
    checkAccountStatus(status) {
      this.isNavigationDisabled = status !== "VERIFIED";
      if (status === "VERIFIED") {
        this.fetchCustomerAccounts();
      }
    },
    updateCustomerDetails(updatedCustomer) {
      this.currentCustomer = updatedCustomer;
    },
    refreshCustomerAccounts() {
      this.fetchCustomerAccounts();
    },
    selectPanel(panel) {
      this.currentPanel = panel;
    },
  },
  created() {
    const email = this.$route.params.id;
    this.fetchCustomerDetails(email);
  },
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
  background-color: #5c80bc;
  color: #30323d;
  border-radius: 5px;
}
</style>
