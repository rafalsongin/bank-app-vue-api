import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        currentCustomer: {},
    }),
    actions: {
        async updateCustomerDetails(customerDetails) {
            try {
                const { email, username, firstName, lastName, phoneNumber, bsn } = customerDetails;
                const token = localStorage.getItem('token');

                const response = await axios.put('http://localhost:8080/api/customers', {
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

                if (response.status === 200) {
                    this.currentCustomer = response.data;
                    await Swal.fire('Success', 'Customer details updated successfully!', 'success');
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                await Swal.fire('Error', 'Failed to update customer details.', 'error');
            }
        }
    }
});