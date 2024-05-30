import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionFetchStore = defineStore('transactions', {
    state: () => ({
        transactions: [],
    }),
    actions: {
        async fetchTransactionsByAccountIban(accountIban) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('JWT token is missing');
                }

                const response = await axios.get(`http://188.166.27.231:8080/api/transactions/account/${accountIban}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response);

                if (response.status === 200 || response.status === 201) {
                    this.transactions = response.data;
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
});