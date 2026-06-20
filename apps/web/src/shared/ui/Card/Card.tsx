'use client';

import { ReactNode, forwardRef } from 'react';

import { cn } from '@/shared/lib/utils';

export interface CardPropsType {
  title: string | ReactNode;
  children: ReactNode;
  className?: string;

  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardPropsType>((props, ref) => {
  const { title, children, className, onClick } = props;

  return (
    <div
      ref={ref}
      className={cn('min-h-32 w-full rounded-md bg-white p-2', className, onClick && 'cursor-pointer')}
      onClick={onClick}
    >
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
