import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const axios = Axios.create({
    baseURL: 'https://256d-102-22-207-246.ngrok-free.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Function to initialize CSRF token
const initializeCsrfToken = async () => {
    const token = await AsyncStorage.getItem('XSRF-TOKEN');
    if (token) {
        // Explicitly specify the type for headers to allow custom headers
        (axios.defaults.headers as any)['X-XSRF-TOKEN'] = token;
    }
};

// Call the function to initialize the CSRF token
initializeCsrfToken();

// Add a request interceptor to include CSRF token
axios.interceptors.request.use(config => {
    // Ensure headers are initialized
    config.headers = config.headers || {};

    // Use the token from defaults if available
    if ((axios.defaults.headers.common as any)['X-XSRF-TOKEN']) {
        config.headers['X-XSRF-TOKEN'] = (axios.defaults.headers.common as any)['X-XSRF-TOKEN'];
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axios;
