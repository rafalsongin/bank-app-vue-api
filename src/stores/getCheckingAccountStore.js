// src/stores/accountStore.js
import { defineStore } from 'pinia';
import axios from '../axios_auth';
import Swal from 'sweetalert2';

export const getCheckingAccountStore = defineStore('account', {
    state: () => ({
        fromAccountDetails: {},
        toAccountDetails: {},
        isFromAccountValid: true,
        isToAccountValid: true,
    }),
    actions: {
        async getCheckingAccountsByIBAN(iban, type) {
            try {
                const response = await axios.get(`api/accounts/getCheckingAccount/${iban}`);
                if (type === 'from') {
                    this.fromAccountDetails = response.data;
                    this.isFromAccountValid = true;
                } else if (type === 'to') {
                    this.toAccountDetails = response.data;
                    this.isToAccountValid = true;
                }
            } catch (error) {
                if (type === 'from') {
                    this.fromAccountDetails = {};
                    this.isFromAccountValid = false;
                } else if (type === 'to') {
                    this.toAccountDetails = {};
                    this.isToAccountValid = false;
                }
                if (error.response && error.response.status === 400) {
                    Swal.fire("Bad Request", error.response.data, "error");
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Failed to fetch ${type} account details: ${error.message}`,
                    });
                }

            }
        },
    },
});
