import axios from '@/lib/axios';
import { useState } from 'react';
import { router } from 'expo-router';

export const useAuth = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

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
        register,
        errors,
        loading,
        setErrors
    };
};
