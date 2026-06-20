import { ReactNode } from 'react';

import { BottomTab } from '@/shared/ui/BottomTab';

const ShowBottomTab = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <>
      <div className="bg-gray-50">{children}</div>
      <BottomTab />
      <div className="mx-auto h-20 min-w-[20rem] max-w-[45rem] bg-gray-50" />
    </>
  );
};

export default ShowBottomTab;
