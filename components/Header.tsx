import { Pressable, StyleSheet, ViewStyle, StatusBar, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';
import { router } from 'expo-router';
import React from 'react';

interface HeaderProps {
    style?: ViewStyle;
    title?: string;
}

export function Header({ style, title = 'Your Bookings' }: HeaderProps) {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleLogout = async () => {
        await logout();
        setShowMenu(false);
        router.replace('/login');  // Changed from '/' to '/login'
    };

    // Add this useEffect
    React.useEffect(() => {
        StatusBar.setBarStyle('light-content');
    }, []);

    const handleProfile = () => {
        setShowMenu(false);
        router.push('/(tabs)/profile');
    };

    const handleEditProfile = () => {
        setShowMenu(false);
        setShowEditModal(true);
    };

    if (!user) return null;

    return (
        <ThemedView style={[styles.headerContainer]}>
            <ThemedText style={styles.headerTitle}>
                {title}
            </ThemedText>
            <ThemedView style={[styles.container, style]}>
                <Pressable 
                    onPress={() => setShowMenu(!showMenu)} 
                    style={styles.profileButton}
                >
                    <ThemedText style={styles.profileButtonText}>
                        {user.name?.charAt(0).toUpperCase()}
                    </ThemedText>
                </Pressable>

                {showMenu && (
                    <>
                        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
                            <ThemedView style={styles.overlay} />
                        </TouchableWithoutFeedback>
                        <ThemedView style={styles.menu}>
                            <Pressable onPress={handleEditProfile} style={styles.menuItem}>
                                <ThemedText>Edit Profile</ThemedText>
                            </Pressable>
                            <Pressable onPress={handleProfile} style={styles.menuItem}>
                                <ThemedText>View Profile</ThemedText>
                            </Pressable>
                            <Pressable onPress={handleLogout} style={styles.menuItem}>
                                <ThemedText style={styles.logoutText}>Logout</ThemedText>
                            </Pressable>
                        </ThemedView>
                    </>
                )}

                <Modal
                    visible={showEditModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowEditModal(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setShowEditModal(false)}>
                        <ThemedView style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <ThemedView style={styles.modalContent}>
                                    <ThemedText style={styles.modalTitle}>Edit Profile</ThemedText>
                                    {/* Add your edit profile form here */}
                                    <TouchableOpacity 
                                        style={styles.closeButton}
                                        onPress={() => setShowEditModal(false)}
                                    >
                                        <ThemedText style={styles.closeButtonText}>Close</ThemedText>
                                    </TouchableOpacity>
                                </ThemedView>
                            </TouchableWithoutFeedback>
                        </ThemedView>
                    </TouchableWithoutFeedback>
                </Modal>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#210883',
        paddingTop: 55,
        paddingBottom: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120  // Increased height
    },
    
    headerTitle: {
        fontSize: 24,  // Increased from 22
        fontWeight: '600',
        color: 'white',  // Ensuring white color
        flex: 1,
        textAlign: 'center',
        marginTop: 5
    },
    container: {
        position: 'absolute',
        right: 20,
        top: 52,
        zIndex: 1000,
        backgroundColor: 'transparent',
    },
    profileButton: {   
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Removed duplicate container style
    profileButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    menu: {
        position: 'absolute',
        top: 45,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minWidth: 120,
    },
    menuItem: {
        padding: 10,
    },
    logoutText: {
        color: '#FF3B30',
    },  // Added comma here
    overlay: {
        position: 'absolute',  // Changed 'fixed' to 'absolute'
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',  // Changed '100vh' to '100%'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
});