import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import { hasRole } from '../../utils/permissions';
import { useEffect } from 'react';

export default function TabLayout() {
  const { user } = useAuth();
  const isCustomer = hasRole(user, 'customer');
  const isAdmin = hasRole(user, 'admin');

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#210883',
      headerShown: true,
      headerStyle: {
        backgroundColor: '#210883',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          href: '/',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'All Bookings',
          headerTitle: 'Manage Bookings',
          href: isAdmin ? '/bookings' : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          href: '/profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          href: isCustomer ? '/saved' : null,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "heart" : "heart-outline"} 
              size={size} 
              color={focused ? "#ff3b30" : "#666"}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="my-bookings"
        options={{
          title: 'My Bookings',
          href: isCustomer ? '/my-bookings' : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          href: isCustomer ? '/notifications' : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}