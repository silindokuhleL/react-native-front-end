import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';
import { router } from 'expo-router';

export function Header() {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

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
        <ThemedView style={styles.container}>
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
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1000,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
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