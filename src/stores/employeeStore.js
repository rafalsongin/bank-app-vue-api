// src/stores/employeeStore.js
import { defineStore } from 'pinia';
import axios from '../axios_auth';
import { useAuthStore } from "./authStore";
import Swal from 'sweetalert2';

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

                if (!email || email === '') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Email not found!`,
                    });
                }

                const response = await axios.get(`api/employees/email/${email}`);

                if (response.status !== 200) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Failed to fetch employee details!`,
                    });
                }

                this.employee = response.data;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Failed to fetch employee details!`,
                });
            }
        },
    },
});
