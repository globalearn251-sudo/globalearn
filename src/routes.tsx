import { lazy } from 'react';
import type { ReactNode } from 'react';
import { AdminLayout } from './components/layouts/AdminLayout';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const LuckyDrawPage = lazy(() => import('./pages/LuckyDrawPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const RechargePage = lazy(() => import('./pages/RechargePage'));
const WithdrawalPage = lazy(() => import('./pages/WithdrawalPage'));
const KycSubmitPage = lazy(() => import('./pages/KycSubmitPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />,
  },
  {
    name: 'Products',
    path: '/products',
    element: <ProductsPage />,
  },
  {
    name: 'Lucky Draw',
    path: '/lucky-draw',
    element: <LuckyDrawPage />,
  },
  {
    name: 'Team',
    path: '/team',
    element: <TeamPage />,
  },
  {
    name: 'Profile',
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    name: 'Recharge',
    path: '/recharge',
    element: <RechargePage />,
  },
  {
    name: 'Withdrawal',
    path: '/withdrawal',
    element: <WithdrawalPage />,
  },
  {
    name: 'KYC Submit',
    path: '/kyc-submit',
    element: <KycSubmitPage />,
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
  },
  {
    name: 'Signup',
    path: '/signup',
    element: <SignupPage />,
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        name: 'Admin Dashboard',
        path: '',
        element: <AdminDashboard />,
      },
    ],
  },
];

export default routes;
