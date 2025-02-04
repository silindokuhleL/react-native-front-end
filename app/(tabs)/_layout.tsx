import {useAuth} from '@/hooks/auth';
import {Href, Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {hasRole} from '@/utils/permissions';

type IoniconsNames = keyof typeof Ionicons.glyphMap;

interface TabConfig {
  name: string;
  options: {
    title: string;
    headerTitle?: string;
    headerShown?: boolean;
    href: Href;
    icon: IoniconsNames;  
    roleRequired?: 'admin' | 'salon_owner' | 'receptionist' | 'stylist' | 'inventory_manager' | 'marketing_manager' | 'accountant' | 'customer' | 'service_provider';
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
      title: 'Bookings',
      headerTitle: 'Manage Bookings',
      href: { pathname: '/bookings' },
      icon: 'calendar-sharp' as IoniconsNames,
      roleRequired: 'receptionist'
    }
  },
  {
    name: 'my-bookings',
    options: {
      title: 'My Bookings',
      href: { pathname: '/my-bookings' },
      icon: 'calendar-number' as IoniconsNames,
      useOutline: true
    }
  },
  {
    name: 'manage-services',
    options: {
      title: 'My Services',
      headerTitle: 'Manage Services',
      href: { pathname: '/manage-services' },
      icon: 'list-outline' as IoniconsNames,
      roleRequired: 'service_provider'
    }
  },
  {
    name: 'system-settings',
    options: {
      title: 'Settings',
      headerTitle: 'System Settings',
      href: { pathname: '/system-settings' },
      icon: 'settings-outline' as IoniconsNames,
      roleRequired: 'admin'
    }
  },
  {
    name: 'users',
    options: {
      title: 'Users',
      headerTitle: 'Manage Users',
      href: { pathname: '/users' },
      icon: 'people-outline' as IoniconsNames,
      roleRequired: 'admin'
    }
  },
  {
    name: 'salon-dashboard',
    options: {
      title: 'Dashboard',
      href: { pathname: '/salon-dashboard' },
      icon: 'stats-chart-outline' as IoniconsNames,
      roleRequired: 'salon_owner'
    }
  },
  {
    name: 'appointments',
    options: {
      title: 'Appointments',
      href: { pathname: '/appointments' },
      icon: 'calendar-outline' as IoniconsNames,
      roleRequired: 'receptionist'
    }
  },
  {
    name: 'payments',
    options: {
      title: 'Payments',
      href: { pathname: '/payments' },
      icon: 'cash-outline' as IoniconsNames,
      roleRequired: 'receptionist'
    }
  },
  {
    name: 'schedule',
    options: {
      title: 'My Schedule',
      href: { pathname: '/schedule' },
      icon: 'time-outline' as IoniconsNames,
      roleRequired: 'stylist'
    }
  },
  {
    name: 'inventory',
    options: {
      title: 'Inventory',
      href: { pathname: '/inventory' },
      icon: 'cube-outline' as IoniconsNames,
      roleRequired: 'inventory_manager'
    }
  },
  {
    name: 'promotions',
    options: {
      title: 'Promotions',
      href: { pathname: '/promotions' },
      icon: 'megaphone-outline' as IoniconsNames,
      roleRequired: 'marketing_manager'
    }
  },
  {
    name: 'campaigns',
    options: {
      title: 'Campaigns',
      href: { pathname: '/campaigns' },
      icon: 'mail-outline' as IoniconsNames,
      roleRequired: 'marketing_manager'
    }
  },
  {
    name: 'financial-reports',
    options: {
      title: 'Reports',
      href: { pathname: '/financial-reports' },
      icon: 'document-text-outline' as IoniconsNames,
      roleRequired: 'accountant'
    }
  },
  {
    name: 'payroll',
    options: {
      title: 'Payroll',
      href: { pathname: '/payroll' },
      icon: 'wallet-outline' as IoniconsNames,
      roleRequired: 'accountant'
    }
  },
  {
    name: 'book',
    options: {
      title: 'Book',
      href: { pathname: '/book' },
      icon: 'calendar' as IoniconsNames,
      roleRequired: 'customer',
      useOutline: true
    }
  },
  {
    name: 'my-appointments',
    options: {
      title: 'My Appointments',
      href: { pathname: '/my-appointments' },
      icon: 'time' as IoniconsNames,
      roleRequired: 'customer',
      useOutline: true
    }
  },
  {
    name: 'saved',
    options: {
      title: 'Saved',
      href: '/saved',
      icon: 'heart-outline' as IoniconsNames,  // Changed from 'heart'
      roleRequired: 'customer',
      useOutline: true
    }
  },
  {
    name: 'profile',
    options: {
      title: 'Profile',
      href: '/profile',
      icon: 'person-outline' as IoniconsNames,  // Changed from 'person'
      useOutline: true
    }
  },
  {
    name: 'notifications',
    options: {
      title: 'Notifications',
      href: { pathname: '/notifications' },
      icon: 'notifications-outline' as IoniconsNames,  // Changed from 'notifications'
      useOutline: true
    }
  }
];

export default function TabLayout() {
  const { user } = useAuth();

  const getTabAccess = (roleRequired?: string) => {
    if (!roleRequired) return true;
    return hasRole(user, roleRequired);
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
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = (focused && tab.options.useOutline
                ? tab.options.icon.replace('-outline', '')
                : tab.options.icon) as IoniconsNames;
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
      ))}
    </Tabs>
  );
}