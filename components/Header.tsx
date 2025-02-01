import { Pressable, StyleSheet, ViewStyle, StatusBar } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';
import { router } from 'expo-router';
import React from 'react';
interface HeaderProps {
    style?: ViewStyle;
}

export function Header({ style }: HeaderProps) {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    // Add this useEffect
    React.useEffect(() => {
        StatusBar.setBarStyle('light-content');
    }, []);

    const handleLogout = async () => {
        await logout();
        setShowMenu(false);
    };

    const handleProfile = () => {
        router.push('/(tabs)/profile');
        setShowMenu(false);
    };

    if (!user) return null;

    return (
        <ThemedView style={[styles.headerContainer]}>
            <ThemedText style={styles.headerTitle}>
                Your Bookings
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
                    <ThemedView style={styles.menu}>
                        <Pressable onPress={handleProfile} style={styles.menuItem}>
                            <ThemedText>Profile</ThemedText>
                        </Pressable>
                        <Pressable onPress={handleLogout} style={styles.menuItem}>
                            <ThemedText style={styles.logoutText}>Logout</ThemedText>
                        </Pressable>
                    </ThemedView>
                )}
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
    }
});