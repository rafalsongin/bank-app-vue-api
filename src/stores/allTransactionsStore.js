import { defineStore } from "pinia";
import axios from "../axios_auth";
import Swal from "sweetalert2";
import { useAuthStore } from "./authStore";

export const useTransactionsStore = defineStore("transactionsStore", {
  state: () => ({
    transactions: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  }),
  actions: {
    async fetchTransactions(
      page = 1,
      startDate = null,
      endDate = null,
      amountCondition = null,
      amountValue = null,
      fromIban = null,
      toIban = null
    ) {
      Swal.fire({
        title: "Loading...",
        text: "Please wait while transactions are being fetched",
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
          page,
          size: this.itemsPerPage,
          startDate,
          endDate,
          amountCondition,
          amountValue,
          fromIban,
          toIban,
          username,
          role,
        };

        console.log(params);
        const response = await axios.get("api/transactions", { params });
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
          icon: "error",
          title: "Error",
          text: "Failed to fetch transactions: " + error.message,
        });
      } finally {
        Swal.close();
      }
    },
    setPage(page) {
      this.currentPage = page;
      this.fetchTransactions(page);
    },
  },
});
