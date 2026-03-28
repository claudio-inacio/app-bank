import React from 'react';
import { DashboardOverview } from '@/features/dashboard';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardOverview />
    </div>
  );
};

export default DashboardPage;