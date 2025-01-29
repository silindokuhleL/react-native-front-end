import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native'

const theme = {
  dark: false,
  colors: {
    primary: '#4A90E2',
    background: '#F7F9FC',
    card: '#FFFFFF',
    text: '#333333',
    border: '#E1E1E1',
    notification: '#FF3B30',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  }
}

export default function RootLayout() {
  useEffect(() => {
    // Redirect to login screen on initial load
    router.replace('/(auth)/login')
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <Stack initialRouteName="(auth)">
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </NavigationContainer>
  )
}
