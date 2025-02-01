import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Header } from '@/components/Header';

export default function BookingsScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title="Your Bookings" />
      <ThemedView style={{ flex: 1, padding: 20 }}>
        <ThemedText>Your bookings will appear here</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}