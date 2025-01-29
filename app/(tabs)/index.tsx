import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useAuth } from '@/hooks/auth'
import { Header } from '@/components/Header'

export default function HomeScreen() {
    const { user } = useAuth()

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Header />
            {user ? (
                <>
                    <ThemedText style={{ fontSize: 24, marginBottom: 10 }}>
                        Welcome back, {user.name}!
                    </ThemedText>
                    <ThemedText style={{ textAlign: 'center', opacity: 0.7, marginBottom: 5 }}>
                        {user.email}
                    </ThemedText>
                    <ThemedText style={{ textAlign: 'center', opacity: 0.5, fontSize: 12 }}>
                        Member since {formatDate(user.created_at)}
                    </ThemedText>
                    {!user.email_verified_at && (
                        <ThemedText style={{ color: '#ff6b6b', marginTop: 10, fontSize: 12 }}>
                            Please verify your email address
                        </ThemedText>
                    )}
                </>
            ) : (
                <ThemedText>
                    Please log in to continue
                </ThemedText>
            )}
        </ThemedView>
    )
}

