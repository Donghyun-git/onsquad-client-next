import React from 'react';

import { Appbar } from '@/shared/ui/Appbar';

import NoTabContentLayout from './NoTabContentLayout';

const SquadNewLayout = ({ children }: { children: React.ReactNode }) => {
  return <NoTabContentLayout header={<Appbar title="스쿼드 모집하기" />}>{children}</NoTabContentLayout>;
};

export default SquadNewLayout;
