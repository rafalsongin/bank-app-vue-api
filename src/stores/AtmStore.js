import { defineStore } from 'pinia';
import axios from '@/axios_auth';
import Swal from 'sweetalert2';

export const useAtmStore = defineStore('atmStore', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        isLoggedIn: false,
        role: '',
    }),
    actions: {
        async loginAtm(username, password) {
            try {
                const response = await axios.post('/atm/login', { username, password });
                this.token = response.data.token;
                this.isLoggedIn = true;
                this.role = 'ATM';
                localStorage.setItem('token', this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            } catch (error) {
                console.error('Error during login:', error);
                this.isLoggedIn = false;
                this.token = '';
                localStorage.removeItem('token');
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: error.response?.data?.message || 'An error occurred during login.'
                });
                throw error;
            }
        },
        autoLogin() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                this.isLoggedIn = true;
                this.role = 'ATM';
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            }
        },
        async getBalance() {
            try {
                const response = await axios.get('/atm/balance', {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                return response.data !== undefined ? response.data : 0;
            } catch (error) {
                console.error('Error fetching balance:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch balance',
                    showConfirmButton: true
                });
                return 0; // Ensure balance is set to a default value if an error occurs
            }
        },
        async deposit(amount) {
            try {
                await axios.post('/atm/deposit', {
                    amount: amount
                }, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
            } catch (error) {
                console.error('Error making deposit:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to make deposit',
                    showConfirmButton: true
                });
                throw error;
            }
        },
        async withdraw(amount) {
            try {
                await axios.post('/atm/withdraw', {
                    amount: amount
                }, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
            } catch (error) {
                console.error('Error making withdrawal:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to make withdrawal',
                    showConfirmButton: true
                });
                throw error;
            }
        },
        logout() {
            this.token = '';
            this.isLoggedIn = false;
            this.role = '';
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }
});
