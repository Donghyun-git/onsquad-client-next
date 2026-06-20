import { type ReactNode } from 'react';

import { Text } from '@/shared/ui/Text';

interface CrewManageWrapperProps {
  children: ReactNode;
  title: string;
}

const CrewManageWrapper = ({ children, title }: CrewManageWrapperProps) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex grow flex-col gap-4">
        <h2 className="sr-only">{title}</h2>
        <Text.lg className="font-semibold">{title}</Text.lg>
        {children}
      </div>
    </div>
  );
};

export default CrewManageWrapper;
