import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginForm: React.FC = () => {
  return (
    <div>
      <Input placeholder="Username" />
      <Input placeholder="Password" type="password" />
      <Button>Login</Button>
    </div>
  );
};

export default LoginForm;