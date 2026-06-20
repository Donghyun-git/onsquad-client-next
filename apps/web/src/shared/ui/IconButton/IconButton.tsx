import React from 'react';

import { cn } from '@/shared/lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  children?: React.ReactNode;
}

const IconButton = ({ icon, children, ...props }: IconButtonProps) => {
  return (
    <button className={cn('w-fit !p-0', props.className)} {...props}>
      <div className="flex items-center gap-1">
        {icon}
        {children}
      </div>
    </button>
  );
};

export default IconButton;
