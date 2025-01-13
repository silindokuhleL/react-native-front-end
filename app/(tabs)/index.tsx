import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login attempted with:', email, password);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('@/assets/images/react-native-logo.webp')}
                style={styles.logo}
            />
            <ThemedView style={styles.formContainer}>
                <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <ThemedText type="defaultSemiBold" style={styles.loginButtonText}>Log In</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ThemedText style={styles.forgotPassword}>Forgot Password?</ThemedText>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.signupContainer}>
                <ThemedText>Don't have an account? </ThemedText>
                <TouchableOpacity>
                    <ThemedText type="defaultSemiBold" style={styles.signupText}>Sign Up</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        height: 100,
        width: 100,
        marginBottom: 40,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#A1CEDC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    forgotPassword: {
        marginBottom: 20,
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signupText: {
        color: '#A1CEDC',
    },
});

