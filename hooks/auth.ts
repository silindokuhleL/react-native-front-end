import axios from '@/lib/axios';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { tokenService } from '@/services/tokenService';

interface LoginResponse {
    token: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export const useAuth = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = await tokenService.getToken();
                if (token) {
                    const userResponse = await axios.get<User>('/api/user');
                    setUser(userResponse.data);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                await tokenService.removeToken();
            }
        };

        initializeAuth();
    }, []);

    const login = async (props: { email: string; password: string }) => {
        setLoading(true);
        setErrors({});
    
        try {
            const response = await axios.post<LoginResponse>('/api/login', props);
            
            const token = response.data.token;
            await tokenService.setToken(token);
            
            const userResponse = await axios.get<User>('/api/user');
            const userData = userResponse.data;
            console.log('User data:', userData)
            setUser(userData);
            
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

    const logout = async () => {
        setLoading(true);
        try {
            await axios.post('/api/logout');
            await tokenService.removeToken();
            setUser(null);
            router.replace('/(auth)/login');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        register,
        logout, // Add logout to the returned object
        errors,
        loading,
        setErrors,
        user,
        setUser
    };
};
