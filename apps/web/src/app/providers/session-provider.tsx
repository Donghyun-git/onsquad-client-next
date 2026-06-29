'use client';

import React, { useEffect } from 'react';

import { SessionProvider as NextAuthSessionProvider, useSession } from 'next-auth/react';

import { registerSessionRefresh } from '@/shared/lib/auth/sessionRefresh';

/**
 * 토큰 만료 시 fetch 레이어(common.ts)가 호출할 수 있도록, useSession().update 기반
 * refresh 함수를 single-flight 브리지에 등록한다. update({ type: 'token-refresh' }) 가
 * jwt 콜백의 재발급을 트리거하고 next-auth 가 세션 쿠키를 네이티브로 영속화한다.
 */
const SessionRefreshBridge = () => {
  const { update } = useSession();

  useEffect(() => {
    registerSessionRefresh(async () => {
      const updated = await update({ type: 'token-refresh' });

      return !!updated && !updated.error;
    });

    return () => registerSessionRefresh(null);
  }, [update]);

  return null;
};

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthSessionProvider refetchOnWindowFocus={false}>
      <SessionRefreshBridge />
      {children}
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
