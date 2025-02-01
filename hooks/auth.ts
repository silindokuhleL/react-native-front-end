import axios from '@/lib/axios';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { tokenService } from '@/services/tokenService';

interface LoginResponse {
    token: string;
}

interface RegisterResponse {
    token: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
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
                console.log('Token found:', token); // Debug token

                if (token) {
                    const userResponse = await axios.get<User>('/api/user');
                    console.log('User response:', userResponse.data); // Debug user response
                    
                    // Parse user data if it's embedded in HTML
                    let userData = userResponse.data;
                    if (typeof userData === 'string') {
                        const userMatch = (userData as string).match(/{[^}]+}/);
                        if (userMatch) {
                            try {
                                userData = JSON.parse(userMatch[0]);
                            } catch (e) {
                                console.error('Failed to parse user data:', e);
                            }
                        }
                    }
                    
                    if (userData && userData.id) {
                        setUser(userData);
                    } else {
                        console.error('Invalid user data format:', userData);
                        await tokenService.removeToken();
                    }
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
            
            const tokenMatch = response.data.toString().match(/"token":"([^"]+)"/);
            const token = tokenMatch ? tokenMatch[1] : response.data?.token;
            
            if (!token) {
                setErrors({
                    email: 'Authentication failed. Please try again.'
                });
                return false;
            }
            
            await tokenService.setToken(token);
            
            const userResponse = await axios.get<User>('/api/user');
            const userData = userResponse.data;
            console.log('User data:', userData)
            setUser(userData);
            
            router.replace('/(tabs)/');
            return true;
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
            const response = await axios.post<RegisterResponse>('/api/register', props);
            
            const tokenMatch = response.data.toString().match(/"token":"([^"]+)"/);
            const token = tokenMatch ? tokenMatch[1] : response.data?.token;
            
            if (!token) {
                setErrors({
                    general: 'Registration failed. Please try again.'
                });
                return false;
            }
            
            await tokenService.setToken(token);
            
            const userResponse = await axios.get<User>('/api/user');
            let userData = userResponse.data;
            
            if (typeof userData === 'string') {
                const userMatch = (userData as string).match(/{[^}]+}/);
                if (userMatch) {
                    try {
                        userData = JSON.parse(userMatch[0]);
                    } catch (e) {
                        console.error('Failed to parse user data:', e);
                    }
                }
            }
            
            if (userData && userData.id) {
                setUser(userData);
                router.replace('/(tabs)/');
                return true;
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
        logout, 
        errors,
        loading,
        setErrors,
        user,
        setUser
    };
};
