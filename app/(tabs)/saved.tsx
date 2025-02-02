import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Header } from '@/components/Header';

export default function SavedScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1, padding: 20 }}>
        <ThemedText>Your saved items will appear here</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}