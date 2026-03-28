import { useState } from 'react';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (_username: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Handle login logic
  };

  return { login, isLoading };
};