import { defineStore } from 'pinia';
import axios from '../axios_auth';
import Swal from 'sweetalert2';
import { useAuthStore } from "./authStore";

export const useCustomersStore = defineStore('customers', {
    state: () => ({
        customers: [],
        selectedCustomer: null,
        searchQuery: '',
        accounts: [],
        transactions: [],
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 10,
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
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait while searching for the IBAN',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            axios
                .get('/api/customers')
                .then((result) => {
                    this.customers = result.data;
                    Swal.close();
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
        async fetchAccounts(customerId) {

            return axios
                .get(`api/accounts/customer/${customerId}`)
                .then((response) => {
                    this.accounts = response.data;
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to fetch accounts',
                        text: error.message,
                    });
                });
        },
        async closeCustomerAccount(customerId) {
            try {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, close it!'
                });
                if (result.isConfirmed) {
                    const response = await axios.put(`/api/customers/close/${customerId}`);
                    if (response.status === 200) {
                        this.fetchCustomers();
                        if (this.selectedCustomer && this.selectedCustomer.userId === customerId) {
                            this.selectedCustomer.accountApprovalStatus = 'CLOSED';
                        }
                        Swal.fire({
                            icon: "success",
                            title: "Customer account closed successfully",
                        });
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    Swal.fire("Bad Request", error.response.data, "info");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to close customer account",
                        text: error.message,
                    });
                }
            }
        },
        approveCustomer(userId) {
            axios
                .post(`/api/customers/approve/${userId}`)
                .then((response) => {
                    if (response.status == 200) {
                        this.fetchCustomers();
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        Swal.fire("Bad Request", error.response.data, "info");
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Failed to approve customer account",
                            text: error.message,
                        });
                    }
                });
        },
        declineCustomer(userId) {
            axios
                .post(`/api/customers/decline/${userId}`)
                .then((response) => {
                    if (response.status == 200) {
                        this.fetchCustomers();
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        Swal.fire("Bad Request", error.response.data, "info");
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Failed to decline customer account",
                            text: error.message,
                        });
                    }
                });
        },
        saveAccount(account) {
            axios
                .put(`api/accounts/${account.iban}`, {
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
                    if (error.response && error.response.status === 400) {
                        Swal.fire("Bad Request", error.response.data, "info");
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Failed to update account",
                            text: error.message,
                        });
                    }
                });
        },
        async fetchTransactionsByIban(iban, page = 1) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait while transactions are loading',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            try {
                const authStore = useAuthStore();
                const username = authStore.username;
                const role = authStore.role;
                if (!username || !role) {
                    throw new Error("User not found!");
                }
                const params = {
                    username,
                    role,
                    page,
                    size: this.itemsPerPage,
                };
                const response = await axios.get(`/api/transactions/account/${iban}`, { params });
                if (response.status == 200) {
                    if (response.data && response.data.content.length > 0) {
                        this.transactions = response.data.content;
                        this.currentPage = response.data.number + 1;
                        this.totalPages = response.data.totalPages;
                    } else {
                        this.transactions = [];
                        this.currentPage = 1;
                        this.totalPages = 1;
                        Swal.close();
                        await Swal.fire({
                            icon: 'info',
                            title: 'No transactions found',
                        });
                    }
                }

            }
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to fetch transactions',
                    text: error.message,
                });
            }
            finally {
                Swal.close();
            }
        },
    },
});

