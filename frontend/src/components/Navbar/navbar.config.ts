import { 
  LayoutDashboard, 
  Heart, 
  ShoppingCart, 
  User, 
  LucideIcon 
} from 'lucide-react';

export interface NavLinkConfig {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  requiresAuth: boolean;
  showBadge?: 'cart' | 'favorites';
}

export const AUTH_NAV_LINKS: NavLinkConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '', // Dynamic based on role
    icon: LayoutDashboard,
    requiresAuth: true,
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    href: '/favorites',
    icon: Heart,
    requiresAuth: true,
    showBadge: 'favorites',
  },
  {
    id: 'bag',
    label: 'Bag',
    href: '/cart',
    icon: ShoppingCart,
    requiresAuth: true,
    showBadge: 'cart',
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: User,
    requiresAuth: true,
  },
];

export const ROLE_DASHBOARDS: Record<string, string> = {
  admin: '/admin/dashboard',
  service_provider: '/service-provider/dashboard',
  user: '/user/dashboard',
};

export const DEFAULT_DASHBOARD = '/';
