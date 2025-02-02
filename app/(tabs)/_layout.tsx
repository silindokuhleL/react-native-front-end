import { Tabs, Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import { hasRole } from '../../utils/permissions';
import { useEffect } from 'react';

// Add type for valid Ionicons names
type IoniconsNames = keyof typeof Ionicons.glyphMap;

interface TabConfig {
  name: string;
  options: {
    title: string;
    headerTitle?: string;
    headerShown?: boolean;
    href: Href;
    icon: IoniconsNames;  // Update icon type
    roleRequired?: 'admin' | 'customer';
    useOutline?: boolean;
  };
}

const TAB_CONFIG: TabConfig[] = [
  {
    name: 'index',
    options: {
      title: 'Home',
      headerShown: false,
      href: { pathname: '/' },
      icon: 'home-outline' as IoniconsNames
    }
  },
  {
    name: 'bookings',
    options: {
      title: 'All Bookings',
      headerTitle: 'Manage Bookings',
      href: { pathname: '/bookings' },
      icon: 'calendar-outline' as IoniconsNames,
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
      href: { pathname: '/notifications' },
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
                  ? `${tab.options.icon}-outline` as IoniconsNames
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