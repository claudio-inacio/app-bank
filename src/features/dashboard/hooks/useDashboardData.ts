import { useState, useEffect } from 'react';

interface DashboardData {
  balance: number;
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Fetch dashboard data
    setData({ balance: 1000 });
  }, []);

  return { data };
};