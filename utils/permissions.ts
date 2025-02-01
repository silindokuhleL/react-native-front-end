import { User } from '../hooks/auth';

export const hasPermission = (user: User | null, permission: string): boolean => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
};

export const hasRole = (user: User | null, role: string): boolean => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
};