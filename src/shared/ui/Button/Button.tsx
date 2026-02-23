import { Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import { type ButtonProps, Button as LibButton } from '../ui/button';

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const Button = ({ children, isLoading = false, className, ...props }: CustomButtonProps) => {
  return (
    <LibButton
      disabled={isLoading}
      variant="default"
      size="default"
      className={cn('disabled:cursor-not-allowed disabled:bg-grayscale300 disabled:text-grayscale600', className)}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </LibButton>
  );
};

export { Button };
