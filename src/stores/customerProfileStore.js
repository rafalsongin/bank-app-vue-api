import { defineStore } from 'pinia';
import axios from '../axios_auth';
import Swal from 'sweetalert2';

export const useCustomerProfileStore = defineStore('customerprofile', {
    state: () => ({
        currentCustomer: {},
    }),
    actions: {
        async fetchCustomerDetails(email) {
            try {
                const response = await axios.get(
                    `api/customers/email/${email}`
                );

                if (response.status !== 200) {
                    throw new Error();
                }
                this.currentCustomer = response.data;

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Failed to fetch customer details!`,
                });
            }
        },
        async fetchCustomerAccounts(id) {
            try {
                const response = await axios.get(`/api/accounts/customer/${id}`);

                if (response.status !== 200) {
                    throw new Error();
                }

                this.currentCustomer.accounts = response.data;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Failed to fetch customer accounts details!`,
                });
            }
        },
        async updateCustomerDetails(customerDetails) {
            try {
                console.log("Hello store: ");

                const { email, username, firstName, lastName, phoneNumber, bsn } = customerDetails;
                const token = localStorage.getItem('token');

                const response = await axios.put('api/customers', {
                    email,
                    username,
                    firstName,
                    lastName,
                    phoneNumber,
                    bsn
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(response);

                if (response.status === 200) {
                    this.currentCustomer = response.data;
                    await Swal.fire('Success', 'Customer details updated successfully!', 'success');
                } else {
                    throw new Error();
                }
            } catch (error) {
                await Swal.fire('Error', 'Failed to update customer details!', 'error');
            }
        }
    },
});
