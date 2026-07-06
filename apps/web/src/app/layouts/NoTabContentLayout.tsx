import React from 'react';

import { ScrollContainer } from '@/shared/ui/ScrollContainer';

const NoTabContentLayout = ({ children, header }: { children: React.ReactNode; header: React.ReactNode }) => {
  return (
    <>
      {header}
      <ScrollContainer className="fixed inset-x-0 top-[var(--app-header-height)] z-0 mx-auto flex h-[calc(100svh-var(--app-header-height))] max-w-[45rem] overflow-y-auto bg-[#f8f8f8]">
        <div className="mx-auto grow p-5">{children}</div>
      </ScrollContainer>
    </>
  );
};

export default NoTabContentLayout;
