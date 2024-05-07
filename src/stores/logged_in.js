import { defineStore } from "pinia";
import axios from "../axios_auth";

export const useLoggedInStore = defineStore("logged_in", {

    state: () => ({
        username: localStorage.getItem('email') || '',
        token: localStorage.getItem('token') || '',
    }),
    getters: {
        isLoggedIn: (state) => !!state.token && !!state.email,
        getToken: (state) => state.token,
    },
    actions: {
        login(username, password) {
            return new Promise((resolve, reject) => {
                axios.post('/users/login', {
                    username: username,
                    password: password,
                })
                    .then((response) => {
                        this.email = response.data.email;
                        this.token = response.data.token;
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('email', response.data.email);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                        console.log(response.data.token);
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                        reject();
                    });
            });


        },
        autoLogin() {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('email');

            if (token && username) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                this.token = token;
                this.email = username;
            }
            else {
                console.log('no token or username');
            }
        },

    },
});
