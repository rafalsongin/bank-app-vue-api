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
        text: "Please wait while transactions are loading",
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

        const response = await axios.get("api/transactions", { params });
        if (response.data && response.data.content.length > 0) {
          this.transactions = response.data.content;
          this.currentPage = response.data.number + 1;
          this.totalPages = response.data.totalPages;
        } else {
          this.transactions = [];
          this.currentPage = 1;
          this.totalPages = 1;
          await Swal.fire({
            icon: "info",
            title: "No transactions found",
          });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          await Swal.fire({
              icon: "warning",
              title: "Failed to fetch transactions",
              text: error.response.data,
          });
        } else {
            await Swal.fire({
                icon: "error",
                title: "Failed to fetch transactions",
                text: error.message,
            });
        }
      } finally {
        Swal.close();
      }
    },
  },
});
