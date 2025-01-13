import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function RootLayout() {
  useEffect(() => {
    // Redirect to auth flow on initial load
    // Later you can add actual auth check here
    router.replace('/(auth)/login');
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
