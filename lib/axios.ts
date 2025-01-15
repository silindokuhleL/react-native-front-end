import Axios from 'axios';
import Config from 'react-native-config';

const axios = Axios.create({
    baseURL: 'https://cdc9-102-22-207-246.ngrok-free.app',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export default axios;
