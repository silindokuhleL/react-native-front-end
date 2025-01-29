import {
    Image,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    useWindowDimensions
} from 'react-native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useTheme } from '@react-navigation/native'
import { useAuth } from '@/hooks/auth'

export default function LoginScreen() {
    const { width } = useWindowDimensions()
    const { colors } = useTheme()
    const { login, errors, loading, setErrors } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        await login({ email, password });
    }

    const handleRegister = () => {
        router.push('/(auth)/register')
    }

    const handleForgotPassword = () => {
        router.push('/(auth)/forgot-password')
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={[styles.background, { backgroundColor: colors.background }]}>
                <Image
                    source={require('@/assets/images/react-logo.webp')}
                    style={styles.logo}
                />
                <ThemedView style={[styles.formContainer, { width: width > 400 ? 400 : width - 40 }]}>
                    <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
                    <ThemedText style={styles.subtitle}>Sign in to continue</ThemedText>

                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
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
                        {errors.email && (
                            <ThemedText style={styles.fieldError}>{errors.email}</ThemedText>
                        )}
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, errors.password && styles.inputError]}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                                setErrors(prev => ({ ...prev, password: '' }))
                            }}
                            secureTextEntry
                        />
                        {errors.password && (
                            <ThemedText style={styles.fieldError}>{errors.password}</ThemedText>
                        )}
                    </ThemedView>

                    <TouchableOpacity
                        style={[styles.loginButton, loading && { opacity: 0.7 }]}
                        onPress={handleLogin}
                        activeOpacity={0.9}
                        disabled={loading}
                    >
                        <ThemedText type="defaultSemiBold" style={styles.loginButtonText}>
                            {loading ? 'Logging in...' : 'Log In'}
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.forgotPasswordButton}
                        activeOpacity={0.7}
                        onPress={handleForgotPassword}
                    >
                        <ThemedText style={styles.forgotPassword}>Forgot Password?</ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView style={styles.signupContainer}>
                    <ThemedText style={styles.signupText}>Don't have an account? </ThemedText>
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        onPress={handleRegister}
                    >
                        <ThemedText type="defaultSemiBold" style={styles.signupLink}>
                            Sign Up
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </ScrollView>  // Fixed from </ScrolxlView>
    )
}

// Add these styles to your existing StyleSheet
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
    loginButton: {
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
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    forgotPasswordButton: {
        marginTop: 16,
        padding: 8,
    },
    forgotPassword: {
        color: '#4A90E2',
        fontSize: 14,
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 24,
        padding: 16,
    },
    signupText: {
        fontSize: 16,
        color: '#666',
    },
    signupLink: {
        fontSize: 16,
        color: '#4A90E2',
        fontWeight: '600',
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