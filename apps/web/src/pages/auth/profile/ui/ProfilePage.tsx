import React from 'react';

import { auth } from '@/auth';

import { ProfileForm } from '@/features/auth/profile';

import { Appbar } from '@/shared/ui/Appbar';

export default async function ProfilePage() {
  const session = await auth();

  return (
    <>
      <Appbar isMenuHeader={false} title={`${session?.nickname}의 프로필`} />
      <ProfileForm />
    </>
  );
}
