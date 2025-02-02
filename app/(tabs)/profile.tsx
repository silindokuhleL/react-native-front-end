import { StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/auth';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { router } from 'expo-router';

type User = {
    name: string;
    email: string;
    roles: string[];
    created_at: string | null;
    email_verified_at: string | null;
    avatar_url?: string;
};

export default function ProfileScreen() {
    const { user, logout, updateProfile } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleEditProfile = useCallback(() => {
        if (!user) return;
        setEditName(user.name);
        setEditEmail(user.email);
        setShowEditModal(true);
    }, [user]);

    const handleUpdateProfile = useCallback(async () => {
        if (!user) return;
        
        setIsUpdating(true);
        try {
            console.log('Updating profile with:', { name: editName, email: editEmail });
            const success = await updateProfile({
                name: editName,
                email: editEmail
            });

            console.log('Update result:', success);
            if (success) {
                setShowEditModal(false);
            }
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setIsUpdating(false);
        }
    }, [editName, editEmail, user, updateProfile]);

    const handleLogout = useCallback(async () => {
        await logout();
        router.replace('/login');
    }, [logout]);
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
                    <ThemedText style={styles.label}>Role:</ThemedText>
                    <ThemedText style={styles.value}>
                        {user.roles[0]?.charAt(0).toUpperCase() + user.roles[0]?.slice(1).replace('_', ' ') || 'No role assigned'}
                    </ThemedText>
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
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleEditProfile}
                >
                    <Ionicons name="settings-outline" size={20} color="#fff" />
                    <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.dangerButton]}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color="#fff" />
                    <ThemedText style={styles.buttonText}>Logout</ThemedText>
                </TouchableOpacity>
            </ThemedView>

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
                                
                                <ThemedView style={styles.formGroup}>
                                    <ThemedText style={styles.formLabel}>Name</ThemedText>
                                    <TextInput
                                        style={styles.input}
                                        value={editName}
                                        onChangeText={setEditName}
                                        placeholder="Enter your name"
                                    />
                                </ThemedView>

                                <ThemedView style={styles.formGroup}>
                                    <ThemedText style={styles.formLabel}>Email</ThemedText>
                                    <TextInput
                                        style={styles.input}
                                        value={editEmail}
                                        onChangeText={setEditEmail}
                                        placeholder="Enter your email"
                                        keyboardType="email-address"
                                    />
                                </ThemedView>

                                <TouchableOpacity 
                                    style={[styles.button, isUpdating && { opacity: 0.7 }]}
                                    onPress={handleUpdateProfile}
                                    disabled={isUpdating}
                                >
                                    <ThemedText style={styles.buttonText}>
                                        {isUpdating ? 'Updating...' : 'Update Profile'}
                                    </ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.closeButton}
                                    onPress={() => setShowEditModal(false)}
                                >
                                    <ThemedText style={styles.closeButtonText}>Cancel</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>
                        </TouchableWithoutFeedback>
                    </ThemedView>
                </TouchableWithoutFeedback>
            </Modal>
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
        backgroundColor: '#f542f5',
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
        color: '#FFFFFF',  // Changed to white
        fontSize: 16,
        fontWeight: '600',
    },
    // Add these new styles
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
    formGroup: {
        marginBottom: 15,
    },
    formLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    // Remove or comment out the updateButton style since we're not using it anymore
    // updateButton: {
    //     backgroundColor: '#4CAF50',
    //     padding: 15,
    //     borderRadius: 10,
    //     marginTop: 20,
    // },
});