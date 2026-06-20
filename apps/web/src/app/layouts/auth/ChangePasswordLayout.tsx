import React from 'react';

import { Appbar } from '@/shared/ui/Appbar';

import NoTabContentLayout from '../NoTabContentLayout';

const ChangePasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NoTabContentLayout header={<Appbar isMenuHeader={false} title="비밀번호 변경" />}>{children}</NoTabContentLayout>
  );
};

export default ChangePasswordLayout;
