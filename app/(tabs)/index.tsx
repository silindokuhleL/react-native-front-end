import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login attempted with:', email, password);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={styles.background}>
                <Image
                    source={require('@/assets/images/react-logo.webp')}
                    style={styles.logo}
                />
                <ThemedView style={styles.formContainer}>
                    <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
                    <ThemedText style={styles.subtitle}>Sign in to continue</ThemedText>

                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </ThemedView>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        activeOpacity={0.9}
                    >
                        <ThemedText type="defaultSemiBold" style={styles.loginButtonText}>
                            Log In
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.forgotPasswordButton}
                        activeOpacity={0.7}
                    >
                        <ThemedText style={styles.forgotPassword}>Forgot Password?</ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView style={styles.signupContainer}>
                    <ThemedText style={styles.signupText}>Don't have an account? </ThemedText>
                    <TouchableOpacity activeOpacity={0.7}>
                        <ThemedText type="defaultSemiBold" style={styles.signupLink}>
                            Sign Up
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </ScrollView>
    );
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
});