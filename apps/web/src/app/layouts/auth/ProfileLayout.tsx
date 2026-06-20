import React from 'react';

import { auth } from '@/auth';

import { Appbar } from '@/shared/ui/Appbar';

import NoTabContentLayout from '../NoTabContentLayout';

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <NoTabContentLayout header={<Appbar isMenuHeader={false} title={`${session?.nickname}의 프로필`} />}>
      {children}
    </NoTabContentLayout>
  );
};

export default ProfileLayout;
