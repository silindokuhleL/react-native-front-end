import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useAuth } from '@/hooks/auth'
import { Header } from '@/components/Header'

export default function HomeScreen() {
    const { user } = useAuth()

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not available';
        
        const cleanDateString = dateString.replace(/<[^>]*>/g, '').trim();
        
        try {
            const jsonMatch = cleanDateString.match(/"created_at":"([^"]+)"/);
            const dateToFormat = jsonMatch ? jsonMatch[1] : cleanDateString;
            
            const date = new Date(dateToFormat);
            if (isNaN(date.getTime())) {
                console.log('Invalid date string:', dateToFormat);
                return 'Invalid date';
            }
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.log('Date parsing error:', error);
            return 'Invalid date';
        }
    }

    if (!user) {
        return (
            <ThemedView style={{ flex: 1 }}>
                <ThemedView style={{ 
                    // backgroundColor: '#4A5D8F', 
                    // padding: 20,
                    // paddingVertical: 40,
                    // flexDirection: 'row',
                    alignItems: 'flex-end',
                    // justifyContent: 'center',
                    height: 100
                }}>
                    <ThemedText style={{ 
                        fontSize: 24, 
                        // fontWeight: 'bold',
                        // color: 'white',
                        flex: 1,
                        // textAlign: 'center',
                        // marginBottom: 5
                    }}>
                        Your Bookings
                    </ThemedText>
                    {/* <Header style={{ position: 'absolute', right: 20, bottom: 20 }} /> */}
                </ThemedView>
                <ThemedView style={{ 
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: 20 
                }}>
                    <ThemedText>Please log in to continue</ThemedText>
                </ThemedView>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            <Header title="Home" />
            <ThemedView style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: 20 
            }}>
                <ThemedText style={{ fontSize: 24, marginBottom: 10 }}>
                    Welcome back, {user?.name || 'User'}!
                </ThemedText>
                <ThemedText style={{ textAlign: 'center', opacity: 0.7, marginBottom: 5 }}>
                    {user?.email}
                </ThemedText>
                <ThemedText style={{ textAlign: 'center', opacity: 0.5, fontSize: 12 }}>
                    Member since {formatDate(user?.created_at)}
                </ThemedText>
                {!user?.email_verified_at && (
                    <ThemedText style={{ color: '#ff6b6b', marginTop: 10, fontSize: 12 }}>
                        Please verify your email address
                    </ThemedText>
                )}
            </ThemedView>
        </ThemedView>
    );
}

