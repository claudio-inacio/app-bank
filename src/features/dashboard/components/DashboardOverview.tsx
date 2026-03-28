import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome to your bank dashboard!</p>
      </CardContent>
    </Card>
  );
};

export default DashboardOverview;