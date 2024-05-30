import { defineStore } from 'pinia';
import axios from '../axios_auth';
import Swal from 'sweetalert2';

export const useCustomersStore = defineStore('customers', {
    state: () => ({
        customers: [],
        selectedCustomer: null,
        searchQuery: '',
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
    },
});
