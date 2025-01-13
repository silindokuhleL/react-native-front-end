import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { router } from 'expo-router'

const { width } = Dimensions.get('window')

export default function RegisterScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')

    const handleRegister = () => {
        // Add registration logic here
        console.log('Register attempted with:', { email, password, name })
        // On successful registration:
        router.replace('/(tabs)/')
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
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                    </ThemedView>

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

                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="#999"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
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
    // ... similar styles as login screen with some adjustments
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
}) 