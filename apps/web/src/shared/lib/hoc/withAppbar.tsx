import React from 'react';

import { Appbar } from '@/shared/ui/Appbar';

interface AppbarConfig {
  isMenuHeader?: boolean;
  title?: string;
}

export const withAppbar = <P extends object>(Component: React.ComponentType<P>, appbarConfig?: AppbarConfig) => {
  const WrappedComponent = (props: P) => {
    return (
      <div className="h-full w-full">
        <Appbar {...appbarConfig} />
        <Component {...props} />
      </div>
    );
  };

  WrappedComponent.displayName = `withAppbar(${Component.displayName || Component.name})`;

  return WrappedComponent;
};
