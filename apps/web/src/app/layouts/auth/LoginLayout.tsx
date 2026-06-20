import React from 'react';

import { Appbar } from '@/shared/ui/Appbar';

import NoTabContentLayout from '../NoTabContentLayout';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <NoTabContentLayout header={<Appbar isMenuHeader={false} title="로그인" />}>{children}</NoTabContentLayout>;
};

export default LoginLayout;
