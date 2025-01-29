import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'https://256d-102-22-207-246.ngrok-free.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default axios;
