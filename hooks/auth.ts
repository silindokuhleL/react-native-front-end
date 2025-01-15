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
                router.replace('/(tabs)/');
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                const serverErrors = error.response.data.errors;
                const formattedErrors: Record<string, string> = {};
                Object.entries(serverErrors).forEach(([key, value]) => {
                    formattedErrors[key] = Array.isArray(value) ? value[0] : value;
                });
                setErrors(formattedErrors);
            } else {
                console.error('Registration error:', error);
            }
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
