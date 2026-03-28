import { useState } from 'react';

export const useTransfer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const transfer = async (_recipient: string, _amount: number) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Handle transfer logic
  };

  return { transfer, isLoading };
};