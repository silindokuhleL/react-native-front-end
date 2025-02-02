import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import { hasRole } from '../../utils/permissions';
import { useEffect } from 'react';

const TAB_CONFIG = [
  {
    name: 'index',
    options: {
      title: 'Home',
      headerShown: false,
      href: '/',
      icon: 'home'
    }
  },
  {
    name: 'bookings',
    options: {
      title: 'All Bookings',
      headerTitle: 'Manage Bookings',
      href: '/bookings',
      icon: 'calendar',
      roleRequired: 'admin'
    }
  },
  {
    name: 'profile',
    options: {
      title: 'Profile',
      href: '/profile',
      icon: 'person'
    }
  },
  {
    name: 'saved',
    options: {
      title: 'Saved',
      href: '/saved',
      icon: 'heart',
      roleRequired: 'customer',
      useOutline: true
    }
  },
  {
    name: 'my-bookings',
    options: {
      title: 'My Bookings',
      href: '/my-bookings',
      icon: 'book',
      roleRequired: 'customer'
    }
  },
  {
    name: 'notifications',
    options: {
      title: 'Notifications',
      href: '/notifications',
      icon: 'notifications',
      roleRequired: 'customer'
    }
  }
];

export default function TabLayout() {
  const { user } = useAuth();
  const isCustomer = hasRole(user, 'customer');
  const isAdmin = hasRole(user, 'admin');

  const getTabAccess = (roleRequired?: string) => {
    if (!roleRequired) return true;
    return roleRequired === 'admin' ? isAdmin : isCustomer;
  };

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
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            ...tab.options,
            href: getTabAccess(tab.options.roleRequired) ? tab.options.href : null,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={tab.options.useOutline && !focused 
                  ? `${tab.options.icon}-outline` 
                  : tab.options.icon}
                size={size}
                color={tab.options.useOutline && focused ? "#ff3b30" : color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}