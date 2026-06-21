'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import { Spinner } from '@/shared/ui/Spinner';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default UserProvider;
