<template>
  <div v-if="customerStatus != 'DECLINED'" class="profile-page">
    <div class="d-flex">
      <div class="nav-panel p-4 rounded-start">
        <CustomerPanelNavigation
            :currentPanel="currentPanel" :isNavigationDisabled="isNavigationDisabled"
            @selectPanel="selectPanel" />
      </div>
      <div class="content-panel rounded-end flex-grow-1">
        <div v-if="currentPanel === 'Overview'">
          <CustomerPanelOverview
              :currentUser="currentUser" :customerStatus="customerStatus" />
        </div>
        <div v-else-if="currentPanel === 'Details'">
          <CustomerPanelDetails
              :currentUser="currentUser" />
        </div>
        <div v-else-if="currentPanel === 'Transactions'">
          <CustomerPanelTransactions />
        </div>
        <div v-else-if="currentPanel === 'Settings'">
          <CustomerPanelSettings />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <CustomerPanelSuspended />
  </div>
</template>

<script>
import CustomerPanelNavigation from "@/components/customer_panel/CustomerPanelNavigation.vue";
import CustomerPanelOverview from "@/components/customer_panel/CustomerPanelOverview.vue";
import CustomerPanelDetails from "@/components/customer_panel/CustomerPanelDetails.vue";
import CustomerPanelTransactions from "@/components/customer_panel/CustomerPanelTransactions.vue";
import CustomerPanelSettings from "@/components/customer_panel/CustomerPanelSettings.vue";
import CustomerPanelSuspended from "@/components/customer_panel/CustomerPanelSuspended.vue";

export default {
  components: {
    CustomerPanelSuspended,
    CustomerPanelNavigation,
    CustomerPanelOverview,
    CustomerPanelDetails,
    CustomerPanelTransactions,
    CustomerPanelSettings
  },
  data() {
    return {
      currentPanel: "Overview",
      currentUser: null,
      customerStatus: null,
      isNavigationDisabled: true,
      panelData: {}
    };
  },
  methods: {
    checkAccountStatus(data) {
      switch (data.account_approval_status){
        case "APPROVED":
          this.customerStatus = "APPROVED";
          this.isNavigationDisabled = false;
          return;
        case "UNVERIFIED":
          this.customerStatus = "UNVERIFIED";
          return;
        case "DECLINED":
          this.customerStatus = "DECLINED";
          return;
        default:
          throw "Unknown customer status!";
      }
    },
    async fetchCustomerDetails(id) {
      try {
        const response = await fetch(`http://localhost:8080/api/customers/${id}`);
        if (!response.ok) {
          throw new Error('API response was not OK (200)');
        }
        const data = await response.json();
        if(data != null){
          this.checkAccountStatus(data);
          this.currentUser = data;
        } else{
          throw "User was not found!"
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
        this.$router.replace({ path: '/404' });
      }
    },
    selectPanel(panel) {
      this.currentPanel = panel;
    },
    isCurrentPanel(panel) {
      return panel === this.currentPanel ? 'current' : '';
    }
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
  width: 80%;
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
