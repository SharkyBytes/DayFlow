import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',  // Your backend API base URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
});

// Add an interceptor to include the token in all requests
AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance;
