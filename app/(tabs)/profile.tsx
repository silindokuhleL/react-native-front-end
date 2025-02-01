import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/auth';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const { user } = useAuth();

    if (!user) return null;

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not available';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'Invalid date';
            }
            
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    return (
        <ThemedView style={styles.container}>
            <Header title="Profile" />
            
            <ThemedView style={styles.profileSection}>
                <ThemedView style={styles.avatarContainer}>
                    {(user as any).avatar_url ? (
                        <Image 
                            source={{ uri: (user as any).avatar_url }} 
                            style={styles.avatar}
                        />
                    ) : (
                        <ThemedView style={styles.defaultAvatar}>
                            <Ionicons name="person" size={40} color="#666" />
                        </ThemedView>
                    )}
                    <TouchableOpacity style={styles.editAvatarButton}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </ThemedView>

                <ThemedText style={styles.userName}>{user.name}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoContainer}>
                <ThemedView style={styles.infoRow}>
                    <ThemedText style={styles.label}>Name:</ThemedText>
                    <ThemedText style={styles.value}>{user.name}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.infoRow}>
                    <ThemedText style={styles.label}>Email:</ThemedText>
                    <ThemedText style={styles.value}>{user.email}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.infoRow}>
                    <ThemedText style={styles.label}>Member since:</ThemedText>
                    <ThemedText style={styles.value}>
                        {formatDate(user.created_at)}
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.infoRow}>
                    <ThemedText style={styles.label}>Email status:</ThemedText>
                    <ThemedText style={[styles.value, !user.email_verified_at && styles.unverified]}>
                        {user.email_verified_at ? 'Verified' : 'Not verified'}
                    </ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="settings-outline" size={20} color="#fff" />
                    <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.dangerButton]}>
                    <Ionicons name="log-out-outline" size={20} color="#fff" />
                    <ThemedText style={styles.buttonText}>Logout</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    defaultAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007AFF',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    infoContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    label: {
        fontWeight: 'bold',
        width: 120,
    },
    value: {
        flex: 1,
    },
    unverified: {
        color: '#FF3B30',
    },
    buttonContainer: {
        padding: 20,
        gap: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    dangerButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});