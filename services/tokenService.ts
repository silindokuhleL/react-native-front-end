import axios from '@/lib/axios';

export const tokenService = {
    setToken(token: string) {
        // Set token in axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    removeToken() {
        // Remove token from axios default headers
        delete axios.defaults.headers.common['Authorization'];
    },

    getAuthHeader(token: string) {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }
};