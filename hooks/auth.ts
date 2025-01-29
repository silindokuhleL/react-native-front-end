import axios from '@/lib/axios';
import { useState } from 'react';
import { router } from 'expo-router';
import { tokenService } from '@/services/tokenService';

interface LoginResponse {
    token: string;
}

export const useAuth = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const login = async (props: { email: string; password: string }) => {
        setLoading(true);
        setErrors({});
    
        try {
            const response = await axios.post<LoginResponse>('/api/login', props);
            console.log('Login response:', response);
            
            const token = response.data.token;
            tokenService.setToken(token);
            
            const userResponse = await axios.get('/api/user');
            const user = userResponse.data;
            console.log(user);
            
            if (response.status === 200 || response.status === 204) {
                router.replace('/(tabs)/');
                return true;
            }
        } catch (error: any) {
            console.error('Login error:', {
                message: error.message,
                response: error.response?.data
            });
            
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    email: error.response?.data?.message || 'Login failed. Please try again.'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (props: { name: string; email: string; password: string; password_confirmation: string }) => {
        setLoading(true);
        setErrors({});

        try {
            const response = await axios.post('/api/register', props);
            if (response.data) {
                router.replace('/(auth)/login');
                return response.data;
            }
        } catch (error: any) {
            console.error('Registration error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            if (error.response?.status === 502) {
                setErrors({
                    general: 'Unable to connect to the server. Please check your connection and try again.'
                });
            } else if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general: 'An unexpected error occurred. Please try again.'
                });
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        register,
        errors,
        loading,
        setErrors
    };
};
