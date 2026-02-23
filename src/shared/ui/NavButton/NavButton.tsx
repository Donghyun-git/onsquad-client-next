import React, { ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button, type ButtonProps } from '@/shared/ui/ui/button';

interface NavButtonPropsType extends ButtonProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

/**
 * 마이페이지, 세팅, nav 버튼
 */
const NavButton = ({ children, className, ...props }: NavButtonPropsType) => {
  return (
    <Button variant="outline" className={cn(`w-full border-0 p-3 ${className}`)} {...props}>
      <div className="flex w-full items-center justify-between">
        <span className="inline-block pt-0.5 font-medium text-black">{children}</span>
        <ChevronRight stroke="#000" strokeWidth={2} className="size-5" />
      </div>
    </Button>
  );
};

export default NavButton;
