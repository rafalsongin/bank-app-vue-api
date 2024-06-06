import { defineStore } from 'pinia';
import axios from '../axios_auth';
import Swal from 'sweetalert2';

export const useTransactionsStore = defineStore('transactionsStore', {
  state: () => ({
    transactions: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 5,
  }),
  actions: {
    async fetchTransactions(page = 1, startDate = null, endDate = null, amountCondition = null, amountValue = null, fromIban = null, toIban = null) {
      try {
        const params = {
          page,
          size: this.itemsPerPage,
          startDate,
          endDate,
          amountCondition,
          amountValue,
          fromIban,
          toIban,
        };
        
        const response = await axios.get('api/transactions', { params });
        if (response.data && response.data.content.length > 0) {
          this.transactions = response.data.content;
          this.currentPage = response.data.number + 1;
          this.totalPages = response.data.totalPages;
        } else {
          this.transactions = [];
          this.currentPage = 1;
          this.totalPages = 1;
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch transactions: ' + error.message,
        });
      }
    },
    setPage(page) {
      this.currentPage = page;
      this.fetchTransactions(page);
    },
  },
});
