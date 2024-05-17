import { defineStore } from 'pinia';
import axios from '../axios_auth';

export const useLoggedInStore = defineStore('logged_in', {
    state: () => ({
        username: localStorage.getItem('username') || '',
        token: localStorage.getItem('token') || '',
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
                        this.username = username; // Set the username
                        this.token = response.data; // Set the token
                        localStorage.setItem('token', response.data);
                        localStorage.setItem('username', username);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
                    })
                    .catch((error) => {
                        console.error("Login failed with error:", error);
                        reject(error);
                    });
            });
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.token = '';
            this.username = '';
            axios.defaults.headers.common['Authorization'] = '';
        },
        autoLogin() {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (token && username) {
                this.token = token;
                this.username = username;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },
    },
});
