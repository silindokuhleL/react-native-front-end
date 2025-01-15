import axios from 'lib/axios'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
export default function RegisterScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
        let isValid = true

        if (!name) {
            newErrors.name = 'The name field is required'
            isValid = false
        } else {
            if (name.length > 255) {
                newErrors.name = 'The name must not be greater than 255 characters'
                isValid = false
            }
        }

        if (!email) {
            newErrors.email = 'The email field is required'
            isValid = false
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            newErrors.email = 'The email must be a valid email address'
            isValid = false
        }

        if (!password) {
            newErrors.password = 'The password field is required'
            isValid = false
        } else if (password.length < 8) {
            newErrors.password = 'The password must be at least 8 characters'
            isValid = false
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'The password confirmation field is required'
            isValid = false
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'The password confirmation does not match'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleRegister = async () => {
        setLoading(true)
        setError('')

        if (!validateForm()) {
            setLoading(false)
            return
        }

        try {
            const response = await axios.post('/api/register', {
                name,
                email,
                password,
                password_confirmation: confirmPassword
            })

            if (response.data) {
                router.replace('/(tabs)/')
            }
        } catch (err: any) {
            if (err.response?.data?.errors) {
                const serverErrors = err.response.data.errors
                const newErrors = { ...errors }
                
                Object.entries(serverErrors).forEach(([key, messages]) => {
                    if (Array.isArray(messages) && messages.length > 0) {
                        if (key === 'password_confirmation') {
                            newErrors.confirmPassword = messages[0]
                        } else {
                            newErrors[key as keyof typeof newErrors] = messages[0]
                        }
                    }
                })
                
                setErrors(newErrors)
            } else {
                setError(err.response?.data?.message || 'Registration failed. Please try again.')
            }
            console.error('Registration error:', err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={styles.background}>
                <Image
                    source={require('@/assets/images/react-logo.webp')}
                    style={styles.logo}
                />
                <ThemedView style={styles.formContainer}>
                    <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
                    <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>

                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, errors.name ? styles.inputError : null]}
                            placeholder="Full Name"
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={(text) => {
                                setName(text)
                                setErrors(prev => ({ ...prev, name: '' }))
                            }}
                            autoCapitalize="words"
                        />
                        {errors.name ? <ThemedText style={styles.fieldError}>{errors.name}</ThemedText> : null}
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, errors.email ? styles.inputError : null]}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text)
                                setErrors(prev => ({ ...prev, email: '' }))
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email ? <ThemedText style={styles.fieldError}>{errors.email}</ThemedText> : null}
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, errors.password ? styles.inputError : null]}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                                setErrors(prev => ({ ...prev, password: '' }))
                            }}
                            secureTextEntry
                        />
                        {errors.password ? <ThemedText style={styles.fieldError}>{errors.password}</ThemedText> : null}
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
                            placeholder="Confirm Password"
                            placeholderTextColor="#999"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text)
                                setErrors(prev => ({ ...prev, confirmPassword: '' }))
                            }}
                            secureTextEntry
                        />
                        {errors.confirmPassword ? <ThemedText style={styles.fieldError}>{errors.confirmPassword}</ThemedText> : null}
                    </ThemedView>

                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleRegister}
                        activeOpacity={0.9}
                    >
                        <ThemedText type="defaultSemiBold" style={styles.registerButtonText}>
                            Sign Up
                        </ThemedText>
                    </TouchableOpacity>
                    {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
                </ThemedView>

                <ThemedView style={styles.loginContainer}>
                    <ThemedText style={styles.loginText}>Already have an account? </ThemedText>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.back()}
                    >
                        <ThemedText type="defaultSemiBold" style={styles.loginLink}>
                            Log In
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F9FC',
        padding: 20,
        minHeight: '100%',
    },
    logo: {
        height: 120,
        width: 120,
        marginBottom: 40,
        borderRadius: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    formContainer: {
        width: width > 400 ? 400 : width - 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#F5F8FA',
        overflow: 'hidden',
    },
    input: {
        width: '100%',
        height: 56,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
    },
    registerButton: {
        width: '100%',
        height: 56,
        marginTop: 8,
        borderRadius: 12,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 24,
        padding: 16,
    },
    loginText: {
        fontSize: 16,
        color: '#666',
    },
    loginLink: {
        fontSize: 16,
        color: '#4A90E2',
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#FF3B30'
    },
    fieldError: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4
    }
})

