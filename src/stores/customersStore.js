import { defineStore } from 'pinia';
import axios from '../axios_auth';
import Swal from 'sweetalert2';

export const useCustomersStore = defineStore('customers', {
    state: () => ({
        customers: [],
        selectedCustomer: null,
        searchQuery: '',
        accounts: [],
        transactions: [],
    }),
    getters: {
        filteredCustomers: (state) => {
            let filtered = state.customers;
            if (state.searchQuery) {
                const searchTerm = state.searchQuery.toLowerCase();
                filtered = filtered.filter((customer) => {
                    return Object.values(customer).some((value) =>
                        String(value).toLowerCase().includes(searchTerm)
                    );
                });
            }
            return filtered;
        },
        unverifiedCustomers: (state) => state.customers.filter(customer => customer.accountApprovalStatus === 'UNVERIFIED'),
        verifiedCustomers: (state) => state.customers.filter(customer => customer.accountApprovalStatus === 'VERIFIED'),
    },
    actions: {
        fetchCustomers() {
            axios
                .get('/api/customers')
                .then((result) => {
                    this.customers = result.data;
                })
                .catch((error) =>
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to fetch customers: ' + error.message,
                    })
                );
        },
        setSelectedCustomer(customer) {
            this.selectedCustomer = customer;
        },
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        fetchAccounts(customerId) {
            axios
                .get(`api/accounts/customer/${customerId}`)
                .then((response) => {
                    this.accounts = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching accounts:", error);
                });
        },
        fetchTransactions(customerId) {
            axios
                .get(`api/transactions/${customerId}`)
                .then((response) => {
                    this.transactions = response.data;
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to fetch transactions",
                        text: error.message,
                    });
                });
        },
        closeCustomerAccount(customerId) {
            axios
                .put(`api/customers/closeAccount/${customerId}`)
                .then((response) => {
                    if (response.status == 200) {
                        this.fetchCustomers(); // Refresh the customer list after closing an account
                        if (this.selectedCustomer && this.selectedCustomer.userId === customerId) {
                            this.selectedCustomer.accountApprovalStatus = 'CLOSED';
                        }
                        Swal.fire({
                            icon: "success",
                            title: "Customer account closed successfully",
                        });
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to close customer account",
                        text: error.message,
                    });
                });
        },
        approveCustomer(userId) {
            axios
                .post(`/api/customers/approve/${userId}`)
                .then((result) => {
                    this.fetchCustomers();
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to approve customer',
                        text: error.message,
                    });
                });
        },
        declineCustomer(userId) {
            axios
                .post(`/api/customers/decline/${userId}`)
                .then((result) => {
                    this.fetchCustomers();
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to decline customer',
                        text: error.message,
                    });
                });
        },
        saveAccount(account) {
            axios
                .put(`api/accounts/changeAccount/${account.iban}`, {
                    absoluteTransferLimit: account.absoluteTransferLimit,
                    dailyTransferLimit: account.dailyTransferLimit,
                })
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Account updated successfully",
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to update account",
                        text: error.message,
                    });
                });
        }
    },

});

