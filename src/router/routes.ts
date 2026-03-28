import { lazy } from 'react';

export const routes = [
  {
    path: '/login',
    component: lazy(() => import('@/pages/LoginPage')),
  },
  {
    path: '/dashboard',
    component: lazy(() => import('@/pages/DashboardPage')),
  },
  {
    path: '/transfer',
    component: lazy(() => import('@/pages/TransferPage')),
  },
];