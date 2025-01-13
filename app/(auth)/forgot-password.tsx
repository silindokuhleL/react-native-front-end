import { router } from 'expo-router'
import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('')

    const handleResetPassword = () => {
        // Add password reset logic here
        console.log('Password reset attempted for:', email)
        // Show success message and navigate back
        router.back()
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={styles.background}>
                <ThemedView style={styles.formContainer}>
                    <ThemedText type="title" style={styles.title}>Reset Password</ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Enter your email address and we'll send you instructions to reset your password
                    </ThemedText>

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

                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={handleResetPassword}
                        activeOpacity={0.9}
                    >
                        <ThemedText type="defaultSemiBold" style={styles.resetButtonText}>
                            Send Reset Instructions
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <ThemedText style={styles.backButtonText}>Back to Login</ThemedText>
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
    resetButton: {
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
    resetButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    backButton: {
        marginTop: 16,
        padding: 8,
    },
    backButtonText: {
        color: '#4A90E2',
        fontSize: 14,
    },
}) 