import { defineStore } from 'pinia';
import axios from '../axios_auth';
import { jwtDecode } from 'jwt-decode'; // Correctly import jwt-decode

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        username: localStorage.getItem('username') || '',
        token: localStorage.getItem('token') || '',
        role: localStorage.getItem('role') || '' // Add role to the state
    }),
    getters: {
        isLoggedIn: (state) => !!state.token
    },
    actions: {
        login(username, password) {
            return new Promise((resolve, reject) => {
                axios.post('/auth/login', {
                    username: username,
                    password: password,
                })
                    .then((response) => {
                        const token = response.data; // Extract token directly from response data
                        const decoded = jwtDecode(token); // Use jwtDecode

                        this.username = decoded.sub; // Set the username
                        this.token = token; // Set the token
                        this.role = decoded.role; // Set the role

                        localStorage.setItem('token', token);
                        localStorage.setItem('username', decoded.sub);
                        localStorage.setItem('role', decoded.role);

                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        resolve(); // Resolve the promise
                    })
                    .catch((error) => {
                        console.error("Login failed with error:", error);
                        reject(error);
                    });
            });
        },
        loginAtm(username, password) {
            return new Promise((resolve, reject) => {
                axios.post('/auth/login-atm', {
                    username: username,
                    password: password,
                })
                    .then((response) => {
                        const token = response.data; // Extract token directly from response data
                        const decoded = jwtDecode(token); // Use jwtDecode

                        this.username = decoded.sub; // Set the username
                        this.token = token; // Set the token
                        this.role = 'ATM'; // Set the role to 'ATM'

                        localStorage.setItem('token', token);
                        localStorage.setItem('username', decoded.sub);
                        localStorage.setItem('role', 'ATM');

                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        resolve(); // Resolve the promise
                    })
                    .catch((error) => {
                        console.error("ATM Login failed with error:", error);
                        reject(error);
                    });
            });
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role'); // Clear role from localStorage
            this.token = '';
            this.username = '';
            this.role = ''; // Reset role
            axios.defaults.headers.common['Authorization'] = '';
        },
        autoLogin() {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token); // Use jwtDecode

                this.token = token;
                this.username = decoded.sub;
                this.role = localStorage.getItem('role'); // Get role from localStorage

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },
    },
});
