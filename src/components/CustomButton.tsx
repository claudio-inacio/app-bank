import React from 'react';
import { Button } from './ui/button';

interface CustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
  size?: 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
  variant = 'default',
  size = 'default',
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CustomButton;