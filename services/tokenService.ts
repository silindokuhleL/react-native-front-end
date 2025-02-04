import axios from '@/lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';

export const tokenService = {
    async setToken(token: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Store token in AsyncStorage
        await AsyncStorage.setItem(TOKEN_KEY, token);
    },

    async getToken() {
        return await AsyncStorage.getItem(TOKEN_KEY);
    },

    async removeToken() {
        delete axios.defaults.headers.common['Authorization'];
        // Remove token from AsyncStorage
        await AsyncStorage.removeItem(TOKEN_KEY);
    },

    getAuthHeader(token: string) {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }
};