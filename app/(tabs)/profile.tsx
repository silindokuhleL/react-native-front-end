import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/auth';

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
        <ThemedView style={{ flex: 1 }}>
            <Header title="Profile" />
            
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
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 60,
    },
    infoContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 10,
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
});