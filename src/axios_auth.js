// axios_auth.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const nonAuthPaths = ['/auth/login', '/auth/register'];
    const token = localStorage.getItem('token');

    // Only add the token to headers for paths that are not in the nonAuthPaths array
    if (!nonAuthPaths.includes(config.url) && token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Ensure no Authorization header is sent
        delete config.headers.Authorization;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;
