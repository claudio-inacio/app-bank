import { useState, useEffect } from 'react';

interface DashboardData {
  balance: number;
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    setData({ balance: 1000 });
  }, []);

  return { data };
};