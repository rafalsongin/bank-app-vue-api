// src/stores/employeeStore.js
import { defineStore } from 'pinia';
import axios from '../axios_auth';
import { useAuthStore } from "./authStore";

export const useEmployeeStore = defineStore('employee', {
    state: () => ({
        employee: {
            userId: null,
            email: '',
            employmentStatus: '',
            firstName: '',
            lastName: '',
            userRole: '',
            username: '',
        },
    }),
    actions: {
        async fetchEmployeeDetails() {
            try {
                const store = useAuthStore();
                const email = store.username || localStorage.getItem('username') || '';

                if (!email) {
                    throw new Error('Email is not available');
                }

                const response = await axios.get(`api/employees/email/${email}`);

                if (response.status !== 200) {
                    throw new Error('User was not found!');
                }

                this.employee = response.data;
            } catch (error) {
                console.error('Error fetching employee details:', error.message);
            }
        },
    },
});
