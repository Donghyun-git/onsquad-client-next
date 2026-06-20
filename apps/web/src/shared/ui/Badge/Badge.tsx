import { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

import { Badge, BadgeProps } from '../ui/badge';

interface BadgePropsType extends BadgeProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

const CustomBadge = (props: BadgePropsType) => {
  const { className, children, ...rest } = props;

  return (
    <Badge
      className={cn(`rounded-md bg-secondary px-1.5 font-bold hover:bg-secondary active:bg-secondary ${className} `)}
      {...rest}
    >
      {children}
    </Badge>
  );
};

export default CustomBadge;
