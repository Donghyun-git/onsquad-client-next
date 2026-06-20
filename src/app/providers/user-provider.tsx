'use client';

import React, { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { useUserStore } from '@/shared/lib/store/useUserStore';
import { Spinner } from '@/shared/ui/Spinner';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  const user = useUserStore((state) => state.user);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  console.log(user, status);

  useEffect(() => {
    if (session && !user) {
      setUserInfo?.(session);
    }
  }, [session]);

  if (status === 'loading' || (session && !user)) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default UserProvider;
