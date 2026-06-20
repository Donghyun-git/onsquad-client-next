import React from 'react';

import { Appbar } from '@/shared/ui/Appbar';

import NoTabContentLayout from '../NoTabContentLayout';

const JoinLayout = ({ children }: { children: React.ReactNode }) => {
  return <NoTabContentLayout header={<Appbar isMenuHeader={false} title="회원가입" />}>{children}</NoTabContentLayout>;
};

export default JoinLayout;
