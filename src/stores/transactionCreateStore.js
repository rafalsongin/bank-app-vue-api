import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionCreateStore = defineStore('transaction', {
    state: () => ({
        transaction: {
            transaction_type: 'Internal Transaction',
            amount: 0,
            from_account: '', // should be IBAN
            to_account: '', // should be IBAN
            initiated_by_account: '', // for now, it takes account_id
        },
    }),
    actions: {
        async createTransaction(transactionData) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('JWT token is missing');
                }

                const response = await axios.post('https://www.songin.me/bankapp-backend/api/transactions', transactionData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200 || response.status === 201) {
                    return response.data;
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        resetTransaction() {
            this.transaction = {
                transaction_type: 'Internal Transaction',
                amount: 0,
                from_account: '',
                to_account: '',
                initiated_by_account: '',
            };
        },
    }
});