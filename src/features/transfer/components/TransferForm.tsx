import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TransferForm: React.FC = () => {
  return (
    <div>
      <Input placeholder="Recipient" />
      <Input placeholder="Amount" type="number" />
      <Button>Transfer</Button>
    </div>
  );
};

export default TransferForm;